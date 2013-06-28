var CloudParallaxLayer = cc.Layer.extend({

    init:function(cloudImages, movementSpeed) {
        var bRet = false;
        if (this._super()) {
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
    update : function(layerMovementSpeed)
    {
        for(var key in this._children){
            this._children[key].setPositionX(this._children[key].getPositionX() - layerMovementSpeed);
            if(this._children[key].getPositionX()+this._children[key].getContentSize().width<=0)
                this._children[key].setPosition(winSize.width+(this._children[key].getContentSize().width/3),getRandomInt(winSize.height/2,winSize.height));
        }
    }
});

CloudParallaxLayer.create = function (cloudImages) {
    var sg = new CloudParallaxLayer();
    if (sg && sg.init(cloudImages)) {
        return sg;
    }
    return null;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

