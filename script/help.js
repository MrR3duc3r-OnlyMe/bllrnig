const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['hello bot'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  outro,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 50;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `♡  ∩_∩
（„• ֊ •„)♡
╭─∪∪─────────────⟡\n🤖 COMMANDS LIST 🤖\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t 𖦹 ${i + 1}. 「 ${prefix}${commands[i]} 」\n`;
      }
      helpMessage += '\n🤖 EVENT LIST 🤖\n\n';
     eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t 𖦹 ${index + 1}. 「 ${prefix}${eventCommand} 」\n`;
      });
      helpMessage += `\nPage ${page}/${Math.ceil(commands.length / pages)}\n\n🤖 To view the next page, type '${prefix}help page number'. To view information about a specific command, type '${prefix}help command name'.\n\n⚠️ Contact The Developer: Kenneth Aceberos, Or use ${prefix}feedback cmd
If the bot turned off or have Issues.`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 50;
      let helpMessage = `♡  ∩_∩
      （„• ֊ •„)♡
      ╭─∪∪─────────────⟡\n🤖 COMMANDS LIST 🤖\n\n`;
            for (let i = start; i < Math.min(end, commands.length); i++) {
              helpMessage += `\t 𖦹 ${i + 1}. 「 ${prefix}${commands[i]} 」\n`;
            }
            helpMessage += '\n🤖 EVENT LIST 🤖\n\n'; eventCommands.forEach((eventCommand, index) => {
      helpMessage += `\t 𖦹 ${index + 1}. 「 ${prefix}${eventCommand} 」\n`;
      });
     helpMessage += `\nPage ${page}/${Math.ceil(commands.length / pages)}\n\n⚠️ Contact The Developer: Kenneth Aceberos, Or use ${prefix}feedback cmd
If the bot turned off or have Issues.`;
      
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? 'Permission: User' : (role === 1 ? 'Permission: Admin' : (role === 2 ? 'Permission: Thread Admin' : (role === 3 ? 'Permission: Super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `Usage: ${usage}\n` : '';
        const versionMessage = version ? `Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `Cooldown: ${cooldown} second(s)\n` : '';
        const message = `Command Info:\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('❓❌ Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.handleEvent = async function({
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
  const message = prefix ? '👋 This Bot is connected to PROJECT BOTIFY.\nMy Prefix is: ' + prefix : '👋 This Bot is connected to PROJECT BOTIFY.\nI Do not have a prefix.';
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
