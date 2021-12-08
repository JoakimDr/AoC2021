var fs = require('fs');
const { exit } = require('process');

let input = fs.readFileSync('./day4/input.txt', 'utf8').split(/\r?\n/);

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
    [0, 0, 0, 0, 0].slice(),
    [0, 0, 0, 0, 0].slice(),
    [0, 0, 0, 0, 0].slice(),
    [0, 0, 0, 0, 0].slice(),
    [0, 0, 0, 0, 0].slice(),
  ].slice();

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
      if (parseInt(hitTray[row][col]) === 0) {
        sum += parseInt(bingoTray[row][col]);
      }
    }
  }

  return sum;
}

function getNewHitTray() {
  const hitTrayRow = [0, 0, 0, 0, 0];

  const hitTrayTemplate = [
    hitTrayRow.slice(),
    hitTrayRow.slice(),
    hitTrayRow.slice(),
    hitTrayRow.slice(),
    hitTrayRow.slice(),
  ];

  return hitTrayTemplate.slice();
}

function part1(input) {
  var bingoTrays = getTrays(input);

  var hitTrays = [];
  for (let i = 0; i < bingoTrays.length; i++) {
    hitTrays[i] = getNewHitTray();
  }
  console.log(bingoTrays);
  var bingo = false;
  var bingoNumberIndex = 0;
  var luckyTray = [];
  var luckyHitTray = [];
  var luckyBingoNumber = 0;

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
              luckyBingoNumber = bingoNumbers[bingoNumberIndex];

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

  //  var luckyBingoNumber = bingoNumbers[bingoNumberIndex];
  console.log(`lucky bingo number ${luckyBingoNumber}`);
  console.log(`winning tray ${luckyTray}`);
  var luckySum = sumUnmarkedNumbers(luckyTray, luckyHitTray);
  console.log(`part 1 answer is ${luckyBingoNumber * luckySum}`);
}

// part 2
function part2(inputData) {
  var bingoTrays = getTrays(input);

  var hitTrays = [];
  for (let i = 0; i < bingoTrays.length; i++) {
    hitTrays[i] = getNewHitTray();
  }
  console.log(bingoTrays);
  var bingo = false;
  var bingoNumberIndex = 0;
  var luckyTray = [];
  var luckyHitTray = [];
  var luckyBingoNumber = 0;
  var winnerTrayIndexes = [];
  while (bingoNumberIndex < bingoNumbers.length) {
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
              winnerTrayIndexes.push(tray);
              luckyBingoNumber = bingoNumbers[bingoNumberIndex];
              break;
            }
          }
        }
      }
    }
    bingoNumberIndex++;
  }

  //  var luckyBingoNumber = bingoNumbers[bingoNumberIndex];
  let uniqueItems = [...new Set(winnerTrayIndexes)];
  console.log(`winner trayz ${uniqueItems}`);
  console.log(`winner tray ${bingoTrays[uniqueItems.length - 1]}`);
  luckyTray = bingoTrays[uniqueItems.length - 1];
  luckyHitTray = hitTrays[uniqueItems.length - 1];
  var luckySum = sumUnmarkedNumbers(luckyTray, luckyHitTray);
  console.log(`part 2 answer is ${luckyBingoNumber * luckySum}`);
}

part2(input);
