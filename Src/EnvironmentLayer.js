var EnvironmentLayer = cc.Layer.extend({

    init:function(environment) {
        var bRet = false;
        if (this._super()) {
            var emitter = cc.ParticleSystem.create(environment);
            emitter.setAnchorPoint(cc.p(0,0));
            emitter.setPositionType(cc.PARTICLE_TYPE_FREE);
            this.addChild(emitter);
            bRet = true;
        }

        sys.dumpRoot();
        sys.garbageCollect();
        return bRet;
    }
});

EnvironmentLayer.create = function (environment) {
    var sg = new EnvironmentLayer();
    if (sg && sg.init(environment)) {
        return sg;
    }
    return null;
};
