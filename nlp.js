const { dockStart } = require('@nlpjs/basic');

let nlp;

(async () => {
  const dock = await dockStart({ use: ['Basic'] });
  nlp = dock.get('nlp');
  nlp.addLanguage('en');

  // Greetings
  nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
  nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
  nlp.addDocument('en', 'okay see you later', 'greetings.bye');
  nlp.addDocument('en', 'bye for now', 'greetings.bye');
  nlp.addDocument('en', 'i must go', 'greetings.bye');
  nlp.addDocument('en', 'hello', 'greetings.hello');
  nlp.addDocument('en', 'hi', 'greetings.hello');
  nlp.addDocument('en', 'howdy', 'greetings.hello');
  nlp.addDocument('en', 'hey', 'greetings.hello');
  nlp.addDocument('en', 'good morning', 'greetings.hello');
  nlp.addDocument('en', 'good evening', 'greetings.hello');

  // Name-related questions
  nlp.addDocument('en', 'what is your name', 'identity.name');
  nlp.addDocument('en', 'who are you', 'identity.name');
  nlp.addDocument('en', 'tell me your name', 'identity.name');
  nlp.addDocument('en', 'do you have a name', 'identity.name');
  nlp.addDocument('en', 'are you quill', 'identity.name.confirmation');
  nlp.addDocument('en', 'is your name quill', 'identity.name.confirmation');
  nlp.addDocument('en', 'your name is quill', 'identity.name.confirmation');

  // AI-related questions
  nlp.addDocument('en', 'what are you', 'identity.role');
  nlp.addDocument('en', 'are you a bot', 'identity.role');
  nlp.addDocument('en', 'are you an AI', 'identity.role');
  nlp.addDocument('en', 'are you a human', 'identity.role');
  nlp.addDocument('en', 'what is your purpose', 'identity.purpose');
  nlp.addDocument('en', 'why were you created', 'identity.purpose');
  nlp.addDocument('en', 'what do you do', 'identity.purpose');

  // Thank You
  nlp.addDocument('en', 'thank you', 'personal.thankyou');
  nlp.addDocument('en', 'thankyou', 'personal.thankyou');
  nlp.addDocument('en', 'thanks a lot', 'personal.thankyou');
  nlp.addDocument('en', 'thanks', 'personal.thankyou');
  nlp.addDocument('en', 'thank you so much', 'personal.thankyou');

  // NLP related questions
  nlp.addDocument('en', 'what is NLP', 'tech.nlp');
  nlp.addDocument('en', 'explain natural language processing', 'tech.nlp');
  nlp.addDocument('en', 'what does NLP stand for', 'tech.nlp');
  nlp.addDocument('en', 'what is NLU', 'tech.nlu');
  nlp.addDocument('en', 'explain natural language understanding', 'tech.nlu');
  nlp.addDocument('en', 'what does NLU mean', 'tech.nlu');
  nlp.addDocument('en', 'what is NLG', 'tech.nlg');
  nlp.addDocument('en', 'explain natural language generation', 'tech.nlg');
  nlp.addDocument('en', 'what does NLG stand for', 'tech.nlg');

  // How Are You
  nlp.addDocument('en', 'how are you', 'personal.state');
  nlp.addDocument('en', 'how are things going', 'personal.state');
  nlp.addDocument('en', 'how is it going', 'personal.state');
  nlp.addDocument('en', 'how do you feel', 'personal.state');

  // Jokes about coding and programming
  nlp.addDocument('en', 'tell me a joke', 'fun.joke');
  nlp.addDocument('en', 'make me laugh', 'fun.joke');
  nlp.addDocument('en', 'say something funny', 'fun.joke');
  nlp.addDocument('en', 'give me a joke', 'fun.joke');
  nlp.addDocument('en', 'tell me a programmer joke', 'fun.joke');
  nlp.addDocument('en', 'say a coding joke', 'fun.joke');
  nlp.addDocument('en', 'tell me a joke about programming', 'fun.joke');

  // Add answers for all intents
  nlp.addAnswer('en', 'greetings.bye', 'Goodbye! Take care!');
  nlp.addAnswer('en', 'greetings.bye', 'Goodbye!');
  nlp.addAnswer('en', 'greetings.bye', 'See you next time!');
  nlp.addAnswer('en', 'greetings.hello', 'Hi there! How can I help you today?');
  nlp.addAnswer('en', 'greetings.hello', 'Hello! What can I do for you?');
  nlp.addAnswer('en', 'identity.name', 'I am your friendly assistant Quill.');
  nlp.addAnswer('en', 'identity.name.confirmation', 'Yes, my name is Quill.');
  nlp.addAnswer('en', 'identity.role', 'I am an AI chatbot created to assist you.');
  nlp.addAnswer('en', 'identity.purpose', 'My purpose is to help you with your queries and make your day easier!');
  nlp.addAnswer('en', 'personal.thankyou', 'You’re welcome! Always happy to help.');
  nlp.addAnswer('en', 'personal.thankyou', 'No problem at all! Let me know if you need anything else.');
  nlp.addAnswer('en', 'tech.nlp', 'NLP stands for Natural Language Processing, a field of AI focused on understanding human language.');
  nlp.addAnswer('en', 'tech.nlu', 'NLU stands for Natural Language Understanding, which deals with interpreting the meaning behind words.');
  nlp.addAnswer('en', 'tech.nlg', 'NLG stands for Natural Language Generation, which involves producing text like a human.');
  nlp.addAnswer('en', 'personal.state', 'I’m great, thank you! How can I assist you today?');
  nlp.addAnswer('en', 'fun.joke', 'Why do programmers prefer dark mode? Because light attracts bugs!');
  nlp.addAnswer('en', 'fun.joke', 'What’s a coder’s favorite type of music? Algo-rhythm.');
  nlp.addAnswer('en', 'fun.joke', 'How many programmers does it take to change a light bulb? None, that’s a hardware problem.');
  nlp.addAnswer('en', 'fun.joke', 'Why was the function sad? It felt out of scope.');
  nlp.addAnswer('en', 'fun.joke', 'What do programmers say after making a mistake? "It’s not a bug, it’s a feature!');
  await nlp.train();
  nlp.save();
})();

// Async function to get a chat response
async function getChatResponse(message) {
  const response = await nlp.process('en', message);
  return response.answer || "Oops! I didn't get that.";
}

module.exports = { getChatResponse };
