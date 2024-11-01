const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

const botToken = "7949642989:AAE90KdTSPKYI72OvIdKsijZOpObIjkemFQ";
const openaiToken = "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";

const config = new Configuration({
  apiKey: openaiToken,
});

const openai = new OpenAIApi(config);

const bot = new Telegram(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome To AI ChatBot");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  const reply = await openai.createCompletion({
    max_tokens: 100,
    model: "ada",
    prompt: msg.text,
    temperature: 0.5,
  });

  bot.sendMessage(chatId, reply.data.choices[0].text);
});
