const axios = require('axios');
module.exports.config = {
  name: "pickupline",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Get a random pick up line",
  credits: "Neth",
  cooldown: 0
};
module.exports.run = async ({
  api,
  event,
  Utils
}) => {
  const {
    threadID,
    messageID
  } = event;
  try {
    const response = await axios.get(`${Utils.api_pc}/pickuplines`);
    const response1 = response.data.pickupline;
    api.sendMessage(`🤭 ${response1}`, threadID, messageID);
  } catch (error) {
    api.sendMessage("Sorry, I couldn't fetch this at the moment. Please try again later.", threadID, messageID);
  }
};
