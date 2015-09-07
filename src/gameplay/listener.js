/**
 * Created by deremin on 04.09.15.
 */

var Listener = function () {
    this.listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var location = target.convertToNodeSpace(touch.getLocation());
            var targetSize = target.getContentSize();
            var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
            if (cc.rectContainsPoint(targetRectangle, location)) {
                console.log("Tile touched: x=" + target.coords.x + "; y=" + target.coords.y + ";");

                MINES.GAME_FIELD[target.coords.x][target.coords.y].click();
            }
        }
    });

    return this.listener;
}