/**
 * Created by rushi on 07.09.15.
 */

var MenuSprite = function (layer, winSize) {

    this.menuItemWidth  = 126;
    this.menuItemHeight = 33;

    this.menuVerticalPadding    = 10;
    this.menuVerticalMargin     = 20;

    this.newGameNormal = cc.Sprite.create(
        res.menu_png,
        cc.rect(
            0,
            0,
            this.menuItemWidth,
            this.menuItemHeight
        )
    );
    this.newGameSelected = cc.Sprite.create(
        res.menu_png,
        cc.rect(
            0,
            this.menuItemHeight,
            this.menuItemWidth,
            this.menuItemHeight
        )
    );
    this.newGameDisabled = cc.Sprite.create(
        res.menu_png,
        cc.rect(
            0,
            this.menuItemHeight * 2,
            this.menuItemWidth,
            this.menuItemHeight
        )
    );

    this.gameSettingsNormal = cc.Sprite.create(
        res.menu_png,
        cc.rect(
            this.menuItemWidth,
            0,
            this.menuItemWidth,
            this.menuItemHeight
        )
    );
    this.gameSettingsSelected = cc.Sprite.create(
        res.menu_png,
        cc.rect(
            this.menuItemWidth,
            this.menuItemHeight,
            this.menuItemWidth,
            this.menuItemHeight
        )
    );
    this.gameSettingsDisabled = cc.Sprite.create(
        res.menu_png,
        cc.rect(
            this.menuItemWidth,
            this.menuItemHeight * 2,
            this.menuItemWidth,
            this.menuItemHeight
        )
    );

    this.newGame = cc.MenuItemSprite.create(
        this.newGameNormal,
        this.newGameSelected,
        this.newGameDisabled,
        function () {
            layer.onNewGame();
        }.bind(layer)
    );
    this.gameSettings = cc.MenuItemSprite.create(
        this.gameSettingsNormal,
        this.gameSettingsSelected,
        this.gameSettingsDisabled,
        layer.onSettings,
        layer
    );

    this.menu = cc.Menu.create(this.newGame, this.gameSettings);
    this.menu.alignItemsVerticallyWithPadding(this.menuVerticalPadding);
    layer.addChild(this.menu, 1, 2);
    this.menu.setPosition(
        winSize.width / 2,
        winSize.height / 2 - this.menuVerticalMargin
    );
    layer.schedule(layer.update, 0.1);

}