const fs = require("fs");
const axios = require("axios");
const path = require("path");

const config = {
  name: "music",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  aliases: ['sing'],
  usage: '{p}music <song>',
  description: 'Search music in youtube',
  credits: 'Kenneth Aceberos'
};
module.exports = {
  config,
  async run({
  api,
  event,
  args,
  prefix
}) {
  const musicName = args.join(' ');
  if (!musicName) {
    api.sendMessage(`To get started, type ${prefix}music and the title of the song you want.`, event.threadID, event.messageID);
    return;
  }
  try {
    const f = await api.sendMessage(`Searching for "${musicName}"...`, event.threadID, event.messageID);
    const searchResults = await axios.get(`https://me0xn4hy3i.execute-api.us-east-1.amazonaws.com/staging/api/resolve/resolveYoutubeSearch?search=${encodeURIComponent(musicName)}`, {
        headers: {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-PH,en-US;q=0.9,en;q=0.8",
          "sec-ch-ua": `"Chromium";v="107", "Not=A?Brand";v="24"`,
          "sec-fetch-site": "cross-site",
          "sec-fetch-mode": "cors",
          "sec-fetch-dest": "empty",
          "sec-ch-ua-platform": `"Android"`,
        }
      });
    api.unsendMessage(f.messageID);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const path = path.join(__dirname, 'cache', `${timestamp}_music.mp3`);
    const path_ = path.join(__dirname, 'cache', `${timestamp}.png`);
    if (!searchResults.data.items.length) {
      return api.sendMessage("Can't find the search.", event.threadID, event.messageID);
    } else {
      const {
        videoId,
        url,
        duration,
        imgSrc,
        title,
        views
      } = searchResults.data.data[0];
      fs.writeFileSync(path_, Buffer.from((await axios.get(thumbHigh, { responseType: "arraybuffer" })).data, "utf-8"));
      api.sendMessage({
body: `🎧 Found a song!
━━━━━━━━━
Title: ${title}
━━━━━━━━━
Views: ${views}
━━━━━━━━━
Duration: ${duration}
━━━━━━━━━

⌛ Now downloading...`,
attachment: fs.createReadStream(path_)
}, event.threadID, () => fs.unlinkSync(path__), event.messageID);
      const stream = await axios.get((await axios.get(`https://joncll.serv00.net/yt.php`,
      {
        params: {
        url: url
        }
      })).data.audio, {
        responseType: "arraybuffer"
      });
      fs.writeFileSync(path, Buffer.from(stream.data, "utf-8"));
      api.sendMessage({
            body: `🎧 ${title}`,
            attachment: fs.createReadStream(path)
          }, event.threadID, () => {
          fs.unlinkSync(path);
        }, event.messageID);
    }
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
}
};
