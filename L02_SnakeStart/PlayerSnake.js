"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class PlayerSnake extends L02_SnakeStart.Snake {
        constructor(wallSegments, obstacleSegments, collectibleElements, collectibles) {
            super(wallSegments, obstacleSegments, collectibleElements, collectibles);
            this.initCameraEgo();
            this.initCameraMirror();
            window.addEventListener("keydown", (event) => { this.keyDownHandler(event); });
        }
        keyDownHandler(event) {
            if (!this.isDead) {
                switch (event.key) {
                    case f.KEYBOARD_CODE.ARROW_LEFT:
                        this.moveHeadLeft();
                        break;
                    case f.KEYBOARD_CODE.ARROW_RIGHT:
                        this.moveHeadRight();
                        break;
                }
            }
        }
        initCameraMirror() {
            this.cameraMirror = new f.ComponentCamera();
            this.cameraMirror.backgroundColor = f.Color.CSS("grey");
            this.cameraMirror.pivot.translateZ(35);
            this.cameraMirror.pivot.rotateY(180);
        }
        initCameraEgo() {
            this.componentCamera = new f.ComponentCamera();
            this.componentCamera.backgroundColor = f.Color.CSS('lightblue');
            this.componentCamera.pivot.rotateY(90);
            this.componentCamera.pivot.rotateZ(90);
            this.componentCamera.pivot.rotateY(90);
            this.componentCamera.pivot.translateZ(-1);
            this.componentCamera.pivot.translateY(-0.1);
            this.headElement.addComponent(this.componentCamera);
        }
        getCameraForMirror() {
            return this.cameraMirror;
        }
        getCamera() {
            return this.componentCamera;
        }
        displayScorePrompt() {
            this.collisionChecker.displayScorePrompt();
        }
    }
    L02_SnakeStart.PlayerSnake = PlayerSnake;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=PlayerSnake.js.map