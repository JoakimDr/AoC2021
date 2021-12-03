var fs = require("fs");

var inputData = [];
try {
  var data = fs.readFileSync("input.txt", "utf8");
  //    console.log(data.toString());
  inputData = data.split(/\r?\n/);
} catch (e) {
  console.log("Error:", e.stack);
}

//part1;
var numberOfDepthIncreases = 0;
var oldDepth = 0;
var Depth = 0;
var i = 0;
while (i < inputData.length) {
  Depth = inputData[i];
  if (i > 0 && Depth > oldDepth) {
    numberOfDepthIncreases++;
  }

  console.log(`rows: ${i}`);
  console.log(`depth ${Depth} old depth ${oldDepth}`);
  console.log(`number of depth increases ${numberOfDepthIncreases}`);

  oldDepth = inputData[i];
  i++;
}

console.log(`depth increases : ${numberOfDepthIncreases}`);
