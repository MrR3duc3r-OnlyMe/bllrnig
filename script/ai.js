const axios = require('axios');
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

const POGIAKO = (type,prompt,q) => {
    return `https://nethwieai.neth.workers.dev/ai?authkey=w123dev&model=${type}&system=${prompt}&user=${q}`
};
module.exports.run = async function ({ api, event, args, botname, admin, prefix, outro }) {
    const uid = event.senderID;
    const info = await api.getUserInfo(event.senderID);
    const name = info[event.senderID].name;
    const info1 = await api.getUserInfo(admin[0]);
    const name1 = info1[admin[0]].name;
    
    const typer = args[0];
    const questio = args.slice(1, args.length).join(" ");
    const question = encodeURIComponent(questio); 
   
    const types = [
        "gpt4", "llama3", "gpt4o", "blackbox", "gemma"];
    const typesSorted = `\n` + types.sort().join("\n");
    if (!typer||!question)
      return api.sendMessage(`❌🤖 Please provide a question first.\n\nUsage: ${prefix}ai <type> <message>\n\nAvailable AI Types: ${typesSorted}`, event.threadID, event.messageID);

    try {
       api.setMessageReaction("⏳", event.messageID, () => {}, true);
          const info1 = await new Promise(resolve => {
            api.sendMessage(`💬 ${name.split(" ")[0]}: ${questio}\n\n••• AI is typing...\n🤖We will notify you by Reacting your Message\n🤖This Message Will be Edited if Done.`, event.threadID, (err, info1) => {
        resolve(info1);
       }, event.messageID);
      });
        const type = typer.toLowerCase();
        async function Ais(){
        const kenlie = `\n\nIs this answer helpful to you? Kindly click the link below\nhttps:\/\/click2donate.kenliejugarap.com\n(Clicking the link and clicking any ads or button and wait for 30 seconds (3 times) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future)`;
            if (type == types[0]){
                const response = await axios.get(main.apiniJoshua + "/gpt4?prompt=" + question + "&uid=" + uid);
             return response.data.gpt4 + "\n💬 · This message is CONVERSATIONAL.";
          } else if (type == types[1]){
                const response = await axios.get(POGIAKO("@cf/meta/llama-3-8b-instruct", "", question));
                if (response.data.status){
                return response.data.msg;
                }
            } else if (type == types[2]){
                const response = await axios.get("https://api.kenliejugarap.com/freegpt4o8k/?question=" + question);
                if (response.data.status){
                    return response.data.response.replace(kenlie, '');
            }
            } else if (type == types[3]){
                const response = await axios.get("https://api.kenliejugarap.com/blackbox/?text=" + question);
                if (response.data.status){
                    return response.data.response.replace(kenlie, '');
                }
            } else if (type == types[4]){
                const response = await axios.get(POGIAKO("@cf/google/gemma-7b-it-lora", "", question));
                if (response.data.status){
                return response.data.msg;
                }
            }  else if (type == types[5]){
                const response = await axios.get(POGIAKO("@cf/qwen/qwen1.5-14b-chat-awq", "", question));
                if (response.data.status){
                return response.data.msg;
                }
            } else {
                api.setMessageReaction("❌", event.messageID, () => {}, true);
            api.sendMessage(`❌ ${type} does not exist!!\n\nThese are the available API types: ${typesSorted}`, event.threadID, event.messageID);
           return;
          }
        }
        
        api.editMessage(`--------------------------\n『 ${type} 』AI ✨🤖\n${await Ais()}\n--------------------------`, info1.messageID, () => {
            api.setMessageReaction("✅", event.messageID, () => {}, true);
        });
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
