"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    window.addEventListener("load", (event) => {
        hndLoad(event);
    });
    function hndLoad(_event) {
        let canvas = document.querySelector("canvas");
        styleCanvas(canvas);
        f.RenderManager.initialize(true, true);
        let root = new f.Node("root");
        let groundNode = new f.Node("ground");
        let groundMesh = new f.MeshQuad();
        let groundMeshComp = new f.ComponentMesh(groundMesh);
        groundMeshComp.pivot.scaleY(30);
        groundMeshComp.pivot.scaleX(30);
        let grasIMG = document.getElementById("ground");
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
        let walls = new L02_SnakeStart.Wall();
        let obstacle = new L02_SnakeStart.Obstacle();
        let collectibles = new L02_SnakeStart.Collectibles(obstacle.getObstacleElements());
        let playerSnake = new L02_SnakeStart.PlayerSnake(walls.getWallElements(), obstacle.getObstacleElements(), collectibles.getCollectibleElements(), collectibles);
        let enemySnake = new L02_SnakeStart.EnemySnake(walls.getWallElements(), obstacle.getObstacleElements(), collectibles.getCollectibleElements(), collectibles);
        root.appendChild(collectibles);
        root.appendChild(walls);
        root.appendChild(obstacle);
        root.appendChild(playerSnake);
        root.appendChild(enemySnake);
        let light = new f.LightAmbient(new f.Color(1, 1, 0.5, 0.1));
        let directionalLight = new f.LightDirectional(f.Color.CSS('white'));
        let directionalLightComp = new f.ComponentLight(directionalLight);
        directionalLightComp.pivot.translateZ(10);
        directionalLightComp.pivot.lookAt(playerSnake.getHeadElement().mtxLocal.translation);
        let lightComponent = new f.ComponentLight(light);
        let lightNode = new f.Node("light");
        lightNode.addComponent(lightComponent);
        lightNode.addComponent(directionalLightComp);
        root.appendChild(lightNode);
        let viewport = new f.Viewport();
        viewport.initialize("Viewport", root, playerSnake.getCamera(), canvas);
        let canvasMirror = document.getElementById('canvasMini');
        styleMiniMap(canvasMirror);
        document.body.appendChild(canvasMirror);
        let viewportMini = new f.Viewport();
        viewportMini.initialize("viewportMini", root, playerSnake.getCameraForMirror(), canvasMirror);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 3);
        f.Loop.addEventListener("loopFrame", renderLoop);
        let isPaused = false;
        window.addEventListener("keydown", (event) => {
            let h1 = document.querySelector('h1');
            if (event.key === f.KEYBOARD_CODE.ESC) {
                if (isPaused) {
                    isPaused = false;
                    h1.setAttribute("class", "");
                    styleMiniMap(canvasMirror);
                    styleCanvas(canvas);
                }
                else {
                    isPaused = true;
                    h1.setAttribute("class", "visible");
                    canvasMirror.setAttribute("style", "opacity: 25%;");
                    canvas.setAttribute("style", "opacity: 25%;");
                }
            }
        });
        function styleCanvas(canvas) {
            canvas.setAttribute("style", "opacity: 100%; z-index: 90;  width:" + window.innerWidth + "px; height:" + window.innerHeight + "px;");
        }
        function styleMiniMap(canvas) {
            canvas.setAttribute("style", "width:" + (window.innerWidth / 7)
                + "px; height:" + (window.innerHeight / 7) + "px;"
                + "z-index:" + 999999 + ";"
                + "position: absolute;"
                + "left: 75%;"
                + "top: 0;"
                + "border: 5px solid orange;"
                + "opacity: 100%;");
        }
        function moveLoop() {
            if (!playerSnake.getIsDead()) {
                playerSnake.checkCollisions();
                playerSnake.moveAll();
                enemySnake.checkCollisions();
            }
            else {
                playerSnake.displayScorePrompt();
            }
        }
        function renderLoop() {
            if (!isPaused) {
                if (playerSnake !== undefined && playerSnake !== null) {
                    viewport.draw();
                    viewportMini.draw();
                    moveLoop();
                }
            }
        }
    }
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Main.js.map