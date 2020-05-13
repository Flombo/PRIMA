namespace L02_SnakeStart{

	import f = FudgeCore;

	export class Wall extends f.Node{

		private wallMesh : f.MeshCube;
		private wallMaterial : f.Material;

		constructor() {
			super("Wall");
			this.wallMesh = new f.MeshCube();
			let img : HTMLImageElement = document.createElement("img");
			img.setAttribute("src", "./texture/brickwall.jpg");
			let textureIMG : f.TextureImage = new f.TextureImage();
			textureIMG.image = img;
			let wallTexture : f.CoatTextured = new f.CoatTextured();
			wallTexture.texture = textureIMG;
			this.wallMaterial = new f.Material(
				"SolidWhite", f.ShaderTexture, wallTexture
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
			cmpMesh.pivot.scaleY(1);
			cmpMesh.pivot.scaleX(20);
			cmpMesh.pivot.scaleZ(3);
			wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 4, 0))));
			wallSegment.addComponent(wallComponentMaterial);
			this.appendChild(wallSegment);
		}

		private initBottomWall() : void {
			let wallSegment = new f.Node("WallSegment");
			let cmpMesh = new f.ComponentMesh(this.wallMesh);
			let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
			wallSegment.addComponent(cmpMesh);
			cmpMesh.pivot.scaleY(1);
			cmpMesh.pivot.scaleX(20);
			cmpMesh.pivot.scaleZ(3);
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
			cmpMesh.pivot.scaleX(1);
			cmpMesh.pivot.scaleZ(3);
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
			cmpMesh.pivot.scaleX(1);
			cmpMesh.pivot.scaleZ(3);
			wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(8, 4, 0))));
			wallSegment.addComponent(wallComponentMaterial);
			this.appendChild(wallSegment);
		}

	}

}