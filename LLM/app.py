from flask import Flask, request, jsonify
import os
# from dotenv import load_dotenv

# Import functions from backend
from ingest import ingest_documents
from privateGPT import ask_question
# Load environment variables from .env file
# load_dotenv()

app = Flask(__name__)

# Load environment variables
source_directory = os.environ.get('SOURCE_DIRECTORY', 'source_documents')

@app.route('/ingest', methods=['POST'])
def ingest():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    if not os.path.exists(source_directory):
        os.makedirs(source_directory)

    file_path = os.path.join(source_directory, file.filename)
    file.save(file_path)
    message, status_code = ingest_documents()

    return jsonify({"message": message}), status_code


@app.route('/ask', methods=['GET'])
def ask():
    question = request.args.get('question')
    if not question:
        return jsonify({"error": "No question provided"}), 400

    hide_source = request.args.get('hide_source', 'false').lower() == 'true'
    mute_stream = request.args.get('mute_stream', 'false').lower() == 'true'

    response = ask_question(question, hide_source=hide_source, mute_stream=mute_stream)
    return jsonify(response)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)

