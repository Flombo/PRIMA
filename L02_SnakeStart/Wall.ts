namespace L02_SnakeStart{

	import f = FudgeCore;

	export class Wall extends f.Node{

		private wallMesh : f.MeshCube;
		private wallMaterial : f.Material;

		constructor() {
			super("Wall");
			this.wallMesh = new f.MeshCube();
			let img : HTMLImageElement = <HTMLImageElement>document.getElementById("wall");
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
			this.buildWallSegment(30, 1, 3, 0, 10, 0);
		}

		private initBottomWall() : void {
			this.buildWallSegment(30, 1, 3, 0, -10, 0);
		}

		private initLeftWall() : void{
			this.buildWallSegment(1, 35, 3, -15, 0, 0);
		}

		private initRightWall() : void{
			this.buildWallSegment(1, 35, 3, 15, 0, 0);
		}

		private buildWallSegment(scaleX : number, scaleY : number, scaleZ : number, x : number, y : number, z : number) : void{
			let wallSegment = new f.Node("WallSegment");
			let cmpMesh = new f.ComponentMesh(this.wallMesh);
			let wallComponentMaterial = new f.ComponentMaterial(this.wallMaterial);
			wallSegment.addComponent(cmpMesh);
			cmpMesh.pivot.scaleY(scaleY);
			cmpMesh.pivot.scaleX(scaleX);
			cmpMesh.pivot.scaleZ(scaleZ);
			wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(x, y, z))));
			wallSegment.addComponent(wallComponentMaterial);
			this.appendChild(wallSegment);
		}

	}

}