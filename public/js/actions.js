$(document).ready(function () {

    var columnForm = $("#columnSize").val();
    var rowForm = $("#rowSize").val();

    $("form").submit(function (event) {
        event.preventDefault();

        $(".table1").empty();

        columnForm = $("#columnSize").val();
        rowForm = $("#rowSize").val();

        window.game = new Game(columnForm, rowForm);
        window.game.start();
        appendData();
    });

    window.game = new Game(columnForm, rowForm);
    window.game.start();
    appendData();

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

var refreshData = function () {
    for (var x = 1; x <= game.rowLength * game.colLength;) {
        for (var i = 0; i < game.rowLength; i++) {
            for (var j = 0; j < game.colLength; j++) {
                if (game.board[i][j] === 0) {
                    $('.data' + x).html(" ")
                } else {
                    $('.data' + x).html(game.board[i][j])
                }
                x += 1
            }
        }
    }
}

var appendData = function () {
    for (var x = 1; x <= game.rowLength * game.colLength;) {
        for (var i = 0; i < game.rowLength; i++) {
            $('.table1').append("<tr class=\"row" + i + "\"></tr>")
            for (var j = 0; j < game.colLength; j++) {
                $('.row' + i).append("<td class=\"data" + x + "\"></td>")
                x += 1
            }
        }
    }
}
