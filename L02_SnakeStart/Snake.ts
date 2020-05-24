namespace L02_SnakeStart {

    import f = FudgeCore;

    export class Snake extends f.Node {

        private snakeChildren : f.Node[];
        private headDirection : string;
        protected headElement : f.Node;
        protected isDead : boolean;
        private readonly snakeSegmentMesh : f.MeshCube;
        private readonly snakeSegmentMaterial : f.Material;
        protected collisionChecker : CollisionChecker;

        constructor(
            wallsegments : f.Node[],
            obstacleSegments : f.Node[],
            collectibleElements : f.Node[],
            collectibles : Collectibles
        ) {
            super("Snake");
            this.headDirection = 'down';
            this.isDead = false;
            this.snakeSegmentMesh = new f.MeshCube();
            this.snakeSegmentMaterial = new f.Material(
                "SolidWhite", f.ShaderFlat, new f.CoatColored(f.Color.CSS("lightgreen"))
            );
            this.initSnake(3);
            this.collisionChecker = new CollisionChecker(this, wallsegments, obstacleSegments, collectibleElements, collectibles);
        }

        public setHeadDirection(direction : string) : void {
        	this.headDirection = direction;
		}

		public getHeadDirection() : string {
            return this.headDirection;
        }

        public checkCollisions() : void {
            this.collisionChecker.checkCollision();
        }

        public setIsDeadTrue() : void {
            this.headDirection = 'dead';
            this.isDead = true;
        }

        public getIsDead() : boolean {
            return this.isDead;
        }

        public getHeadElement() : f.Node {
            return this.headElement;
        }

        public grow() : void {
            let y : number = this.snakeChildren[this.snakeChildren.length -1 ].mtxLocal.translation.y;
            let x : number = this.snakeChildren[this.snakeChildren.length -1 ].mtxLocal.translation.x;
            let snakeSegment = new f.Node("Quad");
            let cmpMesh = new f.ComponentMesh(this.snakeSegmentMesh);
            snakeSegment.addComponent(cmpMesh);
            cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
            snakeSegment.addComponent(
                new f.ComponentTransform(
                    f.Matrix4x4.TRANSLATION(new f.Vector3(x, y, 0))
                )
            );
            let cmpMaterial = new f.ComponentMaterial(this.snakeSegmentMaterial);
            snakeSegment.addComponent(cmpMaterial);
            this.appendChild(snakeSegment);
            this.snakeChildren.push(snakeSegment);
        }

        private initSnake(value : number) : void {
            this.initSnakeELements(value);
            this.snakeChildren = this.getChildren();
            this.headElement = this.snakeChildren[0];
        }

        private initSnakeELements(value : number) : void {
            let headMaterial : f.Material = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(f.Color.CSS("salmon")));
            let headComponentMaterialNew : f.ComponentMaterial = new f.ComponentMaterial(headMaterial);

            for (let i: number = 0; i < value; i++) {
                let snakeSegment = new f.Node("Quad");
                let cmpMesh = new f.ComponentMesh(this.snakeSegmentMesh);
                snakeSegment.addComponent(cmpMesh);
                cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
                Snake.checkIfHead(this.snakeSegmentMaterial, headComponentMaterialNew, snakeSegment, i);
                snakeSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-0.8 * i, 0, 0))));
                this.appendChild(snakeSegment);
            }
        }

        private static checkIfHead(
            segmentMaterial : f.Material,
            headComponentMaterial : f.ComponentMaterial,
            snakeSegment : f.Node, i : number
        ) : void {
            if(i !== 0) {
                let cmpMaterial = new f.ComponentMaterial(segmentMaterial);
                snakeSegment.addComponent(cmpMaterial);
            } else {
                snakeSegment.addComponent(headComponentMaterial);
            }
        }

        public moveAll() : void {
            if(!this.isDead) {
                this.moveChildrenElements();
                this.headElement.mtxLocal.translateY(1);
            }
        }

        public moveHeadLeft() : void {
            if(!this.isDead) {
                switch (this.headDirection) {
                    case 'up':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'left';
                        break;
                    case 'down':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'left';
                        break;
                    case 'left':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'down';
                        break;
                    case 'right':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'up';
                        break;
                }
            }
        }

        public moveHeadRight() : void {
            if(!this.isDead) {
                switch (this.headDirection) {
                    case 'up':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'right';
                        break;
                    case 'down':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'right';
                        break;
                    case 'left':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'up';
                        break;
                    case 'right':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'down';
                        break;
                }
            }
        }

        public turnDown() : void {
            switch (this.getHeadDirection()) {
                case 'left':
                    this.headElement.mtxLocal.rotateZ(90);
                    this.headDirection = 'down';
                    break;
                case 'up':
                    this.headElement.mtxLocal.rotateZ(180);
                    this.headDirection = 'down';
                    break;
                case 'right':
                    this.headElement.mtxLocal.rotateZ(-90);
                    this.headDirection = 'down';
                    break;
            }
        }

        public turnUp() : void {
            switch (this.getHeadDirection()) {
                case 'left':
                    this.headElement.mtxLocal.rotateZ(-90);
                    this.headDirection = 'up';
                    break;
                case 'down':
                    this.headElement.mtxLocal.rotateZ(180);
                    this.headDirection = 'up';
                    break;
                case 'right':
                    this.headElement.mtxLocal.rotateZ(90);
                    this.headDirection = 'up';
                    break;
            }
        }

        public turnRight() : void {
            switch (this.getHeadDirection()) {
                case 'up':
                    this.headElement.mtxLocal.rotateZ(-90);
                    this.headDirection = 'right';
                    break;
                case 'down':
                    this.headElement.mtxLocal.rotateZ(90);
                    this.headDirection = 'right';
                    break;
                case 'left':
                    this.headElement.mtxLocal.rotateZ(180);
                    this.headDirection = 'right';
                    break;
            }
        }

        public turnLeft() : void {
            switch (this.getHeadDirection()) {
                case 'up':
                    this.headElement.mtxLocal.rotateZ(90);
                    this.headDirection = 'left';
                    break;
                case 'down':
                    this.headElement.mtxLocal.rotateZ(-90);
                    this.headDirection = 'left';
                    break;
                case 'right':
                    this.headElement.mtxLocal.rotateZ(180);
                    this.headDirection = 'left';
                    break;
            }
        }

        private moveChildrenElements() : void {
            let translations : f.Vector3[] = [];
            for (let i: number = 1; i < this.snakeChildren.length; i++) {
                this.snakeChildren.forEach((child) => {
                    translations.push(child.mtxLocal.translation);
                });
                this.snakeChildren[i].mtxLocal.translation = translations[i - 1];
            }
        }

    }
}