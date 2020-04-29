var L02_SnakeStart;
(function (L02_SnakeStart) {
    var f = FudgeCore;
    window.addEventListener("load", function (event) {
        hndLoad(event);
    });
    function hndLoad(_event) {
        var canvas = document.querySelector("canvas");
        canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");
        var snakeChildren = new f.Node("Snake");
        initSnake(8, snakeChildren);
        var snake = new Snake.Snake();
        snake.initSnake(snakeChildren);
        var cmpCamera = new f.ComponentCamera();
        cmpCamera.backgroundColor = f.Color.CSS("lavender");
        cmpCamera.pivot.translateZ(15);
        cmpCamera.pivot.rotateY(180);
        var viewport = new f.Viewport();
        viewport.initialize("Viewport", snakeChildren, cmpCamera, canvas);
        window.addEventListener("keydown", keyDownHandler);
        function initSnake(value, rootNode) {
            var mesh = new f.MeshQuad();
            var mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen")));
            var headMaterial = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("salmon")));
            var headComponentMaterialNew = new f.ComponentMaterial(headMaterial);
            for (var i = 0; i < value; i++) {
                var node = new f.Node("Quad");
                var cmpMesh = new f.ComponentMesh(mesh);
                node.addComponent(cmpMesh);
                cmpMesh.pivot.scale(f.Vector3.ONE(0.5));
                if (i !== 0) {
                    var cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
                    node.addComponent(cmpMaterial);
                }
                else {
                    node.addComponent(headComponentMaterialNew);
                }
                node.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-0.8 * i, 0, 0))));
                rootNode.appendChild(node);
            }
        }
        function keyDownHandler(event) {
            switch (event.key) {
                case f.KEYBOARD_CODE.ARROW_UP:
                    snake.moveHeadUp();
                    break;
                case f.KEYBOARD_CODE.ARROW_DOWN:
                    snake.moveHeadDown();
                    break;
                case f.KEYBOARD_CODE.ARROW_LEFT:
                    snake.moveHeadLeft();
                    break;
                case f.KEYBOARD_CODE.ARROW_RIGHT:
                    snake.moveHeadRight();
                    break;
            }
            console.log(snake.getHeadDirection());
        }
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 3);
        f.Loop.addEventListener("loopFrame", renderLoop);
        function renderLoop() {
            if (snake !== undefined && snake !== null) {
                snake.moveAll();
            }
            viewport.draw();
        }
    }
})(L02_SnakeStart || (L02_SnakeStart = {}));
