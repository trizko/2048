$(document).on('ready', function(){

    var game = new Game();

    $( "body" ).keyup(function( event ) {
        switch (event.which) {
            case 37:
                game.moveLeft()
                console.log(game.toString());
                break;
            case 38:
                game.moveUp()
                console.log(game.toString());
                break;
            case 39:
                game.moveRight()
                console.log(game.toString());
                break;
            case 40:
                game.moveDown()
                console.log(game.toString());
                break;
            default:
                break;
        }
    });

});
