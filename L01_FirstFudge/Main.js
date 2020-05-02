"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var f = FudgeCore;
    class UI {
        constructor(node, viewport) {
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
        initTranslationHandling() {
            this.changeTranslationOutputBoxes();
            this.xTranslationSlider.addEventListener("input", () => { this.translateModel(); });
            this.yTranslationSlider.addEventListener("input", () => { this.translateModel(); });
            this.zTranslationSlider.addEventListener("input", () => { this.translateModel(); });
            this.addOutputListener(this.outputX, this.xTranslationSlider);
            this.addOutputListener(this.outputZ, this.zTranslationSlider);
            this.addOutputListener(this.outputY, this.yTranslationSlider);
        }
        initRotationHandling() {
            this.changeRotationOutputBoxes();
            this.xRotationSlider.addEventListener("input", () => {
                this.rotateModel();
            });
            this.yRotationSlider.addEventListener("input", () => {
                this.rotateModel();
            });
            this.zRotationSlider.addEventListener("input", () => {
                this.rotateModel();
            });
            this.xOutputRotation.addEventListener("input", () => {
                this.changeSliderValue(this.xRotationSlider, this.xOutputRotation);
            });
            this.yRotationOutput.addEventListener("input", () => {
                this.changeSliderValue(this.yRotationSlider, this.yRotationOutput);
            });
            this.zOutputRotation.addEventListener("input", () => {
                this.changeSliderValue(this.zRotationSlider, this.zOutputRotation);
            });
        }
        changeSliderValue(slider, output) {
            slider.value = output.value;
            this.rotateModel();
            this.translateModel();
        }
        addOutputListener(output, slider) {
            output.addEventListener("input", () => {
                this.changeSliderValue(slider, output);
            });
        }
        changeOutputSlider(output, slider) {
            output.value = slider.value;
        }
        changeRotationOutputBoxes() {
            this.changeOutputSlider(this.xOutputRotation, this.xRotationSlider);
            this.changeOutputSlider(this.yRotationOutput, this.yRotationSlider);
            this.changeOutputSlider(this.zOutputRotation, this.zRotationSlider);
        }
        changeTranslationOutputBoxes() {
            this.changeOutputSlider(this.outputX, this.xTranslationSlider);
            this.changeOutputSlider(this.outputY, this.yTranslationSlider);
            this.changeOutputSlider(this.outputZ, this.zTranslationSlider);
        }
        rotateModel() {
            this.changeRotationOutputBoxes();
            this.node.getComponent(f.ComponentMesh).pivot.rotateY(Number(this.yRotationSlider.value));
            this.node.getComponent(f.ComponentMesh).pivot.rotateX(Number(this.xRotationSlider.value));
            this.node.getComponent(f.ComponentMesh).pivot.rotateZ(Number(this.zRotationSlider.value));
            this.viewport.draw();
        }
        translateModel() {
            this.changeTranslationOutputBoxes();
            this.translateByValueAndAxisCode(Number(this.xTranslationSlider.value), 'x');
            this.translateByValueAndAxisCode(Number(this.yTranslationSlider.value), 'y');
            this.translateByValueAndAxisCode(Number(this.zTranslationSlider.value), 'z');
            this.viewport.draw();
        }
        translateByValueAndAxisCode(value, axisCode) {
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
        }
        translateXByValue(value) {
            console.log(value, this.x);
            if (value > this.x) {
                this.node.cmpTransform.local.translateX(1);
            }
            else if (value < this.x) {
                this.node.cmpTransform.local.translateX(-1);
            }
            this.x = value;
        }
        translateYByValue(value) {
            if (value > this.y) {
                this.node.cmpTransform.local.translateY(1);
            }
            else if (value < this.y) {
                this.node.cmpTransform.local.translateY(-1);
            }
            this.y = value;
        }
        translateZByValue(value) {
            if (value > this.z) {
                this.node.cmpTransform.local.translateZ(1);
            }
            else if (value < this.z) {
                this.node.cmpTransform.local.translateZ(-1);
            }
            this.z = value;
        }
    }
    window.addEventListener("load", (event) => {
        hndLoad(event);
    });
    function hndLoad(_event) {
        let canvas = document.querySelector("canvas");
        canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");
        let cube1Checkbox = document.getElementById("cube1");
        let cube2Checkbox = document.getElementById("cube2");
        let rootNode = new f.Node("root");
        let node = new f.Node("Quad");
        let planeNode = new f.Node("Plane");
        let mesh = new f.MeshCube();
        let cmpMesh = new f.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let planeMesh = new f.MeshCube();
        let cmpPlaneMesh = new f.ComponentMesh(planeMesh);
        planeNode.addComponent(cmpPlaneMesh);
        node.addComponent(new f.ComponentTransform());
        node.getComponent(f.ComponentMesh).pivot.scaleY(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleX(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleZ(0.5);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen")));
        let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let planeMaterial = new f.Material("PlaneMaterial", f.ShaderUniColor, new f.CoatColored(f.Color.CSS('#fff')));
        let planeCMPMaterial = new f.ComponentMaterial(planeMaterial);
        planeNode.addComponent(planeCMPMaterial);
        planeNode.addComponent(new f.ComponentTransform());
        planeNode.getComponent(f.ComponentMesh).pivot.scaleY(1);
        planeNode.getComponent(f.ComponentMesh).pivot.scaleX(1);
        planeNode.getComponent(f.ComponentMesh).pivot.scaleZ(1);
        planeNode.getComponent(f.ComponentMesh).pivot.rotateY(180);
        planeNode.cmpTransform.local.translateZ(5);
        planeNode.cmpTransform.local.translateX(2);
        planeNode.cmpTransform.local.translateY(1);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(15);
        cmpCamera.pivot.rotateY(180);
        rootNode.appendChild(planeNode);
        rootNode.appendChild(node);
        let viewport = new f.Viewport();
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
        let model = node;
        function initCheckboxes() {
            cube1Checkbox.addEventListener("change", () => {
                if (cube1Checkbox.checked) {
                    model = node;
                    cube2Checkbox.checked = false;
                    console.log("c1 : " + model);
                }
            });
            cube2Checkbox.addEventListener("change", () => {
                if (cube2Checkbox.checked) {
                    model = planeNode;
                    cube1Checkbox.checked = false;
                    console.log("c2 : " + model);
                }
            });
            let ui = new UI(model, viewport);
            ui.initRotationHandling();
            ui.initTranslationHandling();
        }
        initCheckboxes();
        viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=Main.js.map