var GameControlMenu = cc.Layer.extend({

    _gameSate:0,
    lbScore: null,
    _healthBar: null,
    lbQuestion: null,
    _previousScale: 1,
    _currentScale: 1,
    _pauseLayer: null,

    init:function (gameState) {
        var bRet = false;
        if (this._super()) {
            this._gameSate = gameState;

            var pauseButton = cc.Sprite.create(s_pauseButton);
            var pauseButtonSelected = cc.Sprite.create(s_pauseButton);
            var pauseButtonDisabled = cc.Sprite.create(s_pauseButton);
            var item1_pause = cc.MenuItemSprite.create(pauseButton,pauseButtonSelected,pauseButtonDisabled,this.onPause,this);
            var menu = cc.Menu.create(item1_pause);
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

            this.lbQuestion = cc.LabelBMFont.create("0", s_scoreFontHd);
            this.addChild(this.lbQuestion);
            this.lbQuestion.setPosition(487 , winSize.height - 40);

            bRet = true;
        }
        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },
    update: function(dt, gameUpdates){
        this.lbScore.setString(gameUpdates.score);
        this._currentScale = gameUpdates.health/100;
        this._healthBar.setScaleX(this._currentScale);
//        if(this._previousScale!=this._currentScale){
//            this._healthBar.setPositionX(120-(120*(1-gameUpdates.health/120)));
//            cc.log(this._healthBar.getPosition());
//            this._previousScale = this._currentScale;
//        }

        return this._gameSate;
    },

    initPauseLayer: function(){
        this._pauseLayer = cc.Layer.create();
        var staticBackground = cc.Sprite.create(s_pauseScreenBackground);
        staticBackground.setAnchorPoint(cc.p(0,0));
        this._pauseLayer.addChild(staticBackground);

        var pauseWindow = cc.Sprite.create(s_pauseScreenWindow);
        pauseWindow.setAnchorPoint(cc.p(0,0));
        pauseWindow.setPosition(180,100);
        this._pauseLayer.addChild(pauseWindow);

        var pauseTitle = cc.Sprite.create(s_pauseTitle);
        pauseTitle.setAnchorPoint(cc.p(0,0));
        pauseTitle.setPosition(333,433);
        this._pauseLayer.addChild(pauseTitle);

        var resumeButton = cc.Sprite.create(s_pauseScreenResumeBtn);
        var resumeButtonSelected = cc.Sprite.create(s_pauseScreenResumeBtnPress);
        var resumeButtonDisabled = cc.Sprite.create(s_pauseScreenResumeBtnPress);
        var item_resume = cc.MenuItemSprite.create(resumeButton,resumeButtonSelected,resumeButtonDisabled,this.onPause,this);

        var restartButton = cc.Sprite.create(s_pauseScreenRestartBtn);
        var restartButtonSelected = cc.Sprite.create(s_pauseScreenRestartBtnPress);
        var restartButtonDisabled = cc.Sprite.create(s_pauseScreenRestartBtnPress);
        var item_restart = cc.MenuItemSprite.create(restartButton,restartButtonSelected,restartButtonDisabled,this.onRestart,this);

        var menuButton = cc.Sprite.create(s_pauseScreenMenuBtn);
        var menuButtonSelected = cc.Sprite.create(s_pauseScreenMenuBtnPress);
        var menuButtonDisabled = cc.Sprite.create(s_pauseScreenMenuBtnPress);
        var item_menu = cc.MenuItemSprite.create(menuButton,menuButtonSelected,menuButtonDisabled,this.onMenu,this);

        var menu = cc.Menu.create(item_resume,item_restart, item_menu);
        menu.setAnchorPoint(cc.p(0,0));
        menu.setPosition(475,270);
        menu.alignItemsVertically();
        this._pauseLayer.addChild(menu);

        this.addChild(this._pauseLayer);

    },

    onPause:function (sender) {
        if (this._gameSate == STATE_PAUSED){
            this._gameSate = STATE_PLAYING;
            this._pauseLayer.removeFromParent(true);
        }
        else{
            this.initPauseLayer();
            this._gameSate = STATE_PAUSED;
        }
    },

    onRestart:function(sender){
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create(scene));
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, scene));
    },

    onMenu:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(HomeLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },
    setQuestion:function(question){
        this.lbQuestion.setString(question);
    }
});

GameControlMenu.create = function (gameState) {
    var sg = new GameControlMenu();
    if (sg && sg.init(gameState)) {
        return sg;
    }
    return null;
};
