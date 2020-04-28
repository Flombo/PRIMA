var L01_FirstFudge;
(function (L01_FirstFudge) {
    var f = FudgeCore;
    var UI = /** @class */ (function () {
        function UI(node, viewport) {
            this.xTranslationSlider = document.getElementById("xTranslation");
            this.yTranslationSlider = document.getElementById("yTranslation");
            this.zTranslationSlider = document.getElementById("zTranslation");
            this.xRotationSlider = document.getElementById("xRotation");
            this.yRotationSlider = document.getElementById("yRotation");
            this.zRotationSlider = document.getElementById("zRotation");
            this.outputX = document.getElementById("xOutput");
            this.outputY = document.getElementById("yOutput");
            this.outputZ = document.getElementById("zOutput");
            this.yRotationOutput = document.getElementById("yRotationOutput");
            this.xOutputRotation = document.getElementById("xOutputRotation");
            this.zOutputRotation = document.getElementById("zOutputRotation");
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.node = node;
            this.viewport = viewport;
        }
        UI.prototype.initTranslationHandling = function () {
            var _this = this;
            this.changeTranslationOutputBoxes();
            this.xTranslationSlider.addEventListener("input", function () { _this.translateModel(); });
            this.yTranslationSlider.addEventListener("input", function () { _this.translateModel(); });
            this.zTranslationSlider.addEventListener("input", function () { _this.translateModel(); });
            this.addOutputListener(this.outputX, this.xTranslationSlider);
            this.addOutputListener(this.outputZ, this.zTranslationSlider);
            this.addOutputListener(this.outputY, this.yTranslationSlider);
        };
        UI.prototype.initRotationHandling = function () {
            var _this = this;
            this.changeRotationOutputBoxes();
            this.xRotationSlider.addEventListener("input", function () {
                _this.rotateModel();
            });
            this.yRotationSlider.addEventListener("input", function () {
                _this.rotateModel();
            });
            this.zRotationSlider.addEventListener("input", function () {
                _this.rotateModel();
            });
            this.xOutputRotation.addEventListener("input", function () {
                _this.changeSliderValue(_this.xRotationSlider, _this.xOutputRotation);
            });
            this.yRotationOutput.addEventListener("input", function () {
                _this.changeSliderValue(_this.yRotationSlider, _this.yRotationOutput);
            });
            this.zOutputRotation.addEventListener("input", function () {
                _this.changeSliderValue(_this.zRotationSlider, _this.zOutputRotation);
            });
        };
        UI.prototype.changeSliderValue = function (slider, output) {
            slider.value = output.value;
            this.rotateModel();
            this.translateModel();
        };
        UI.prototype.addOutputListener = function (output, slider) {
            var _this = this;
            output.addEventListener("input", function () {
                _this.changeSliderValue(slider, output);
            });
        };
        UI.prototype.changeOutputSlider = function (output, slider) {
            output.value = slider.value;
        };
        UI.prototype.changeRotationOutputBoxes = function () {
            this.changeOutputSlider(this.xOutputRotation, this.xRotationSlider);
            this.changeOutputSlider(this.yRotationOutput, this.yRotationSlider);
            this.changeOutputSlider(this.zOutputRotation, this.zRotationSlider);
        };
        UI.prototype.changeTranslationOutputBoxes = function () {
            this.changeOutputSlider(this.outputX, this.xTranslationSlider);
            this.changeOutputSlider(this.outputY, this.yTranslationSlider);
            this.changeOutputSlider(this.outputZ, this.zTranslationSlider);
        };
        UI.prototype.rotateModel = function () {
            this.changeRotationOutputBoxes();
            this.node.getComponent(f.ComponentMesh).pivot.rotateY(Number(this.yRotationSlider.value));
            this.node.getComponent(f.ComponentMesh).pivot.rotateX(Number(this.xRotationSlider.value));
            this.node.getComponent(f.ComponentMesh).pivot.rotateZ(Number(this.zRotationSlider.value));
            this.viewport.draw();
        };
        UI.prototype.translateModel = function () {
            this.changeTranslationOutputBoxes();
            this.translateByValueAndAxisCode(Number(this.xTranslationSlider.value), 'x');
            this.translateByValueAndAxisCode(Number(this.yTranslationSlider.value), 'y');
            this.translateByValueAndAxisCode(Number(this.zTranslationSlider.value), 'z');
            this.viewport.draw();
        };
        UI.prototype.translateByValueAndAxisCode = function (value, axisCode) {
            switch (axisCode) {
                case 'x':
                    this.translateXByValue(value);
                    break;
                case 'y':
                    this.translateYByValue(value);
                    break;
                case 'z':
                    this.translateZByValue(value);
                    break;
            }
        };
        UI.prototype.translateXByValue = function (value) {
            console.log(value, this.x);
            if (value > this.x) {
                this.node.cmpTransform.local.translateX(1);
            }
            else if (value < this.x) {
                this.node.cmpTransform.local.translateX(-1);
            }
            this.x = value;
        };
        UI.prototype.translateYByValue = function (value) {
            if (value > this.y) {
                this.node.cmpTransform.local.translateY(1);
            }
            else if (value < this.y) {
                this.node.cmpTransform.local.translateY(-1);
            }
            this.y = value;
        };
        UI.prototype.translateZByValue = function (value) {
            if (value > this.z) {
                this.node.cmpTransform.local.translateZ(1);
            }
            else if (value < this.z) {
                this.node.cmpTransform.local.translateZ(-1);
            }
            this.z = value;
        };
        return UI;
    }());
    window.addEventListener("load", function (event) {
        hndLoad(event);
    });
    function hndLoad(_event) {
        var canvas = document.querySelector("canvas");
        canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");
        var cube1Checkbox = document.getElementById("cube1");
        var cube2Checkbox = document.getElementById("cube2");
        var rootNode = new f.Node("root");
        var node = new f.Node("Quad");
        var planeNode = new f.Node("Plane");
        var mesh = new f.MeshCube();
        var cmpMesh = new f.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        var planeMesh = new f.MeshCube();
        var cmpPlaneMesh = new f.ComponentMesh(planeMesh);
        planeNode.addComponent(cmpPlaneMesh);
        node.addComponent(new f.ComponentTransform());
        node.getComponent(f.ComponentMesh).pivot.scaleY(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleX(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleZ(0.5);
        var mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen")));
        var cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        var planeMaterial = new f.Material("PlaneMaterial", f.ShaderUniColor, new f.CoatColored(f.Color.CSS('#fff')));
        var planeCMPMaterial = new f.ComponentMaterial(planeMaterial);
        planeNode.addComponent(planeCMPMaterial);
        planeNode.addComponent(new f.ComponentTransform());
        planeNode.getComponent(f.ComponentMesh).pivot.scaleY(1);
        planeNode.getComponent(f.ComponentMesh).pivot.scaleX(1);
        planeNode.getComponent(f.ComponentMesh).pivot.scaleZ(1);
        planeNode.getComponent(f.ComponentMesh).pivot.rotateY(180);
        planeNode.cmpTransform.local.translateZ(5);
        planeNode.cmpTransform.local.translateX(2);
        planeNode.cmpTransform.local.translateY(1);
        var cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(15);
        cmpCamera.pivot.rotateY(180);
        rootNode.appendChild(planeNode);
        rootNode.appendChild(node);
        var viewport = new f.Viewport();
        viewport.initialize("Viewport", rootNode, cmpCamera, canvas);
        window.addEventListener("keydown", keyDownHandler);
        function keyDownHandler(event) {
            switch (event.key) {
                case f.KEYBOARD_CODE.ARROW_UP:
                    node.cmpTransform.local.translateY(1);
                    break;
                case f.KEYBOARD_CODE.ARROW_DOWN:
                    node.cmpTransform.local.translateY(-1);
                    break;
                case f.KEYBOARD_CODE.ARROW_LEFT:
                    node.cmpTransform.local.translateX(-1);
                    break;
                case f.KEYBOARD_CODE.ARROW_RIGHT:
                    node.cmpTransform.local.translateX(1);
                    break;
            }
            viewport.draw();
        }
        var model = node;
        function initCheckboxes() {
            cube1Checkbox.addEventListener("change", function () {
                if (cube1Checkbox.checked) {
                    model = node;
                    cube2Checkbox.checked = false;
                    console.log("c1 : " + model);
                }
            });
            cube2Checkbox.addEventListener("change", function () {
                if (cube2Checkbox.checked) {
                    model = planeNode;
                    cube1Checkbox.checked = false;
                    console.log("c2 : " + model);
                }
            });
            var ui = new UI(model, viewport);
            ui.initRotationHandling();
            ui.initTranslationHandling();
        }
        initCheckboxes();
        viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
