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

function formatFont(text) { 
  const fontMapping = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
    n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
    N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };
  return text.split("").map(char => fontMapping[char] || char).join("");
}
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
    const gagokaba = (name) => {
      return [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(name))?.[1]
    };
    const helpm = async(input, paged) => {
      const page = parseInt(input);
            const pages = 10;
            let start = (page - 1) * pages;
            let end = start + pages;
            let helpMessage = `♡  ∩_∩\n（„• ֊ •„)♡\n╭─∪∪─────────────⟡\nCommands:\n`;
            const wiegine = (strings) => {
            const tanginamo = gagokaba(strings);
            if (!tanginamo)
            return;
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
              } = tanginamo;
            return `「${hasPrefix ? prefix : ""}${formatFont(name ? name : aliases.join("/"))} 」${description ? ` — ${description}` : ""}`;
            }
                  for (let i = start; i < Math.min(end, commands.length); i++) {
                    
                    helpMessage += `\t 𖦹 ${i + 1}. ${wiegine(commands[i])}\n`;
                  }
                  helpMessage += '\nHandle Events:\n'; eventCommands.forEach((eventCommand, index) => {
            helpMessage += `\t 𖦹 ${index + 1}. ${wiegine(eventCommand)}\n`;
            });
           helpMessage += `\nPage ${paged ? "1" : page}${"\nTotal of:\n" + `${commands.length} Commands\n${eventCommands.length} Handle Events`}${paged ? `\n\n🤖 To view the next page, type '${prefix}help page number'. To view information about a specific command, type '${prefix}help command name'.` : ``}\n⚠️ Contact The Developer: Kenneth Aceberos, Or use ${prefix}feedback cmd, if the bot turned off or have Issues.`;
      return helpMessage;
    }

    
    if (!input) {
      api.sendMessage(await helpm("1", true), event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      
      api.sendMessage(await helpm(input, false), event.threadID, event.messageID);
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
