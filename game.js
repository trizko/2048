var Game = function () {
  this.board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  this.generateRandom();
  this.generateRandom();
};

Game.prototype.toString = function () {
  var result = '\n';

  this.board.forEach(function (row) {
    row.forEach(function (value) {
      result = result + value + '\t';
    });

    result = result + '\n';
  });

  return result;
};

Game.prototype.generateRandom = function () {
  var zeroPositions = findZeroes(this.board);
  var randomPosition = randomIndex(zeroPositions);

  this.board[randomPosition[0]][randomPosition[1]] = 2;
};

Game.prototype.moveLeft = function () {
  var newBoard = [];

  this.board.forEach(function (row) {
    row = removeZeroes(row);
    row = squishRowLeft(row);
    row = appendZeroes(row);

    newBoard.push(row);
  });

  this.board = newBoard;
  this.generateRandom();
};

Game.prototype.moveRight = function () {
  var newBoard = [];

  this.board.forEach(function (row) {
    row = removeZeroes(row);
    row = squishRowRight(row);
    row = prependZeroes(row);

    newBoard.push(row);
  });

  this.board = newBoard;
  this.generateRandom();
};

Game.prototype.moveUp = function () {
  var newBoard = [];
  var rotated = rotateMatrixCounterClockwise(this.board);

  rotated.forEach(function (row) {
    row = removeZeroes(row);
    row = squishRowLeft(row);
    row = appendZeroes(row);

    newBoard.push(row);
  });

  this.board = rotateMatrixClockwise(newBoard);
  this.generateRandom();
};

Game.prototype.moveDown = function () {
  var newBoard = [];
  var rotated = rotateMatrixClockwise(this.board);

  rotated.forEach(function (row) {
    row = removeZeroes(row);
    row = squishRowLeft(row);
    row = appendZeroes(row);

    newBoard.push(row);
  });

  this.board = rotateMatrixCounterClockwise(newBoard);
  this.generateRandom();
};

var game = new Game();


/////////////////////////////
/////////////////////////////
// private functions
/////////////////////////////
/////////////////////////////

function removeZeroes (row) {
  return row.filter(function(item){
    return item !== 0;
  });
}

function squishRowLeft (row) {
  var result = [];

  for (var i = 0; i < row.length; i = i + 1) {
    if (row[i] === row[i + 1]) {
      result.push(row[i] + row[i + 1]);
      i = i + 1;
    } else {
      result.push(row[i]);
    }
  }

  return result;
}

function squishRowRight (row) {
  var result = [];

  for (var i = row.length - 1; i >= 0; i = i - 1) {
    if (row[i] === row[i - 1]) {
      result.unshift(row[i] + row[i - 1]);
      i = i - 1;
    } else {
      result.unshift(row[i]);
    }
  }

  return result;
}

function prependZeroes (row) {
  var result = row.slice();

  while (result.length < 4) {
    result.unshift(0);
  }

  return result;
}

function appendZeroes (row) {
  var result = row.slice();

  while (result.length < 4) {
    result.push(0);
  }

  return result;
}

function rotateMatrixCounterClockwise (matrix) {
  var result = [];

  for (var i = matrix.length - 1; i >= 0; i = i - 1) {
    var row = [];
    for (var j = 0; j < matrix[i].length; j = j + 1) {
      row.push(matrix[j][i]);
    }
    result.push(row);
  }

  return result;
}

function rotateMatrixClockwise (matrix) {
  var result = [];

  for (var i = 0; i < matrix.length; i = i + 1) {
    var row = [];
    for (var j = matrix[i].length - 1; j >= 0; j = j - 1) {
      row.push(matrix[j][i]);
    }
    result.push(row);
  }

  return result;
}

function findZeroes (matrix) {
  var result = [];

  for (var i = 0; i < matrix.length; i = i + 1) {
    for (var j = 0; j < matrix[i].length; j = j + 1) {
      if (matrix[i][j] === 0) {
        result.push([i, j]);
      }
    }
  }

  return result;
}

function randomIndex (array) {
  var index = Math.floor(Math.random()*array.length);

  return array[index];
}
