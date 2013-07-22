var StagesLayer = cc.Layer.extend({

    init:function() {
        var bRet = false;
        if (this._super()) {
            var staticBackgroundTexture = cc.TextureCache.getInstance().addImage(s_splashBg);
            var staticBackground = cc.Sprite.createWithTexture(staticBackgroundTexture);
            staticBackground.setPosition(winSize.width/2,winSize.height/2);
            this.addChild(staticBackground);

            var sunburstTexture = cc.TextureCache.getInstance().addImage(s_splashSunburst);
            var sunburst = cc.Sprite.createWithTexture(sunburstTexture);
            sunburst.setPosition(winSize.width/2,winSize.height/2);
            sunburst.setScale(2);
            this.addChild(sunburst);

            var mapWindowTexture = cc.TextureCache.getInstance().addImage(s_mapWindow);
            var mapWindow = cc.Sprite.createWithTexture(mapWindowTexture);
            mapWindow.setPosition(winSize.width/2,winSize.height/2);
            this.addChild(mapWindow);

            var worldMapTexture = cc.TextureCache.getInstance().addImage(s_mapWorld);
            var worldMap = cc.Sprite.createWithTexture(worldMapTexture);
            worldMap.setPosition(winSize.width/2,winSize.height/2);
            this.addChild(worldMap);

            var logoTexture = cc.TextureCache.getInstance().addImage(s_mapLogo);
            var logo = cc.Sprite.createWithTexture(logoTexture);
            logo.setPosition(winSize.width/2,winSize.height/2-250);
            this.addChild(logo);

            var mapTextTexture = cc.TextureCache.getInstance().addImage(s_mapWorldTxt);
            var mapText = cc.Sprite.createWithTexture(mapTextTexture);
            mapText.setPosition(winSize.width/2,winSize.height/2+275);
            this.addChild(mapText);

            for(var i=0;i<GAMEMAXLEVEL;i++){
                var locationDetails = g_locations[i];
                if(i<PLAYERCURRENTLOCATION){
                    var locationTexture = cc.TextureCache.getInstance().addImage(s_mapCompletedLevel);
                    var location = cc.Sprite.createWithTexture(locationTexture);
                    location.setPosition(locationDetails.map.position[0],locationDetails.map.position[1]);
                    this.addChild(location)

                    var locationNameTexture = cc.TextureCache.getInstance().addImage(s_mapLocation1Name);
                    var locationName = cc.Sprite.createWithTexture(locationNameTexture);
                    locationName.setPosition(locationDetails.map.position[0]+location.getContentSize().width+35,locationDetails.map.position[1]);
                    this.addChild(locationName)
                }
                else if(i==PLAYERCURRENTLOCATION){
                    var newGameNormal = cc.Sprite.create(s_mapCurrentLevel);
                    var newGameSelected = cc.Sprite.create(s_mapCurrentLevelPressed);
                    var newGameDisabled = cc.Sprite.create(s_mapCurrentLevelPressed);

                    var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled,this.stageOne,this);
                    var menu = cc.Menu.create(newGame);
                    this.addChild(menu);
                    menu.setPosition(locationDetails.map.position[0],locationDetails.map.position[1]);

                    locationNameTexture = cc.TextureCache.getInstance().addImage(s_mapLocation1Name);
                    locationName = cc.Sprite.createWithTexture(locationNameTexture);
                    locationName.setPosition(locationDetails.map.position[0]+newGameNormal.getContentSize().width+35,locationDetails.map.position[1]);
                    this.addChild(locationName)
                }
                else{
                    var locationTexture = cc.TextureCache.getInstance().addImage(s_mapLockedLevel);
                    var location = cc.Sprite.createWithTexture(locationTexture);
                    location.setPosition(locationDetails.map.position[0],locationDetails.map.position[1]);
                    this.addChild(location)

                    var locationNameTexture = cc.TextureCache.getInstance().addImage(s_mapLocation1Name);
                    var locationName = cc.Sprite.createWithTexture(locationNameTexture);
                    locationName.setPosition(locationDetails.map.position[0]+location.getContentSize().width+35,locationDetails.map.position[1]);
                    this.addChild(locationName)
                }
            }



            cc.AudioEngine.getInstance().setMusicVolume(0.5);
            cc.AudioEngine.getInstance().playMusic(s_mapMusic, true);
            bRet = true;
        }

        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },

    stageOne:function (sender) {
        cc.Loader.preload(g_mainmenu, function () {
            scene = cc.Scene.create();
            scene.addChild(HomeLayer.create(scene));
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, scene));
        }, this);
    }
})

StagesLayer.create = function () {
    var sg = new StagesLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};