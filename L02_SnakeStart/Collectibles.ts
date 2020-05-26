namespace L02_SnakeStart {

	import f = FudgeCore;

	export class Collectibles extends f.Node{

		private collectibleMesh : f.MeshSphere;
		private collectibleMaterial : f.Material;
		private obstacleElements : f.Node[];
		private shadowMesh : f.MeshQuad;
		private shadowMaterial : f.Material;

		constructor(obstacleElments : f.Node[]) {
			super("Collectables");
			this.obstacleElements = obstacleElments;
			this.collectibleMesh = new f.MeshSphere();
			this.collectibleMaterial = new f.Material(
				"SolidWhite", f.ShaderFlat, new f.CoatColored(f.Color.CSS("orange"))
			);
			this.shadowMesh = new f.MeshQuad();
			let shadowIMG : HTMLImageElement = <HTMLImageElement>document.getElementById("shadow");
			let textureIMG : f.TextureImage = new f.TextureImage();
			textureIMG.image = shadowIMG;
			let textureCoat : f.CoatTextured = new f.CoatTextured();
			textureCoat.texture = textureIMG;
			this.shadowMaterial = new f.Material(
				"Shaow", f.ShaderTexture, textureCoat
			)
			this.initCollectibleElement(5);
		}

		public getCollectibleElements() : f.Node[] {
			return this.getChildren();
		}

		private getRandomPosition(range : number[]) : number {
			let index = Math.round(Math.random() * (range.length - 1));
			return Math.round(Math.random() * range[index]);
		}

		private getRandomY(range : number[]) : number {
			let y = this.getRandomPosition(range);
			this.obstacleElements.forEach(segment => {
				while(segment.mtxLocal.translation.y === y){
					y = this.getRandomPosition(range);
				}
			});
			return y;
		}

		private getRandomX(range : number[]) : number {
			let x = this.getRandomPosition(range);
			this.obstacleElements.forEach(segment => {
				while(segment.mtxLocal.translation.x === x){
					x = this.getRandomPosition(range);
				}
			});
			return x;
		}

		public initCollectibleElement(amount : number) : void {
			for(let i : number = 0; i < amount; i++) {
				let collectibleElement = new f.Node("collectibleElement");
				let cmpMesh = new f.ComponentMesh(this.collectibleMesh);
				let componentMaterial = new f.ComponentMaterial(this.collectibleMaterial);
				collectibleElement.addComponent(cmpMesh);

				cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
				let x = this.getRandomX([11, -11]);
				let y = this.getRandomY([7, -7]);
				collectibleElement.addComponent(
					new f.ComponentTransform(
						f.Matrix4x4.TRANSLATION(
							new f.Vector3(x, y, 0)
						)
					)
				);
				collectibleElement.addComponent(componentMaterial);

				this.appendChild(collectibleElement);
			}
		}

	}

}