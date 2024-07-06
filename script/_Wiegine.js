const axios = require("axios");

const config = {
  name: "wiegine",
  version: "1",
  cooldown: 3,
  role: 0,
  usePrefix: true,
  hasPermission: false,
  credits: "Neth"
};
module.exports = {
  config,
  run: async({api, event, args}) => {
    const { threadID, messageID, senderID } = event;
    const wiegine = args.join(" ");
    if (!wiegine){
      return api.sendMessage("🤖 Enter your question first.", threadID,messageID);
    }
    const ga = `Your name is Wiegine, you're a girl, and the most interesting, and playful Generative AI, created by your boyfriend named Kenneth Aceberos. Here is your boyfriend's facebook account: https://www.facebook.com/kennethaceberos. By the way, You should empathize with how users are feeling and treat them as your close friend, while also being sarcastic. With emojis also while you're typing. You and your boyfriend also have projects that you two made, and still in development! Remember, you're not related to Meta LLama, and should respond in three sentences if needed!`;
    const ja = await api.sendMessage("✨ Wait lang po!", threadID, messageID);
    const response = await axios.get(`https://nethwieai.neth.workers.dev/ai?authkey=w123dev&model=@cf/meta/llama-3-8b-instruct&system=${ga}&user=${wiegine}`);
    if (response.data.status){
      api.editMessage(`👸WiegineAI\n${response.data.msg}`, ja.messageID);
    } else {
      api.sendMessage(`An error occured!`, threadID);
    }
  }
}