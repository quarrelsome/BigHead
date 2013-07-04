var InterchangeableParallaxLayer = cc.Layer.extend({
    _skyImages:[],
    _skyImageLevel: 0,
    _skyChangeFactor: 0,
    _skyCurrentFactor: 0,

    init:function(skyImages, skyChangeFactor) {
        var bRet = false;
        if (this._super()) {
            this._skyImages = skyImages;
            this._skyChangeFactor = skyChangeFactor;
            this._skyCurrentFactor = skyChangeFactor;
            var skyTexture = cc.TextureCache.getInstance().addImage(this._skyImages[this._skyImageLevel].src);
            var skySprite = cc.Sprite.createWithTexture(skyTexture);
            skySprite.setAnchorPoint(cc.p(0,0));
            //skySprite.setPosition(0, 0);
            this.addChild(skySprite);
            bRet = true;
        }

        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },
    update : function(dt,distanceTravelled)
    {
        if(distanceTravelled>this._skyCurrentFactor+1000){
            this._skyCurrentFactor = this._skyCurrentFactor + this._skyChangeFactor;
            this._skyImageLevel+=1;
            var skySprite = cc.Sprite.create(this._skyImages[this._skyImageLevel].src);
            skySprite.setAnchorPoint(cc.p(0,0));
            //skySprite.setPosition(0, 0);
            this.addChild(skySprite);
            this.removeChild(this._children[0]);
        }
    }
});

InterchangeableParallaxLayer.create = function (skyImages, skyChangeFactor) {
    var sg = new InterchangeableParallaxLayer();
    if (sg && sg.init(skyImages, skyChangeFactor)) {
        return sg;
    }
    return null;
};
