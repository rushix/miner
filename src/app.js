
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();

    },
    init:function () {

        var bRet = false;
        if (this._super()) {
            cc.spriteFrameCache.addSpriteFrames(res.textureTransparentPack_plist);

            var winSize = cc.director.getWinSize();
            var sp = cc.Sprite.create(res.loading_png);
            sp.setAnchorPoint(0, 0);
            this.addChild(sp, 0, 1);

            var logo = cc.Sprite.create(res.logo_png);
            logo.setAnchorPoint(0, 0);
            logo.setPosition(0, 250);
            this.addChild(logo, 10, 1);

            var newGameNormal = cc.Sprite.create(res.menu_png, cc.rect(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(res.menu_png, cc.rect(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(res.menu_png, cc.rect(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(res.menu_png, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(res.menu_png, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(res.menu_png, cc.rect(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.create(res.menu_png, cc.rect(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(res.menu_png, cc.rect(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(res.menu_png, cc.rect(252, 33 * 2, 126, 33));
            var flare = cc.Sprite.create(res.flare_jpg);
            this.addChild(flare);
            flare.setVisible(false);
            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, function () {
                this.onButtonEffect();
                //this.onNewGame();
                //flareEffect(flare, this, this.onNewGame);
            }.bind(this));
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(winSize.width / 2, winSize.height / 2 - 80);
            this.schedule(this.update, 0.1);

            bRet = true;
        }

        return bRet;

    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        layer.init();
        this.addChild(layer);
    }
});

