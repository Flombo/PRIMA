"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class EnemySnake extends L02_SnakeStart.Snake {
        constructor(wallSegments, obstacleSegments, collectibleElements, collectibles) {
            super(wallSegments, obstacleSegments, collectibleElements, collectibles);
            this.getChildren().forEach(segment => {
                segment.mtxLocal.translate(new f.Vector3(10, 4, 0));
            });
            this.headElement.getComponent(f.ComponentMaterial).material.setCoat(new f.CoatColored(f.Color.CSS("purple")));
        }
    }
    L02_SnakeStart.EnemySnake = EnemySnake;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=EnemySnake.js.map