var Snake;
(function (Snake_1) {
    var Snake = /** @class */ (function () {
        function Snake() {
            this.headDirection = 'right';
        }
        Snake.prototype.initSnake = function (children) {
            this.snakeChildren = children.getChildren();
            this.headElement = this.snakeChildren[0];
        };
        Snake.prototype.getSnakeChildren = function () {
            return this.snakeChildren;
        };
        Snake.prototype.addSnakeElement = function (element) {
            this.snakeChildren.push(element);
        };
        Snake.prototype.getHeadDirection = function () {
            return this.headDirection;
        };
        Snake.prototype.moveAll = function () {
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
        };
        Snake.prototype.moveHeadLeft = function () {
            switch (this.headDirection) {
                case 'right':
                    this.moveChildrenElements();
                    this.headDirection = 'left';
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
            }
        };
        Snake.prototype.moveHeadRight = function () {
            switch (this.headDirection) {
                case 'left':
                    this.moveChildrenElements();
                    this.headDirection = 'right';
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
        };
        Snake.prototype.moveHeadUp = function () {
            switch (this.headDirection) {
                case 'down':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(1, 'up');
                    break;
                case 'left':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(1, 'up');
                    break;
                case 'right':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(1, 'up');
                    break;
                case 'up':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(1, 'up');
                    break;
            }
        };
        Snake.prototype.moveHeadDown = function () {
            switch (this.headDirection) {
                case 'up':
                    this.moveChildrenElements();
                    this.moveUpOrDownAndSetDirection(-1, 'down');
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
            }
        };
        Snake.prototype.moveUpOrDownAndSetDirection = function (y, direction) {
            this.headElement.mtxLocal.translateY(y);
            this.headDirection = direction;
        };
        Snake.prototype.moveChildrenElements = function () {
            var translations = [];
            for (var i = 1; i < this.snakeChildren.length; i++) {
                this.snakeChildren.forEach(function (child) {
                    translations.push(child.mtxLocal.translation);
                });
                this.snakeChildren[i].mtxLocal.translation = translations[i - 1];
            }
        };
        return Snake;
    }());
    Snake_1.Snake = Snake;
})(Snake || (Snake = {}));
