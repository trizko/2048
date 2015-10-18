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

var appendData = function () {
    for (var i = 0; i < game.rowLength; i++) {
        $('.table1').append("<tr class=\"row" + i + "\"></tr>")
        for (var j = 0; j < game.colLength; j++) {
            $('.row' + i).append("<td class=\"data" + i + j + "\"></td>")
        }
    }
}

var refreshData = function () {
    for (var i = 0; i < game.rowLength; i++) {
        for (var j = 0; j < game.colLength; j++) {
            switch (game.board[i][j]) {
                case 0:
                    $('.data' + i + j).html(" ")
                    $('.data' + i + j).css('background-color', '#CDC1B4')
                    break;
                case 2:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#FAF8EF')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 4:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#EDE0C8')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 8:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#F2B179')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 16:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#F59563')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 32:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#F67C5E')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 64:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#F5633D')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 128:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#EDCF72')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 256:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#EDCC61')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 512:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#EDC850')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 1024:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#18EC9E')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 2048:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#18EC9E')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 4096:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#18EC9E')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 8192:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', '#18EC9E')
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
            }
        }
    }
}
