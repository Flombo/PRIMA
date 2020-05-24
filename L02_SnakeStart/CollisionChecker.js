"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
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
            this.enemyScore = 0;
            this.enemyNav = document.getElementsByTagName("nav")[1];
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
                else {
                    this.checkEnemySegmentCollision(snakeSegments[i]);
                }
            }
        }
        checkEnemySegmentCollision(snakeSegment) {
            let x = this.snakeHead.mtxLocal.translation.x;
            let y = this.snakeHead.mtxLocal.translation.y;
            let segmentX = snakeSegment.mtxLocal.translation.x;
            let segmentY = snakeSegment.mtxLocal.translation.y;
            let diffX = segmentX - x;
            let diffY = segmentY - y;
            let connectionVector = new f.Vector3(diffX, diffY, 0);
            let distance = Math.floor(Math.sqrt(Math.pow(connectionVector.x, 2) + Math.pow(connectionVector.y, 2)));
            if (distance >= 1) {
                switch (this.snake.getHeadDirection()) {
                    case 'up':
                        this.snake.turnLeft();
                        break;
                    case 'down':
                        this.snake.turnRight();
                        break;
                    case 'left':
                        this.snake.turnUp();
                        break;
                    case 'right':
                        this.snake.turnDown();
                        break;
                }
            }
            else {
                this.snake.setIsDeadTrue();
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
                this.checkCollectibleElement(collectible);
            });
        }
        checkObstacleCollision() {
            this.obstacleSegments.forEach((obstacle) => {
                if (this.snake instanceof L02_SnakeStart.PlayerSnake) {
                    this.checkObstacle(obstacle);
                }
                else {
                    this.avoidObstacle(obstacle);
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
                else {
                    this.checkWallSegmentForEnemy(wallSegment);
                }
            });
        }
        checkCollectibleElement(element) {
            console.log(this.snakeHead.mtxLocal.translation.x === element.mtxLocal.translation.x
                && this.snakeHead.mtxLocal.translation.y === element.mtxLocal.translation.y);
            if (this.snakeHead.mtxLocal.translation.x === element.mtxLocal.translation.x
                && this.snakeHead.mtxLocal.translation.y === element.mtxLocal.translation.y) {
                this.collectibleClass.removeChild(element);
                this.collectibleClass.initCollectibleElement(1);
                this.collectibles = this.collectibleClass.getCollectibleElements();
                if (this.snake instanceof L02_SnakeStart.PlayerSnake) {
                    this.score++;
                    this.nav.innerText = "Score : " + this.score;
                }
                else {
                    this.enemyScore++;
                    this.enemyNav.innerText = "Enemyscore : " + this.enemyScore;
                }
                this.collectSound.play();
                this.snake.grow();
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
        checkWallSegmentForEnemy(element) {
            let x = this.snakeHead.mtxLocal.translation.x;
            let y = this.snakeHead.mtxLocal.translation.y;
            let wallX = element.mtxLocal.translation.x;
            let wallY = element.mtxLocal.translation.y;
            if (y + 1 >= wallY && element.name === "top") {
                this.snake.moveHeadLeft();
            }
            else if (y - 1 <= wallY && element.name === "bottom") {
                this.snake.moveHeadRight();
            }
            else if (x + 1 >= wallX && element.name === "right") {
                this.snake.moveHeadLeft();
            }
            else if (x - 1 <= wallX && element.name === "left") {
                this.snake.moveHeadRight();
            }
        }
        avoidObstacle(element) {
            let x = this.snakeHead.mtxLocal.translation.x;
            let y = this.snakeHead.mtxLocal.translation.y;
            let obstacleX = element.mtxLocal.translation.x;
            let obstacleY = element.mtxLocal.translation.y;
            let diffX = obstacleX - x;
            let diffY = obstacleY - y;
            let connectionVector = new f.Vector3(diffX, diffY, 0);
            let distance = Math.floor(Math.sqrt(Math.pow(connectionVector.x, 2) + Math.pow(connectionVector.y, 2)));
            if (distance <= 1) {
                switch (this.snake.getHeadDirection()) {
                    case 'up':
                        this.snake.turnLeft();
                        break;
                    case 'down':
                        this.snake.turnRight();
                        break;
                    case 'left':
                        this.snake.turnUp();
                        break;
                    case 'right':
                        this.snake.turnDown();
                        break;
                }
                // this.snake.moveAll();
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