var GameControlMenu = cc.Layer.extend({

    _gameSate:0,
    lbScore: null,
    _lbPlayerLife: null,
    _lbtravelledDistance: null,

    init:function (gameState) {
        var bRet = false;
        if (this._super()) {
            cc.MenuItemFont.setFontSize(18);
            cc.MenuItemFont.setFontName("Arial");
            var systemMenu = cc.MenuItemFont.create("Quit", this.onSysMenu);
            var item1_pause = cc.MenuItemFont.create("Pause");
            var item1_resume = cc.MenuItemFont.create("Resume");
            var item1 = cc.MenuItemToggle.create(item1_pause, item1_resume);
            item1.setCallback(this.onPause, this);
            var menu = cc.Menu.create(item1,systemMenu);
            menu.alignItemsVertically();
            //menu.setAnchorPoint(cc.p(0, 0));
            menu.setPosition(winSize.width-95, 50);
            this.addChild(menu);

            this.lbScore = cc.LabelTTF.create("Score: 0", "Arial", 20);
            this.lbScore.setColor(cc.c3b(0, 0, 0));
            this.addChild(this.lbScore);
            this.lbScore.setPosition(winSize.width - 900 , winSize.height - 30);

            this._lbPlayerLife = cc.LabelTTF.create("Player Life: 0", "Arial", 20);
            this._lbPlayerLife.setColor(cc.c3b(0, 0, 0));
            this.addChild(this._lbPlayerLife);
            this._lbPlayerLife.setPosition(winSize.width - 750 , winSize.height - 30);

            this._lbtravelledDistance = cc.LabelTTF.create("Distance Travelled: 0", "Arial", 20);
            this._lbtravelledDistance.setColor(cc.c3b(0, 0, 0));
            this.addChild(this._lbtravelledDistance);
            this._lbtravelledDistance.setPosition(winSize.width - 450 , winSize.height - 30);

            this._gameSate = gameState;
            bRet = true;
        }
        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },
    update: function(dt, gameUpdates){
        this.lbScore.setString("Score: " + gameUpdates.score);
        this._lbPlayerLife.setString("Player Life: "+gameUpdates.health);
        this._lbtravelledDistance.setString("Distance Travelled: "+gameUpdates.travelledDistance/1000+" KM");
        return this._gameSate;
    },

    onPause:function (sender) {
        if (this._gameSate == STATE_PAUSED)
            this._gameSate = STATE_PLAYING;
        else
            this._gameSate = STATE_PAUSED;
    },
    onSysMenu:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(HomeLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2,scene));
    }
});

GameControlMenu.create = function (gameState) {
    var sg = new GameControlMenu();
    if (sg && sg.init(gameState)) {
        return sg;
    }
    return null;
};
