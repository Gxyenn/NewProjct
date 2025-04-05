const express = require("express");
const app = express();
const port = 3000;

// Melayani file statis dari folder saat ini (.)
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
