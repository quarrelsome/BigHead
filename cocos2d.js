var MW = MW || {};

(function () {
    var d = document;
    var c = {

        menuType:'canvas',
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:false,
        showFPS:true,
        loadExtension:true,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
 
        engineDir:'./Platform/HTML5/cocos2d/',
        appFiles:[
			'./Src/HomeLayer.js',
			'./Src/CloudParallaxLayer.js',
            './Src/InterchangeableParallaxLayer.js',
            './Src/CommonParallaxLayer.js',
            './Src/BuildingParallaxLayer.js',
			'./Src/ScoreLayer.js',
			'./Src/GameLayer.js',
			'./Src/Player.js',
			'./Src/resource.js',
			'./Src/config/GameConfig.js',
			'./Src/Enemy.js',
            './Src/GameOver.js',
            './Src/Effect.js',
            './Src/GameControlMenu.js'
        ]
    };
 
    window.addEventListener('DOMContentLoaded', function () {
        var s = d.createElement('script');
 
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }        
 
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        d.body.appendChild(s);
    });
})();