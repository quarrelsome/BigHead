var GameOver = cc.Layer.extend({

    _won:false,

    init: function(){
        var bRet = false;
        if (this._super()) {

            //raheel you can change music from here just replace the file.
            cc.AudioEngine.getInstance().setMusicVolume(0.5);
            //cc.AudioEngine.getInstance().playMusic(s_mainMainMusic, true);

            var staticBackground = cc.Sprite.create(s_menuBackground);
            staticBackground.setAnchorPoint(cc.p(0,0));
            this.addChild(staticBackground);

            var pauseWindow = cc.Sprite.create(s_pauseScreenWindow);
            pauseWindow.setAnchorPoint(cc.p(0,0));
            pauseWindow.setPosition(180,100);
            this.addChild(pauseWindow);

            var pauseTitle = cc.Sprite.create(s_gameOverTitle);
            pauseTitle.setAnchorPoint(cc.p(0,0));
            pauseTitle.setPosition(290,433);
            pauseTitle.setScale(1.2);
            this.addChild(pauseTitle);

            var restartButton = cc.Sprite.create(s_pauseScreenRestartBtn);
            var restartButtonSelected = cc.Sprite.create(s_pauseScreenRestartBtnPress);
            var restartButtonDisabled = cc.Sprite.create(s_pauseScreenRestartBtnPress);
            var item_restart = cc.MenuItemSprite.create(restartButton,restartButtonSelected,restartButtonDisabled,this.onRestart,this);

            if (this._won) {
                var message = cc.Sprite.create(s_gameOverWin);
                message.setAnchorPoint(cc.p(0,0));
                message.setPosition(335,240);
                this.addChild(message);
            } else {
                var message = cc.Sprite.create(s_gameOverLost);
                message.setAnchorPoint(cc.p(0,0));
                message.setPosition(335,240);
                this.addChild(message);
            }

            var menu = cc.Menu.create(item_restart);
            menu.setAnchorPoint(cc.p(0,0));
            menu.setPosition(475,200);
            this.addChild(menu);

            bRet = true;
        }
        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },

    onRestart:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create(scene));
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, scene));
    }
});

GameOver.create = function (won) {
    var sg = new GameOver();
    sg._won = won;
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};