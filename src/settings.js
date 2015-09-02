/**
 * Created by rushi on 02.09.15.
 */


var SettingsLayer = cc.Layer.extend({
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

            var menuItemBackArrow = new cc.MenuItemSprite(
                new cc.Sprite(res.backArrow_png),
                new cc.Sprite(res.backArrow_png),
                this.onBackArrow, this);
            var menuBackArrow = new cc.Menu(menuItemBackArrow);
            menuBackArrow.setPosition(40, winSize.height - 50);
            this.addChild(menuBackArrow);

        }
    },

    onBackArrow:function () {

        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new MenuScene());
        }, this);

        console.log("backArrow clicked");
    }


});

var SettingsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SettingsLayer();
        this.addChild(layer);
    }
});