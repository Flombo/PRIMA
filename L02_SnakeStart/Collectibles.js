"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class Collectibles extends f.Node {
        constructor(obstacleElments) {
            super("Collectables");
            this.obstacleElements = obstacleElments;
            this.collectibleMesh = new f.MeshSphere();
            this.collectibleMaterial = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(f.Color.CSS("orange")));
            this.initCollectibleElement(4);
        }
        getCollectibleElements() {
            return this.getChildren();
        }
        getRandomPosition(range) {
            let index = Math.round(Math.random() * (range.length - 1));
            return Math.round(Math.random() * range[index]);
        }
        getRandomY(range) {
            let y = this.getRandomPosition(range);
            this.obstacleElements.forEach(segment => {
                while (segment.mtxLocal.translation.y === y) {
                    y = this.getRandomPosition(range);
                }
            });
            return y;
        }
        getRandomX(range) {
            let x = this.getRandomPosition(range);
            this.obstacleElements.forEach(segment => {
                while (segment.mtxLocal.translation.x === x) {
                    x = this.getRandomPosition(range);
                }
            });
            return x;
        }
        initCollectibleElement(amount) {
            for (let i = 0; i < amount; i++) {
                let collectibleElement = new f.Node("collectibleElement");
                let cmpMesh = new f.ComponentMesh(this.collectibleMesh);
                let wallComponentMaterial = new f.ComponentMaterial(this.collectibleMaterial);
                collectibleElement.addComponent(cmpMesh);
                cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
                collectibleElement.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(this.getRandomX([14, -14]), this.getRandomY([8, -8]), 0))));
                collectibleElement.addComponent(wallComponentMaterial);
                this.appendChild(collectibleElement);
            }
        }
    }
    L02_SnakeStart.Collectibles = Collectibles;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Collectibles.js.map