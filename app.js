const express = require('express');
const bodyParser = require('body-parser');
const { getChatResponse } = require('./nlp');
const path = require('path');

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// POST route
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    const botResponse = await getChatResponse(userMessage);
    res.json({ reply: botResponse });
});
  
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
