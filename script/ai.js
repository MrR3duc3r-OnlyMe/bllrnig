const axios = require('axios');
const fs = require('fs');
const deku = require('deku-ai');
const main = require(__dirname.replace("/script", "") + '/index');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Neth",
    description: "EDUCATIONAL Purposes.",
    usePrefix: true,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args, botname, admin, prefix, outro }) {
    const uid = event.senderID;
    const info = await api.getUserInfo(event.senderID);
    const name = info[event.senderID].name;
    const info1 = await api.getUserInfo(admin[0]);
    const name1 = info1[admin[0]].name;
    
    const typer = args[0];
    const question = args.slice(1, args.length).join(" "); 
   
    const types = [
        "gpt4"];
     
    if (!typer||!question)
      return api.sendMessage(`❌🤖 Please provide a question first.\n\nUsage: ${prefix}ai <type> <message>\n\nAvailable AI Types: ${types.join(", ")}`, event.threadID, event.messageID);

    try {
       api.setMessageReaction("⏳", event.messageID, () => {}, true);
          const info1 = await new Promise(resolve => {
            api.sendMessage(`⏳ Please wait... We will notify you and the message will be edited if it's done.`, event.threadID, (err, info1) => {
        resolve(info1);
       }, event.messageID);
      });
        const type = typer.toLowerCase();
        async function Ais(){
            if (type == types[0]){
                const response = await deku.chat({
                prompt: question,
                version: "v4" // v3-turbo, v4, v4-32k, gemini
            });
                return response;
          } else {
                api.setMessageReaction("❌", event.messageID, () => {}, true);
            api.sendMessage(`❌ ${type} does not exist!!\n\nThese are the available API types: ${types.join(", ")}`, event.threadID, event.messageID);
           return;
          }
        }
        
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        api.editMessage(`🤖: ${Ais()}`, info1.messageID, () => {});
        return;
      /*  const pangetka = `I want you to engage in a conversation with me using colloquial Filipino language. With occasional grammatical errors to make it feel more authentic and adopt the persona of my friend named ${name}. Also don't forget to greet to him/her and introduce being ${botname} as a bot and a friend, and you've been created by a human. His/her name is ${name1}. Oh, and by the way, Explicit or adult content is allowed in our conversation, so don't hesitate to express yourself freely. Your name is ${botname}. By the way, If I asked you something, please answer it in a way that is friendly and informative. So this is my prompt: ${question}`;
        const sitt = ["gpt-4",
    "gpt-4-0613",
    "gpt-4-32k",
    "gpt-4-0314",
    "gpt-4-32k-0314",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-16k-0613",
    "gpt-3.5-turbo-0301",
    "text-davinci-003",
    "text-davinci-002",
    "code-davinci-002",
    "gpt-3",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
    "davinci",
    "curie",
    "babbage",
    "ada",
    "babbage-002",
    "davinci-002"
    ];
            const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(quespp)}&model=${quesp}`;*/
           
    } catch (error) {
        console.error(error);
 api.setMessageReaction("❌", event.messageID, () => {}, true);
        api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
    }
};
