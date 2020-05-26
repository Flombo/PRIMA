"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    class EnemySnake extends L02_SnakeStart.Snake {
        constructor(wallSegments, obstacleSegments, collectibleElements, collectibles) {
            super(wallSegments, obstacleSegments, collectibleElements, collectibles);
            this.collectibleSegments = collectibleElements;
            this.collectibles = collectibles;
            this.getChildren().forEach(segment => {
                segment.mtxLocal.translate(new f.Vector3(10, 4, 0));
                segment.getComponent(f.ComponentMaterial).material.setCoat(new f.CoatColored(f.Color.CSS("orange")));
            });
            this.headElement.getComponent(f.ComponentMaterial).material.setCoat(new f.CoatColored(f.Color.CSS("red")));
            this.currentState = 'idle';
        }
        checkCollisions() {
            if (!this.getIsDead()) {
                switch (this.currentState) {
                    case 'idle':
                        this.moveAll();
                        this.checkCollectiblePosition();
                        super.checkCollisions();
                        break;
                    case 'eat':
                        this.checkCollectiblePosition();
                        this.moveToCollectible();
                        super.checkCollisions();
                        break;
                }
            }
        }
        calculateDiffY() {
            let targetY = this.currentTarget[1];
            let snakeY = this.headElement.mtxLocal.translation.y;
            this.currentY = Math.floor(targetY - snakeY);
        }
        calculateDIffX() {
            let targetX = this.currentTarget[0];
            let snakeX = this.headElement.mtxLocal.translation.x;
            this.currentX = Math.floor(targetX - snakeX);
        }
        moveToCollectible() {
            let connectionVector = new f.Vector3(this.currentX, this.currentY, 0);
            let distance = Math.floor(Math.sqrt(Math.pow(connectionVector.x, 2) + Math.pow(connectionVector.y, 2)));
            if (!isNaN(distance) && distance !== 0) {
                if (this.currentY !== 0) {
                    this.moveY();
                    this.moveAll();
                }
                if (this.currentX !== 0) {
                    this.moveX();
                    this.moveAll();
                }
            }
            else {
                this.currentTarget.pop();
                this.currentState = 'idle';
            }
        }
        moveX() {
            if (this.currentX > 0) {
                this.turnRight();
                this.currentX--;
            }
            if (this.currentX < 0) {
                this.turnLeft();
                this.currentX++;
            }
        }
        moveY() {
            if (this.currentY > 0) {
                this.turnUp();
                this.currentY--;
            }
            if (this.currentY < 0) {
                this.turnDown();
                this.currentY++;
            }
        }
        checkCollectiblePosition() {
            let targets = new Map();
            this.collectibleSegments = this.collectibles.getCollectibleElements();
            this.collectibleSegments.forEach(segment => {
                let snakeTranslation = this.headElement.mtxLocal.translation.copy;
                let segmentTranslation = segment.mtxLocal.translation.copy;
                segmentTranslation.subtract(snakeTranslation);
                let distance = Math.sqrt(Math.pow(segmentTranslation.x, 2) + Math.pow(segmentTranslation.y, 2));
                if (distance <= 5) {
                    targets.set(distance, [segment.mtxLocal.translation.x, segment.mtxLocal.translation.y]);
                }
                else {
                    this.currentState = 'idle';
                }
            });
            if (targets.size > 0) {
                this.setCurrentTarget(targets);
            }
        }
        setCurrentTarget(targets) {
            let distanceArray = Array.from(targets.keys());
            distanceArray.sort((a, b) => a - b);
            this.currentTarget = targets.get(distanceArray[0]);
            this.currentState = 'eat';
            this.calculateDiffY();
            this.calculateDIffX();
        }
        moveRandom() {
            let moveRight = () => { this.moveHeadRight(); };
            let moveLeft = () => { this.moveHeadLeft(); };
            let functions = [moveLeft(), moveRight()];
            return functions[Math.floor(Math.random() * (functions.length - 1))];
        }
    }
    L02_SnakeStart.EnemySnake = EnemySnake;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=EnemySnake.js.map