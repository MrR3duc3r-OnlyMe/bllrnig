const { spawn } = require("child_process");
const path = require('path');

const SCRIPT_FILE = "botify.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);


function start() {
    const main = spawn("node", [SCRIPT_PATH], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    main.on("close", (exitCode) => {
        if (exitCode === 0) {
            console.log("Code 0!");
        } else if (exitCode === 1) {
            console.log("Code 1! Restarting...");
            start();
        }  else {
            console.error(`Code ${exitCode}!`);
        }
    });
}

start();
