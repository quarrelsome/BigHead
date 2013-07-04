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

            bRet = true;
        }
        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
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