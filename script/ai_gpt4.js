const axios = require('axios');
const name = "ai";

const ais = [];
const fs = require("fs");
fs.readdirSync(__dirname).forEach(name => {
  if (!name.startsWith("ai_")) return;
  ais.push((name.replace("ai_", "").replace(".js", "")).toLowerCase());
})
const config = {
  name,
  aliases: ["gpt4"],
  version: "1.0",
  credits: "Kenneth Aceberos",
  role: 0,
  description: `Ask anything by GPT-4. Good for educational purposes.
More AI cmds: ${ais.join(", ")}.`,
  conversational: true
};
module.exports = {
    config,
    async run ({ api, event, args, Utils }) {
    const msg = args.join(' ').trim();
    const send = async(send_) => await api.sendMessage(send_, event.threadID, event.messageID);
    if (!msg) return send(`❓Please enter your question!`)
    const send__ = await send(name.toUpperCase() + " is asking for your question...\n💬: " + msg);
    await axios.get(Utils.api_josh + "/gpt4", {
     params: {
      prompt: msg,
      uid: event.senderID
    }}).then(async (response) => {
      if (!response) return send("An error occurred.");
       await api.editMessage(`💬 ${name.toUpperCase()} ${config.conversational ? "(CONVERSATIONAL)" : ""}
━━━━━━━━━
${response.data.gpt4}
━━━━━━━━━`, send__.messageID);
    }).catch(error => {
      return send("Something went wrong.")
    })
    }
};