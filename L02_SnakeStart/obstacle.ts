namespace L02_SnakeStart{

	import f = FudgeCore;

	export class Obstacle extends f.Node{

		private obstacleMesh : f.MeshCube;
		private obstacleMaterial : f.Material;

		constructor() {
			super("Obstacle");
			this.obstacleMesh = new f.MeshCube();
			let img : HTMLImageElement = <HTMLImageElement>document.getElementById("wall");
			let textureIMG : f.TextureImage = new f.TextureImage();
			textureIMG.image = img;
			let wallTexture : f.CoatTextured = new f.CoatTextured();
			wallTexture.texture = textureIMG;
			this.obstacleMaterial = new f.Material(
				"SolidWhite", f.ShaderTexture, wallTexture
			);
			this.buildObstacle(10);
		}

		public getObstacleElements() : f.Node[] {
			return this.getChildren();
		}

		private getRandomPosition(range : number[]) : number {
			let index = Math.round(Math.random() * (range.length - 1));
			let pos : number = Math.round(Math.random() * range[index]);
			console.log(pos, index, range.length - 1);
			return pos;
		}

		private buildObstacle( amount : number) : void {
			for(let i = 0; i < amount; i++){
				let x: number = this.getRandomPosition([-14, 14]);
				let y: number = this.getRandomPosition([-8, 8]);
				let wallSegment = new f.Node("WallSegment");
				let cmpMesh = new f.ComponentMesh(this.obstacleMesh);
				let wallComponentMaterial = new f.ComponentMaterial(this.obstacleMaterial);
				wallSegment.addComponent(cmpMesh);
				cmpMesh.pivot.scaleY(1);
				cmpMesh.pivot.scaleX(1);
				cmpMesh.pivot.scaleZ(3);
				wallSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(x, y, 0))));
				wallSegment.addComponent(wallComponentMaterial);
				this.appendChild(wallSegment);
			}
		}

	}

}