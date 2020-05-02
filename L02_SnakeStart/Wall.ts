namespace L02_SnakeStart{

	import f = FudgeCore;

	export class Wall extends f.Node{

		private wallMesh : f.MeshQuad;
		private wallMaterial : f.Material;

		constructor() {
			super("Wall");
			this.wallMesh = new f.MeshQuad();
			this.wallMaterial = new f.Material(
				"SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("#202020"))
			);
			this.initWalls();
		}

		private initWalls() : void {
			this.initTopWall();
			this.initLeftWall();
			this.initRightWall();
			this.initBottomWall();
		}

		public getWallElements() : f.Node[] {
			return this.getChildren();
		}

		private initTopWall() : void {
			let wallSegment = new f.Node("WallSegment");
			let cmpMesh = new f.ComponentMesh(this.wallMesh);
			let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
			wallSegment.addComponent(cmpMesh);
			cmpMesh.pivot.scaleY(0.5);
			cmpMesh.pivot.scaleX(20);
			wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 4, 0))));
			wallSegment.addComponent(wallComponentMaterial);
			this.appendChild(wallSegment);
		}

		private initBottomWall() : void {
			let wallSegment = new f.Node("WallSegment");
			let cmpMesh = new f.ComponentMesh(this.wallMesh);
			let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
			wallSegment.addComponent(cmpMesh);
			cmpMesh.pivot.scaleY(0.5);
			cmpMesh.pivot.scaleX(20);
			wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, -4, 0))));
			wallSegment.addComponent(wallComponentMaterial);
			this.appendChild(wallSegment);
		}

		private initLeftWall() : void{
			let wallSegment = new f.Node("WallSegment");
			let cmpMesh = new f.ComponentMesh(this.wallMesh);
			let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
			wallSegment.addComponent(cmpMesh);
			cmpMesh.pivot.scaleY(20);
			cmpMesh.pivot.scaleX(0.5);
			wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-8, 4, 0))));
			wallSegment.addComponent(wallComponentMaterial);
			this.appendChild(wallSegment);
		}

		private initRightWall() : void{
			let wallSegment = new f.Node("WallSegment");
			let cmpMesh = new f.ComponentMesh(this.wallMesh);
			let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
			wallSegment.addComponent(cmpMesh);
			cmpMesh.pivot.scaleY(20);
			cmpMesh.pivot.scaleX(0.5);
			wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(8, 4, 0))));
			wallSegment.addComponent(wallComponentMaterial);
			this.appendChild(wallSegment);
		}

	}

}