const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('.'));
app.use(express.json());

app.post('/exec', (req, res) => {
  const cmd = req.body.cmd;
  exec(cmd, { timeout: 10000 }, (err, stdout, stderr) => {
    if (err) return res.send(stderr || err.message);
    res.send(stdout);
  });
});

app.listen(port, () => console.log(`Server ready on http://localhost:${port}`));
