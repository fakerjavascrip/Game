// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 主角和星星小于这个距离的时候就会被收集
        pickRadius: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    getPlayerDistance: function (player) {
        // 根据 player 节点位置判断距离
        var playerPos = player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function(index) {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 调用Game得分方法
        this.game.gainScore(index);
        // 然后销毁当前星星节点
        this.node.destroy();
    },

    getWinner: function() {
        var y = this.game.player2.getPosition();
        if(this.game.player.position.sub(y).mag()<this.pickRadius){
            this.game.getWinner();
        }

    },

    update: function (dt) {
        this.getWinner()
        // 每帧判断和主角之间的距离是否小于收集距离
        // 这一块应该处理一下当两个同时吃到星星的情况
        if(this.getPlayerDistance(this.game.player)<this.pickRadius && this.getPlayerDistance(this.game.player2)<this.pickRadius) {
            // 当两个同时触碰到的情况
            this.onPicked();
            return;
        } else if (this.getPlayerDistance(this.game.player) < this.pickRadius) {
            // 调用收集行为
            this.onPicked(1);
            return;
        } else if(this.getPlayerDistance(this.game.player2)<this.pickRadius) {
           this.onPicked(2);
           return; 
        }

    },
    // update (dt) {},
});
