const axios = require('axios');
module.exports.config = {
  name: 'chords',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  description: "Get a song chords",
  usage: "chords [song]",
  credits: 'Neth',
  // Cmd created, API by Joshua Pogi
  // MAMALASIN KA KUNG TANGGALIN MO ANG CREDITS
  cooldown: 2,
};
module.exports.run = async function({
  api,
  event,
  args,
  Utils
}) {
    try {
            const song = encodeURIComponent(args.join(" "));
            if (!song) {
            return api.sendMessage("🎵 Please enter a song.", event.threadID, event.messageID);
            }
            api.sendMessage("🎵 Please wait...", event.threadID, event.messageID);
            const apiUrl = `${Utils.api_josh}/search/chords?q=`;
            const response = await axios.get(apiUrl + song);
            const responseData = response.data.chord;
            return api.sendMessage({
             body: `🎵: ${responseData.title}, by: ${responseData.artist}\nKey: ${responseData.key}\n\n${responseData.chords}`
            }, event.threadID, event.messageID);
              } catch (error) {
            console.error(error);
            return api.sendMessage(error.message, event.threadID, event.messageID);
        }
};
