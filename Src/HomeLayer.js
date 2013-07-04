var HomeLayer = cc.Layer.extend({
	player: 0,
	winSize: 0,
	
	init:function() {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();
            var sp = cc.Sprite.create(s_splashScreen);
            sp.setAnchorPoint(cc.p(0,0));
            this.addChild(sp, 0, 1);

            var newGameNormal = cc.Sprite.create(s_menu, cc.rect(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(s_menu, cc.rect(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(s_menu, cc.rect(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(s_menu, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(s_menu, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(s_menu, cc.rect(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.create(s_menu, cc.rect(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(s_menu, cc.rect(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(s_menu, cc.rect(252, 33 * 2, 126, 33));

            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, function () {
                this.onButtonEffect();
                flareEffect(this, this, this.onNewGame);
            }.bind(this));
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(winSize.width / 2, winSize.height / 2 - 80);
            this.schedule(this.update, 0.1);

//            this._ship = cc.Sprite.create(s_enemy1);
//            this.addChild(this._ship, 0, 4);
//            var pos = cc.p(winSize.width-10, Math.random() * winSize.height);
//            this._ship.setPosition( pos );
//            this._ship.runAction(cc.MoveBy.create(5, cc.p(0-pos.x, pos.y + winSize.height + 100)));

            cc.AudioEngine.getInstance().setMusicVolume(0.5);
            cc.AudioEngine.getInstance().playMusic(s_mainMainMusic, true);
            bRet = true;

            sys.dumpRoot();
            sys.garbageCollect();
        }
        return bRet;
    },

    onNewGame:function (pSender) {
        //load resources
        cc.Loader.preload(g_ressources, function () {
            var scene = cc.Scene.create();
            scene.addChild(GameLayer.create(scene));
            cc.AudioEngine.getInstance().setMusicVolume(0.2);
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
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
    update:function () {
        //alert(JSON.stringify(this._ship.getPosition()));
//        if (this._ship.getPosition().y > 640) {
//            var pos = cc.p(Math.random() * winSize.width, 10);
//            this._ship.setPosition( pos );
//            this._ship.runAction( cc.MoveBy.create(
//                parseInt(5 * Math.random(), 10),
//                cc.p(Math.random() * winSize.width, pos.y + 640)));
//        }
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

HomeLayer.scene = function() {
	var scene = cc.Scene.create();
	var layer = HomeLayer.create();
	scene.addChild(layer);
	return scene;
};