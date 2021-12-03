const { sign } = require("crypto");
var fs = require("fs");

var inputData = [];
try {
  var data = fs.readFileSync("input.txt", "utf8");
  inputData = data.split(/\r?\n/);
} catch (e) {
  console.log("Error:", e.stack);
}

var horizontalPos = 0;
var verticalPos = 0;

for (let x = 0; x < inputData.length - 1; x++) {
  var row = inputData[x].split(" ");
  var command = row[0];
  var distance = parseInt(row[1]);

  switch (command) {
    case "forward":
      horizontalPos += distance;
      break;
    case "up":
      verticalPos -= distance;
      break;
    case "down":
      verticalPos += distance;
      break;

    default:
      break;
  }
}

var answer1 = parseInt(horizontalPos) * parseInt(verticalPos);
console.log(`part 1 answer: ${answer1}`);

// part 2

horizontalPos = 0;
verticalPos = 0;
var aim = 0;
for (let x = 0; x < inputData.length - 1; x++) {
  var row = inputData[x].split(" ");
  var command = row[0];
  var distance = parseInt(row[1]);

  switch (command) {
    case "forward":
      horizontalPos += distance;
      verticalPos = verticalPos + aim * distance;
      break;
    case "up":
      aim -= distance;
      break;
    case "down":
      aim += distance;
      break;

    default:
      break;
  }
}

var answer2 = parseInt(horizontalPos) * parseInt(verticalPos);
console.log(`part 2 answer: ${answer2}`);
