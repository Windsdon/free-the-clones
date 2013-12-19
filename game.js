/**
 * Created by Windsdon on 19/12/13.
 */

function FreeTheClones(sizex, sizey, width, height){
    this.container = {
        width: width,
        height: height,
        object: $("<div />", {
            id: "gameContainer"
        })
    };

    this.size = [sizex, sizey];
    var size = this.size;

    this.dim = [width/sizex, height/sizey];
    var dim = this.dim;

    var container = this.container;

    container.object.width(container.width).height(container.height)
        .css({
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: -container.width/2,
            marginTop: -container.height/2,
            backgroundColor: "#CCC"
        });

    this.fieldClick = function(){
        var game = $(this).data("game");
        var object = $(this).data("object");

        var top = game.field[object.pos[1] + 1][object.pos[0]];
        var right = game.field[object.pos[1]][object.pos[0] + 1];

        if(object.occupied && !top.occupied && !right.occupied){
            game.fieldToggleOccupied([object, top, right]);
        }
    };

    this.fieldToggleOccupied = function(object){
        for(var k in object){
            console.warn(object[k]);
            if(object[k].occupied){
                object[k].object.removeClass("occupied");
                object[k].occupied = false;
            }else{
                object[k].object.addClass("occupied");
                object[k].occupied = true;
            }
        }
    }

    this.field = new Array(sizey);
    var field = this.field;
    for(var i = 0; i < sizey; i++){
        field[i] = new Array(sizex);

        for(var j = 0; j < sizex; j++){
            var created = {
                object: $("<div>", {
                    class: "fieldSquare"
                }).css({
                        left: dim[0]*j,
                        bottom: dim[1]*i,
                        width: dim[0],
                        height: dim[1]
                    }),
                pos: [j, i],
                occupied: false
            };

            created.object.data("object", created)
                .data("game", this)
                .click(this.fieldClick)
                .disableSelection();

            field[i][j] = created;

            //add the cell to the container
            container.object.append(created.object);
        }
    }

    this.fieldToggleOccupied([field[0][0]]);


    //add the game to the page
    $("body").append(this.container.object);
}

$(window).ready(function(){
    new FreeTheClones(16, 16, 800, 800);
});