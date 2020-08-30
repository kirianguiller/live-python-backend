const { spawn } = require("child_process");
const fs = require("fs");

TIMEOUT = 2000

// TODO : - add  timer handler for avoiding infinite loop
module.exports = function (codeInput) {
  const promise = new Promise((resolve, reject) => {
    console.log("codeToRun", codeInput);
    var stdout;
    var stderr;
    const results = {
      stdout,
      stderr,
    };

  setTimeout(()=> {

    results.stderr = `ERROR : timout of ${TIMEOUT} milliseconds reached`
    resolve(results)}, TIMEOUT);

    fs.writeFile("codeToRun.py", codeInput, function (err) {
      if (err) {
        return console.log(err);
      }



      const python = spawn("python3", ["codeToRun.py"]);
      python.stdout.on("data", function (stdout) {
        // this if/else statetement is use for fixing the stdout dislocation behavior that ...
        // ... happens sometimes.
        // TODO : - try to find a way to have this whole code in one line
        if (typeof results.stdout === "undefined") {
          results.stdout = stdout.toString();
        } else {
          results.stdout += stdout.toString();
        }
      });
      python.stderr.on("data", function (stderr) {
        results.stderr += stderr.toString();
      });
      python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        // io.sockets.emit("out", dataToSend || "");
        console.log("KK python close", results);
        resolve(results);
      });
    });
  });
  return promise;
};
