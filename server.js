const express = require('express');
const app = express();
const { exec } = require('child_process');
const path = require('path');

app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/execute', (req, res) => {
  const command = req.body.command;
  exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) return res.send(error.message);
    if (stderr) return res.send(stderr);
    res.send(stdout);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Terminal running on port ${port}`);
});
