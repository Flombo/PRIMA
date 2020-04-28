namespace L02_SnakeStart {
	import f = FudgeCore;

	window.addEventListener("load", (event) => {
		hndLoad(event);
	});

	function hndLoad(_event: Event): void {
		let canvas: HTMLCanvasElement = document.querySelector("canvas");
		canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");

		let snake : f.Node = new f.Node("Snake");
		initQuads(4, snake);

		let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
		cmpCamera.pivot.translateZ(15);
		cmpCamera.pivot.rotateY(180);

		let viewport : f.Viewport = new f.Viewport();
		viewport.initialize("Viewport", snake, cmpCamera, canvas);
		// window.addEventListener("keydown", keyDownHandler);

		function initQuads(value : number, rootNode : f.Node) : void {
			let mesh: f.MeshQuad = new f.MeshQuad();
			let mtrSolidWhite: f.Material = new f.Material(
				"SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen"))
			);
			let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
			let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);

			for (let i: number = 0; i < value; i++) {
				let node: f.Node = new f.Node("Quad");
				cmpMesh.pivot.scale(f.Vector3.ONE(0.8));
				node.addComponent(cmpMesh);
				node.addComponent(cmpMaterial);
				node.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(i,0,0))));
				node.mtxLocal.scale(f.Vector3.ONE(0.8));
				rootNode.appendChild(node);
			}
		}

		// function keyDownHandler(event : KeyboardEvent){
		// 	switch (event.key) {
		// 		case f.KEYBOARD_CODE.ARROW_UP:
		// 			node.cmpTransform.local.translateY(1);
		// 			break;
		// 		case f.KEYBOARD_CODE.ARROW_DOWN:
		// 			node.cmpTransform.local.translateY(-1);
		// 			break;
		// 		case f.KEYBOARD_CODE.ARROW_LEFT:
		// 			node.cmpTransform.local.translateX(-1);
		// 			break;
		// 		case f.KEYBOARD_CODE.ARROW_RIGHT:
		// 			node.cmpTransform.local.translateX(1);
		// 			break;
		// 	}
		// 	viewport.draw();
		// }

		viewport.draw();
	}

}