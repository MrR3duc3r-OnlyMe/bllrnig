const {
  exec,spawn
} = require("child_process");
const path = require("path");
const chalk = require("chalk");

const SCRIPT_FILE = "botify.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);
const GIT = "https://github.com/MrR3duc3r-OnlyMe/bllrnig.git";

async function ProjectBotify(){
 console.log(`${chalk.blue("Project Botify")} by Kenneth Aceberos`);
 console.log(`===== ${chalk.green("PLEASE WAIT...")} =====`);
 const execute = (async(cmd) => {
 await exec(cmd,
 (async (error,stdout,stderr) => {
  if (error){
   console.error(`${chalk.red("ERROR")} • ${error}`);
  }
  if (stdout){
   console.error(`${chalk.green("SUCCESS")} • ${stdout}`);
  }
  if (stderr){
   console.error(`${chalk.red("ERROR")} • ${stderr}`);
  }
  console.log(`===== [${chalk.green("DONE")}] • ${cmd} =====`);
  return;
}));
});
await execute(`git pull ${GIT}`);
await execute("npm install");
console.log(`===== ${chalk.green("EXECUTE COMPLETE!")} =====`);
const main = await spawn("node", [SCRIPT_PATH], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true
});

main.on("close", (exitCode) => {
  if (exitCode === 0) {
    console.error(`${chalk.red("ERROR")} • Code ${exitCode}`);
  } else if (exitCode === 1) {
    console.error(`${chalk.red("ERROR")} • Code ${exitCode}`);
    //console.log(`===== ${chalk.green("RESTARTING...")} =====`);
    //ProjectBotify();
  } else {
    console.error(`${chalk.red("ERROR")} • Code ${exitCode}`);
  }
});
return;
}
ProjectBotify();