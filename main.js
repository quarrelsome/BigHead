var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        var director = cc.Director.getInstance();

        cc.EGLView.getInstance().setDesignResolutionSize(960,640,cc.RESOLUTION_POLICY.SHOW_ALL);

        director.setDisplayStats(this.config['showFPS']);
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        cc.LoaderScene.preload(g_mainmenu, function () {
            director.replaceScene(new this.startScene());
        }, this);
        return true;
    }
});

var myApp = new cocos2dApp(HomeLayer.scene);