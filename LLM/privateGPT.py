#!/usr/bin/env python3
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.vectorstores import Chroma
from langchain.llms import Ollama
import os
import time

model = os.environ.get("MODEL", "mistral")
embeddings_model_name = os.environ.get("EMBEDDINGS_MODEL_NAME", "all-MiniLM-L6-v2")
persist_directory = os.environ.get("PERSIST_DIRECTORY", "db")
target_source_chunks = int(os.environ.get('TARGET_SOURCE_CHUNKS', 4))

from constants import CHROMA_SETTINGS

# Initialize global objects outside of functions to reuse them
embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)
db = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
retriever = db.as_retriever(search_kwargs={"k": target_source_chunks})

def ask_question(query: str, hide_source: bool = False, mute_stream: bool = False):
    callbacks = [] if mute_stream else [StreamingStdOutCallbackHandler()]
    llm = Ollama(model=model, callbacks=callbacks)

    qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, return_source_documents=not hide_source)

    start = time.time()
    res = qa(query)
    answer, docs = res['result'], [] if hide_source else res['source_documents']
    end = time.time()

    response = {
        "question": query,
        "answer": answer,
        "sources": [{"source": doc.metadata["source"], "content": doc.page_content} for doc in docs],
        "time_taken": end - start
    }
    return response

def parse_arguments():
    import argparse
    parser = argparse.ArgumentParser(description='privateGPT: Ask questions to your documents without an internet connection, '
                                                 'using the power of LLMs.')
    parser.add_argument("--hide-source", "-S", action='store_true',
                        help='Use this flag to disable printing of source documents used for answers.')

    parser.add_argument("--mute-stream", "-M",
                        action='store_true',
                        help='Use this flag to disable the streaming StdOut callback for LLMs.')

    return parser.parse_args()

def main():
    # Parse the command line arguments
    args = parse_arguments()

    # Interactive questions and answers
    while True:
        query = input("\nEnter a query: ")
        if query == "exit":
            break
        if query.strip() == "":
            continue

        # Get the answer from the chain
        response = ask_question(query, hide_source=args.hide_source, mute_stream=args.mute_stream)

        # Print the result
        print("\n\n> Question:")
        print(query)
        print(response['answer'])

        # Print the relevant sources used for the answer
        if not args.hide_source:
            for document in response['sources']:
                print("\n> " + document["source"] + ":")
                print(document["content"])

if __name__ == "__main__":
    main()
