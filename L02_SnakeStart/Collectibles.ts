namespace L02_SnakeStart {

	import f = FudgeCore;

	export class Collectibles extends f.Node{

		private collectibleMesh : f.MeshSphere;
		private collectibleMaterial : f.Material;

		constructor() {
			super("Collectables");
			this.collectibleMesh = new f.MeshSphere();
			this.collectibleMaterial = new f.Material(
				"SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("darkblue"))
			);
			this.initCollectibleElement();
		}

		public getCollectibleElements() : f.Node[] {
			return this.getChildren();
		}

		private getRandomPosition(range : number[]) : number {
			let index = Math.round(Math.random() * (range.length - 1));
			let pos : number = Math.round(Math.random() * range[index]);
			console.log(pos, index, range.length - 1);
			return pos;
		}

		public initCollectibleElement() : void {
			let collectibleElement = new f.Node("collectibleElement");
			let cmpMesh = new f.ComponentMesh(this.collectibleMesh);
			let wallComponentMaterial = new f.ComponentMaterial(this.collectibleMaterial);
			collectibleElement.addComponent(cmpMesh);
			cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
			collectibleElement.addComponent(
				new f.ComponentTransform(
					f.Matrix4x4.TRANSLATION(
						new f.Vector3(this.getRandomPosition([7, -7]), this.getRandomPosition([3, -3]), 0)
					)
				)
			);
			collectibleElement.addComponent(wallComponentMaterial);
			this.appendChild(collectibleElement);
		}

	}

}