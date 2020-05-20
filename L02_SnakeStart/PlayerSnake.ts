namespace L02_SnakeStart {

	import f = FudgeCore;

	export class PlayerSnake extends Snake {
		
		private cameraMirror: FudgeCore.ComponentCamera;
		private componentCamera: FudgeCore.ComponentCamera;
		private buttonLeft : HTMLButtonElement;
		private buttonRight : HTMLButtonElement;

		constructor(
			wallSegments : f.Node[],
			obstacleSegments : f.Node[],
			collectibleElements : f.Node[],
			collectibles : Collectibles
		) {
			super(wallSegments, obstacleSegments, collectibleElements, collectibles);
			this.initCameraEgo();
			this.initCameraMirror();
			this.buttonLeft = <HTMLButtonElement>document.getElementById("left");
			this.buttonRight = <HTMLButtonElement>document.getElementById("right");
			this.initButtonHandler();
			window.addEventListener("keydown", (event) => { this.keyDownHandler(event); });
		}

		private initButtonHandler() : void {
			this.buttonRight.addEventListener("mousedown", (event)=>{
				event.preventDefault();
				this.moveHeadRight();
			})

			this.buttonLeft.addEventListener("mousedown", ()=>{
				event.preventDefault();
				this.moveHeadLeft();
			})
		}

		private keyDownHandler(event : KeyboardEvent) : void {
			if(!this.isDead) {
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

		private initCameraMirror() : void {
			this.cameraMirror = new f.ComponentCamera();
			this.cameraMirror.backgroundColor = f.Color.CSS("grey");
			this.cameraMirror.pivot.translateZ(35);
			this.cameraMirror.pivot.rotateY(180);
		}

		private initCameraEgo() : void {
			this.componentCamera = new f.ComponentCamera();
			this.componentCamera.backgroundColor = f.Color.CSS('lightblue');
			this.componentCamera.pivot.rotateY(90);
			this.componentCamera.pivot.rotateZ(90);
			this.componentCamera.pivot.rotateY(90);
			this.componentCamera.pivot.translateZ(-1);
			this.componentCamera.pivot.translateY(-0.1);

			this.headElement.addComponent(this.componentCamera);
		}

		public getCameraForMirror() : f.ComponentCamera {
			return this.cameraMirror;
		}

		public getCamera() : f.ComponentCamera {
			return this.componentCamera;
		}

		public displayScorePrompt() : void {
			this.collisionChecker.displayScorePrompt();
		}

	}
}