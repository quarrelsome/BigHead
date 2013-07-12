var HomeLayer = cc.Layer.extend({
	player: 0,
	winSize: 0,
	
	init:function() {
        var bRet = false;
        if (this._super()) {
            cc.SpriteFrameCache.getInstance().addSpriteFrames(s_menuPlist);

            winSize = cc.Director.getInstance().getWinSize();
            var sp = cc.Sprite.create(s_menuBackground);
            sp.setAnchorPoint(cc.p(0,0));
            this.addChild(sp);

            var sunburst = cc.Sprite.createWithSpriteFrameName("BH-MM-Sunburst.png");
            //sunburst.set
            sunburst.setScale(2);
            sunburst.setPosition(winSize.width / 2,winSize.height / 2 - 20);
            this.addChild(sunburst);

            var menuWindow = cc.Sprite.createWithSpriteFrameName("BH-MM-window.png");
            menuWindow.setPosition(winSize.width / 2,winSize.height / 2 - 70);
            this.addChild(menuWindow);

            var logo = cc.Sprite.createWithSpriteFrameName("BH-MM-logo.png");
            logo.setPosition(winSize.width / 2,winSize.height / 2 + 210);
            this.addChild(logo);

            var title = cc.Sprite.createWithSpriteFrameName("BH-MM-Menu-text.png");
            title.setPosition(winSize.width / 2,winSize.height / 2 + 90);
            title.setScale(1.5);
            this.addChild(title);

            var newGameNormal = cc.Sprite.createWithSpriteFrameName("BH-MM-Start-BT.png");
            var newGameSelected = cc.Sprite.createWithSpriteFrameName("BH-MM-Start-BT-Press.png");
            var newGameDisabled = cc.Sprite.createWithSpriteFrameName("BH-MM-Start-BT-Press.png");

            var gameSettingsNormal = cc.Sprite.createWithSpriteFrameName("BH-MM-Instruct-BT.png");
            var gameSettingsSelected = cc.Sprite.createWithSpriteFrameName("BH-MM-Instruct-BT-press.png");
            var gameSettingsDisabled = cc.Sprite.createWithSpriteFrameName("BH-MM-Instruct-BT-press.png");

            var aboutNormal = cc.Sprite.createWithSpriteFrameName("BH-MM-Profile-BT.png");
            var aboutSelected = cc.Sprite.createWithSpriteFrameName("BH-MM-Profile-BT-Press.png");
            var aboutDisabled = cc.Sprite.createWithSpriteFrameName("BH-MM-Profile-BT-Press.png");

            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, function () {
                this.onButtonEffect();
                flareEffect(this, this, this.onNewGame);
            }.bind(this));
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVertically();
            this.addChild(menu);
            menu.setPosition(winSize.width / 2, winSize.height / 2 - 90);
            this.schedule(this.update, 0.1);

            cc.AudioEngine.getInstance().setMusicVolume(0.5);
            cc.AudioEngine.getInstance().playMusic(s_mainMainMusic, true);
            bRet = true;
        }
        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },

    onNewGame:function (pSender) {
        //load resources
        cc.Loader.preload(g_ressources, function () {
            var scene = cc.Scene.create();
            scene.addChild(GameLayer.create(scene));
            cc.AudioEngine.getInstance().setMusicVolume(0.2);
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, scene));
        }, this);
    },
    onSettings:function (pSender) {
//        this.onButtonEffect();
//        var scene = cc.Scene.create();
//        scene.addChild(SettingsLayer.create());
//        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    onAbout:function (pSender) {
//        this.onButtonEffect();
//        var scene = cc.Scene.create();
//        scene.addChild(AboutLayer.create());
//        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    onButtonEffect:function(){
        if (MW.SOUND) {
            cc.AudioEngine.getInstance().playEffect(s_buttonEffect_mp3);
        }
    }
});

HomeLayer.create = function () {
	var sg = new HomeLayer();
	if (sg && sg.init()) {
		return sg;
	}
	return null;
};