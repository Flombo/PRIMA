namespace L02_SnakeStart {
	import f = FudgeCore;

	window.addEventListener("load", (event) => {
		hndLoad(event);
	});

	function hndLoad(_event: Event): void {
		let canvas: HTMLCanvasElement = document.querySelector("canvas");
		canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");

		let root : f.Node = new f.Node("root");

		let collectibles : Collectibles = new Collectibles();

		let walls : Wall = new Wall();

		let snake : Snake = new Snake(walls.getWallElements(), collectibles.getCollectibleElements(), collectibles);

		root.appendChild(collectibles);
		root.appendChild(walls);
		root.appendChild(snake);

		let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
		cmpCamera.backgroundColor = f.Color.CSS("lavender");
		cmpCamera.pivot.translateZ(15);
		cmpCamera.pivot.rotateY(180);

		let viewport : f.Viewport = new f.Viewport();
		viewport.initialize("Viewport", root, cmpCamera, canvas);

		f.Loop.start(f.LOOP_MODE.TIME_REAL, 5);
		f.Loop.addEventListener("loopFrame", renderLoop);

		function renderLoop () {
			if (snake !== undefined && snake !== null) {
				snake.checkCollisions();
				snake.moveAll();
			}
			viewport.draw();
		}

	}

}