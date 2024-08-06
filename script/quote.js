const axios = require('axios');
module.exports.config = {
  name: "quote",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Get a random inspirational quote.",
  usage: "quote",
  credits: "Developer",
  cooldown: 0
};
module.exports.run = async ({
  api,
  event
}) => {
  const {
    threadID,
    messageID
  } = event;
  try {
    const response = await axios.get('https://zenquotes.io/api/quotes');
    const {
      q,a
    } = response.data[0];
    api.sendMessage(`"${q}" - ${a}`, threadID, messageID);
  } catch (error) {
    api.sendMessage("Sorry, I couldn't fetch a quote at the moment. Please try again later.", threadID, messageID);
  }
};
