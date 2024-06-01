const axios = require('axios');
const fs = require('fs');
const main = require(__dirname.replace("/script", "") + '/index');

module.exports.config = {
    name: "emojiimg",
    version: "1.0.0",
    hasPermission: 0,
    role: 0,
    credits: "Neth",
    description: "Image Gen",
    usePrefix: true,
    commandCategory: "AI",
    usages: "[prompt]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(' ');

    if (!prompt) {
      return api.sendMessage("🤖 Please provide a prompt first. Usage: emojiimg [prompt]", event.threadID, event.messageID);
    }

    try {
      const userInput = encodeURIComponent(prompt);

      api.setMessageReaction("⏳", event.messageID, () => {}, true);
      api.sendMessage("🤖 Please wait...", event.threadID, event.messageID);

        const apiUrl = `${main.samir}/ejm?prompt=${userInput}`;

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const path = __dirname + '/cache/' + `${timestamp}_Emoji123.png`;

      const api1 = (await axios.get(apiUrl, {
        responseType: "arraybuffer",
      })).data;
      fs.writeFileSync(path, Buffer.from(api1, "utf-8"));
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage({
        body: `🤖 ${prompt}`,
        attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
