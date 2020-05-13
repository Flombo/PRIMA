"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class Collectibles extends f.Node {
        constructor() {
            super("Collectables");
            this.collectibleMesh = new f.MeshSphere();
            this.collectibleMaterial = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("orange")));
            this.initCollectibleElement();
        }
        getCollectibleElements() {
            return this.getChildren();
        }
        getRandomPosition(range) {
            let index = Math.round(Math.random() * (range.length - 1));
            let pos = Math.round(Math.random() * range[index]);
            console.log(pos, index, range.length - 1);
            return pos;
        }
        initCollectibleElement() {
            let collectibleElement = new f.Node("collectibleElement");
            let cmpMesh = new f.ComponentMesh(this.collectibleMesh);
            let wallComponentMaterial = new f.ComponentMaterial(this.collectibleMaterial);
            collectibleElement.addComponent(cmpMesh);
            cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
            collectibleElement.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(this.getRandomPosition([7, -7]), this.getRandomPosition([3, -3]), 0))));
            collectibleElement.addComponent(wallComponentMaterial);
            this.appendChild(collectibleElement);
        }
    }
    L02_SnakeStart.Collectibles = Collectibles;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Collectibles.js.map