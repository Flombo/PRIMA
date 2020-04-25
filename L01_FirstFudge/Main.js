var L01_FirstFudge;
(function (L01_FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", function (event) {
        hndLoad(event);
    });
    function hndLoad(_event) {
        var canvas = document.querySelector("canvas");
        canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");
        var xTranslationSlider = document.getElementById("xTranslation");
        var yTranslationSlider = document.getElementById("yTranslation");
        var zTranslationSlider = document.getElementById("zTranslation");
        var xRotationSlider = document.getElementById("xRotation");
        var yRotationSlider = document.getElementById("yRotation");
        var zRotationSlider = document.getElementById("zRotation");
        var outputX = document.getElementById("xOutput");
        var outputY = document.getElementById("yOutput");
        var outputZ = document.getElementById("zOutput");
        var yRotationOutput = document.getElementById("yRotationOutput");
        var xOutputRotation = document.getElementById("xOutputRotation");
        var zOutputRotation = document.getElementById("zOutputRotation");
        var x = 0;
        var z = 0;
        var y = 0;
        var node = new f.Node("Quad");
        var mesh = new f.MeshCube();
        var cmpMesh = new f.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        node.addComponent(new f.ComponentTransform());
        node.getComponent(f.ComponentMesh).pivot.scaleY(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleX(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleZ(0.5);
        var mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen")));
        var cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        var cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);
        var viewport = new f.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        window.addEventListener("keydown", keyDownHandler);
        function keyDownHandler(event) {
            switch (event.key) {
                case f.KEYBOARD_CODE.ARROW_UP:
                    node.cmpTransform.local.translateY(0.01);
                    break;
                case f.KEYBOARD_CODE.ARROW_DOWN:
                    node.cmpTransform.local.translateY(-0.01);
                    break;
                case f.KEYBOARD_CODE.ARROW_LEFT:
                    node.cmpTransform.local.translateX(-0.01);
                    break;
                case f.KEYBOARD_CODE.ARROW_RIGHT:
                    node.cmpTransform.local.translateX(0.01);
                    break;
            }
            viewport.draw();
        }
        initRotationHandling();
        initTranslationHandling();
        function initRotationHandling() {
            changeRotationOutputBoxes();
            xRotationSlider.addEventListener("input", rotateModel);
            yRotationSlider.addEventListener("input", rotateModel);
            zRotationSlider.addEventListener("input", rotateModel);
            xOutputRotation.addEventListener("input", function () {
                changeSliderValue(xRotationSlider, xOutputRotation);
            });
            yRotationOutput.addEventListener("input", function () {
                changeSliderValue(yRotationSlider, yRotationOutput);
            });
            zOutputRotation.addEventListener("input", function () {
                changeSliderValue(zRotationSlider, zOutputRotation);
            });
        }
        function changeSliderValue(slider, output) {
            slider.value = output.value;
            rotateModel();
            translateModel();
        }
        function initTranslationHandling() {
            changeTranslationOutputBoxes();
            xTranslationSlider.addEventListener("input", function () { translateModel(); });
            yTranslationSlider.addEventListener("input", function () { translateModel(); });
            zTranslationSlider.addEventListener("input", function () { translateModel(); });
            outputX.addEventListener("input", function () {
                changeSliderValue(xTranslationSlider, outputX);
            });
            outputZ.addEventListener("input", function () {
                changeSliderValue(zTranslationSlider, outputZ);
            });
            outputY.addEventListener("input", function () {
                changeSliderValue(yTranslationSlider, outputY);
            });
        }
        function changeRotationOutputBoxes() {
            changeOutputSlider(xOutputRotation, xRotationSlider);
            changeOutputSlider(yRotationOutput, yRotationSlider);
            changeOutputSlider(zOutputRotation, zRotationSlider);
        }
        function changeTranslationOutputBoxes() {
            changeOutputSlider(outputX, xTranslationSlider);
            changeOutputSlider(outputY, yTranslationSlider);
            changeOutputSlider(outputZ, zTranslationSlider);
        }
        function changeOutputSlider(output, slider) {
            output.value = slider.value;
        }
        function rotateModel() {
            changeOutputSlider(yRotationOutput, yRotationSlider);
            changeOutputSlider(xOutputRotation, xRotationSlider);
            changeOutputSlider(zOutputRotation, zRotationSlider);
            node.getComponent(f.ComponentMesh).pivot.rotateY(Number(yRotationSlider.value));
            node.getComponent(f.ComponentMesh).pivot.rotateX(Number(xRotationSlider.value));
            node.getComponent(f.ComponentMesh).pivot.rotateZ(Number(zRotationSlider.value));
            viewport.draw();
        }
        function translateModel() {
            changeTranslationOutputBoxes();
            translateByValueAndAxisCode(Number(xTranslationSlider.value), 'x');
            translateByValueAndAxisCode(Number(yTranslationSlider.value), 'y');
            translateByValueAndAxisCode(Number(zTranslationSlider.value), 'z');
            viewport.draw();
        }
        function translateByValueAndAxisCode(value, axisCode) {
            switch (axisCode) {
                case 'x':
                    translateXByValue(value);
                    break;
                case 'y':
                    translateYByValue(value);
                    break;
                case 'z':
                    translateZByValue(value);
                    break;
            }
        }
        function translateXByValue(value) {
            if (value > x) {
                node.cmpTransform.local.translateX(0.01);
            }
            else if (value < x) {
                node.cmpTransform.local.translateX(-0.01);
            }
            x = value;
        }
        function translateYByValue(value) {
            if (value > y) {
                node.cmpTransform.local.translateY(0.01);
            }
            else if (value < y) {
                node.cmpTransform.local.translateY(-0.01);
            }
            y = value;
        }
        function translateZByValue(value) {
            if (value > z) {
                node.cmpTransform.local.translateZ(0.01);
            }
            else if (value < z) {
                node.cmpTransform.local.translateZ(-0.01);
            }
            z = value;
        }
        viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
