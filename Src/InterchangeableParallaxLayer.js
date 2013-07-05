var InterchangeableParallaxLayer = cc.Layer.extend({

    init:function(skyImage) {
        var bRet = false;
        if (this._super()) {
            this.loadSky(skyImage)
            bRet = true;
        }

        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },
    loadSky: function(skyImage){
        var skyTexture = cc.TextureCache.getInstance().addImage(skyImage);
        var skySprite = cc.Sprite.createWithTexture(skyTexture);
        skySprite.setAnchorPoint(cc.p(0,0));
        this.addChild(skySprite);
    }
});

InterchangeableParallaxLayer.create = function (skyImage) {
    var sg = new InterchangeableParallaxLayer();
    if (sg && sg.init(skyImage)) {
        return sg;
    }
    return null;
};
