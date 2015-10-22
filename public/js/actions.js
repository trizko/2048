$(document).ready(function () {

    var columnForm = $("#columnSize").val();
    var rowForm = $("#rowSize").val();

    newGame(columnForm, rowForm);

    $("form").submit(function (event) {
        event.preventDefault();

        $(".table1").empty();

        columnForm = $("#columnSize").val();
        rowForm = $("#rowSize").val();

        newGame(columnForm, rowForm);
    });

    $(document).keydown(function (key) {
        switch (parseInt(key.which, 10)) {
            case 37:
                game.moveablesLeft.forEach(function (item) {
                    TweenMax.to('#data' + item.join(''), .2, {
                        x: -115,
                        ease: Power4.easeInOut
                    });
                })
                game.moveLeft()
                break;
            case 38:
                game.moveablesUp.forEach(function (item) {
                    TweenMax.to('#data' + item.join(''), .2, {
                        y: -115,
                        ease: Power4.easeInOut
                    });
                })
                game.moveUp()
                break;
            case 39:
                game.moveablesRight.forEach(function (item) {
                    TweenMax.to('#data' + item.join(''), .2, {
                        x: 115,
                        ease: Power4.easeInOut
                    });
                })
                game.moveRight()
                break;
            case 40:
                game.moveablesDown.forEach(function (item) {
                    TweenMax.to('#data' + item.join(''), .2, {
                        y: 115,
                        ease: Power4.easeInOut
                    });
                })
                game.moveDown()
                break;
            default:
                break;
        }
        refreshData()
    });
});

var colors = {
    0: '#CDC1B4',
    2: '#FAF8EF',
    4: '#EDE0C8',
    8: '#F2B179',
    16: '#F59563',
    32: '#F67C5E',
    64: '#F5633D',
    128: '#EDCF72',
    256: '#EDCC61',
    512: '#EDC850',
    1024: '#18EC9E',
    2048: '#18EC9E',
    4096: '#18EC9E',
    8192: '#18EC9E'
}

var newGame = function (columnForm, rowForm) {
    window.game = new Game(columnForm, rowForm);
    window.game.start();

    appendData();
    refreshData();
}

var appendData = function () {
    for (var i = 0; i < game.rowLength; i++) {
        $('body').append("<div class=\"row" + i + "\"></div>")
        $('body').append("<div class=\"blankRow" + i + "\"></div>")
        for (var j = 0; j < game.colLength; j++) {
            if (game.board[i][j] !== 0) {
                $('.row' + i).append("<div class=\"block\" id=\"data" + i + j + "\"></div>")
                $('.blankRow' + i).append("<div class=\"blank\" id=\"data1" + i + j + "\"></div>")
                $('#data' + i + j).css('top', (i + 1) * 115).css('left', (j + 1) * 115)
                $('#data1' + i + j).css('top', (i + 1) * 115).css('left', (j + 1) * 115)
            }
        }
    }
}

var refreshData = function (direction) {
    for (var i = 0; i < game.rowLength; i++) {
        for (var j = 0; j < game.colLength; j++) {
            if (game.board[i][j] === 0) {
                $('#data' + i + j).html(" ");
            } else {
                $('#data' + i + j).html(game.board[i][j]);
                $('#data' + i + j).css('opacity', '1.0');
            }
            $('#data' + i + j).css('background-color', colors[game.board[i][j]]);
        }
    }
}
