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

        var url = URL+'api/user/1/details';
        GetDataUsingXmlHttpRequest(url, function(){
            var userInfo = {level:1};
            if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
                try{
                    userInfo = JSON.parse(XmlHttp.responseText);
                }
                catch(e) {
                    alert("Unable to get your level");
                }
            }
            else
                alert("Unable to get your level");

            PLAYERLEVEL = userInfo.level;
        })

        cc.LoaderScene.preload(g_mainmenu, function () {
            var scene = cc.Scene.create();
            scene.addChild(HomeLayer.create());
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,scene));
        }, this);
        return true;
    }
});

var myApp = new cocos2dApp(HomeLayer.scene);

function GetDataUsingXmlHttpRequest(url, callbackFunction){
    XmlHttp = new XMLHttpRequest();
    XmlHttp.open("GET", url, false);
    XmlHttp.onreadystatechange=callbackFunction;
    XmlHttp.send(null);
}