namespace L02_SnakeStart {
	import f = FudgeCore;

	window.addEventListener("load", (event) => {
		hndLoad(event);
	});

	function hndLoad(_event: Event): void {
		let canvas: HTMLCanvasElement = document.querySelector("canvas");
		styleCanvas(canvas);
		f.RenderManager.initialize(true, true);
		let root : f.Node = new f.Node("root");

		let groundNode : f.Node = new f.Node("ground");

		let groundMesh : f.MeshQuad = new f.MeshQuad();
		let groundMeshComp : f.ComponentMesh = new f.ComponentMesh(groundMesh);
		groundMeshComp.pivot.scaleY(30);
		groundMeshComp.pivot.scaleX(30);
		let grasIMG : HTMLImageElement = <HTMLImageElement>document.getElementById("ground");
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

		let walls : Wall = new Wall();

		let obstacle : Obstacle = new Obstacle();

		let collectibles : Collectibles = new Collectibles(obstacle.getObstacleElements());

		let playerSnake : PlayerSnake = new PlayerSnake(
			walls.getWallElements(),
			obstacle.getObstacleElements(),
			collectibles.getCollectibleElements(),
			collectibles
		);

		let enemySnake : EnemySnake = new EnemySnake(
			walls.getWallElements(),
			obstacle.getObstacleElements(),
			collectibles.getCollectibleElements(),
			collectibles
		);

		root.appendChild(collectibles);
		root.appendChild(walls);
		root.appendChild(obstacle);
		root.appendChild(playerSnake);
		root.appendChild(enemySnake);

		let light : f.LightAmbient = new f.LightAmbient(new f.Color(1, 1, 0.5, 0.1));
		let directionalLight : f.LightDirectional = new f.LightDirectional(f.Color.CSS('white'));
		let directionalLightComp : f.ComponentLight = new f.ComponentLight(directionalLight);
		directionalLightComp.pivot.translateZ(10);
		directionalLightComp.pivot.lookAt(playerSnake.getHeadElement().mtxLocal.translation);
		let lightComponent : f.ComponentLight = new f.ComponentLight(light);
		let lightNode : f.Node = new f.Node("light");
		lightNode.addComponent(lightComponent);
		lightNode.addComponent(directionalLightComp);


		root.appendChild(lightNode);

		let viewport : f.Viewport = new f.Viewport();
		viewport.initialize("Viewport", root, playerSnake.getCamera(), canvas);

		let canvasMirror : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvasMini');
		styleMiniMap(canvasMirror);

		document.body.appendChild(canvasMirror);

		let viewportMini : f.Viewport = new f.Viewport();
		viewportMini.initialize("viewportMini", root, playerSnake.getCameraForMirror(), canvasMirror);
		f.Loop.start(f.LOOP_MODE.TIME_GAME, 3);
		f.Loop.addEventListener("loopFrame", renderLoop);
		let isPaused : boolean = false;
		window.addEventListener("keydown", (event) => {
			let h1 : HTMLElement = <HTMLElement>document.querySelector('h1');
			if(event.key === f.KEYBOARD_CODE.ESC){
				if(isPaused){
					isPaused = false;
					h1.setAttribute("class", "");
					styleMiniMap(canvasMirror);
					styleCanvas(canvas);
				} else {
					isPaused = true;
					h1.setAttribute("class", "visible");
					canvasMirror.setAttribute("style", "opacity: 25%;");
					canvas.setAttribute("style", "opacity: 25%;");
				}
			}
		});

		function styleCanvas(canvas : HTMLCanvasElement) {
			canvas.setAttribute("style", "opacity: 100%; z-index: 90;  width:" + window.innerWidth + "px; height:" + window.innerHeight + "px;");
		}

		function styleMiniMap(canvas : HTMLCanvasElement) : void{
			canvas.setAttribute("style",
				"width:" + (window.innerWidth / 7)
				+ "px; height:" + (window.innerHeight / 7) + "px;"
				+ "z-index:" + 999999 +";"
				+ "position: absolute;"
				+ "left: 75%;"
				+ "top: 0;"
				+ "border: 5px solid orange;"
				+ "opacity: 100%;"
			);
		}

		function moveLoop() {
			if (!playerSnake.getIsDead()) {
				playerSnake.checkCollisions();
				playerSnake.moveAll();
				enemySnake.checkCollisions();
			} else {
				playerSnake.displayScorePrompt();
			}
		}

		function renderLoop () {
			if(!isPaused) {
				if (playerSnake !== undefined && playerSnake !== null) {
					viewport.draw();
					viewportMini.draw();
					moveLoop();
				}
			}
		}

	}

}