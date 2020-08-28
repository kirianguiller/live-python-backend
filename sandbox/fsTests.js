const fs = require("fs");

const codeToRun = "it's a message test";

console.log("before fs");
fs.writeFile("codeToRun.py", codeToRun, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("fs done");
});
console.log("after fs");
