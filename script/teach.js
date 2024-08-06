const axios = require("axios");

module.exports.config = {
    name: "teach",
    version: "1",
    role: 0,
    credits: "Grey | api by jerome",
    hasPrefix: true,
    description: "Teach Simsimi",
    usage: "Teach",
    cooldown: 0
};

module.exports.run = async ({ api, event, args, Utils, prefix }) => {
    try {
        const text = args.join(" ");
        const text1 = text.substr(0, text.indexOf(' - '));
        const text2 = text.split(" - ").pop();
        if (!text1 || !text2) {
            return api.sendMessage(`Usage: ${prefix}teach hi - hello`, event.threadID, event.messageID);
        }
        const response = await axios.get(`${Utils.api_mark69}/teach`, {
          params: {
            q: encodeURIComponent(text1),
            r: encodeURIComponent(text2)
          }
        });
        api.sendMessage(response.data.message, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Please provide both a question and an answer\nExample: Teach hi - hello", event.threadID, event.messageID);
    }
}