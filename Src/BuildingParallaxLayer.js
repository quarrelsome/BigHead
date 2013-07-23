var BuildingParallaxLayer = cc.Layer.extend({
    _buildings:null,
    _specialBuildings:null,
    _screenWidth:0,
    _landMarkPlacementChangeFactor: 0,
    _landMarkPlacementCurrentFactor: 0,
    _distanceBtwBuildings: 80,

    init:function(buildings,specialbuildings,landMarkPlacementFactor) {
        var bRet = false;
        if (this._super()) {
            this._buildings = buildings;
            this._specialBuildings = specialbuildings;
            this._landMarkPlacementChangeFactor = landMarkPlacementFactor;
            this._landMarkPlacementCurrentFactor = landMarkPlacementFactor;
            while(this._screenWidth<=(winSize.width+winSize.width)){
                this._screenWidth = this._screenWidth + this.createBuilding() + this._distanceBtwBuildings;
            }

            bRet = true;
        }

        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },
    update : function(layerMovementSpeed,distanceTravelled)
    {
        this.setPositionX(this.getPositionX() - layerMovementSpeed);
        for(var key in this._children){
            var child = this._children[key];
            if(child.getPositionX()+child.getContentSize().width+this.getPositionX()<=0){
                this.removeChild(child);
                if(distanceTravelled>this._landMarkPlacementCurrentFactor){
                    this._landMarkPlacementCurrentFactor = this._landMarkPlacementCurrentFactor + this._landMarkPlacementChangeFactor;
                    this._screenWidth = this._screenWidth + this.createSpecialBuilding() + this._distanceBtwBuildings;
                }
                else
                    this._screenWidth = this._screenWidth + this.createBuilding() + this._distanceBtwBuildings;
            }
        }
    },
    createBuilding: function(){
        //var buildings = this._buildings["location"+this._level];
        var buildingTexture = cc.TextureCache.getInstance().addImage(this._buildings[getRandomInt(0,this._buildings.length-1)]);
        var buildingSprite = cc.Sprite.createWithTexture(buildingTexture);
        buildingSprite.setAnchorPoint(cc.p(0,0));
        buildingSprite.setPosition(this._screenWidth,0);
        this.addChild(buildingSprite);
        return buildingSprite.getContentSize().width;
    },
    createSpecialBuilding: function(){
        //var buildings = this._buildings["location"+this._level+"special"];
        var buildingTexture = cc.TextureCache.getInstance().addImage(this._specialBuildings[getRandomInt(0,this._specialBuildings.length-1)]);
        var buildingSprite = cc.Sprite.createWithTexture(buildingTexture);
        buildingSprite.setAnchorPoint(cc.p(0,0));
        buildingSprite.setPosition(this._screenWidth,0);
        this.addChild(buildingSprite);
        return buildingSprite.getContentSize().width;
    }
});

BuildingParallaxLayer.create = function (buildings, specialBuildings, landMarkPlacementFactor) {
    var sg = new BuildingParallaxLayer();
    if (sg && sg.init(buildings, specialBuildings, landMarkPlacementFactor)) {
        return sg;
    }
    return null;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


