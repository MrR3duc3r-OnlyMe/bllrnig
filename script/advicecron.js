const cron = require('node-cron');
const fs = require('fs');
const axios = require('axios');

const activeThreads = {};

const config = {
  name: 'advicecron',
  version: '1.0',
  role: 2,
  credits: 'Cliff_shipazu|Modified by @hulaanMo12042023',
  hasPrefix: true,
  description: 'Automatically send advices on and off',
};

module.exports.config = config;
let enabled = false;
let panget = null;
module.exports.run = async({ api, event, args, Utils, prefix }) => {
  const threadID = event.threadID;
  enabled = !enabled;
  api.sendMessage(`${Utils.firstBigLetter(config.name)} is now ${enabled ? "enabled" : "disabled"}.`, event.threadID, (err, info) =>
    setTimeout(() => {
      api.unsendMessage(info.messageID);
    }, 20 * 1000),
    event.messageID);
  if (enabled){
      activeThreads[threadID] = true;
      panget = cron.schedule('*/30 * * * *', async () => {
        try {
          if (activeThreads[threadID]) {
            const advice = await axios.get(`https://api.adviceslip.com/advice`);
            api.sendMessage(`Here is a random advice for you:\n${advice.data.slip.advice}`, event.threadID);
          } else {
            if (panget) panget.stop();
            if (panget) panget = null;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
      return;
  } else {
    activeThreads[threadID] = false;
    if (panget) panget.stop();
    if (panget) panget = null;
    return;
  }
};