function randBetween (a, b) {

    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function checkLocalStorage () {

    if (typeof(Storage) !== "undefined") {

        MINES.CHECK_LOCAL_STORAGE = true;
        console.log(cc.sys.localStorage);
    } else {

        MINES.CHECK_LOCAL_STORAGE = false;
    }
}

function saveGameState () {

    /*
    if (MINES.SERVER_SAVE) {

        var httpReqObj = new XMLHttpRequest();

        httpReqObj.open("POST", "http://miner-server.com/save/", false);
        httpReqObj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        var requestData = MINES.TILE_STATES;

        httpReqObj.send(JSON.stringify(requestData));

        if (httpReqObj.readyState == 4 && httpReqObj.status == 200)
        {
            var responseData = JSON.parse(httpReqObj.responseText);
        }

    }
    */

    if (MINES.CHECK_LOCAL_STORAGE) {

        cc.sys.localStorage.setItem("MINES_STATES", JSON.stringify(MINES.TILE_STATES));
        cc.sys.localStorage.setItem("MINES_N", JSON.stringify(MINES.N));
        cc.sys.localStorage.setItem("MINES_OPENED_TILES_COUNT", JSON.stringify(MINES.GAME_FIELD.opened_tiles_count));
        cc.sys.localStorage.setItem("MINES_COUNT", JSON.stringify(MINES.MINES_COUNT));
        cc.sys.localStorage.setItem("MINES_ACTUAL_GAME_STATE", JSON.stringify(MINES.GAME_STATE_ACTUAL));
    }
}

function loadGameState () {

    if (MINES.CHECK_LOCAL_STORAGE) {

        MINES.TILE_STATES = JSON.parse(cc.sys.localStorage.getItem("MINES_STATES"));
        MINES.N = JSON.parse(cc.sys.localStorage.getItem("MINES_N"));
        MINES.GAME_FIELD.opened_tiles_count = JSON.parse(cc.sys.localStorage.getItem("MINES_OPENED_TILES_COUNT"));
        MINES.MINES_COUNT = JSON.parse(cc.sys.localStorage.getItem("MINES_COUNT"));
        MINES.GAME_STATE_ACTUAL = JSON.parse(cc.sys.localStorage.getItem("MINES_ACTUAL_GAME_STATE"));
    }
}

function deleteGameState () {

    if (MINES.CHECK_LOCAL_STORAGE) {

        cc.sys.localStorage.removeItem("MINES_STATES");
        cc.sys.localStorage.removeItem("MINES_N");
        cc.sys.localStorage.removeItem("MINES_OPENED_TILES_COUNT");
        cc.sys.localStorage.removeItem("MINES_COUNT");
        cc.sys.localStorage.removeItem("MINES_ACTUAL_GAME_STATE");
    }
}

function checkGameStateSaved () {

    if (MINES.CHECK_LOCAL_STORAGE) {

        return (cc.sys.localStorage.getItem("MINES_STATES")) ? true : false;
    } else {

        return false;
    }
}