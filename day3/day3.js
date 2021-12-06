//const { sign } = require("crypto");
var fs = require('fs');

// var inputData = [];
// try {
//   var data = fs.readFileSync("day3/input.txt", "utf8");
//   inputData = data.split(/\r?\n/);
// } catch (e) {
//   console.log("Error:", e.stack);
// }
let input = fs.readFileSync('./day3/input.txt', 'utf8').split(/\r?\n/);

function part1(inputData) {
  let mostCommon = '';
  let leastCommon = '';

  for (let x = 0; x < 12; x++) {
    let ones = 0;
    let zeros = 0;

    for (let y = 0; y < inputData.length; y++) {
      switch (inputData[y][x]) {
        case '1':
          ones++;
          break;
        case '0':
          zeros++;
        default:
          break;
      }
    }

    if (ones > zeros) {
      mostCommon += '1';
      leastCommon += '0';
    } else {
      mostCommon += '0';
      leastCommon += '1';
    }
  }

  console.log('mostCommon:', mostCommon);
  console.log('leastCommon:', leastCommon);

  let gammaRate = parseInt(mostCommon, 2);
  let epsilonRate = parseInt(leastCommon, 2);

  console.log('gammaRate:', gammaRate);
  console.log('epsilonRate:', epsilonRate);

  console.log('Power consumption:', gammaRate * epsilonRate);
}

// part 2
function part2(inputData) {
  let oxygenGeneratorRating = getRating(inputData, 'most common');
  let CO2ScrubberRating = getRating(inputData, 'least common');

  console.log('oxygenGeneratorRating:', oxygenGeneratorRating);
  console.log('CO2ScrubberRating:', CO2ScrubberRating);

  console.log(
    'Life support rating:',
    oxygenGeneratorRating * CO2ScrubberRating
  );
}

function getRating(input, type) {
  let filteredResult = input;

  while (filteredResult.length > 1) {
    for (let bit = 0; bit < input[0].split('').length; bit++) {
      let ones = [];
      let zeros = [];
      for (let row = 0; row < filteredResult.length; row++) {
        if (filteredResult[row].split('')[bit] === '1') {
          ones.push(filteredResult[row]);
        } else {
          zeros.push(filteredResult[row]);
        }
      }

      if (type === 'most common') {
        if (ones.length >= zeros.length) {
          filteredResult = ones;
        } else {
          filteredResult = zeros;
        }
      }

      if (type === 'least common') {
        if (zeros.length <= ones.length) {
          filteredResult = zeros;
        } else {
          filteredResult = ones;
        }

        if (filteredResult.length === 1) {
          return parseInt(filteredResult[0], 2);
        }
      }
    }
    return parseInt(filteredResult[0], 2);
  }
}

part2(input);
