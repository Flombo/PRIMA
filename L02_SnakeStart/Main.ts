namespace L02_SnakeStart {
	import f = FudgeCore;

	window.addEventListener("load", (event) => {
		hndLoad(event);
	});

	function hndLoad(_event: Event): void {
		let canvas: HTMLCanvasElement = document.querySelector("canvas");
		canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");
		f.RenderManager.initialize(true, true);
		let root : f.Node = new f.Node("root");

		let groundNode : f.Node = new f.Node("ground");

		let groundMesh : f.MeshQuad = new f.MeshQuad();
		let groundMeshComp : f.ComponentMesh = new f.ComponentMesh(groundMesh);
		groundMeshComp.pivot.scaleY(20);
		groundMeshComp.pivot.scaleX(20);

		let grasIMG : HTMLImageElement = document.createElement("img");
		grasIMG.setAttribute("src", "./texture/gras.jpg");
		let grastextureImage : f.TextureImage = new f.TextureImage();
		grastextureImage.image = grasIMG;
		let groundTextureCoat : f.CoatTextured = new f.CoatTextured();
		groundTextureCoat.texture = grastextureImage;
		let groundMaterial : f.Material = new f.Material("ground", f.ShaderTexture, groundTextureCoat);
		let groundComponentMat : f.ComponentMaterial = new f.ComponentMaterial(groundMaterial);

		let groundTransformComp : f.ComponentTransform = new f.ComponentTransform(
			f.Matrix4x4.TRANSLATION(new f.Vector3(0,0,-1)))

		groundNode.addComponent(groundTransformComp);
		groundNode.addComponent(groundMeshComp);
		groundNode.addComponent(groundComponentMat);

		root.appendChild(groundNode);


		let collectibles : Collectibles = new Collectibles();

		let walls : Wall = new Wall();

		let snake : Snake = new Snake(walls.getWallElements(), collectibles.getCollectibleElements(), collectibles);

		root.appendChild(collectibles);
		root.appendChild(walls);
		root.appendChild(snake);

		let light : f.LightAmbient = new f.LightAmbient(f.Color.CSS('orange'));
		let lightComponent : f.ComponentLight = new f.ComponentLight(light);
		let lightNode : f.Node = new f.Node("light");
		lightNode.activate(true);
		lightNode.addComponent(lightComponent);


		root.appendChild(lightNode);

		let viewport : f.Viewport = new f.Viewport();
		viewport.initialize("Viewport", root,snake.getCamera(), canvas);

		let canvasMirror : HTMLCanvasElement = document.createElement('canvas');
		canvasMirror.setAttribute("style",
			"width:" + (window.innerWidth / 7)
			+ "px; height:" + (window.innerHeight / 7) + "px;"
			+ "z-index:" + 999999 +";"
			+ "position: absolute;"
			+ "left: 75%;"
			+ "border: 5px solid orange;"
			+ "border-radius: 100px;"
		);

		document.body.appendChild(canvasMirror);

		let viewportMini : f.Viewport = new f.Viewport();
		viewportMini.initialize("ViewportMini", snake, snake.getCameraForMirror(), canvasMirror);

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