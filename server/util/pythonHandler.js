const { spawn } = require("child_process");
const fs = require("fs");

module.exports = function (codeInput) {
  const promise = new Promise((resolve, reject) => {
    // clearTimeout(timeoutHandle);
    // timeoutHandle(socket);
    console.log("codeToRun", codeInput);

    fs.writeFile("codeToRun.py", codeInput, function (err) {
      if (err) {
        return console.log(err);
      }

      var codeOutput;
      var codeError;
      const results = {
        codeOutput,
        codeError,
      };
      const python = spawn("python3", ["codeToRun.py"]);
      python.stdout.on("data", function (stdout) {
        console.log("KK stdout", stdout, typeof stdout)
        if (typeof results.codeOutput != "undefined") {
          results.codeOutput += stdout.toString();
          console.log("KK codeOutput ", results);
        } else {
          results.codeOutput = stdout.toString();
        }
      });
      python.stderr.on("data", function (stderr) {
        results.codeError += stderr.toString();
        console.log("KK codeError ", results);
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
