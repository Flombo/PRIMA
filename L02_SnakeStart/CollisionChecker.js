"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    class CollisionChecker {
        constructor(snake, wallSegments, obstacleSegments, collectibles, collectibleClass) {
            this.snake = snake;
            this.snakeHead = snake.getHeadElement();
            this.wallSegments = wallSegments;
            this.obstacleSegments = obstacleSegments;
            this.collectibles = collectibles;
            this.collectibleClass = collectibleClass;
            this.nav = document.getElementsByTagName("nav")[0];
            this.score = 0;
            this.displayOneTime = 0;
            this.collectSound = new Audio("./music/correctChoice.wav");
            this.collisionSound = new Audio("./music/wrongChoice.wav");
        }
        checkCollision() {
            this.checkSnakeSegmentCollision();
            this.checkWallCollision();
            this.checkObstacleCollision();
            this.checkCollectibleCollision();
        }
        checkSnakeSegmentCollision() {
            let snakeSegments = this.snake.getChildren();
            for (let i = 1; i < snakeSegments.length; i++) {
                if (this.snake instanceof L02_SnakeStart.PlayerSnake) {
                    this.checkSnakeSegment(snakeSegments[i]);
                }
            }
        }
        checkSnakeSegment(snakeSegment) {
            if (Math.round(this.snakeHead.mtxLocal.translation.x) === Math.round(snakeSegment.mtxLocal.translation.x)
                && Math.round(this.snakeHead.mtxLocal.translation.y) === Math.round(snakeSegment.mtxLocal.translation.y)) {
                this.collisionSound.play();
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
        checkObstacleCollision() {
            this.obstacleSegments.forEach((obstacle) => {
                if (this.snake instanceof L02_SnakeStart.PlayerSnake) {
                    this.checkObstacle(obstacle);
                }
            });
        }
        checkObstacle(obstacle) {
            if (Math.round(this.snakeHead.mtxLocal.translation.x) === Math.round(obstacle.mtxLocal.translation.x)
                && Math.round(this.snakeHead.mtxLocal.translation.y) === Math.round(obstacle.mtxLocal.translation.y)) {
                this.collisionSound.play();
                this.snake.setIsDeadTrue();
            }
        }
        checkWallCollision() {
            this.wallSegments.forEach((wallSegment) => {
                if (this.snake instanceof L02_SnakeStart.PlayerSnake) {
                    this.checkWallSegment(wallSegment);
                }
            });
        }
        checkCollectibleElement(element, snakeElement) {
            if (Math.round(snakeElement.mtxLocal.translation.x) === Math.round(element.mtxLocal.translation.x)
                && Math.round(snakeElement.mtxLocal.translation.y) === Math.round(element.mtxLocal.translation.y)) {
                element.getParent().removeChild(element);
                this.collectibleClass.initCollectibleElement(1);
                this.collectibles = this.collectibleClass.getCollectibleElements();
                this.score++;
                this.nav.innerText = "Score : " + this.score;
                this.snake.grow();
                this.collectSound.play();
            }
        }
        checkWallSegment(element) {
            if (Math.round(this.snakeHead.mtxLocal.translation.x) !== 0
                && Math.round(this.snakeHead.mtxLocal.translation.x) === Math.round(element.mtxLocal.translation.x)
                || Math.round(this.snakeHead.mtxLocal.translation.y) !== 0 &&
                    Math.round(this.snakeHead.mtxLocal.translation.y) === Math.round(element.mtxLocal.translation.y)) {
                this.collisionSound.play();
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