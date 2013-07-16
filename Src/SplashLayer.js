var SplashLayer = cc.Layer.extend({

    init:function() {
        var bRet = false;
        if (this._super()) {
            var staticBackground = cc.Sprite.create(s_splashScreen);
            staticBackground.setAnchorPoint(cc.p(0,0));
            this.addChild(staticBackground);

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

SplashLayer.scene = function(){
    var scene = cc.Scene.create();
    var splashLayer = SplashLayer.create();
    scene.addChild(splashLayer);
    return scene;
}