var BuildingParallaxLayer = cc.Layer.extend({
    _level:1,
    _buildings:null,
    _screenWidth:0,
    _skyChangeFactor: 0,
    _skyCurrentFactor: 0,
    _landMarkPlacementChangeFactor: 0,
    _landMarkPlacementCurrentFactor: 0,

    init:function(buildings,skyChangeFactor,landMarkPlacementFactor) {
        var bRet = false;
        if (this._super()) {
            this._buildings = buildings;
            this._skyChangeFactor = skyChangeFactor;
            this._skyCurrentFactor = skyChangeFactor;
            this._landMarkPlacementChangeFactor = landMarkPlacementFactor;
            this._landMarkPlacementCurrentFactor = landMarkPlacementFactor;

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
        if(distanceTravelled>this._skyCurrentFactor){
            this._skyCurrentFactor = this._skyCurrentFactor + this._skyChangeFactor;
            this._level+=1;
        }
        for(var key in this._children){
            var child = this._children[key];
            if(child.getPositionX()+child.getContentSize().width+this.getPositionX()<=0){
                this.removeChild(child);
                if(distanceTravelled>this._landMarkPlacementCurrentFactor){
                    this._landMarkPlacementCurrentFactor = this._landMarkPlacementCurrentFactor + this._landMarkPlacementChangeFactor;
                    this._screenWidth = this._screenWidth + this.createSpecialBuilding();
                }
                else
                    this._screenWidth = this._screenWidth + this.createBuilding();
            }
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
    },
    createSpecialBuilding: function(){
        var buildings = this._buildings["location"+this._level+"special"];
        var buildingTexture = cc.TextureCache.getInstance().addImage(buildings[getRandomInt(0,buildings.length-1)]);
        var buildingSprite = cc.Sprite.createWithTexture(buildingTexture);
        buildingSprite.setAnchorPoint(cc.p(0,0));
        buildingSprite.setPosition(this._screenWidth,0);
        this.addChild(buildingSprite);
        return buildingSprite.getContentSize().width;
    }
});

BuildingParallaxLayer.create = function (buildings,skyChangeFactor, landMarkPlacementFactor) {
    var sg = new BuildingParallaxLayer();
    if (sg && sg.init(buildings, skyChangeFactor, landMarkPlacementFactor)) {
        return sg;
    }
    return null;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


