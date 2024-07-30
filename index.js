const {
  exec
} = require("child_process");
const path = require("path");

const SCRIPT_FILE = "botify.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);
const GIT = "https://github.com/MrR3duc3r-OnlyMe/bllrnig.git";

function ProjectBotify(){
 const execute = (async(cmd) => {
 await exec(execute,
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
}));
});
await execute(`git pull ${GIT}`);
await execute("npm install");
await execute("npm update");
await execute(`node ${SCRIPT_PATH}`)
}
ProjectBotify();