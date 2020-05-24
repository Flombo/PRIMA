"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class Snake extends f.Node {
        constructor(wallsegments, obstacleSegments, collectibleElements, collectibles) {
            super("Snake");
            this.headDirection = 'down';
            this.isDead = false;
            this.snakeSegmentMesh = new f.MeshCube();
            this.snakeSegmentMaterial = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(f.Color.CSS("lightgreen")));
            this.initSnake(3);
            this.collisionChecker = new L02_SnakeStart.CollisionChecker(this, wallsegments, obstacleSegments, collectibleElements, collectibles);
        }
        setHeadDirection(direction) {
            this.headDirection = direction;
        }
        getHeadDirection() {
            return this.headDirection;
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
        }
        initSnakeELements(value) {
            let headMaterial = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(f.Color.CSS("salmon")));
            let headComponentMaterialNew = new f.ComponentMaterial(headMaterial);
            for (let i = 0; i < value; i++) {
                let snakeSegment = new f.Node("Quad");
                let cmpMesh = new f.ComponentMesh(this.snakeSegmentMesh);
                snakeSegment.addComponent(cmpMesh);
                cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
                Snake.checkIfHead(this.snakeSegmentMaterial, headComponentMaterialNew, snakeSegment, i);
                snakeSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-0.8 * i, 0, 0))));
                this.appendChild(snakeSegment);
            }
        }
        static checkIfHead(segmentMaterial, headComponentMaterial, snakeSegment, i) {
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
            }
        }
        moveHeadRight() {
            if (!this.isDead) {
                switch (this.headDirection) {
                    case 'up':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'right';
                        break;
                    case 'down':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'right';
                        break;
                    case 'left':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'up';
                        break;
                    case 'right':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'down';
                        break;
                }
            }
        }
        turnDown() {
            switch (this.getHeadDirection()) {
                case 'left':
                    this.headElement.mtxLocal.rotateZ(90);
                    this.headDirection = 'down';
                    break;
                case 'up':
                    this.headElement.mtxLocal.rotateZ(180);
                    this.headDirection = 'down';
                    break;
                case 'right':
                    this.headElement.mtxLocal.rotateZ(-90);
                    this.headDirection = 'down';
                    break;
            }
        }
        turnUp() {
            switch (this.getHeadDirection()) {
                case 'left':
                    this.headElement.mtxLocal.rotateZ(-90);
                    this.headDirection = 'up';
                    break;
                case 'down':
                    this.headElement.mtxLocal.rotateZ(180);
                    this.headDirection = 'up';
                    break;
                case 'right':
                    this.headElement.mtxLocal.rotateZ(90);
                    this.headDirection = 'up';
                    break;
            }
        }
        turnRight() {
            switch (this.getHeadDirection()) {
                case 'up':
                    this.headElement.mtxLocal.rotateZ(-90);
                    this.headDirection = 'right';
                    break;
                case 'down':
                    this.headElement.mtxLocal.rotateZ(90);
                    this.headDirection = 'right';
                    break;
                case 'left':
                    this.headElement.mtxLocal.rotateZ(180);
                    this.headDirection = 'right';
                    break;
            }
        }
        turnLeft() {
            switch (this.getHeadDirection()) {
                case 'up':
                    this.headElement.mtxLocal.rotateZ(90);
                    this.headDirection = 'left';
                    break;
                case 'down':
                    this.headElement.mtxLocal.rotateZ(-90);
                    this.headDirection = 'left';
                    break;
                case 'right':
                    this.headElement.mtxLocal.rotateZ(180);
                    this.headDirection = 'left';
                    break;
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