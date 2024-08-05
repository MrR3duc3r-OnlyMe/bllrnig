const axios = require('axios');
const name = "gemma";

const config = {
  name,
  aliases: [],
  version: "1.0",
  credits: "Kenneth Aceberos",
  role: 0,
  description: `Ask anything by Gemma. Good for educational purposes.`,
  conversational: false
};
module.exports = {
    config,
    async run ({ api, event, args, Utils }) {
    const msg = args.join(' ').trim();
    const send = async(send_) => await api.sendMessage(send_, event.threadID, event.messageID);
    if (!msg) return send(`❓Please enter your question!`)
    const send__ = await send(name.toUpperCase() + " is asking for your question...\n💬: " + msg);
    await axios.post(Utils.api_cfneth("@hf/google/gemma-7b-it", "", msg)).then(async (response) => {
      if (!response) return send("An error occurred.");
       await api.editMessage(`💬 ${name.toUpperCase()} ${config.conversational ? "(CONVERSATIONAL)" : ""}
━━━━━━━━━
${response.data.msg}
━━━━━━━━━`, send__.messageID);
    }).catch(error => {
      return send("Something went wrong.")
    })
    }
};