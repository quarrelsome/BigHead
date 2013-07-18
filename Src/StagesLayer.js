var StagesLayer = cc.Layer.extend({

    init:function() {
        var bRet = false;
        if (this._super()) {
            var staticBackground = cc.Sprite.create(s_mapBg);
            staticBackground.setPosition(winSize.width/2,winSize.height/2);
            this.addChild(staticBackground);

            var newGameNormal = cc.Sprite.create(s_mapButton);
            var newGameSelected = cc.Sprite.create(s_mapButtonPress);
            var newGameDisabled = cc.Sprite.create(s_mapButtonPress);

            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled,this.stageOne,this);
            var menu = cc.Menu.create(newGame);
            this.addChild(menu);
            menu.setPosition(winSize.width / 2, winSize.height / 2 - 90);

            cc.AudioEngine.getInstance().setMusicVolume(0.5);
            cc.AudioEngine.getInstance().playMusic(s_mapMusic, true);
            bRet = true;
        }

        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },

    stageOne:function (sender) {
        cc.Loader.preload(g_mainmenu, function () {
            scene = cc.Scene.create();
            scene.addChild(HomeLayer.create(scene));
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, scene));
        }, this);
    }
})

StagesLayer.create = function () {
    var sg = new StagesLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};