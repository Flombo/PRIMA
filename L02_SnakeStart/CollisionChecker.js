"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    class CollisionChecker {
        constructor(snake, wallSegments, collectibles, collectibleClass) {
            this.snake = snake;
            this.snakeHead = snake.getHeadElement();
            this.wallSegments = wallSegments;
            this.collectibles = collectibles;
            this.collectibleClass = collectibleClass;
            this.nav = document.getElementsByTagName("nav")[0];
            this.score = 0;
            this.displayOneTime = 0;
        }
        checkCollision() {
            this.checkSnakeSegmentCollision();
            this.checkWallCollision();
            this.checkCollectibleCollision();
        }
        checkSnakeSegmentCollision() {
            let snakeSegments = this.snake.getChildren();
            for (let i = 1; i < snakeSegments.length; i++) {
                this.checkSnakeSegment(snakeSegments[i]);
            }
        }
        checkSnakeSegment(snakeSegment) {
            if (this.snakeHead.mtxLocal.translation.x === snakeSegment.mtxLocal.translation.x
                && this.snakeHead.mtxLocal.translation.y === snakeSegment.mtxLocal.translation.y) {
                this.snake.setIsDeadTrue();
            }
        }
        checkCollectibleCollision() {
            this.collectibles.forEach((collectible) => {
                this.snake.getChildren().forEach((snakeSegment) => {
                    this.checkCollectibleElement(collectible, snakeSegment);
                });
            });
        }
        checkWallCollision() {
            this.wallSegments.forEach((wallSegment) => {
                this.checkWallSegment(wallSegment);
            });
        }
        checkCollectibleElement(element, snakeElement) {
            if (snakeElement.mtxLocal.translation.x === element.mtxLocal.translation.x
                && snakeElement.mtxLocal.translation.y === element.mtxLocal.translation.y) {
                element.getParent().removeChild(element);
                this.collectibleClass.initCollectibleElement();
                this.collectibles = this.collectibleClass.getCollectibleElements();
                this.score++;
                this.nav.innerText = "Score : " + this.score;
                this.snake.grow();
            }
        }
        checkWallSegment(element) {
            if (this.snakeHead.mtxLocal.translation.x !== 0
                && this.snakeHead.mtxLocal.translation.x === element.mtxLocal.translation.x
                || this.snakeHead.mtxLocal.translation.y !== 0 &&
                    this.snakeHead.mtxLocal.translation.y === element.mtxLocal.translation.y) {
                this.snake.setIsDeadTrue();
            }
        }
        displayScorePrompt() {
            if (this.displayOneTime === 0) {
                alert("You died ! Your score is " + this.score);
                this.displayOneTime = 1;
            }
        }
    }
    L02_SnakeStart.CollisionChecker = CollisionChecker;
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=CollisionChecker.js.map