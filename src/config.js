/**
 * Created by rushi on 02.09.15.
 */

function minesInit () {

    var mines = MINES || {};

    //test
    mines.test = "i here";

    //window size
    //mines.WIN_SIZE = cc.director.getWinSize();

    //game state
    mines.GAME_STATE = {
        HOME: 0,
        PLAY: 1,
        OVER: 2
    };

    return mines;
}
