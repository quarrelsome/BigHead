var InterchangeableParallaxLayer = cc.Layer.extend({
    _skyImages:[],

    init:function(skyImages) {
        var bRet = false;
        if (this._super()) {
            this._skyImages = skyImages;
            var skySprite = cc.Sprite.create(this._skyImages[0].src);
            skySprite.setAnchorPoint(cc.p(0,0));
            skySprite.setPosition(winSize.width / 2, winSize.height / 2);
            this.addChild(skySprite);
            bRet = true;
        }


        return bRet;
    },
    update : function()
    {
//        for(var key in this._children){
//            this._children[key].setPositionX(this._children[key].getPositionX() - 100.0*this._movementSpeed);
//            if(this._children[key].getPositionX()+this._children[key].getContentSize().width<=0)
//                this._children[key].setPosition(winSize.width+(this._children[key].getContentSize().width/3),getRandomInt(winSize.height/2,winSize.height));
//        }
    }
});

InterchangeableParallaxLayer.create = function (skyImages) {
    var sg = new InterchangeableParallaxLayer();
    if (sg && sg.init(skyImages)) {
        return sg;
    }
    return null;
};
