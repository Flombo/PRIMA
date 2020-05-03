"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class Snake extends f.Node {
        constructor(wallsegments, collectibleElements, collectibles) {
            super("Snake");
            this.headDirection = 'right';
            this.isDead = false;
            this.snakeSegmentMesh = new f.MeshQuad();
            this.snakeSegmentMaterial = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen")));
            this.initSnake(2);
            this.collisionChecker = new L02_SnakeStart.CollisionChecker(this, wallsegments, collectibleElements, collectibles);
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
            this.animateDeath();
            this.collisionChecker.displayScorePrompt();
        }
        animateDeath() {
            for (let i = 1; i < this.snakeChildren.length; i++) {
                this.headElement.mtxLocal.rotateZ(30 * i);
                this.snakeChildren[i].mtxLocal.rotateZ(30 * i);
                this.headElement.mtxLocal.translateZ(i);
                this.snakeChildren[i].mtxLocal.translateZ(i);
            }
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
        setHeadDirection(direction) {
            this.headDirection = direction;
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
                    case f.KEYBOARD_CODE.ARROW_UP:
                        this.moveHeadUp();
                        break;
                    case f.KEYBOARD_CODE.ARROW_DOWN:
                        this.moveHeadDown();
                        break;
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
                switch (this.headDirection) {
                    case 'right':
                        this.moveChildrenElements();
                        this.headElement.mtxLocal.translateX(1);
                        break;
                    case 'left':
                        this.moveChildrenElements();
                        this.headElement.mtxLocal.translateX(-1);
                        break;
                    case 'up':
                        this.moveChildrenElements();
                        this.headElement.mtxLocal.translateY(1);
                        break;
                    case 'down':
                        this.moveChildrenElements();
                        this.headElement.mtxLocal.translateY(-1);
                        break;
                }
            }
        }
        moveHeadLeft() {
            this.moveChildrenElements();
            this.moveRightOrLeftAndSetDirection(-1, 'left');
        }
        moveHeadRight() {
            this.moveChildrenElements();
            this.moveRightOrLeftAndSetDirection(1, 'right');
        }
        moveHeadUp() {
            this.moveChildrenElements();
            this.moveUpOrDownAndSetDirection(1, 'up');
        }
        moveHeadDown() {
            this.moveChildrenElements();
            this.moveUpOrDownAndSetDirection(-1, 'down');
        }
        moveRightOrLeftAndSetDirection(x, direction) {
            if (!this.isDead) {
                this.headElement.mtxLocal.translateX(x);
                this.setHeadDirection(direction);
            }
        }
        moveUpOrDownAndSetDirection(y, direction) {
            if (!this.isDead) {
                this.headElement.mtxLocal.translateY(y);
                this.setHeadDirection(direction);
            }
        }
        moveChildrenElements() {
            let translations = [];
            for (let i = 1; i < this.snakeChildren.length; i++) {
                this.snakeChildren.forEach((child) => {
                    translations.push(child.mtxLocal.translation);
                });
                this.snakeChildren[i].mtxLocal.translation = translations[i - 1];
            }
        }
    }
    L02_SnakeStart.Snake = Snake;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Snake.js.map