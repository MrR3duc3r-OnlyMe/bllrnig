const axios = require('axios');
const name = "ai2";

const config = {
  name,
  aliases: ["gpt4-1"],
  version: "1.0",
  credits: "Kenneth Aceberos",
  role: 0,
  description: `Ask anything by GPT-4 (Working on Photo) Good for educational purposes.`,
  conversational: true
};
module.exports = {
    config,
    async run ({ api, event, args, Utils }) {
    const msg = args.join(' ').trim();
    const apigpt = "https://gpt-4-cfgh.onrender.com";
    const send = async(send_) => await api.sendMessage(send_, event.threadID, event.messageID);
    if (!msg) return send(`❓Please enter your question!`)
    if (msg.toLowerCase() === "clear")
    return await axios.post(apigpt+'/clear', { id: event.senderID }).then(() => send("💬 Chat history is cleared")).catch(() => send("❌ An error occured!"));
    const send__ = await send(name.toUpperCase() + " is asking for your question...\n💬: " + msg);
    const url = event.type === "message_reply" && event.messageReply.attachments[0]?.type === "photo" ?
      { link: event.messageReply.attachments[0].url } :
      {};
    await axios.post(apigpt+"/chat", {
      prompt: msg,
      customId: event.senderID,
      ...url
    }).then(async (response) => {
      if (!response) return send("An error occurred.");
       await api.editMessage(`💬 ${name.toUpperCase()} ${config.conversational ? "(CONVERSATIONAL)" : ""}
━━━━━━━━━
${response.data.message}
━━━━━━━━━
💡Type ${prefix}ai clear to reset the conversation.`, send__.messageID);
    }).catch(error => {
      return send("Something went wrong.")
    })
    }
};