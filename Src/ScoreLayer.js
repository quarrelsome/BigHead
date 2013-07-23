var ScoreLayer = cc.LayerColor.extend({

	topBar: null,
	bottomBar: null,
	scoreText: null,
	livesText: null,
	
	ctor:function () {
		this._super();
		cc.associateWithNative(this, cc.LayerColor);
		
		this.topBar = cc.Sprite.create(s_top_bar);
		this.topBar.setPosition(winSize.width/2, winSize.height - this.topBar.getContentSize().height/2);
		this.addChild(this.topBar);
		
		this.bottomBar = cc.Sprite.create(s_bottom_bar);
		this.bottomBar.setPosition(winSize.width/2, this.bottomBar.getContentSize().height/2);
		this.addChild(this.bottomBar);
		
		this.scoreText = cc.Sprite.create(s_score_text);
		this.scoreText.setPosition(this.scoreText.getContentSize().width/2 + 10, winSize.height - this.scoreText.getContentSize().height);
		this.addChild(this.scoreText);
		
		this.livesText = cc.Sprite.create(s_lives_text);
		this.livesText.setPosition(5*winSize.width/6,  winSize.height - this.livesText.getContentSize().height);
		this.addChild(this.livesText);
	}
	
});

ScoreLayer.create = function () {
	var sg = new ScoreLayer();
	if (sg) {
		return sg;
	}
	return null;
};
