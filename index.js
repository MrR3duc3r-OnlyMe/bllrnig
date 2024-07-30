const {
  exec
} = require("child_process");
const path = require("path");

const SCRIPT_FILE = "botify.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);
const GIT = "https://github.com/MrR3duc3r-OnlyMe/bllrnig.git";

function ProjectBotify(){
exec(`git pull ${GIT} && npm install && npm update && node ${SCRIPT_PATH}`,
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
}
ProjectBotify();