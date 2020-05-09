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
        let root = new f.Node("root");
        let collectibles = new L02_SnakeStart.Collectibles();
        let walls = new L02_SnakeStart.Wall();
        let snake = new L02_SnakeStart.Snake(walls.getWallElements(), collectibles.getCollectibleElements(), collectibles);
        root.appendChild(collectibles);
        root.appendChild(walls);
        root.appendChild(snake);
        let light = new f.LightAmbient(f.Color.CSS('orange'));
        let lightComponent = new f.ComponentLight(light);
        let lightNode = new f.Node("light");
        lightNode.addComponent(lightComponent);
        root.appendChild(lightNode);
        let viewport = new f.Viewport();
        viewport.initialize("Viewport", root, snake.getCamera(), canvas);
        let canvasMirror = document.createElement('canvas');
        canvasMirror.setAttribute("style", "width:" + (window.innerWidth / 5)
            + "px; height:" + (window.innerHeight / 5) + "px;"
            + "z-index:" + 999999 + ";"
            + "position: absolute;"
            + "left: 75%;"
            + "border: 5px solid orange;"
            + "border-radius: 100px;");
        document.body.appendChild(canvasMirror);
        let viewportMini = new f.Viewport();
        viewportMini.initialize("ViewportMini", root, snake.getCameraForMirror(), canvasMirror);
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