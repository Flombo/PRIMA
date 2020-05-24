"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class Obstacle extends f.Node {
        constructor() {
            super("Obstacle");
            this.obstacleMesh = new f.MeshCube();
            let img = document.getElementById("wall");
            let textureIMG = new f.TextureImage();
            textureIMG.image = img;
            let wallTexture = new f.CoatTextured();
            wallTexture.texture = textureIMG;
            this.obstacleMaterial = new f.Material("SolidWhite", f.ShaderTexture, wallTexture);
            this.buildObstacle(10);
        }
        getObstacleElements() {
            return this.getChildren();
        }
        getRandomPosition(range) {
            let index = Math.round(Math.random() * (range.length - 1));
            return Math.round(Math.random() * range[index]);
        }
        buildObstacle(amount) {
            for (let i = 0; i < amount; i++) {
                let x = this.getRandomPosition([-11, 11]);
                let y = this.getRandomPosition([-6, 6]);
                let wallSegment = new f.Node("WallSegment");
                let cmpMesh = new f.ComponentMesh(this.obstacleMesh);
                let wallComponentMaterial = new f.ComponentMaterial(this.obstacleMaterial);
                wallSegment.addComponent(cmpMesh);
                cmpMesh.pivot.scaleY(1);
                cmpMesh.pivot.scaleX(1);
                cmpMesh.pivot.scaleZ(3);
                wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(x, y, 0))));
                wallSegment.addComponent(wallComponentMaterial);
                this.appendChild(wallSegment);
            }
        }
    }
    L02_SnakeStart.Obstacle = Obstacle;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=obstacle.js.map