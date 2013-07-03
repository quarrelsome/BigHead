var GameControlMenu = cc.Layer.extend({

    _gameSate:0,

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
            menu.setAnchorPoint(cc.p(0, 0));
            menu.setPosition(winSize.width-95, 50);
            this.addChild(menu);
            this._gameSate = gameState;
            bRet = true;
        }

        return bRet;
    },
    update: function(dt){
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
