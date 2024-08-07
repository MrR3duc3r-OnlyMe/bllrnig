const axios = require('axios');
const name = "blackbox";

const config = {
  name,
  version: "1.0",
  credits: "Kenneth Aceberos",
  role: 0,
  description: `Ask anything by blackbox.ai. Good for educational purposes.`,
  conversational: false
};
module.exports = {
    config,
    async run ({ api, event, args, Utils }) {
    const msg = args.join(' ').trim();
    const send = async(send_) => await api.sendMessage(send_, event.threadID, event.messageID);
    if (!msg) return send(`❓Please enter your question!`)
    const send__ = await send(name.toUpperCase() + " is asking for your question...\n💬: " + msg);
    await axios.get(Utils.api_kenlie + "/blackbox", {
     params: {
      text: encodeURIComponent(msg)
    }}).then(async (response) => {
      if (!response) return send("An error occurred.");
       await api.editMessage(`💬 ${name.toUpperCase()} ${config.conversational ? "(CONVERSATIONAL)" : ""}
━━━━━━━━━
${response.data.response.replace(`\n\nIs this answer helpful to you? Kindly click the link below\nhttps:\/\/click2donate.kenliejugarap.com\n(Clicking the link and clicking any ads or button and wait for 30 seconds (3 times) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future)`, "").trim()}
━━━━━━━━━`, send__.messageID);
    }).catch(error => {
      return send("Something went wrong.")
    })
    }
};