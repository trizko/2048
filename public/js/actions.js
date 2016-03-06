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
    (function() {
        var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
        $.event.special.swipeupdown = {
            setup: function() {
                var thisObject = this;
                var $this = $(thisObject);
                $this.bind(touchStartEvent, function(event) {
                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                    function moveHandler(event) {
                        if (!start) {
                            return;
                        }
                        var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                        stop = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ]
                        };

                        // prevent scrolling
                        if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                            event.preventDefault();
                        }
                    }
                    $this
                        .bind(touchMoveEvent, moveHandler)
                            .one(touchStopEvent, function(event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                    Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                    Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
                });
            }
        };
        $.each({
            swipedown: "swipeupdown",
            swipeup: "swipeupdown"
        }, function(event, sourceEvent){
            $.event.special[event] = {
                setup: function(){
                    $(this).bind(sourceEvent, $.noop);
                }
            };
        });

    })();
    // Bind the swipeHandler callback function to the swipe event on div.box
    $(document).on( "swipeleft", function(event){
      game.moveLeft();
      refreshData();
    });
    $(document).on( "swiperight", function(event){
      game.moveRight();
      refreshData();
    });
    $(document).on( "swipeup", function(event){
      game.moveUp();
      refreshData();
    });
    $(document).on( "swipedown", function(event){
      game.moveDown();
      refreshData();
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
        $('.table1').append("<tr class=\"row" + i + "\"></tr>")
        for (var j = 0; j < game.colLength; j++) {
            $('.row' + i).append("<td class=\"data" + i + j + "\"></td>")
        }
    }
}

var refreshData = function () {
    for (var i = 0; i < game.rowLength; i++) {
        for (var j = 0; j < game.colLength; j++) {
            if (game.board[i][j] === 0) {
                $('.data' + i + j).html(" ");
            } else {
                $('.data' + i + j).html(game.board[i][j]);
                $('.data' + i + j).css('opacity', '1.0');
            }
            $('.data' + i + j).css('background-color', colors[game.board[i][j]]);
        }
    }
}
