var InterchangeableParallaxLayer = cc.Layer.extend({
    _skyImages:[],
    _skyImageLevel: 0,
    _skyChangeFactor: 0,
    _skyCurrentFactor: 0,
    _skySprite: null,
    _skySpriteRe: null,
    a:0,
    b:0,
    c:0,
    d:0,

    init:function(skyImages, skyChangeFactor) {
        var bRet = false;
        if (this._super()) {
            this._skyImages = skyImages;
            this._skyChangeFactor = skyChangeFactor;
            this._skyCurrentFactor = skyChangeFactor;
            var skyTexture = cc.TextureCache.getInstance().addImage(this._skyImages[this._skyImageLevel].src);
            this._skySprite = cc.Sprite.createWithTexture(skyTexture);
            this._skySprite.setAnchorPoint(cc.p(0,0));
            this.addChild(this._skySprite);
            skyTexture = cc.TextureCache.getInstance().addImage(this._skyImages[this._skyImageLevel+1].src);
            this._skySpriteRe = cc.Sprite.createWithTexture(skyTexture);
            this._skySpriteRe.setAnchorPoint(cc.p(0,0));
            this._skySpriteRe.setPosition(cc.p(0,winSize.height));
            this.addChild(this._skySpriteRe);
            this.a = this._skyChangeFactor/winSize.height;
            this.c = this._skyChangeFactor/this.a;
            this.d = this.c;
            this.b = winSize.height/this.a;
            bRet = true;
        }

        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },
    update : function(dt,distanceTravelled)
    {
        if((this._skySpriteRe.getPositionY()-this.b)<=0){
            this._skyImageLevel++;
            if((this._skyImageLevel+1)<this._skyImages.length){
                this._skySprite.removeFromParent();
                this._skySprite = this._skySpriteRe;
                var skyTexture = cc.TextureCache.getInstance().addImage(this._skyImages[this._skyImageLevel+1].src);
                this._skySpriteRe = cc.Sprite.createWithTexture(skyTexture);
                this._skySpriteRe.setAnchorPoint(cc.p(0,0));
                this._skySpriteRe.setPosition(cc.p(0,winSize.height));
                this.addChild(this._skySpriteRe);
            }
        }

        if(distanceTravelled>this.c && this._skyImageLevel<this._skyImages.length && (this._skySpriteRe.getPositionY()-this.b)>=0){
            this._skySpriteRe.setPositionY(this._skySpriteRe.getPositionY()-this.b);
            this.c = this.c+this.d;
            cc.log(this._skySpriteRe.getPositionY());
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
