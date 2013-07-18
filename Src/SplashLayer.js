var SplashLayer = cc.Layer.extend({
    winSize: 0,

    init:function() {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();

            var staticBackground = cc.Sprite.create(s_splashBg);
            staticBackground.setPosition(winSize.width/2,winSize.height/2);
            this.addChild(staticBackground);

            var logo = cc.Sprite.create(s_splashLogo);
            logo.setPosition(winSize.width/2 , winSize.height-20);
            logo.setScale(2);
            this.addChild(logo);

            logo.runAction(cc.Sequence.create(cc.MoveTo.create(2, cc.p(winSize.width/2, winSize.height - 250)),
                cc.CallFunc.create(function() {
                    logo.setScale(3);
                    logo.setPosition(winSize.width/2 , winSize.height/2);
                    cc.Loader.preload(g_mapScreen, function () {
                        var scene = cc.Scene.create();
                        scene.addChild(StagesLayer.create());
                        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1,scene));
                    },this);
                }, this)
            ));

            cc.AudioEngine.getInstance().setMusicVolume(0.5);
            cc.AudioEngine.getInstance().playMusic(s_splashMusic, true);
            bRet = true;
        }

        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    }
})

SplashLayer.create = function () {
    var sg = new SplashLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};