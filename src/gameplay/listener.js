var Listener = function () {

    var left_button_code    = 0;
    var right_button_code   = 2;

    this.listener = cc.EventListener.create({
        event: cc.EventListener.MOUSE,
        onMouseUp: function (event) {
            var target = event.getCurrentTarget();

            var location = target.convertToNodeSpace(event.getLocation());
            var targetSize = target.getContentSize();
            var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
            if (cc.rectContainsPoint(targetRectangle, location)) {
                console.log(
                    "Tile touched: x=" + target.coords.x + "; " +
                    "y=" + target.coords.y + "; " +
                    "button=" + event.getButton() + ";"
                );

                switch (event.getButton()) {

                    case right_button_code:

                        MINES.GAME_FIELD.getTile(target.coords.x, target.coords.y).right_click();
                        break;

                    case left_button_code:
                    default:

                        MINES.GAME_FIELD.getTile(target.coords.x, target.coords.y).click();

                }


                cc.audioEngine.playEffect("res/effect2.wav", false);
                saveGameState();
            }
        }
    });

    return this.listener;
};