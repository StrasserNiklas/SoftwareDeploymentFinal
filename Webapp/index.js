const express = require('express');
const app = express();
const port = process.env.PORT||3000;

let appInsights = require("applicationinsights");
appInsights
  .setup("07da5ab1-3d16-46d4-a94b-748bb8ba3d53")
  .start()

app.set("view engine", "jade");

app.get('/', (req, res) => {
  res.render("index");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});