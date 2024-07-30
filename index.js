const {
  spawn
} = require("child_process");
const path = require("path");

const SCRIPT_FILE = "botify.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);
const GIT = "https://github.com/MrR3duc3r-OnlyMe/bllrnig.git";

function ProjectBotify(){
const main = spawn(`git pull ${GIT} && npm install && npm update && node ${SCRIPT_PATH}`, [""], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true
});

main.on("close", (exitCode) => {
  if (exitCode === 0) {
    console.log("Code 0!");
  } else if (exitCode === 1) {
    console.log("Restarting with code 1");
    ProjectBotify();
  } else {
    console.error(`Code ${exitCode}!`);
  }
});
}
ProjectBotify();