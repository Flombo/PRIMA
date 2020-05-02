namespace L02_SnakeStart {

    import f = FudgeCore;

    export class Snake extends f.Node {

        private snakeChildren : f.Node[];
        private headDirection : string;
        private headElement : f.Node;
        private isDead : boolean;
        private readonly snakeSegmentMesh : f.MeshQuad;
        private readonly snakeSegmentMaterial : f.Material;
        private collisionChecker : CollisionChecker;

        constructor(wallsegments : f.Node[], collectibleElements : f.Node[], collectibles : Collectibles) {
            super("Snake");
            this.headDirection = 'right';
            this.isDead = false;
            this.snakeSegmentMesh = new f.MeshQuad();
            this.snakeSegmentMaterial = new f.Material(
                "SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen"))
            );
            this.initSnake(2);
            this.collisionChecker = new CollisionChecker(this, wallsegments, collectibleElements, collectibles);
        }

        public checkCollisions() : void {
            this.collisionChecker.checkCollision();
        }

        public setIsDeadTrue() : void {
            this.headDirection = 'dead';
            this.isDead = true;
            this.animateDeath();
        }

        private animateDeath() : void {
            for(let i : number = 1; i < this.snakeChildren.length; i++){
                this.headElement.mtxLocal.rotateZ(30 * i);
                this.snakeChildren[i].mtxLocal.rotateZ(30 * i);
                this.headElement.mtxLocal.translateZ(i);
                this.snakeChildren[i].mtxLocal.translateZ(i);
            }
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

        private setHeadDirection(direction : string) : void {
            this.headDirection = direction;
        }

        private initSnake(value : number) : void {
            this.initSnakeELements(value);
            this.snakeChildren = this.getChildren();
            this.headElement = this.snakeChildren[0];
            window.addEventListener("keydown", (event) => { this.keyDownHandler(event); });
        }

        private keyDownHandler(event : KeyboardEvent) : void {
            if(!this.isDead) {
                switch (event.key) {
                    case f.KEYBOARD_CODE.ARROW_UP:
                        this.moveHeadUp();
                        break;
                    case f.KEYBOARD_CODE.ARROW_DOWN:
                        this.moveHeadDown();
                        break;
                    case f.KEYBOARD_CODE.ARROW_LEFT:
                        this.moveHeadLeft();
                        break;
                    case f.KEYBOARD_CODE.ARROW_RIGHT:
                        this.moveHeadRight();
                        break;
                }
            }
        }

        private initSnakeELements(value : number) : void {
            let headMaterial : f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("salmon")));
            let headComponentMaterialNew : f.ComponentMaterial = new f.ComponentMaterial(headMaterial);

            for (let i: number = 0; i < value; i++) {
                let snakeSegment = new f.Node("Quad");
                let cmpMesh = new f.ComponentMesh(this.snakeSegmentMesh);
                snakeSegment.addComponent(cmpMesh);
                cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
                this.checkIfHead(this.snakeSegmentMaterial, headComponentMaterialNew, snakeSegment, i);
                snakeSegment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-0.8 * i, 0, 0))));
                this.appendChild(snakeSegment);
            }
        }

        private checkIfHead(
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
                switch (this.headDirection) {
                    case 'right':
                        this.moveChildrenElements();
                        this.headElement.mtxLocal.translateX(1);
                        break;
                    case 'left':
                        this.moveChildrenElements();
                        this.headElement.mtxLocal.translateX(-1);
                        break;
                    case 'up':
                        this.moveChildrenElements();
                        this.headElement.mtxLocal.translateY(1);
                        break;
                    case 'down':
                        this.moveChildrenElements();
                        this.headElement.mtxLocal.translateY(-1);
                        break;
                }
            }
        }

        private moveHeadLeft() : void {
            this.moveChildrenElements();
            this.moveRightOrLeftAndSetDirection(-1, 'left');
        }

        private moveHeadRight() : void {
            this.moveChildrenElements();
            this.moveRightOrLeftAndSetDirection(1, 'right');
        }

        private moveHeadUp() : void {
            this.moveChildrenElements();
            this.moveUpOrDownAndSetDirection(1, 'up');
        }

        private moveHeadDown() : void {
            this.moveChildrenElements();
            this.moveUpOrDownAndSetDirection(-1, 'down');
        }

        private moveRightOrLeftAndSetDirection(x : number, direction : string) : void {
            if(!this.isDead) {
                this.headElement.mtxLocal.translateX(x);
                this.setHeadDirection(direction);
            }
        }

        private moveUpOrDownAndSetDirection(y : number, direction : string) : void {
            if(!this.isDead) {
                this.headElement.mtxLocal.translateY(y);
                this.setHeadDirection(direction);
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