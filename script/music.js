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
    const searchResults = await axios.get(`https://api.flvto.site/@api/search/YouTube/${encodeURIComponent(musicName)}`, {
        headers: {
          "user-agent": `Mozilla/5.0 (Linux; Android 12; SM-A315G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/200 Edge Mobile Safari/537.36`,
          "origin": "https://w2.mp3juices.click",
          "referer": "https://w2.mp3juices.click",
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
        channelId,
        channelTitle,
        duration,
        id,
        publishedAt,
        thumbHigh,
        title,
        viewCount
      } = searchResults.data.items[0];
      fs.writeFileSync(path_, Buffer.from((await axios.get(thumbHigh, { responseType: "arraybuffer" })).data, "utf-8"));
      api.sendMessage({
body: `🎧 Found a song!
━━━━━━━━━
Title: ${title}
━━━━━━━━━
Views: ${viewCount}
━━━━━━━━━
Publish at: ${viewCount} by ${channelTitle}
━━━━━━━━━
Duration: ${duration}
━━━━━━━━━

⌛ Now downloading...`,
attachment: fs.createReadStream(path_)
}, event.threadID, () => fs.unlinkSync(path__), event.messageID);
      const stream = await axios.get((await axios.get(`https://joncll.serv00.net/yt.php`,
      {
        params: {
        url: `https://youtube.com/watch?v=${id}`
        }
      })).data.audio, {
        responseType: "arraybuffer"
      });
      fs.writeFileSync(path, Buffer.from(stream.data, "utf-8"));
      api.sendMessage({
            body: `${music.title}`,
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
