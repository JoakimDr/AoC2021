//const { sign } = require("crypto");
var fs = require('fs');
const { exit } = require('process');

// var inputData = [];
// try {
//   var data = fs.readFileSync("day3/input.txt", "utf8");
//   inputData = data.split(/\r?\n/);
// } catch (e) {
//   console.log("Error:", e.stack);
// }
let input = fs.readFileSync('./day4/sampleinput.txt', 'utf8').split(/\r?\n/);
var hitInput = fs.readFileSync('./day4/hittray.txt', 'utf8').split(/\r?\n/);

// row 1 = bingo numbers
//row 2-end bingo trays
// tray = 5 rows of 5 numbers.
//blank row separator
var bingoNumbers = input[0].split(',');

function getTrays(input) {
  let trays = [];
  let tray = [];
  for (let y = 2; y < input.length; y++) {
    if (input[y].length > 1) {
      tray.push(input[y].trim().split(' '));
    } else {
      trays.push(tray);
      tray = [];
    }
  }
  return trays;
}

function checkBingo(tray) {
  let cols = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  //check rows
  var bingoRow = [1, 1, 1, 1, 1];
  for (let row = 0; row < 5; row++) {
    if (JSON.stringify(tray[row]) === JSON.stringify(bingoRow)) {
      console.log('BINGO row');
      return true;
    }
  }

  // build a cols array
  for (let col = 0; col < 5; col++) {
    //    cols.push([]);
    for (let row = 0; row < 5; row++) {
      cols[col][row] = parseInt(tray[row][col]);
    }
  }
  //check cols
  for (let colPos = 0; colPos < 5; colPos++) {
    if (JSON.stringify(cols[colPos]) === JSON.stringify(bingoRow)) {
      console.log('BINGO cols');
      return true;
    }
  }
  return false;
}

function sumUnmarkedNumbers(bingoTray, hitTray) {
  let sum = 0;
  for (row = 0; row < bingoTray.length; row++) {
    for (col = 0; col < bingoTray[row].length; col++) {
      if (hitTray[row][col] === 1) {
        sum += parseInt(bingoTray[row][col]);
      }
    }
  }

  return sum;
}

function part1(input) {
  var bingoTrays = getTrays(input);
  var newHitTray = getTrays([...hitInput]);
  var hitTrays = [];
  for (let i = 0; i < bingoTrays.length; i++) {
    hitTrays[i] = newHitTray[0];
  }
  console.log(bingoTrays);
  var bingo = false;
  var bingoNumberIndex = 0;
  var luckyTray = [];
  var luckyHitTray = [];

  while (bingoNumberIndex < bingoNumbers.length && bingo === false) {
    bingoNumber = parseInt(bingoNumbers[bingoNumberIndex]);
    console.log(`checking bingo number ${bingoNumber}`);
    for (let tray = 0; tray < bingoTrays.length; tray++) {
      console.log(`checking tray ${tray}`);
      for (let row = 0; row < 5; row++) {
        //        console.log(`checking row${row}`);
        for (let pos = 0; pos < 5; pos++) {
          //          console.log(`checking pos ${pos}`);
          if (parseInt(bingoTrays[tray][row][pos]) === bingoNumber) {
            console.log(`found hit on tray ${tray} row ${row} pos ${pos}`);
            hitTrays[tray][row][pos] = 1;
            bingo = checkBingo(hitTrays[tray]);
            if (bingo) {
              console.log(`tray number ${tray} won`);
              console.log(tray);
              luckyTray = bingoTrays[tray];
              luckyHitTray = hitTrays[tray];
              break;
            }
          }
          if (bingo) {
            break;
          }
        }
        if (bingo) {
          break;
        }
      }
      if (bingo) {
        break;
      }
    }
    bingoNumberIndex++;
  }

  var luckyBingoNumber = bingoNumbers[bingoNumberIndex];
  console.log(`lucky bingo number ${luckyBingoNumber}`);
  console.log(`winning tray ${luckyTray}`);
  var luckySum = sumUnmarkedNumbers(luckyTray, luckyHitTray);
  console.log(`part 1 answer is ${luckyBingoNumber * luckySum}`);
}

// part 2
//function part2(inputData) {}

part1(input);
