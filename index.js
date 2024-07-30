const {
  exec
} = require("child_process");
const path = require("path");

const SCRIPT_FILE = "botify.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);
const GIT = "https://github.com/MrR3duc3r-OnlyMe/bllrnig.git";

async function ProjectBotify(){
 console.log("Project Botify by Kenneth Aceberos");
 console.log("Starting...");
 const execute = (async(cmd) => {
 await exec(cmd,
 (async (error,stdout,stderr) => {
  if (error){
    console.error(error);
  }
  if (stdout){
    console.log(stdout);
  }
  if (stderr){
    console.log(stderr);
  }
  return;
}));
});
await execute(`git pull ${GIT}`);
await execute("npm install");
await execute(`node ${SCRIPT_PATH}`)
}
ProjectBotify();