const axios = require('axios');
const name = "phi";

const config = {
  name,
  aliases: [],
  version: "1.0",
  credits: "Kenneth Aceberos",
  role: 0,
  description: `Ask anything by AI. Good for educational purposes.`,
  conversational: false
};
module.exports = {
    config,
    async run ({ api, event, args, Utils }) {
    const msg = args.join(' ').trim();
    const send = async(send_) => await api.sendMessage(send_, event.threadID, event.messageID);
    if (!msg) return send(`❓Please enter your question!`)
    const send__ = await send(name.toUpperCase() + " is asking for your question...\n💬: " + msg);
    const a = Utils.api_cfneth("@cf/microsoft/phi-2", "", msg)
    await axios.post(a[0], a[1], a[2]).then(async (response) => {
      if (!response) return send("An error occurred.");
       await api.editMessage(`💬 ${name.toUpperCase()} ${config.conversational ? "(CONVERSATIONAL)" : ""}
━━━━━━━━━
${response.data.result.response}
━━━━━━━━━`, send__.messageID);
    }).catch(error => {
      return send("Something went wrong.")
    })
    }
};