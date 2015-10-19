var colors = {
    0: '#CDC1B4',
    2: '#FAF8EF',
    4: '#EDE0C8',
    8: '#F2B179',
    16: '#F59563',
    32: '#F67C5E',
    64: '#F5633D',
    128: '#EDCF72',
    256: '#EDC850',
    512: '#EDC850',
    1024: '#18EC9E',
    2048: '#18EC9E',
    4096: '#18EC9E',
    8192: '#18EC9E'
}

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
                    $('.data' + i + j).css('background-color', colors[0])
                    break;
                case 2:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[2])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 4:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[4])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 8:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[8])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 16:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[16])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 32:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[32])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 64:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[64])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 128:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[128])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 256:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[256])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 512:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[512])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 1024:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[1024])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 2048:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[2048])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 4096:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[4096])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
                case 8192:
                    $('.data' + i + j).html(game.board[i][j])
                    $('.data' + i + j).css('background-color', colors[8192])
                    $('.data' + i + j).css('opacity', '1.0')
                    break;
            }
        }
    }
}
