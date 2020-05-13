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
        f.RenderManager.initialize(true, true);
        let root = new f.Node("root");
        let groundNode = new f.Node("ground");
        let groundMesh = new f.MeshQuad();
        let groundMeshComp = new f.ComponentMesh(groundMesh);
        groundMeshComp.pivot.scaleY(20);
        groundMeshComp.pivot.scaleX(20);
        let grasIMG = document.createElement("img");
        grasIMG.setAttribute("src", "./texture/gras.jpg");
        let grastextureImage = new f.TextureImage();
        grastextureImage.image = grasIMG;
        let groundTextureCoat = new f.CoatTextured();
        groundTextureCoat.texture = grastextureImage;
        let groundMaterial = new f.Material("ground", f.ShaderTexture, groundTextureCoat);
        let groundComponentMat = new f.ComponentMaterial(groundMaterial);
        let groundTransformComp = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 0, -1)));
        groundNode.addComponent(groundTransformComp);
        groundNode.addComponent(groundMeshComp);
        groundNode.addComponent(groundComponentMat);
        root.appendChild(groundNode);
        let collectibles = new L02_SnakeStart.Collectibles();
        let walls = new L02_SnakeStart.Wall();
        let snake = new L02_SnakeStart.Snake(walls.getWallElements(), collectibles.getCollectibleElements(), collectibles);
        root.appendChild(collectibles);
        root.appendChild(walls);
        root.appendChild(snake);
        let light = new f.LightAmbient(f.Color.CSS('orange'));
        let lightComponent = new f.ComponentLight(light);
        let lightNode = new f.Node("light");
        lightNode.activate(true);
        lightNode.addComponent(lightComponent);
        root.appendChild(lightNode);
        let viewport = new f.Viewport();
        viewport.initialize("Viewport", root, snake.getCamera(), canvas);
        let canvasMirror = document.createElement('canvas');
        canvasMirror.setAttribute("style", "width:" + (window.innerWidth / 7)
            + "px; height:" + (window.innerHeight / 7) + "px;"
            + "z-index:" + 999999 + ";"
            + "position: absolute;"
            + "left: 75%;"
            + "border: 5px solid orange;"
            + "border-radius: 100px;");
        document.body.appendChild(canvasMirror);
        let viewportMini = new f.Viewport();
        viewportMini.initialize("ViewportMini", snake, snake.getCameraForMirror(), canvasMirror);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 2);
        f.Loop.addEventListener("loopFrame", renderLoop);
        function moveLoop() {
            if (!snake.getIsDead()) {
                snake.checkCollisions();
                snake.moveAll();
            }
            else {
                snake.displayScorePrompt();
            }
        }
        function renderLoop() {
            if (snake !== undefined && snake !== null) {
                moveLoop();
                viewport.draw();
                viewportMini.draw();
            }
        }
    }
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Main.js.map