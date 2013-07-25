var GameControlMenu = cc.Layer.extend({

    _gameSate:0,
    _tag: 100,
    lbScore: null,
    _healthBar: null,
    lbQuestion: null,
    _pauseLayer: null,
    _lbQuestionTitle: null,

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
            healthContainer.setPosition((healthContainer.getContentSize().width/2)+24,winSize.height-60);
            this.addChild(healthContainer);

            this._healthBar = cc.Sprite.create(s_healthBar);
            this._healthBar.setAnchorPoint(cc.p(0,0.5));
            this._healthBar.setPosition(this._healthBar.getContentSize().width/2,winSize.height-57);
            this.addChild(this._healthBar);

            var targetNumberContainer = cc.Sprite.create(s_targetNumberContainer);
            targetNumberContainer.setPosition(targetNumberContainer.getContentSize().width/2+427,winSize.height-(targetNumberContainer.getContentSize().height/2));
            this.addChild(targetNumberContainer);

            this.lbScore = cc.LabelBMFont.create("0", s_scoreFont);
            this.addChild(this.lbScore);
            this.lbScore.setPosition(160 , winSize.height - 20);

//            this.lbQuestion = cc.LabelBMFont.create("0", s_scoreFontHd);
//            this.addChild(this.lbQuestion);
//            this.lbQuestion.setPosition(487 , winSize.height - 40);

            this._lbQuestionTitle = cc.LabelBMFont.create("", s_scoreFontHd);
            this._lbQuestionTitle.setScale(2);
            this._lbQuestionTitle.setPosition(winSize.width/2 , winSize.height/2);
            this.addChild(this._lbQuestionTitle);

            bRet = true;
        }
        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },
    update: function(dt, gameUpdates){
        //cc.log("hud layer");
        this.lbScore.setString(gameUpdates.score);
        this._healthBar.setScaleX(gameUpdates.health/100);
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
        PostDataUsingXmlHttpRequest(this.lbScore.getString());
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create(scene));
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, scene));
    },

    onMenu:function (pSender) {
        PostDataUsingXmlHttpRequest(this.lbScore.getString());
        var scene = cc.Scene.create();
        scene.addChild(HomeLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
    },
    setQuestionTitle:function(questionTitle){
        this._lbQuestionTitle.setPosition(winSize.width/2 , winSize.height/2);
        this._lbQuestionTitle.setScale(2);
        this._lbQuestionTitle.setString(questionTitle);

        this._lbQuestionTitle.runAction(cc.Sequence.create(cc.MoveTo.create(2, cc.p(winSize.width/2+5, winSize.height - 45)),
            cc.CallFunc.create(function() {
                this._lbQuestionTitle.setScale(1);
            }, this)
        ));
    }
});

GameControlMenu.create = function (gameState) {
    var sg = new GameControlMenu();
    if (sg && sg.init(gameState)) {
        return sg;
    }
    return null;
};
