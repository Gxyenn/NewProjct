const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html

app.post('/execute', (req, res) => {
  const { cmd } = req.body;
  exec(cmd, { cwd: __dirname }, (err, stdout, stderr) => {
    if (err) return res.send(stderr);
    res.send(stdout);
  });
});

// Anti sleep ping
setInterval(() => {
  console.log("Keepalive ping");
}, 1000 * 60 * 5);

app.listen(3000, () => console.log("Terminal server ready on port 3000"));
