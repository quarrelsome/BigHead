var SplashLayer = cc.Layer.extend({
    winSize: 0,

    init:function() {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();

            var staticBackground = cc.Sprite.create(s_splashBg);
            staticBackground.setPosition(winSize.width/2,winSize.height/2);
            this.addChild(staticBackground);

            var sunburst = cc.Sprite.create(s_splashSunburst);
            sunburst.setPosition(winSize.width/2,winSize.height/2);
            sunburst.setScale(2);
            this.addChild(sunburst);

            var bigHeadLogo = cc.Sprite.create(s_splashBigHeadLogo);
            bigHeadLogo.setPosition(winSize.width/2,winSize.height/2);
            this.addChild(bigHeadLogo);

            var logo = cc.Sprite.create(s_splashLogo);
            logo.setPosition(winSize.width/2 , winSize.height);
            this.addChild(logo);

            cc.AudioEngine.getInstance().setMusicVolume(0.5);
            cc.AudioEngine.getInstance().playMusic(s_splashMusic, true);

            logo.runAction(cc.Sequence.create(cc.MoveTo.create(2, cc.p(winSize.width/2, winSize.height/2)),
                cc.CallFunc.create(function() {
                    cc.Loader.preload(g_mapScreen, function () {
                        var scene = cc.Scene.create();
                        scene.addChild(StagesLayer.create());
                        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5,scene));
                    },this);
                }, this)
            ));

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