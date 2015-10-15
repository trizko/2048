(function () {
    'use strict';

    var Game = function (colLength, rowLength) {
        this.board = this.createGame(colLength, rowLength);
        this.rowLength = rowLength;
        this.colLength = colLength;
        this.generateRandom();
        this.generateRandom();
    };

    Game.prototype.createGame = function (colLength, rowLength) {
        var matrix = [];

        for (var i = 0; i < rowLength; i++) {
            matrix.push([]);
            for (var k = 0; k < colLength; k++) {
                matrix[i].push(0);
            }
        }

        return matrix;
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
        var randomPosition = randomCoordinate(zeroPositions);

        this.board[randomPosition[0]][randomPosition[1]] = 2;
    };

    Game.prototype.moveLeft = function () {
        var self = this;
        var newBoard = [];

        self.board.forEach(function (row) {
            row = removeZeroes(row);
            row = squishRowLeft(row);
            row = appendZeroes(row, self.colLength);

            newBoard.push(row);
        });


        self.board = newBoard;
        self.generateRandom();
    };

    Game.prototype.moveRight = function () {
        var self = this;
        var newBoard = [];

        this.board.forEach(function (row) {
            row = removeZeroes(row);
            row = squishRowRight(row);
            row = prependZeroes(row, self.colLength);

            newBoard.push(row);
        });

        self.board = newBoard;
        self.generateRandom();
    };

    Game.prototype.moveUp = function () {
        var self = this;
        var newBoard = [];
        var rotated = transpose(self.board, self.rowLength, self.colLength);

        rotated.forEach(function (row) {
            row = removeZeroes(row);
            row = squishRowLeft(row);
            row = appendZeroes(row, self.rowLength);

            newBoard.push(row);
        });

        self.board = transpose(newBoard);
        self.generateRandom();
    };

    Game.prototype.moveDown = function () {
        var self = this;
        var newBoard = [];
        var rotated = transpose(self.board);

        rotated.forEach(function (row) {
            row = removeZeroes(row);
            row = squishRowRight(row);
            row = prependZeroes(row, self.rowLength);

            newBoard.push(row);
        });

        self.board = transpose(newBoard);
        self.generateRandom();
    };


    /////////////////////////////
    /////////////////////////////
    // private functions
    /////////////////////////////
    /////////////////////////////

    function removeZeroes(row) {
        return row.filter(function (item) {
            return item !== 0;
        });
    }

    function squishRowLeft(row) {
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

    function squishRowRight(row) {
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

    function prependZeroes(row, padding) {
        var result = row.slice();

        while (result.length < padding) {
            result.unshift(0);
        }

        return result;
    }

    function appendZeroes(row, padding) {
        var result = row.slice();

        while (result.length < padding) {
            result.push(0);
        }

        return result;
    }

    function transpose(array, arrayWidth, arrayHeight) {
        var newArray = [];

        for (var i = 0; i < array[0].length; i++) {
            newArray[i] = [];
            for (var j = 0; j < array.length; j++) {
                newArray[i][j] = array[j][i];
            }
        }
        return newArray;
    }

    function findZeroes(matrix) {
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

    function randomCoordinate(array) {
        var index = Math.floor(Math.random() * array.length);

        return array[index];
    }

    window.Game = Game;
    window.transpose = transpose;
})();
