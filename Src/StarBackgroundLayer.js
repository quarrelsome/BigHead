var StarBackgroundLayer = cc.LayerColor.extend({
	background:0,
	background2:0,
	
    init:function() {
        var bRet = false;
        if (this._super()) {
            this.background = cc.Sprite.create(s_star_background);
            this.background.setAnchorPoint(cc.p(0.0,0.0));
            this.background.setPosition(0,0);
            this.addChild(this.background);

            this.background2 = cc.Sprite.create(s_star_background);
            this.background2.setAnchorPoint(cc.p(0.0,0.0));
            this.background2.setPosition(960,0);
            this.addChild(this.background2);

            this.scheduleUpdate();

            bRet = true;
        }

		return bRet;
	},
	update : function(dt)
	{
		this.background.setPositionX(this.background.getPositionX() - 50.0*dt);

		if(this.background.getPositionX() + this.background.getContentSize().width <= 0)
		{
			this.background.setPositionX(960);
		}

		this.background2.setPositionX(this.background2.getPositionX() - 50.0*dt);

		if(this.background2.getPositionX()+ this.background2.getContentSize().width <= 0)
		{
			this.background2.setPositionX(960);
		}
	}
});

StarBackgroundLayer.create = function () {
	var sg = new StarBackgroundLayer();
	if (sg && sg.init()) {
		return sg;
	}
	return null;
};
