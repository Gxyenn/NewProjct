const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('.')); // layani index.html
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Route untuk chat
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(`https://api.siputzx.my.id/api/ai/gemini-pro?content=ai gunakan bahasa Indonesia=${encodeURIComponent(userMessage)}`);
    const data = await response.json();
    res.json({ result: data.result });
  } catch (error) {
    res.status(500).json({ error: "Gagal memproses pesan." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
