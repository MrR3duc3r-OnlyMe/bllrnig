const path = require("path");
const fs = require("fs");

let bannedWords = {};
let warnings = {};
let badWordsActive = {};

module.exports.config = {
  name: "bannedwords",
  version: "1.0.0",
  role: 2,
  credits: "Jonell Magallanes | modified by Kenneth Aceberos",
  description: "Manage and enforce banned words",
  hasPrefix: true,
  usages: "add [word] | remove [word] | list | on | off",
  cooldown: 5,
};

module.exports.handleEvent = async ({ api, event, Utils }) => {
  const { threadID, messageID, senderID } = event;
  if (!event.body) return;
  const wordFile = path.join(__dirname, `/cache/Fucked${threadID}.json`);
  const loadWords = () => {
    if (fs.existsSync(wordFile)) {
      const words = fs.readFileSync(wordFile, "utf8");
      bannedWords[threadID] = JSON.parse(words);
    } else {
      bannedWords[threadID] = [];
    }
  };

  loadWords();

  if (!badWordsActive[threadID]) return;

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    api.sendMessage("Bot Need Admin Privilege", threadID, messageID);
    return;
  }

  const messageContent = event.body.toLowerCase();
  const hasBannedWord = bannedWords[threadID].some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));

  if (hasBannedWord) {
    if (!warnings[senderID]) warnings[senderID] = 0;
    warnings[senderID]++;
    if (warnings[senderID] === 2) {
      const iring = "https://i.imgur.com/hNVhorh.mp4";
      const iring1 = `${wordFile.replace(".json", "") + iring.split("/")[2]}`;
      await fs.writeFileSync(iring1, Buffer.from((await axios.get(iring, {responseType:"arraybuffer"})).data, "utf-8"));
      await api.sendMessage({
        body: "🤥 You already have 2 violations due to banned words detection. You are now automatically removed from the group. Byebye!",
        attachment: fs.createReadStream(iring1)
      }, threadID, () => fs.unlinkSync(iring1), messageID);
      api.removeUserFromGroup(senderID, threadID);
      warnings[senderID] = 1;
    } else {
      api.sendMessage(`Last Warning! Your message has been detected Badwords "${messageContent}"!\n One last attempt and you will be kicked out of the group automatically!`, threadID, messageID);
    }
  }
};

module.exports.run = async ({ api, event, args, Utils }) => {
  const { threadID, messageID } = event;
  if (!args[0]) {
    return api.sendMessage("Please specify an action (add, remove, list, on, off) and appropriate data.", threadID, messageID);
  }

  const wordFile = path.join(__dirname, `/cache/Fucked${threadID}.json`);
  if (fs.existsSync(wordFile)) {
    const words = fs.readFileSync(wordFile, "utf8");
    bannedWords[threadID] = JSON.parse(words);
  } else {
    bannedWords[threadID] = [];
  }

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    api.sendMessage("🛡️ | Bot Need Admin Privilege in short you need to add the bot as an admin to your group chat!", threadID, messageID);
    return;
  }

  const action = args[0];
  const word = args.slice(1).join(' ');

  switch (action) {
    case 'add':
      bannedWords[threadID].push(word);
      api.sendMessage(`✅ | Added ${word} to the list of banned words.`, threadID, messageID);
      break;
    case 'remove':
      const index = bannedWords[threadID].indexOf(word);
      if (index !== -1) {
        bannedWords[threadID].splice(index, 1);
        api.sendMessage(`✅ | Removed ${word} from the list of banned words.`, threadID, messageID);
      } else {
        api.sendMessage(`The word ${word} wasn't found on the list of banned words.`, threadID, messageID);
      }
      break;
    case 'list':
      api.sendMessage(`📝 | List of banned words:\n${bannedWords[threadID].join(', ')}`, threadID, messageID);
      break;
    case 'on':
      badWordsActive[threadID] = true;
      api.sendMessage(`Banned words detection has been activated.`, threadID);
      break;
    case 'off':
      badWordsActive[threadID] = false;
      api.sendMessage(`Banned words detection has been deactivated.`, threadID);
      break;
    default:
      api.sendMessage("Invalid action. Please use 'add', 'remove', 'list', 'on' or 'off'.", threadID, messageID);
  }

  fs.writeFileSync(wordFile, JSON.stringify(bannedWords[threadID]), "utf8");
}