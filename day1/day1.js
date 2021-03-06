const { sign } = require("crypto");
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
for (let x = 1; x < inputData.length - 1; x++) {
  if (parseInt(inputData[x]) > parseInt(inputData[x - 1])) {
    anotherCount++;
  }
}

console.log(`part 1 answer: ${anotherCount}`);

// part 2
var oldSum = 0;
var sum = 0;
var sumIncreases = 0;
var x = 2;

while (inputData.length - x > 2) {
  sum =
    parseInt(inputData[x]) +
    parseInt(inputData[x - 1]) +
    parseInt(inputData[x - 2]);
  if (sum - oldSum > 0) {
    sumIncreases++;
  }
  oldSum = sum;
  x++;
}

console.log(`Part 2 answer: ${sumIncreases}`);
