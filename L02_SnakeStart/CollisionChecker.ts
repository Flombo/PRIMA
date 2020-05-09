namespace L02_SnakeStart{

	import f = FudgeCore;

	export class CollisionChecker{

		private wallSegments : f.Node[];
		private collectibles : f.Node[];
		private snakeHead : f.Node;
		private snake : Snake;
		private collectibleClass : Collectibles;
		private nav : HTMLElement;
		private score : number;
		private displayOneTime : number;
		private collisionSound : HTMLAudioElement;
		private collectSound : HTMLAudioElement;

		constructor(snake : Snake, wallSegments : f.Node[], collectibles : f.Node[], collectibleClass : Collectibles) {
			this.snake = snake;
			this.snakeHead = snake.getHeadElement();
			this.wallSegments = wallSegments;
			this.collectibles = collectibles;
			this.collectibleClass = collectibleClass;
			this.nav = document.getElementsByTagName("nav")[0];
			this.score = 0;
			this.displayOneTime = 0;
			this.collectSound = new Audio("./music/correctChoice.wav");
			this.collisionSound = new Audio("./music/wrongChoice.wav");
		}

		public checkCollision() : void {
			this.checkSnakeSegmentCollision();
			this.checkWallCollision();
			this.checkCollectibleCollision();
		}

		private checkSnakeSegmentCollision() : void {
			let snakeSegments : f.Node[] = this.snake.getChildren();
			for(let i : number = 1; i < snakeSegments.length; i++){
				this.checkSnakeSegment(snakeSegments[i]);
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
			this.collectibles.forEach((collectible) => {
				this.snake.getChildren().forEach((snakeSegment) => {
					this.checkCollectibleElement(collectible, snakeSegment);
				});
			});
		}

		private checkWallCollision() : void {
			this.wallSegments.forEach((wallSegment) => {
				this.checkWallSegment(wallSegment);
			});
		}

		private checkCollectibleElement(element : f.Node, snakeElement : f.Node) : void{
			if(
				Math.round(snakeElement.mtxLocal.translation.x) === Math.round(element.mtxLocal.translation.x)
				&& Math.round(snakeElement.mtxLocal.translation.y) === Math.round(element.mtxLocal.translation.y)
			){
				element.getParent().removeChild(element);
				this.collectibleClass.initCollectibleElement();
				this.collectibles = this.collectibleClass.getCollectibleElements();
				this.score++;
				this.nav.innerText = "Score : " + this.score;
				this.snake.grow();
				this.collectSound.play();
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

		public displayScorePrompt() : void {
			if(this.displayOneTime === 0){
				alert("You died ! Your score is " + this.score);
				this.displayOneTime = 1;
			}
		}

	}
}