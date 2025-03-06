require('dotenv').config();
const express = require('express');
const cors = require('cors');
const intentsRouter = require('./routes/intents');
const productsRouter = require('./routes/products');
const { handleUserInput, trainModel } = require('./services/chatbot');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/intents', intentsRouter);
app.use('/products', productsRouter);

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  const botResponse = await handleUserInput(userMessage);
  res.json({ reply: botResponse });
});

app.post('/api/train', async (req, res) => {
  try {
    const trainingResult = await trainModel();
    console.log(trainingResult);
    res.status(200).json({ message: trainingResult });
  } catch (error) {
    console.error("Error during training:", error);
    res.status(500).json({ error: "Failed to train model" });
  }
});


//api for handling orders
app.post('/api/place-order', async (req, res) => {
  res.json({ reply: "Order Placed Successfully" });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));