namespace Snake {

    import f = FudgeCore;

    export class Snake {
        private snakeChildren : f.Node[];
        private headDirection : string;
        private headElement : f.Node;

        constructor() {
            this.headDirection = 'start';
        }

        protected initSnake(children) : void {
            this.snakeChildren = children.getChildren();
            this.headElement = this.snakeChildren[0];
        }

        protected getSnakeChildren() : f.Node[] {
            return this.snakeChildren;
        }

        protected addSnakeElement(element : f.Node) : void {
            this.snakeChildren.push(element);
        }


        protected getHeadDirection(): string {
            return this.headDirection;
        }

        protected moveAll() : void {
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
                case 'start':
                    this.moveChildrenElements();
                    this.headElement.mtxLocal.translateX(1);
                    break;
            }
        }

        protected moveHeadLeft() : void {
            switch (this.headDirection) {
                case 'right':
                    this.moveChildrenElements();
                    this.headDirection = 'start';
                    this.headElement.mtxLocal.translateX(-1);
                    break;
                case 'down':
                    this.moveChildrenElements();
                    this.headElement.mtxLocal.translateX(-1);
                    this.headDirection = 'left';
                    break;
                case 'left':
                    this.moveChildrenElements();
                    this.headElement.mtxLocal.translateX(-1);
                    this.headDirection = 'left';
                    break;
                case 'up':
                    this.moveChildrenElements();
                    this.headElement.mtxLocal.translateX(-1);
                    this.headDirection = 'left';
                    break;
                case 'start':
                    this.moveChildrenElements();
                    this.headElement.mtxLocal.translateX(-1);
                    this.headDirection = 'left';
                    break;
            }
        }

        protected moveHeadRight() : void {
            switch (this.headDirection) {
                case 'left':
                    this.moveChildrenElements();
                    this.headDirection = 'start';
                    this.headElement.mtxLocal.translateX(1);
                    break;
                case 'down':
                    this.moveChildrenElements();
                    this.headDirection = 'right';
                    this.headElement.mtxLocal.translateX(1);
                    break;
                case 'right':
                    this.moveChildrenElements();
                    this.headElement.mtxLocal.translateX(1);
                    this.headDirection = 'right';
                    break;
                case 'up':
                    this.moveChildrenElements();
                    this.headElement.mtxLocal.translateX(1);
                    this.headDirection = 'right';
                    break;
                case 'start':
                    this.moveChildrenElements();
                    this.headElement.mtxLocal.translateX(1);
                    this.headDirection = 'right';
                    break;
            }
        }

        protected moveHeadUp() : void {
            switch (this.headDirection) {
                case 'down':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(1, 'start');
                    break;
                case 'left':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(1, 'up');
                    break;
                case 'right':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(1, 'up');
                    break;
                case 'start':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(1, 'up');
                    break;
                case 'up':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(1, 'up');
                    break;
            }
        }

        protected moveHeadDown() : void {
            switch (this.headDirection) {
                case 'up':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(-1, 'start');
                    break;
                case 'left':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(-1, 'down');
                    break;
                case 'right':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(-1, 'down');
                    break;
                case 'down':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(-1, 'down');
                    break;
                case 'start':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(-1, 'down');
                    break;
            }
        }

        protected moveUpOrDownAndSetDirection(y : number, direction : string) : void {
            this.headElement.mtxLocal.translateY(y);
            this.headDirection = direction;
        }

        protected moveChildrenElements() : void {
            let translations = [];
            for (let i: number = 1; i < this.snakeChildren.length; i++) {
                this.snakeChildren.forEach((child) => {
                    translations.push(child.mtxLocal.translation);
                });
                this.snakeChildren[i].mtxLocal.translation = translations[i - 1];
            }
        }

    }
}