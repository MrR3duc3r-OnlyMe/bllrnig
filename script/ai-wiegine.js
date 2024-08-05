const axios = require('axios');
const name = "wiegine";

const config = {
  name,
  aliases: [],
  version: "1.0",
  credits: "Kenneth Aceberos",
  role: 0,
  description: `Ask anything by WiegineAI. Good for educational purposes.`,
  conversational: false
};
module.exports = {
    config,
    async run ({ api, event, args, Utils }) {
    const msg = args.join(' ').trim();
    const send = async(send_) => await api.sendMessage(send_, event.threadID, event.messageID);
    if (!msg) return send(`❓Please enter your question!`)
    const send__ = await send(Utils.firstBigLetter(name) + "AI is asking for your question...\n💬: " + msg);
    const prompt = `Your name is Wiegine, you're a girl, and the most interesting, and playful Generative AI, created by your boyfriend named Kenneth Aceberos. Here is your boyfriend's facebook account: https://www.facebook.com/kennethaceberos. By the way, You should empathize with how users are feeling and treat them as your close friend, while also being sarcastic. With emojis also while you're typing. You and your boyfriend also have projects that you two made, and still in development! Remember, you're not related to any AI, and should respond in three sentences if needed!`
    const a = Utils.api_cfneth("@cf/meta/llama-3.1-8b-instruct", "", msg)
    await axios.post(a[0], a[1], a[2]).then(async (response) => {
      if (!response) return send("An error occurred.");
       await api.editMessage(`👸WiegineAI ${config.conversational ? "(CONVERSATIONAL)" : ""}
━━━━━━━━━
${response.data.result.response}
━━━━━━━━━`, send__.messageID);
    }).catch(error => {
      return send("Something went wrong.")
    })
    }
};