const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
let port = 1122;

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let servingPort = process.env.PORT || port;
console.log("🚀 servingPort", servingPort);
app.listen(servingPort);
