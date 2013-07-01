var CommonParallaxLayer = cc.Layer.extend({

    init:function(horizonImage) {
        var bRet = false;
        if (this._super()) {
            for(var i=0;i<2;i++){
                var horizonTexture = cc.TextureCache.getInstance().addImage(horizonImage);
                var horizonSprite = cc.Sprite.createWithTexture(horizonTexture);
                horizonSprite.setAnchorPoint(cc.p(0,0));
                this.addChild(horizonSprite);
                if(i==0)
                    horizonSprite.setPosition(0, 0);
                else
                    horizonSprite.setPosition(winSize.width, 0);
            }
            bRet = true;
        }


        return bRet;
    },
    update : function(layerMovementSpeed)
    {
        for(var key in this._children){
            this._children[key].setPositionX(this._children[key].getPositionX() - layerMovementSpeed);
            var a = this._children[key].getPositionX()+winSize.width;
            if(this._children[key].getPositionX()+winSize.width<=0)
                this._children[key].setPosition(winSize.width+a, 0);
        }
    }
});

CommonParallaxLayer.create = function (horizonImage, movementSpeed) {
    var sg = new CommonParallaxLayer();
    if (sg && sg.init(horizonImage)) {
        return sg;
    }
    return null;
};