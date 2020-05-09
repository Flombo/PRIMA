"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class Snake extends f.Node {
        constructor(wallsegments, collectibleElements, collectibles) {
            super("Snake");
            this.headDirection = 'right';
            this.isDead = false;
            this.snakeSegmentMesh = new f.MeshCube();
            this.snakeSegmentMaterial = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen")));
            this.initSnake(1);
            this.collisionChecker = new L02_SnakeStart.CollisionChecker(this, wallsegments, collectibleElements, collectibles);
            this.initCameraEgo();
            this.initCameraMirror();
        }
        initCameraMirror() {
            this.cameraMirror = new f.ComponentCamera();
            this.cameraMirror.backgroundColor = f.Color.CSS("grey");
            this.cameraMirror.pivot.translateZ(15);
            this.cameraMirror.pivot.rotateY(180);
        }
        initCameraEgo() {
            this.componentCamera = new f.ComponentCamera();
            this.componentCamera.backgroundColor = f.Color.CSS('lightblue');
            this.componentCamera.pivot.rotateY(90);
            this.componentCamera.pivot.rotateZ(90);
            this.componentCamera.pivot.rotateY(90);
            this.componentCamera.pivot.translateZ(-1);
            this.headElement.addComponent(this.componentCamera);
        }
        getCameraForMirror() {
            return this.cameraMirror;
        }
        getCamera() {
            return this.componentCamera;
        }
        checkCollisions() {
            this.collisionChecker.checkCollision();
        }
        setIsDeadTrue() {
            this.headDirection = 'dead';
            this.isDead = true;
        }
        getIsDead() {
            return this.isDead;
        }
        displayScorePrompt() {
            this.collisionChecker.displayScorePrompt();
        }
        getHeadElement() {
            return this.headElement;
        }
        grow() {
            let y = this.snakeChildren[this.snakeChildren.length - 1].mtxLocal.translation.y;
            let x = this.snakeChildren[this.snakeChildren.length - 1].mtxLocal.translation.x;
            let snakeSegment = new f.Node("Quad");
            let cmpMesh = new f.ComponentMesh(this.snakeSegmentMesh);
            snakeSegment.addComponent(cmpMesh);
            cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
            snakeSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(x, y, 0))));
            let cmpMaterial = new f.ComponentMaterial(this.snakeSegmentMaterial);
            snakeSegment.addComponent(cmpMaterial);
            this.appendChild(snakeSegment);
            this.snakeChildren.push(snakeSegment);
        }
        initSnake(value) {
            this.initSnakeELements(value);
            this.snakeChildren = this.getChildren();
            this.headElement = this.snakeChildren[0];
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
        initSnakeELements(value) {
            let headMaterial = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("salmon")));
            let headComponentMaterialNew = new f.ComponentMaterial(headMaterial);
            for (let i = 0; i < value; i++) {
                let snakeSegment = new f.Node("Quad");
                let cmpMesh = new f.ComponentMesh(this.snakeSegmentMesh);
                snakeSegment.addComponent(cmpMesh);
                cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
                this.checkIfHead(this.snakeSegmentMaterial, headComponentMaterialNew, snakeSegment, i);
                snakeSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-0.8 * i, 0, 0))));
                this.appendChild(snakeSegment);
            }
        }
        checkIfHead(segmentMaterial, headComponentMaterial, snakeSegment, i) {
            if (i !== 0) {
                let cmpMaterial = new f.ComponentMaterial(segmentMaterial);
                snakeSegment.addComponent(cmpMaterial);
            }
            else {
                snakeSegment.addComponent(headComponentMaterial);
            }
        }
        moveAll() {
            if (!this.isDead) {
                this.moveChildrenElements();
                this.headElement.mtxLocal.translateY(1);
            }
        }
        moveHeadLeft() {
            this.moveChildrenElements();
            this.moveLeft();
        }
        moveHeadRight() {
            this.moveChildrenElements();
            this.moveRight();
        }
        moveLeft() {
            if (!this.isDead) {
                switch (this.headDirection) {
                    case 'up':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'left';
                        break;
                    case 'down':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'left';
                        break;
                    case 'left':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'down';
                        break;
                    case 'right':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'up';
                        break;
                }
                this.headElement.mtxLocal.translateY(1);
            }
        }
        moveRight() {
            if (!this.isDead) {
                switch (this.headDirection) {
                    case 'up':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'right';
                        break;
                    case 'down':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'right';
                        break;
                    case 'left':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'up';
                        break;
                    case 'right':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'down';
                        break;
                }
                this.headElement.mtxLocal.translateY(1);
            }
        }
        moveChildrenElements() {
            let translations = [];
            let rotations = [];
            for (let i = 1; i < this.snakeChildren.length; i++) {
                this.snakeChildren.forEach((child) => {
                    rotations.push(child.mtxLocal.rotation);
                    translations.push(child.mtxLocal.translation);
                });
                this.snakeChildren[i].mtxLocal.rotation = rotations[i - 1];
                this.snakeChildren[i].mtxLocal.translation = translations[i - 1];
            }
        }
    }
    L02_SnakeStart.Snake = Snake;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Snake.js.map