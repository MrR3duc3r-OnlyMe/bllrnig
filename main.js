const {
  exec,
  spawn
} = require("child_process");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const SCRIPT_FILE = "botify.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);
const GIT = "https://github.com/MrR3duc3r-OnlyMe/bllrnig.git";

async function ProjectBotify() {
  console.log(`${chalk.blue("Project Botify")} by Kenneth Aceberos`);
  console.log(`===== ${chalk.green("PLEASE WAIT...")} =====`);
  const execute = async (cmd) => {
    await new Promise(async (resolve, reject) => {
      const buang = await exec(cmd, {
          cwd: __dirname,
          stdio: "inherit",
          shell: true
        },
        (async (error, stdout, stderr) => {
          if (error) {
            console.error(`${chalk.red("ERROR")} • ${error}`);
          }
          if (stdout) {
            console.error(`${chalk.green("SUCCESS")} • ${stdout}`);
          }
          if (stderr) {
            console.error(`${chalk.red("ERROR")} • ${stderr}`);
          }
          resolve();
          return;
        }));
    });
  };
  const execute1 = async (cmd, args) => {
    await new Promise((resolve, reject) => {
      let main_ = spawn(cmd, args, {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
      });
      main_.on("data", data => {
        console.log(`${chalk.yellow("DATA")} • ${data}`);
      });
      /*main_.stderr.on("data", data => {
        console.log(`${chalk.red("STDERR")} • ${data}`);
      });*/
      main_.on("close", (exitCode) => {
        if (exitCode === 0) {
          console.log(`${chalk.green("SUCCESS")} • Code ${exitCode}`);
        } else if (exitCode === 1) {
          console.log(`${chalk.red("ERROR")} • Code ${exitCode}`);
          console.log(`===== ${chalk.green("RESTARTING...")} =====`);
          ProjectBotify();
        } else {
          console.log(`${chalk.red("ERROR")} • Code ${exitCode}`);
        }
        resolve();
        return;
      });
    });
  };
  /*await execute1(`git init`);
  await execute1(`git remote`, [`rm`, `origin`]);
  await execute1(`git remote`, [`add`, `origin`, GIT]);
  await execute1(`git reset`);
  await execute1(`git fetch`);
  await execute1(`git checkout`, [`-t`, `origin/main`, `-f`]);
  */
  await execute1(`git pull`, [GIT]);
  //await execute1(`npm install`);
  console.log(`===== ${chalk.green("EXECUTE COMPLETE!")} =====`);
  await execute1(`node`, [SCRIPT_PATH]);

  return;
}
ProjectBotify();