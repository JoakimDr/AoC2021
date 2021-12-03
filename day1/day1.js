var fs = require("fs");

var inputData = [];
try {
  var data = fs.readFileSync("input.txt", "utf8");
  //    console.log(data.toString());
  inputData = data.split(/\r?\n/);
} catch (e) {
  console.log("Error:", e.stack);
}

var anotherCount = 0;

var oldDepth = 0;
for (let x = 1; x < inputData.length; ++x) {
  if (inputData[x] >= inputData[x - 1]) {
    anotherCount++;
  }
}

console.log(anotherCount);
