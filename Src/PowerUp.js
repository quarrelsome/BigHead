var PowerUp = cc.Sprite.extend({
    displacementTop: 0,
    verticalSpeed: 200,

    ctor: function() {
        this._super();
        this.initWithFile(s_explosion);
    },

    update: function(dt) {
        this.verticalMovement(dt);
    },

    verticalMovement: function (dt) {
        if (this.displacementDirection == 0) {
            var positionY = this.getPositionY() + dt * this.verticalSpeed;
            if ((positionY > winSize.height - this.getContentSize().height/2)) {
                cc.log('moveUp');
                this.displacementDirection = 1;
            }
            else {
                this.setPositionY(positionY);
            }
        }
        else {
            positionY = this.getPositionY() - dt * this.verticalSpeed;
            if ((positionY < this.getContentSize().height/2)) {
                cc.log('moveDown');
                this.displacementDirection = 0;
            }
            else {
                this.setPositionY(positionY);
            }
        }
    }
});