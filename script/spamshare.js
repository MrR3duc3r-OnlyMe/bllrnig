const axios = require('axios');

module.exports.config = {
  name: "spamshare",
  role: 0,
  credits: "Neth",
  description: "Spam share your post,Increase Fame!",
  hasPrefix: true,
  usages: "{p}spamshare [cookie or token] [link] [amount] [delay]",
  //cooldown: 0,
  aliases: ["share"]
};

module.exports.run = async function({ api, event, args, prefix}) {
  const query = args.join(' ');
  const split = query.split(' ');
  const cookie = split[0];
  const link = split[1];
  const amount = split[2];
  const delay = split[3];

  if (!cookie || !link || !amount || !delay){
    api.sendMessage(`Invalid. Enter your cookie/token, post link, amount and delay.\n\nExample: ${prefix}spamshare [cookie or token] [postlink] [amount] [delay]\n\nIf You Don't know how to get cookie or token?, Enter command ${prefix}getcookie to get your own cookie or ${prefix}gettoken to get your own token`, event.threadID, event.messageID);
    return;
  }

  if (!cookie.toLowerCase().startsWith("eaa") || !cookie.toLowerCase().includes("datr=")) {
    api.sendMessage(`❌ Enter a valid cookie or token. \n\nIf You Don't know how to get cookie or token?, Enter command ${prefix}getcookie to get your own cookie or ${prefix}gettoken to get your own token`, event.threadID, event.messageID);
    return;
  }
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  api.sendMessage(`SPAMSHARE\n\nPost Link: ${link}\nAmount: ${amount}\n\n⏳ Please wait while we processing your order...`, event.threadID, (err, info1) => {
    share1(info1, true, cookie.toLowerCase().includes("datr=") ? cookie : "", cookie.toLowerCase().startsWith("EAA") ? cookie : "", link, amount, delay);
}, event.messageID);
  
};


