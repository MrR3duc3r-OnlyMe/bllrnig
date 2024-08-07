const axios = require('axios');
const fb = require("fbkey");

module.exports.config = {
  name: "gettoken",
  role: 0,
  credits: "Neth",
  description: "Get token by email/number/uid and password",
  hasPrefix: true,
  usages: "{p}gettoken [user] [pass]",
  aliases: ["token","fbtoken"]
};

module.exports.run = async function({ api, event, args, prefix }) {
  const user = args[0];
  const pass = args[1];

  if (!user || !pass){
    return api.sendMessage(`Invalid. Enter email/number/uid and password. Example: ${prefix}gettoken [Email/Number/UID] [Password]`, event.threadID, event.messageID);
  }

  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  api.sendMessage(`ℹ️ Token generating...\n\nUser: ${user}\nPassword: ${pass}\n\n⏳ Please wait...`, event.threadID, event.messageID);
  try {
  const g = await fb.getKey(user, pass);
    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.sendMessage(`✨ Access Token | FB\n\nEAAAAU: ${g.EAAAAU}\nEAAD6V7: ${g.EAAD6V7}\nEAAAAAY: ${g.EAAAAAY}\n\nUID: ${g.uid}`, event.threadID, event.messageID);
  } catch (e){
    console.error(e);
    api.setMessageReaction("🤷", event.messageID, () => {}, true);
    api.sendMessage("An error occurred while getting token. Maybe Wrong Username/Password. Pls try again later", event.threadID, () => {}, event.messageID);
  }

  
    /*axios.get(`https://naurwiegine.pythonanywhere.com/token?user=${user}&pass=${pass}`)
    .then(dat => { 
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage("✅ Generated! here is your token 👇", event.threadID, () => {
        api.sendMessage(dat.data.token, event.threadID, () => {
          });
                                                             }, event.messageID);
     // res.json(dat.data);
    })
    .catch(e => {
    });*/
};


