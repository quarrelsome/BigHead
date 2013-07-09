var GameControlMenu = cc.Layer.extend({

    _gameSate:0,
    lbScore: null,
    _healthBar: null,

    init:function (gameState) {
        var bRet = false;
        if (this._super()) {
            cc.MenuItemFont.setFontSize(18);
            cc.MenuItemFont.setFontName("Arial");
            var pauseButton = cc.Sprite.create(s_pauseButton);
            var pauseButton3 = cc.Sprite.create(s_explosion);
            var item1_pause = cc.MenuItemSprite.create(pauseButton);
            var item1_resume = cc.MenuItemSprite.create(pauseButton3);
            var item1 = cc.MenuItemToggle.create(item1_pause, item1_resume);
            item1.setCallback(this.onPause, this);
            var menu = cc.Menu.create(item1);
            menu.setPosition(pauseButton.getContentSize().width/2, pauseButton.getContentSize().height/2);
            this.addChild(menu);

            var scoreContainer = cc.Sprite.create(s_scoreContainer);
            scoreContainer.setPosition(scoreContainer.getContentSize().width/2,winSize.height-(scoreContainer.getContentSize().height/2));
            this.addChild(scoreContainer);

            var healthContainer = cc.Sprite.create(s_healthContainer);
            healthContainer.setPosition((healthContainer.getContentSize().width/2)+10,winSize.height-(healthContainer.getContentSize().height+25));
            this.addChild(healthContainer);

            this._healthBar = cc.Sprite.create(s_healthBar);
            this._healthBar.setPosition(120,winSize.height-(this._healthBar.getContentSize().height+46));
            this.addChild(this._healthBar);

            var targetNumberContainer = cc.Sprite.create(s_targetNumberContainer);
            targetNumberContainer.setPosition(targetNumberContainer.getContentSize().width/2+430,winSize.height-(targetNumberContainer.getContentSize().height/2));
            this.addChild(targetNumberContainer);

            this.lbScore = cc.LabelBMFont.create("0", s_scoreFont);
            this.addChild(this.lbScore);
            this.lbScore.setPosition(160 , winSize.height - 20);

            this._gameSate = gameState;
            bRet = true;
        }
        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },
    update: function(dt, gameUpdates){
        this.lbScore.setString(gameUpdates.score);
        this._healthBar.setScaleX(gameUpdates.health/100);
        //this._healthBar.setPositionX(20);
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
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    }
});

GameControlMenu.create = function (gameState) {
    var sg = new GameControlMenu();
    if (sg && sg.init(gameState)) {
        return sg;
    }
    return null;
};
