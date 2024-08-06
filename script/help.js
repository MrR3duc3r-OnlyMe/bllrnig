const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['cmd'],
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
    const gagokaba = (name) => {
      return [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(name))?.[1]
    };
    const helpm = async(input, paged) => {
            const page = parseInt(input);
            const pager = 15;
            const pages = Math.ceil(commands.length / pager); // Adjust the number 15 to change commands per page
            let start = (page - 1) * pages;
            let end = start + pages;
            //let helpMessage = `♡  ∩_∩\n（„• ֊ •„)♡\n╭─∪∪─────────────⟡\nCommands:\n`;
            let helpMessage = `━━ ${Utils.formatFont("Commands")} ━━\n`;
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
                hasPrefix = true
              } = tanginamo;
            return `「${hasPrefix ? prefix : ""}${/*Utils.formatFont(*/aliases.join("/")/*)*/} 」${description ? ` — ${description}` : ""}`;
            }
            for (let i = start; i < Math.min(end, commands.length); i++) {
            helpMessage += `> ${i + 1}. ${wiegine(commands[i])}\n`;
            }
            if (paged){
            helpMessage += `\n\n━━ ${Utils.formatFont("Events")} ━━\n`;
            eventCommands.forEach((eventCommand, index) => {
            helpMessage += `> ${index + 1}. ${wiegine(eventCommand)}\n`;
            });
            }
            helpMessage += `\nPage ${paged ? `1 of ${pages}` : `${page} of ${pages}`}${"\nTotal of:\n" + `${commands.length} Commands\n${eventCommands.length} Handle Events`}${paged ? `\n\n🤖 To view the next page, type '${prefix}help page number'. To view information about a specific command, type '${prefix}help command name'.` : ``}\n⚠️ Contact The Developer: Kenneth Aceberos, Or use ${prefix}feedback cmd, if the bot turned off or have Issues.`;
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
