// const ProjectRulesModel = require("../models/ProjectRules.js");
const request = require("request");

const ask = async (req, res, next) => {
  try {
    console.log('ask called');
    console.log(req.query.question);
    request(
      `http://127.0.0.1:5000/ask?question=${req.query.question}`,
      function (error, response, body) {
        console.error("error:", error); // Print the error
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        console.log("body:", body); // Print the data received
        // res.send(body); //Display the response on the website
        res.status(200).json({ code: 200, data: body });
      }
    );
  } catch (error) {
    return res.status(500).json({ code: 500, message: error });
  }
};

const ingest = async (req, res, next) => {
  try {
    console.log('ddd');
    request("http://127.0.0.1:5000/ingest", function (error, response, body) {
      console.error("error:", error); // Print the error
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the data received
      res.status(200).json({ code: 200, data: body }); //Display the response on the website
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error });
  }
};

// app.post('/ingest', function(req, res) {
//   request('http://127.0.0.1:5000/ingest', function (error, response, body) {
//       console.error('error:', error); // Print the error
//       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//       console.log('body:', body); // Print the data received
//       res.send(body); //Display the response on the website
//     });
// });

// app.get('/ask', function(req, res) {
//   console.log(req.query.question)
//   request(`http://127.0.0.1:5000/ask?question=${req.query.question}`, function (error, response, body) {
//       console.error('error:', error); // Print the error
//       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//       console.log('body:', body); // Print the data received
//       res.send(body); //Display the response on the website
//     });
// });

module.exports = [ask, ingest];
