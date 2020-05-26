namespace L02_SnakeStart {

	import f = FudgeCore;

	export class EnemySnake extends Snake {

		private currentState : string;
		private collectibleSegments : f.Node[];
		private collectibles : Collectibles;
		private currentTarget : number[];
		private currentX : number;
		private currentY : number;

		constructor(
			wallSegments : f.Node[],
			obstacleSegments : f.Node[],
			collectibleElements : f.Node[],
			collectibles : Collectibles
		) {
			super(wallSegments, obstacleSegments, collectibleElements, collectibles);
			this.collectibleSegments = collectibleElements;
			this.collectibles = collectibles;
			this.getChildren().forEach(segment => {
				segment.mtxLocal.translate(new f.Vector3(10, 4,0));
				segment.getComponent(f.ComponentMaterial).material.setCoat(
					new f.CoatColored(f.Color.CSS("orange"))
				);
			});
			this.headElement.getComponent(f.ComponentMaterial).material.setCoat(
				new f.CoatColored(f.Color.CSS("red"))
			);
			this.currentState = 'idle';
		}

		public checkCollisions() : void {
			if(!this.getIsDead()) {
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

		private calculateDiffY() : void {
			let targetY = this.currentTarget[1];
			let snakeY = this.headElement.mtxLocal.translation.y;
			this.currentY = Math.floor(targetY - snakeY);
		}

		private calculateDIffX() : void {
			let targetX = this.currentTarget[0];
			let snakeX = this.headElement.mtxLocal.translation.x;
			this.currentX = Math.floor(targetX - snakeX);
		}

		private moveToCollectible() : void {
			let connectionVector: f.Vector3 = new f.Vector3(this.currentX, this.currentY, 0);
			let distance = Math.floor(Math.sqrt(Math.pow(connectionVector.x, 2) + Math.pow(connectionVector.y, 2)));

			if(!isNaN(distance) && distance !== 0) {
				if(this.currentY !== 0){
					this.moveY();
					this.moveAll();
				} if(this.currentX !== 0) {
					this.moveX();
					this.moveAll();
				}
			} else {
				this.currentTarget.pop();
				this.currentState = 'idle';
			}

		}

		private moveX() : void {
			if(this.currentX > 0){
				this.turnRight();
				this.currentX--;
			}
			if(this.currentX < 0){
				this.turnLeft();
				this.currentX++;
			}
		}

		private moveY() : void {
			if(this.currentY > 0){
				this.turnUp();
				this.currentY--;
			}
			if(this.currentY < 0){
				this.turnDown();
				this.currentY++;
			}
		}

		public checkCollectiblePosition() : void {
			let targets : Map<number, number[]> = new Map<number, number[]>();
			this.collectibleSegments = this.collectibles.getCollectibleElements();
			this.collectibleSegments.forEach(segment => {
				let snakeTranslation = this.headElement.mtxLocal.translation.copy;
				let segmentTranslation = segment.mtxLocal.translation.copy;
				segmentTranslation.subtract(snakeTranslation);
				let distance = Math.sqrt(Math.pow(segmentTranslation.x, 2) + Math.pow(segmentTranslation.y, 2));

				if(distance <= 5){
					targets.set(distance, [segment.mtxLocal.translation.x, segment.mtxLocal.translation.y]);
				} else {
					this.currentState = 'idle';
				}
			});
			if(targets.size > 0) {
				this.setCurrentTarget(targets);
			}
		}

		private setCurrentTarget(targets : Map<number, number[]>) : void {
			let distanceArray : number[] = Array.from(targets.keys());
			distanceArray.sort((a, b) =>  a - b);
			this.currentTarget = targets.get(distanceArray[0]);
			this.currentState = 'eat';
			this.calculateDiffY();
			this.calculateDIffX();
		}

		public moveRandom() : void {
			let moveRight = () => {this.moveHeadRight()};
			let moveLeft = () => {this.moveHeadLeft()};
			let functions = [moveLeft(), moveRight()];
			return functions[Math.floor(Math.random() * (functions.length -1))];
		}

	}
}