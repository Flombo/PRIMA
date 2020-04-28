"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    window.addEventListener("load", (event) => {
        hndLoad(event);
    });
    function hndLoad(_event) {
        let canvas = document.querySelector("canvas");
        canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");
        let snake = new f.Node("Snake");
        initQuads(4, snake);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(15);
        cmpCamera.pivot.rotateY(180);
        let viewport = new f.Viewport();
        viewport.initialize("Viewport", snake, cmpCamera, canvas);
        // window.addEventListener("keydown", keyDownHandler);
        function initQuads(value, rootNode) {
            let mesh = new f.MeshQuad();
            let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen")));
            let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
            let cmpMesh = new f.ComponentMesh(mesh);
            for (let i = 0; i < value; i++) {
                let node = new f.Node("Quad");
                cmpMesh.pivot.scale(f.Vector3.ONE(0.8));
                node.addComponent(cmpMesh);
                node.addComponent(cmpMaterial);
                node.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(i, 0, 0))));
                node.mtxLocal.scale(f.Vector3.ONE(0.8));
                rootNode.appendChild(node);
            }
        }
        // function keyDownHandler(event : KeyboardEvent){
        // 	switch (event.key) {
        // 		case f.KEYBOARD_CODE.ARROW_UP:
        // 			node.cmpTransform.local.translateY(1);
        // 			break;
        // 		case f.KEYBOARD_CODE.ARROW_DOWN:
        // 			node.cmpTransform.local.translateY(-1);
        // 			break;
        // 		case f.KEYBOARD_CODE.ARROW_LEFT:
        // 			node.cmpTransform.local.translateX(-1);
        // 			break;
        // 		case f.KEYBOARD_CODE.ARROW_RIGHT:
        // 			node.cmpTransform.local.translateX(1);
        // 			break;
        // 	}
        // 	viewport.draw();
        // }
        viewport.draw();
    }
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Main.js.map