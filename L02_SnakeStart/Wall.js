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
            let wallSegment = new f.Node("WallSegment");
            let cmpMesh = new f.ComponentMesh(this.wallMesh);
            let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
            wallSegment.addComponent(cmpMesh);
            cmpMesh.pivot.scaleY(1);
            cmpMesh.pivot.scaleX(20);
            cmpMesh.pivot.scaleZ(3);
            wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 4, 0))));
            wallSegment.addComponent(wallComponentMaterial);
            this.appendChild(wallSegment);
        }
        initBottomWall() {
            let wallSegment = new f.Node("WallSegment");
            let cmpMesh = new f.ComponentMesh(this.wallMesh);
            let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
            wallSegment.addComponent(cmpMesh);
            cmpMesh.pivot.scaleY(1);
            cmpMesh.pivot.scaleX(20);
            cmpMesh.pivot.scaleZ(3);
            wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, -4, 0))));
            wallSegment.addComponent(wallComponentMaterial);
            this.appendChild(wallSegment);
        }
        initLeftWall() {
            let wallSegment = new f.Node("WallSegment");
            let cmpMesh = new f.ComponentMesh(this.wallMesh);
            let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
            wallSegment.addComponent(cmpMesh);
            cmpMesh.pivot.scaleY(20);
            cmpMesh.pivot.scaleX(1);
            cmpMesh.pivot.scaleZ(3);
            wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-8, 4, 0))));
            wallSegment.addComponent(wallComponentMaterial);
            this.appendChild(wallSegment);
        }
        initRightWall() {
            let wallSegment = new f.Node("WallSegment");
            let cmpMesh = new f.ComponentMesh(this.wallMesh);
            let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
            wallSegment.addComponent(cmpMesh);
            cmpMesh.pivot.scaleY(20);
            cmpMesh.pivot.scaleX(1);
            cmpMesh.pivot.scaleZ(3);
            wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(8, 4, 0))));
            wallSegment.addComponent(wallComponentMaterial);
            this.appendChild(wallSegment);
        }
    }
    L02_SnakeStart.Wall = Wall;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Wall.js.map