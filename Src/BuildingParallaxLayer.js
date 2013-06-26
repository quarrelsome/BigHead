var BuildingParallaxLayer = cc.Layer.extend({
    _movementSpeed:0,
    _level:1,
    _buildings:null,
    _screenWidth:0,

    init:function(buildings,movementSpeed) {
        var bRet = false;
        if (this._super()) {
            this._movementSpeed = movementSpeed;
            this._buildings = buildings;

            //while(this._screenWidth<=(winSize.width+winSize.width/2)){
                var buildings = this._buildings["location"+this._level];
                //alert(buildings[getRandomInt(1,2)]);
                var buildingSprite = cc.Sprite.create(s_enemy1);
                //buildingSprite.setAnchorPoint(cc.p(0,0));
            alert(buildingSprite.getContentSize().height);
                //buildingSprite.setPosition(this._screenWidth+200,200);
                //this.addChild(buildingSprite);
                //this._screenWidth = this._screenWidth + buildingSprite.getContentSize().width;
                //alert(this._screenWidth+" "+(winSize.width+winSize.width/2)+" "+buildingSprite.getContentSize().width)
            //}

            bRet = true;
        }


        return bRet;
    },
    update : function(distance)
    {
        for(var key in this._children){
            this._children[key].setPositionX(this._children[key].getPositionX() - 100.0*this._movementSpeed);
            if(this._children[key].getPositionX()+this._children[key].getContentSize().width<=0)
                this._children[key].setPosition(winSize.width+(this._children[key].getContentSize().width/3),getRandomInt(winSize.height/2,winSize.height));
        }
    }
});

BuildingParallaxLayer.create = function (buildings,movementSpeed) {
    var sg = new BuildingParallaxLayer();
    if (sg && sg.init(buildings,movementSpeed)) {
        return sg;
    }
    return null;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


