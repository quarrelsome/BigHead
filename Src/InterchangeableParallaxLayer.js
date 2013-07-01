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
            var skySprite = cc.Sprite.create(this._skyImages[this._skyImageLevel].src);
            skySprite.setAnchorPoint(cc.p(0,0));
            skySprite.setPosition(winSize.width / 2, winSize.height / 2);
            this.addChild(skySprite);
            bRet = true;
        }


        return bRet;
    },
    update : function(distanceTravelled)
    {
        if(distanceTravelled>this._skyCurrentFactor+750){
            this._skyCurrentFactor = this._skyCurrentFactor + this._skyChangeFactor;
            this._skyImageLevel+=1;
            var skySprite = cc.Sprite.create(this._skyImages[this._skyImageLevel].src);
            skySprite.setAnchorPoint(cc.p(0,0));
            skySprite.setPosition(winSize.width / 2, winSize.height / 2);
            this.addChild(skySprite);
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
