const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.post('/generate', async (req, res) => {
  try {
    const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor proxy rodando na porta 3000');
});
