"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class Wall extends f.Node {
        constructor() {
            super("Wall");
            this.wallMesh = new f.MeshCube();
            let img = document.createElement("img");
            img.setAttribute("src", "./texture/brickwall.jpg");
            let textureIMG = new f.TextureImage();
            textureIMG.image = img;
            let wallTexture = new f.CoatTextured();
            wallTexture.texture = textureIMG;
            this.wallMaterial = new f.Material("SolidWhite", f.ShaderTexture, wallTexture);
            this.initWalls();
        }
        initWalls() {
            this.initTopWall();
            this.initLeftWall();
            this.initRightWall();
            this.initBottomWall();
        }
        getWallElements() {
            return this.getChildren();
        }
        initTopWall() {
            this.buildWallSegment(20, 1, 3, 0, 5, 0);
        }
        initBottomWall() {
            this.buildWallSegment(20, 1, 3, 0, -5, 0);
        }
        initLeftWall() {
            this.buildWallSegment(1, 20, 3, -9, 5, 0);
        }
        initRightWall() {
            this.buildWallSegment(1, 20, 3, 9, 5, 0);
        }
        buildWallSegment(scaleX, scaleY, scaleZ, x, y, z) {
            let wallSegment = new f.Node("WallSegment");
            let cmpMesh = new f.ComponentMesh(this.wallMesh);
            let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
            wallSegment.addComponent(cmpMesh);
            cmpMesh.pivot.scaleY(scaleY);
            cmpMesh.pivot.scaleX(scaleX);
            cmpMesh.pivot.scaleZ(scaleZ);
            wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(x, y, z))));
            wallSegment.addComponent(wallComponentMaterial);
            this.appendChild(wallSegment);
        }
    }
    L02_SnakeStart.Wall = Wall;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Wall.js.map