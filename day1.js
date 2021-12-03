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

oldDepth = 0;
for (let x = 0; x < inputData.length; ++x) {
  if (x > 0 && inputData[x] > inputData[x - 1]) {
    anotherCount += 1;
  }
}

console.log(anotherCount);
