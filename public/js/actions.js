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
                game.moveLeft()
                break;
            case 38:
                game.moveUp()
                break;
            case 39:
                game.moveRight()
                break;
            case 40:
                game.moveDown()
                break;
            default:
                break;
        }
        refreshData();
    });
});

var newGame = function (columnForm, rowForm) {
    window.game = new Game(columnForm, rowForm);
    window.game.start();

    appendData();
    refreshData();
}

var refreshData = function () {
    for (var i = 0; i < game.rowLength; i++) {
        for (var j = 0; j < game.colLength; j++) {
            if (game.board[i][j] === 0) {
                $('.data' + i + j).html(" ")
                $('.data' + i + j).css('background-color', '#E6CCCC')
                $('.data' + i + j).css('opacity', '0.4')
            } else {
                $('.data' + i + j).html(game.board[i][j])
                $('.data' + i + j).css('background-color', '#18EC9E')
                $('.data' + i + j).css('opacity', '1.0')
            }
        }
    }
}

var appendData = function () {
    for (var i = 0; i < game.rowLength; i++) {
        $('.table1').append("<tr class=\"row" + i + "\"></tr>")
        for (var j = 0; j < game.colLength; j++) {
            $('.row' + i).append("<td class=\"data" + i + j + "\"></td>")
        }
    }
}
