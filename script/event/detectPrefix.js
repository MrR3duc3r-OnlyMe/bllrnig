const config = {
  name: "detectPrefix",
  version: "1.0",
  role: 2,
  credits: "Kenneth Aceberos",
  description: "To know what is the bot's prefix."
}
module.exports = {
  config,
  async handleEvent({
  api,
  event,
  botname,
  admin,
  outro,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;
  if (!event.body)return;
  const message = "✅This bot is connected to Project Botify." + prefix ? '\n\n❓Prefix is: ' + prefix :  "";
  const pogi = (neth) => body?.toLowerCase().startsWith(neth);
  if (pogi('pre') || pogi('prefix')) {
    api.sendMessage(message, threadID, messageID);
    return;
  } 
  if (pogi("bot") || pogi("botify") || pogi(botname.toLowerCase())){
    const admean = await api.getUserInfo(admin[0]);
    const tangina1 = await api.sendMessage(`🤖 Hello, someone called me.\nMy name is ${botname} and I'm an automated Facebook Messenger chatbot that is created by ${admean[admin[0]].name}. He/she is the one who created me and used Project Botify as an autobot system.`, event.threadID, event.messageID);
      setTimeout(() => {
    api.editMessage(`🤖 If You don't know how to use it, To get started, just type ${prefix}help to see available commands. It's that Simple and easy to use🥰`, tangina1.messageID, () => {
      setTimeout(() => {
        api.editMessage(`Type ${prefix}feedback if you have problems or review my chatbot!\nand if u type ${prefix}dev, then you will know my main master and developer of this autobot system. Type ${prefix}dev add if you want to add him(the developer) on your group chat!\n\n\n` + outro, tangina1.messageID, () => {
        });
        return;
      }, 8*1000);
    });
      }, 8*1000);
    
  }
}
}