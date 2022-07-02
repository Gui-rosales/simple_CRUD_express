const express = require("express");
const app = express();
const port = 3000;
const book = require("./routes/book");


app.use("/book", book);

app.get("/", (req, res) => {
  res.send("To access the API, type /book");
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
