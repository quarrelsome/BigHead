var GameOver = cc.Layer.extend({

    _won:false,

    init: function(){
        var bRet = false;
        if (this._super()) {
            var message;
            if (this._won) {
                message = "You Won!";
            } else {
                message = "You Lose :[";
            }

            var label = cc.LabelTTF.create(message, "Arial", 32);
            label.setColor(cc.c3b(255, 255, 255));
            label.setPosition(winSize.width/2, winSize.height/2);
            this.addChild(label);

            cc.MenuItemFont.setFontSize(18);
            cc.MenuItemFont.setFontName("Arial");
            var systemMenu = cc.MenuItemFont.create("Replay Game", this.onSysMenu);
            var menu = cc.Menu.create(systemMenu);
            //menu.setAnchorPoint(cc.p(0, 0));
            menu.setPosition(winSize.width/2, winSize.height/2-100);
            this.addChild(menu);

            bRet = true;
        }
        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    },

    onSysMenu:function (pSender) {
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