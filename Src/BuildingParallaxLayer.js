var BuildingParallaxLayer = cc.Layer.extend({
    _level:1,
    _buildings:null,
    _screenWidth:0,
    _skyChangeFactor: 0,
    _skyCurrentFactor: 0,

    init:function(buildings,skyChangeFactor) {
        var bRet = false;
        if (this._super()) {
            this._buildings = buildings;
            this._skyChangeFactor = skyChangeFactor;
            this._skyCurrentFactor = skyChangeFactor;

            while(this._screenWidth<=(winSize.width+winSize.width/2)){
                this._screenWidth = this._screenWidth + this.createBuilding();
            }

            bRet = true;
        }


        return bRet;
    },
    update : function(layerMovementSpeed,distanceTravelled)
    {
        this.setPositionX(this.getPositionX() - layerMovementSpeed);
        var check = false;
        for(var key in this._children){
            var child = this._children[key];
            if(child.getPositionX()+child.getContentSize().width+this.getPositionX()<=0){
                this.removeChild(child);
                this._screenWidth = this._screenWidth + this.createBuilding();
            }
        }
//        if(check)
//            this._screenWidth = this._screenWidth + this.createBuilding();

        if(distanceTravelled>this._skyCurrentFactor){
            this._skyCurrentFactor = this._skyCurrentFactor + this._skyChangeFactor;
            this._level+=1;
        }
    },
    createBuilding: function(){
        var buildings = this._buildings["location"+this._level];
        var buildingTexture = cc.TextureCache.getInstance().addImage(buildings[getRandomInt(0,buildings.length-1)]);
        var buildingSprite = cc.Sprite.createWithTexture(buildingTexture);
        buildingSprite.setAnchorPoint(cc.p(0,0));
        buildingSprite.setPosition(this._screenWidth,0);
        this.addChild(buildingSprite);
        return buildingSprite.getContentSize().width;
    }
});

BuildingParallaxLayer.create = function (buildings,skyChangeFactor) {
    var sg = new BuildingParallaxLayer();
    if (sg && sg.init(buildings, skyChangeFactor)) {
        return sg;
    }
    return null;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


