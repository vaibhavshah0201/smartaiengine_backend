const express = require("express");
const cors = require("cors");
const db = require("./config/db.js");
const userRoutes = require("./routes/routes.js");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("", userRoutes);

try {
  db.authenticate();
  console.log("Connected successfully");
} catch (error) {
  console.log(`Error while connection : ${error}`);
}

// app.get('/', (req, res) => {
//     res.send('HOLA MUNDO')
// })

app.listen(8000, () => {
  console.log("Server UP running in http://localhost:8000/");
});
