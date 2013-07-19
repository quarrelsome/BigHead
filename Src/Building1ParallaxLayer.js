var Building1ParallaxLayer = cc.Layer.extend({
    _buildings:null,
    _repeatDistance: 0,
    _screenWidth:0,

    init:function(buildings, repeatDistance) {
        var bRet = false;
        if (this._super()) {
            this._buildings = buildings;
            this._repeatDistance = repeatDistance;
            while(this._screenWidth<=(winSize.width+winSize.width/2)){
                this._screenWidth = this._screenWidth + this.createBuilding() + this._repeatDistance;
            }

            bRet = true;
        }

        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },
    update : function(layerMovementSpeed)
    {
        this.setPositionX(this.getPositionX() - layerMovementSpeed);
        for(var key in this._children){
            var child = this._children[key];
            if(child.getPositionX()+child.getContentSize().width+this.getPositionX()<=0){
                this.removeChild(child);
                this._screenWidth = this._screenWidth + this.createBuilding()  + this._repeatDistance;
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
    }
});

Building1ParallaxLayer.create = function (buildings, repeatDistance) {
    var sg = new Building1ParallaxLayer();
    if (sg && sg.init(buildings, repeatDistance)) {
        return sg;
    }
    return null;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


