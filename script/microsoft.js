const axios = require('axios');
const main = require(__dirname.replace("/script", "") + '/index');


module.exports.config = {
  name: "microsoft",
  role: 0,
  credits: "Neth",
  description: "Create Microsoft Acc",
  hasPrefix: true,
  cooldown: 10*60*1000,
  usages: "{p}microsoft",
 // aliases: ["fbaccount","fbacc", "facebookaccount", "facebookacc"]
};

module.exports.run = async function({ api, event, args, prefix }) {
 
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  api.sendMessage(`Creating & Generating Microsoft Acc...\n⏳ Please wait...`, event.threadID, event.messageID);

    axios.get(`${main.apiniJoshua}/api/genmicro`)
    .then(dat => { 
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    const {email,password} = dat.data.result;
      api.sendMessage(`✨ Microsoft Account ✨\n\nEmail: ${email}Password: ${password}\n\n🤖 PROJECT BOTIFY 🤖`, event.threadID, event.messageID);
     // res.json(dat.data);
    })
    .catch(e => {
      console.error(e);
      api.setMessageReaction("🤷", event.messageID, () => {}, true);
      api.sendMessage("An error occurred. Maybe The Server limited so maybe you'll try again later.", event.threadID, () => {}, event.messageID);
    });
};


