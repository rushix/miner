
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();
        this.init();
    },

    init:function () {

        if (this._super()) {

            var winSize = cc.director.getWinSize();
            var sp = cc.Sprite.create(res.background_png);
            sp.setAnchorPoint(0, 0);
            this.addChild(sp, 0, 1);

            var bombMenu = cc.Sprite.create(res.bombMenu_png);
            bombMenu.setAnchorPoint(0, 0);
            bombMenu.setPosition(winSize.width / 2 - 65, winSize.height / 2 + 30);
            this.addChild(bombMenu, 10, 1);

            var newGameNormal = cc.Sprite.create(res.menu_png, cc.rect(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(res.menu_png, cc.rect(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(res.menu_png, cc.rect(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(res.menu_png, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(res.menu_png, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(res.menu_png, cc.rect(126, 33 * 2, 126, 33));

            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, function () {
                this.onNewGame();
            }.bind(this));
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);

            var menu = cc.Menu.create(newGame, gameSettings);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(winSize.width / 2, winSize.height / 2 - 20);
            this.schedule(this.update, 0.1);

        }

    },

    onNewGame:function () {

        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new GameScene());
        }, this);

        console.log("newGame clicked");
    },

    onSettings:function () {

        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new SettingsScene());
        }, this);

        console.log("settings clicked");
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {

        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

