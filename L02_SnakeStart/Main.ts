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

		let light : f.LightAmbient = new f.LightAmbient(f.Color.CSS('orange'));
		let lightComponent : f.ComponentLight = new f.ComponentLight(light);
		let lightNode : f.Node = new f.Node("light");
		lightNode.addComponent(lightComponent);


		root.appendChild(lightNode);

		let viewport : f.Viewport = new f.Viewport();
		viewport.initialize("Viewport", root,snake.getCamera(), canvas);

		let canvasMirror : HTMLCanvasElement = document.createElement('canvas');
		canvasMirror.setAttribute("style",
			"width:" + (window.innerWidth / 5)
			+ "px; height:" + (window.innerHeight / 5) + "px;"
			+ "z-index:" + 999999 +";"
			+ "position: absolute;"
			+ "left: 75%;"
			+ "border: 5px solid orange;"
			+ "border-radius: 100px;"
		);

		document.body.appendChild(canvasMirror);

		let viewportMini : f.Viewport = new f.Viewport();
		viewportMini.initialize("ViewportMini", root, snake.getCameraForMirror(), canvasMirror);

		f.Loop.start(f.LOOP_MODE.TIME_REAL, 2);
		f.Loop.addEventListener("loopFrame", renderLoop);

		function moveLoop() {
			if (!snake.getIsDead()) {
				snake.checkCollisions();
				snake.moveAll();
			} else {
				snake.displayScorePrompt();
			}
		}

		function renderLoop () {
			if (snake !== undefined && snake !== null) {
				moveLoop();
				viewport.draw();
				viewportMini.draw();
			}
		}

	}

}