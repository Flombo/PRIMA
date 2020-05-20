namespace L02_SnakeStart {

	import f = FudgeCore;

	export class EnemySnake extends Snake {

		constructor(
			wallSegments : f.Node[],
			obstacleSegments : f.Node[],
			collectibleElements : f.Node[],
			collectibles : Collectibles
		) {
			super(wallSegments, obstacleSegments, collectibleElements, collectibles);
			this.getChildren().forEach(segment => {
				segment.mtxLocal.translate(new f.Vector3(10, 4,0));
			});
			this.headElement.getComponent(f.ComponentMaterial).material.setCoat(
				new f.CoatColored(f.Color.CSS("purple"))
			);
		}

		// isObjectInFOV() : boolean {
		// 	// let headTranslation = this.headElement.mtxLocal.translation;
		// 	// if(new f)
		// }

	}
}