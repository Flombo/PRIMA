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
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.backgroundColor = f.Color.CSS("lavender");
        cmpCamera.pivot.translateZ(15);
        cmpCamera.pivot.rotateY(180);
        let viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 5);
        f.Loop.addEventListener("loopFrame", renderLoop);
        function renderLoop() {
            if (snake !== undefined && snake !== null) {
                snake.moveAll();
                snake.checkCollisions();
            }
            viewport.draw();
        }
    }
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Main.js.map