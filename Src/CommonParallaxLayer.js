var CommonParallaxLayer = cc.Layer.extend({
    _movementSpeed:0,

    init:function(horizonImage, movementSpeed) {
        var bRet = false;
        if (this._super()) {
            this._movementSpeed = movementSpeed;
            for(var i=0;i<2;i++){
                var horizonSprite = cc.Sprite.create(horizonImage);
                horizonSprite.setAnchorPoint(cc.p(0,0));
                this.addChild(horizonSprite);
                if(i==0)
                    horizonSprite.setPosition(winSize.width / 2, horizonSprite.getContentSize().height/2);
                else
                    horizonSprite.setPosition(winSize.width+winSize.width / 2, horizonSprite.getContentSize().height/2);
            }
            bRet = true;
        }


        return bRet;
    },
    update : function()
    {
        for(var key in this._children){
            this._children[key].setPositionX(this._children[key].getPositionX() - LAYER_SPEED*this._movementSpeed);
            if(this._children[key].getPositionX()+winSize.width / 2<=0)
                this._children[key].setPosition(winSize.width+winSize.width / 2, this._children[key].getContentSize().height/2);
        }
    }
});

CommonParallaxLayer.create = function (horizonImage, movementSpeed) {
    var sg = new CommonParallaxLayer();
    if (sg && sg.init(horizonImage, movementSpeed)) {
        return sg;
    }
    return null;
};