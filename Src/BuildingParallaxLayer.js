var BuildingParallaxLayer = cc.Layer.extend({
    _level:1,
    _buildings:null,
    _screenWidth:0,

    init:function(buildings,movementSpeed) {
        var bRet = false;
        if (this._super()) {
            this._buildings = buildings;

            while(this._screenWidth<=(winSize.width+winSize.width/2)){
                this._screenWidth = this._screenWidth + this.createBuilding();
            }

            bRet = true;
        }


        return bRet;
    },
    update : function(layerMovementSpeed)
    {
        this.setPositionX(this.getPositionX() - layerMovementSpeed);
    },
    createBuilding: function(){
        var buildings = this._buildings["location"+this._level];
        var buildingSprite = cc.Sprite.create(buildings[getRandomInt(0,8)]);
        buildingSprite.setAnchorPoint(cc.p(0,0));
        buildingSprite.setPosition(this._screenWidth,0);
        this.addChild(buildingSprite);
        return buildingSprite.getContentSize().width;
    }
});

BuildingParallaxLayer.create = function (buildings,movementSpeed) {
    var sg = new BuildingParallaxLayer();
    if (sg && sg.init(buildings)) {
        return sg;
    }
    return null;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


