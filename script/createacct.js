const axios = require('axios');

module.exports.config = {
  name: "createacct",
  role: 0,
  credits: "Neth",
  description: "Create Fb Acct | Useful for Spamshare/React/Follow",
  hasPrefix: true,
  cooldown: 10*60*1000,
  usages: "{p}createacct",
  aliases: ["fbaccount","fbacc", "facebookaccount", "facebookacc"]
};

module.exports.run = async function({ api, event, args, prefix }) {
 
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  api.sendMessage(`Creating & Generating Facebook Acc...\n⏳ Please wait...`, event.threadID, event.messageID);

    axios.get(`http://naurwiegine.pythonanywhere.com/fbacc`)
    .then(dat => { 
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    const {birthday,email,first_name,last_name,password,status,token} = dat.data;
      api.sendMessage(`✨ Facebook Account ✨\n\n✅ Created Info: ${status}\n\nBirthday: ${birthday}\nEmail: ${email}\nName: ${first_name} ${last_name}\nPassword: ${password}\nAccess Token: ${token}\n\n🤖 PROJECT BOTIFY 🤖`, event.threadID, event.messageID);
     // res.json(dat.data);
    })
    .catch(e => {
      console.error(e);
      api.setMessageReaction("🤷", event.messageID, () => {}, true);
      api.sendMessage("An error occurred. Maybe The Server limited so maybe you'll try again later.", event.threadID, () => {}, event.messageID);
    });
};


