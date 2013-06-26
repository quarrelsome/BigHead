var CloudParallaxLayer = cc.Layer.extend({
    _movementSpeed:0,

    init:function(cloudImages, movementSpeed) {
        var bRet = false;
        if (this._super()) {
            this._movementSpeed = movementSpeed;
            for(var key in cloudImages){
                var cloudSprite = cc.Sprite.create(cloudImages[key].src);
                cloudSprite.setAnchorPoint(cc.p(0,0));
                cloudSprite.setPosition(getRandomInt(0,winSize.width-200),getRandomInt(winSize.height/2,winSize.height));
                this.addChild(cloudSprite);
            }
            bRet = true;
        }


        return bRet;
    },
    update : function()
    {
        for(var key in this._children){
            this._children[key].setPositionX(this._children[key].getPositionX() - 100.0*this._movementSpeed);
            if(this._children[key].getPositionX()+this._children[key].getContentSize().width<=0)
                this._children[key].setPosition(winSize.width+(this._children[key].getContentSize().width/3),getRandomInt(winSize.height/2,winSize.height));
        }
    }
});

CloudParallaxLayer.create = function (cloudImages, movementSpeed) {
    var sg = new CloudParallaxLayer();
    if (sg && sg.init(cloudImages, movementSpeed)) {
        return sg;
    }
    return null;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

