const express = require("express");
const serverRoutes = require("./routes/routes.js");

const app = express();
const bodyParser = require("body-parser");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json());

app.use(serverRoutes);

app.get("/", (req, res) => {});

const PORT = process.env.PORT || 9991;

app.listen(PORT, () => {
  console.log(`Server start on port: ${PORT}...`);
});
