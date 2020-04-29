namespace L02_SnakeStart {
	import f = FudgeCore;

	window.addEventListener("load", (event) => {
		hndLoad(event);
	});

	function hndLoad(_event: Event): void {
		let canvas: HTMLCanvasElement = document.querySelector("canvas");
		canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");

		let snakeChildren : f.Node = new f.Node("Snake");
		initSnake(8, snakeChildren);
		let snake : Snake.Snake = new Snake.Snake();
		snake.initSnake(snakeChildren);

		let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
		cmpCamera.backgroundColor = f.Color.CSS("lavender");
		cmpCamera.pivot.translateZ(15);
		cmpCamera.pivot.rotateY(180);

		let viewport : f.Viewport = new f.Viewport();
		viewport.initialize("Viewport", snakeChildren, cmpCamera, canvas);

		window.addEventListener("keydown", keyDownHandler);

		function initSnake(value : number, rootNode : f.Node) : void {
			let mesh: f.MeshQuad = new f.MeshQuad();
			let mtrSolidWhite: f.Material = new f.Material(
				"SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen"))
			);

			let headMaterial : f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("salmon")));
			let headComponentMaterialNew : f.ComponentMaterial = new f.ComponentMaterial(headMaterial);

			for (let i: number = 0; i < value; i++) {
				let node = new f.Node("Quad");
				let cmpMesh = new f.ComponentMesh(mesh);
				node.addComponent(cmpMesh);
				cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
				if(i !== 0) {
					let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
					node.addComponent(cmpMaterial);
				} else {
					node.addComponent(headComponentMaterialNew);
				}
				node.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-0.8 * i, 0, 0))));
				rootNode.appendChild(node);
			}
		}

		function keyDownHandler(event : KeyboardEvent){
			switch (event.key) {
				case f.KEYBOARD_CODE.ARROW_UP:
					snake.moveHeadUp();
					break;
				case f.KEYBOARD_CODE.ARROW_DOWN:
					snake.moveHeadDown();
					break;
				case f.KEYBOARD_CODE.ARROW_LEFT:
					snake.moveHeadLeft();
					break;
				case f.KEYBOARD_CODE.ARROW_RIGHT:
					snake.moveHeadRight();
					break;
			}
			console.log(snake.getHeadDirection());
		}

		f.Loop.start(f.LOOP_MODE.TIME_GAME, 3);
		f.Loop.addEventListener("loopFrame", renderLoop);

		function renderLoop () {
			if (snake !== undefined && snake !== null) {
				snake.moveAll();
			}
			viewport.draw();
		}

	}

}