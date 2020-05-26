namespace L02_SnakeStart{

	import f = FudgeCore;

	export class CollisionChecker{

		private wallSegments : f.Node[];
		private obstacleSegments : f.Node[];
		private collectibles : f.Node[];
		private snakeHead : f.Node;
		private snake : Snake;
		private collectibleClass : Collectibles;
		private nav : HTMLElement;
		private score : number;
		private enemyNav : HTMLElement;
		private enemyScore : number;
		private displayOneTime : number;
		private collisionSound : HTMLAudioElement;
		private collectSound : HTMLAudioElement;

		constructor(snake : Snake, wallSegments : f.Node[], obstacleSegments : f.Node[], collectibles : f.Node[], collectibleClass : Collectibles) {
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

		public checkCollision() : void {
			this.checkSnakeSegmentCollision();
			this.checkWallCollision();
			this.checkObstacleCollision();
			this.checkCollectibleCollision();
		}

		private checkSnakeSegmentCollision() : void {
			let snakeSegments: f.Node[] = this.snake.getChildren();
			for (let i: number = 1; i < snakeSegments.length; i++) {
				if(this.snake instanceof PlayerSnake) {
					this.checkSnakeSegment(snakeSegments[i]);
				} else {
					// this.checkEnemySegmentCollision(snakeSegments[i]);
				}
			}
		}

		private checkEnemySegmentCollision(snakeSegment : f.Node) : void {
			let x = this.snakeHead.mtxLocal.translation.x;
			let y = this.snakeHead.mtxLocal.translation.y;
			let segmentX = snakeSegment.mtxLocal.translation.x;
			let segmentY = snakeSegment.mtxLocal.translation.y;
			let diffX = segmentX - x;
			let diffY = segmentY - y;
			let connectionVector: f.Vector3 = new f.Vector3(diffX, diffY, 0);
			let distance = Math.floor(Math.sqrt(Math.pow(connectionVector.x, 2) + Math.pow(connectionVector.y, 2)));

			if(distance >= 1){
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
			} else {
				this.snake.setIsDeadTrue();
			}
		}

		private checkSnakeSegment(snakeSegment : f.Node) : void {
			if(
				Math.round(this.snakeHead.mtxLocal.translation.x) === Math.round(snakeSegment.mtxLocal.translation.x)
				&& Math.round(this.snakeHead.mtxLocal.translation.y) === Math.round(snakeSegment.mtxLocal.translation.y)
			){
				this.collisionSound.play();
				this.snake.setIsDeadTrue();
			}
		}

		private checkCollectibleCollision() : void {
			this.collectibles = this.collectibleClass.getCollectibleElements();
			this.collectibles.forEach((collectible) => {
				this.checkCollectibleElement(collectible);
			});
		}

		private checkObstacleCollision() : void {
			this.obstacleSegments.forEach((obstacle) => {
				if(this.snake instanceof PlayerSnake) {
					this.checkObstacle(obstacle);
				} else {
					this.avoidObstacle(obstacle);
				}
			})
		}

		private checkObstacle(obstacle : f.Node) : void {
			if(
				Math.round(this.snakeHead.mtxLocal.translation.x) === Math.round(obstacle.mtxLocal.translation.x)
				&& Math.round(this.snakeHead.mtxLocal.translation.y) === Math.round(obstacle.mtxLocal.translation.y)
			) {
				this.collisionSound.play();
				this.snake.setIsDeadTrue();
			}
		}

		private checkWallCollision() : void {
			this.wallSegments.forEach((wallSegment) => {
				if(this.snake instanceof PlayerSnake) {
					this.checkWallSegment(wallSegment);
				} else {
					this.checkWallSegmentForEnemy(wallSegment);
				}
			});
		}

		private checkCollectibleElement(element : f.Node) : void{
			if(
				Math.round(this.snakeHead.mtxLocal.translation.x) === Math.round(element.mtxLocal.translation.x)
				&& Math.round(this.snakeHead.mtxLocal.translation.y) === Math.round(element.mtxLocal.translation.y)
			){
				this.collectibleClass.removeChild(element);
				this.collectibleClass.initCollectibleElement(1);
				this.collectibles = this.collectibleClass.getCollectibleElements();
				if(this.snake instanceof PlayerSnake) {
					this.score++;
					this.nav.innerText = "Score : " + this.score;
				} else {
					this.enemyScore++;
					this.enemyNav.innerText = "Enemyscore : " + this.enemyScore;
				}
				this.collectSound.play();
				this.snake.grow();
			}
		}

		private checkWallSegment(element : f.Node) : void {
			if(
				Math.round(this.snakeHead.mtxLocal.translation.x) !== 0
				&& Math.round(this.snakeHead.mtxLocal.translation.x)=== Math.round(element.mtxLocal.translation.x)
				|| Math.round(this.snakeHead.mtxLocal.translation.y) !== 0 &&
				Math.round(this.snakeHead.mtxLocal.translation.y) === Math.round(element.mtxLocal.translation.y)
			){
				this.collisionSound.play();
				this.snake.setIsDeadTrue();
			}
		}

		private checkWallSegmentForEnemy(element : f.Node) : void {
			let x = this.snakeHead.mtxLocal.translation.x;
			let y = this.snakeHead.mtxLocal.translation.y;
			let wallX = element.mtxLocal.translation.x;
			let wallY = element.mtxLocal.translation.y;


			if (
				y + 1 >= wallY && element.name === "top"
			) {
				this.snake.moveHeadLeft();
			} else if(y - 1 <= wallY && element.name === "bottom"){
				this.snake.moveHeadRight();
			} else if(x + 1 >= wallX && element.name === "right") {
				this.snake.moveHeadLeft();
			} else if(x - 1 <= wallX && element.name === "left") {
				this.snake.moveHeadRight();
			}
		}

		private avoidObstacle(element : f.Node) : void {
			let x = this.snakeHead.mtxLocal.translation.x;
			let y = this.snakeHead.mtxLocal.translation.y;
			let obstacleX = element.mtxLocal.translation.x;
			let obstacleY = element.mtxLocal.translation.y;
			let diffX = obstacleX - x;
			let diffY = obstacleY - y;
			let connectionVector: f.Vector3 = new f.Vector3(diffX, diffY, 0);
			let distance = Math.floor(Math.sqrt(Math.pow(connectionVector.x, 2) + Math.pow(connectionVector.y, 2)));

			if(distance <= 1){
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
		}


		public displayScorePrompt() : void {
			if(this.displayOneTime === 0){
				alert("You died ! Your score is " + this.score + " the score of the enemy is " + this.enemyScore);
				this.displayOneTime = 1;
			}
		}
	}
}