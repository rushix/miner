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

            new BackgroundSprite(this);
            new BackArrowSprite(this, winSize);

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