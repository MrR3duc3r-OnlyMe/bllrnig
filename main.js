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
 await new Promise(async(resolve, reject) => {
 const buang = await exec(cmd, {
   cwd: __dirname,
   stdio: "inherit",
   shell: true
 },
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
  resolve();
  return;
}));
});
});
await execute(`git clone ${GIT}`);
await execute(`npm install`);
console.log(`===== ${chalk.green("EXECUTE COMPLETE!")} =====`);
//await execute(`node ${SCRIPT_PATH}`);
const main = spawn("node", [SCRIPT_PATH], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true
});
/*main.on("close", (exitCode) => {
  if (exitCode === 0) {
    console.log(`${chalk.red("ERROR")} • Code ${exitCode}`);
  } else if (exitCode === 1) {
    console.log(`${chalk.red("ERROR")} • Code ${exitCode}`);
    //console.log(`===== ${chalk.green("RESTARTING...")} =====`);
    //ProjectBotify();
  } else {
    console.log(`${chalk.red("ERROR")} • Code ${exitCode}`);
  }
});*/
return;
}
ProjectBotify();