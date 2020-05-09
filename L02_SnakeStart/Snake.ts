namespace L02_SnakeStart {

    import f = FudgeCore;

    export class Snake extends f.Node {

        private snakeChildren : f.Node[];
        private headDirection : string;
        private headElement : f.Node;
        private isDead : boolean;
        private readonly snakeSegmentMesh : f.MeshCube;
        private readonly snakeSegmentMaterial : f.Material;
        private collisionChecker : CollisionChecker;
        private componentCamera : f.ComponentCamera;
        private cameraMirror : f.ComponentCamera;

        constructor(wallsegments : f.Node[], collectibleElements : f.Node[], collectibles : Collectibles) {
            super("Snake");
            this.headDirection = 'right';
            this.isDead = false;
            this.snakeSegmentMesh = new f.MeshCube();
            this.snakeSegmentMaterial = new f.Material(
                "SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen"))
            );

            this.initSnake(1);

            this.collisionChecker = new CollisionChecker(this, wallsegments, collectibleElements, collectibles);
            this.initCameraEgo();
            this.initCameraMirror();
        }

        private initCameraMirror() : void {
            this.cameraMirror = new f.ComponentCamera();
            this.cameraMirror.backgroundColor = f.Color.CSS("grey");
            this.cameraMirror.pivot.translateZ(15);
            this.cameraMirror.pivot.rotateY(180);
        }

        private initCameraEgo() : void {
            this.componentCamera = new f.ComponentCamera();
            this.componentCamera.backgroundColor = f.Color.CSS('lightblue');
            this.componentCamera.pivot.rotateY(90);
            this.componentCamera.pivot.rotateZ(90);
            this.componentCamera.pivot.rotateY(90);
            this.componentCamera.pivot.translateZ(-1);

            this.headElement.addComponent(this.componentCamera);
        }

        public getCameraForMirror() : f.ComponentCamera {
            return this.cameraMirror;
        }

        public getCamera() : f.ComponentCamera {
            return this.componentCamera;
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

        public displayScorePrompt() : void {
            this.collisionChecker.displayScorePrompt();
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
            window.addEventListener("keydown", (event) => { this.keyDownHandler(event); });
        }

        private keyDownHandler(event : KeyboardEvent) : void {
            if(!this.isDead) {
                switch (event.key) {
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
                this.moveChildrenElements();
                this.headElement.mtxLocal.translateY(1);
            }
        }

        private moveHeadLeft() : void {
            this.moveChildrenElements();
            this.moveLeft();
        }

        private moveHeadRight() : void {
            this.moveChildrenElements();
            this.moveRight();
        }

        private moveLeft() : void {
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
                this.headElement.mtxLocal.translateY(1);
            }
        }

        private moveRight() : void {
            if(!this.isDead) {
                switch (this.headDirection) {
                    case 'up':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'right';
                        break;
                    case 'down':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'right';
                        break;
                    case 'left':
                        this.headElement.mtxLocal.rotateZ(90);
                        this.headDirection = 'up';
                        break;
                    case 'right':
                        this.headElement.mtxLocal.rotateZ(-90);
                        this.headDirection = 'down';
                        break;
                }
                this.headElement.mtxLocal.translateY(1);
            }
        }

        private moveChildrenElements() : void {
            let translations : f.Vector3[] = [];
            let rotations : f.Vector3[] = [];
            for (let i: number = 1; i < this.snakeChildren.length; i++) {
                this.snakeChildren.forEach((child) => {
                    rotations.push(child.mtxLocal.rotation);
                    translations.push(child.mtxLocal.translation);
                });
                this.snakeChildren[i].mtxLocal.rotation = rotations[i - 1];
                this.snakeChildren[i].mtxLocal.translation = translations[i - 1];
            }
        }

    }
}