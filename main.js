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

        var url = URL+'api/user/'+PLAYERID+'/details';
        GetDataUsingXmlHttpRequest(url, function(){
            var userInfo = {level:1,game_level:1};
            if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
                try{
                    userInfo = JSON.parse(XmlHttp.responseText);
                }
                catch(e) {
                    alert("Network Connectivity Issue: Unable to get your level");
                }
            }
            else
                alert("Network Connectivity Issue: Unable to get your level");

            PLAYERLEVEL = userInfo.level;
            PLAYERCURRENTLOCATION = userInfo.game_level ? userInfo.game_level : 1;
        })

        cc.LoaderScene.preload(g_splashScreen, function () {
            var scene = cc.Scene.create();
            scene.addChild(SplashLayer.create());
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
    try{
        XmlHttp.send(null);
    }
    catch(e){}
}