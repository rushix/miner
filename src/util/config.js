/**
 * Created by rushi on 02.09.15.
 */

function minesInit () {

    var mines = MINES || {};

    //game state
    mines.GAME_STATE = {
        HOME: 0,
        PLAY: 1,
        OVER: 2
    };

    //tile states
    mines.TILE_STATE = {
        EMPTY_HIDDEN:       0,
        EMPTY_SHOWN:        1,
        NUMBERED_HIDDEN:    2,
        NUMBERED_SHOWN:     3,
        FLAGGED_HIDDEN:     4,
        FLAGGED_FALSE_BOMB: 5,
        FLAGGED_BOMB:       6,
        BOMB:               7,
        EXPLODED_BOMB:      8
    };

    //game field dimension
    mines.N = 0;

    //mines count
    mines.MINES_COUNT = 0;

    //mines count ratio
    mines.MINES_RATIO = 6.4;

    //tile texture pixel base dimension
    mines.TEXTURE_BASE_DIMENSION = 32;

    //tile texture dimension ratio
    mines.TEXTURE_DIMENSION_RATIO = 0.5;

    //tile texture pixel dimension
    mines.TEXTURE_DIMENSION = Math.floor(mines.TEXTURE_BASE_DIMENSION * mines.TEXTURE_DIMENSION_RATIO);

    //empty game field init
    mines.GAME_FIELD = false;

    //vertical gameplay field offset delta
    mines.GAMEPLAY_FIELD_VERTICAL_OFFSET_DELTA = 170;

    //vertical gameplay field offset
    mines.GAMEPLAY_FIELD_VERTICAL_OFFSET = 0;

    //horizontal gameplay field offset
    mines.GAMEPLAY_FIELD_HORIZONTAL_OFFSET = 0;

    return mines;
}
