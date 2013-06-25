var Enemy = cc.Sprite.extend({
	
	speed: 100,
	fireSpeed: 900,
	tag: 11,
	
	ctor:function (enemyType) {
        this._super();

		var enemyTexture;
		switch (enemyType) {
			case 1: enemyTexture = cc.TextureCache.getInstance().addImage(s_enemy1); break;
			case 2: enemyTexture = cc.TextureCache.getInstance().addImage(s_enemy2); break;
		}
		 
        this.initWithTexture(enemyTexture);	
		this.setTag(this.tag);
	}
});