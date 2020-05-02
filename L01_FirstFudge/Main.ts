namespace L01_FirstFudge {
    import f =                            FudgeCore;

    class UI{
        private xTranslationSlider: HTMLInputElement;
        private yTranslationSlider: HTMLInputElement;
        private xRotationSlider: HTMLInputElement;
        private zTranslationSlider: HTMLInputElement;
        private yRotationSlider: HTMLInputElement;
        private zRotationSlider: HTMLInputElement;
        private outputX: HTMLInputElement;
        private outputY: HTMLInputElement;
        private outputZ: HTMLInputElement;
        private yRotationOutput: HTMLInputElement;
        private xOutputRotation: HTMLInputElement;
        private zOutputRotation: HTMLInputElement;
        private x : number;
        private y : number;
        private z : number;
        private node : f.Node;
        private viewport : f.Viewport;

        constructor(node : f.Node, viewport : f.Viewport) {
            this.xTranslationSlider = <HTMLInputElement>document.getElementById("xTranslation");
            this.yTranslationSlider = <HTMLInputElement>document.getElementById("yTranslation");
            this.zTranslationSlider = <HTMLInputElement>document.getElementById("zTranslation");
            this.xRotationSlider = <HTMLInputElement>document.getElementById("xRotation");
            this.yRotationSlider = <HTMLInputElement>document.getElementById("yRotation");
            this.zRotationSlider = <HTMLInputElement>document.getElementById("zRotation");
            this.outputX = <HTMLInputElement>document.getElementById("xOutput");
            this.outputY = <HTMLInputElement>document.getElementById("yOutput");
            this.outputZ = <HTMLInputElement>document.getElementById("zOutput");
            this.yRotationOutput = <HTMLInputElement>document.getElementById("yRotationOutput");
            this.xOutputRotation = <HTMLInputElement>document.getElementById("xOutputRotation");
            this.zOutputRotation = <HTMLInputElement>document.getElementById("zOutputRotation");
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.node = node;
            this.viewport = viewport;
        }

        public initTranslationHandling() : void {
            this.changeTranslationOutputBoxes();
            this.xTranslationSlider.addEventListener("input", () => { this.translateModel()});
            this.yTranslationSlider.addEventListener("input", () => { this.translateModel() });
            this.zTranslationSlider.addEventListener("input", () => { this.translateModel() });

            this.addOutputListener(this.outputX, this.xTranslationSlider);
            this.addOutputListener(this.outputZ, this.zTranslationSlider);
            this.addOutputListener(this.outputY, this.yTranslationSlider);
        }

        public initRotationHandling() : void {
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
            this.xOutputRotation.addEventListener("input",  ()=> {
                this.changeSliderValue(this.xRotationSlider, this.xOutputRotation)
            });
            this.yRotationOutput.addEventListener("input", ()=> {
                this.changeSliderValue(this.yRotationSlider, this.yRotationOutput);
            });
            this.zOutputRotation.addEventListener("input", ()=> {
                this.changeSliderValue(this.zRotationSlider, this.zOutputRotation);
            });
        }

        private changeSliderValue(slider : HTMLInputElement, output : HTMLInputElement) : void {
            slider.value = output.value;
            this.rotateModel();
            this.translateModel();
        }

        private addOutputListener(output : HTMLInputElement, slider : HTMLInputElement) : void {
            output.addEventListener("input", ()=> {
                this.changeSliderValue(slider, output);
            });
        }

        private changeOutputSlider(output : HTMLInputElement, slider : HTMLInputElement) : void{
            output.value = slider.value;
        }

        private changeRotationOutputBoxes() : void {
            this.changeOutputSlider(this.xOutputRotation, this.xRotationSlider);
            this.changeOutputSlider(this.yRotationOutput, this.yRotationSlider);
            this.changeOutputSlider(this.zOutputRotation, this.zRotationSlider);
        }

        private changeTranslationOutputBoxes() : void {
            this.changeOutputSlider(this.outputX, this.xTranslationSlider);
            this.changeOutputSlider(this.outputY, this.yTranslationSlider);
            this.changeOutputSlider(this.outputZ, this.zTranslationSlider);
        }

        private rotateModel() : void {
            this.changeRotationOutputBoxes();
            this.node.getComponent(f.ComponentMesh).pivot.rotateY(Number(this.yRotationSlider.value));
            this.node.getComponent(f.ComponentMesh).pivot.rotateX(Number(this.xRotationSlider.value));
            this.node.getComponent(f.ComponentMesh).pivot.rotateZ(Number(this.zRotationSlider.value));
            this.viewport.draw();
        }

        private translateModel() : void {
            this.changeTranslationOutputBoxes();
            this.translateByValueAndAxisCode(Number(this.xTranslationSlider.value), 'x');
            this.translateByValueAndAxisCode(Number(this.yTranslationSlider.value), 'y');
            this.translateByValueAndAxisCode(Number(this.zTranslationSlider.value), 'z');
            this.viewport.draw();
        }

        private translateByValueAndAxisCode(value : number, axisCode) : void {
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

        private translateXByValue(value) : void {
            console.log(value, this.x);
            if(value > this.x){
                this.node.cmpTransform.local.translateX(1);
            } else if( value < this.x){
                this.node.cmpTransform.local.translateX(-1);
            }
            this.x = value;
        }

        private translateYByValue(value) : void {
            if(value > this.y){
                this.node.cmpTransform.local.translateY(1);
            } else if(value < this.y){
                this.node.cmpTransform.local.translateY(-1);
            }
            this.y = value;
        }

        private translateZByValue(value) : void {
            if(value > this.z){
                this.node.cmpTransform.local.translateZ(1);
            } else if(value < this.z){
                this.node.cmpTransform.local.translateZ(-1);
            }
            this.z = value;
        }

    }

    window.addEventListener("load", (event) => {
        hndLoad(event);
    });

    function hndLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");

        let cube1Checkbox : HTMLInputElement = <HTMLInputElement>document.getElementById("cube1");
        let cube2Checkbox: HTMLInputElement = <HTMLInputElement>document.getElementById("cube2");

        let rootNode : f.Node = new f.Node("root");

        let node: f.Node = new f.Node("Quad");
        let planeNode : f.Node = new f.Node("Plane");

        let mesh: f.MeshQuad = new f.MeshCube();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        node.addComponent(cmpMesh);

        let planeMesh : f.MeshQuad = new f.MeshCube();
        let cmpPlaneMesh : f.ComponentMesh = new f.ComponentMesh(planeMesh);
        planeNode.addComponent(cmpPlaneMesh);

        node.addComponent(new f.ComponentTransform());
        node.getComponent(f.ComponentMesh).pivot.scaleY(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleX(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleZ(0.5);

        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen")));
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        let planeMaterial : f.Material = new f.Material("PlaneMaterial", f.ShaderUniColor, new f.CoatColored(f.Color.CSS('#fff')));
        let planeCMPMaterial : f.ComponentMaterial = new f.ComponentMaterial(planeMaterial);
        planeNode.addComponent(planeCMPMaterial);

        planeNode.addComponent(new f.ComponentTransform());
        planeNode.getComponent(f.ComponentMesh).pivot.scaleY(1);
        planeNode.getComponent(f.ComponentMesh).pivot.scaleX(1);
        planeNode.getComponent(f.ComponentMesh).pivot.scaleZ(1);
        planeNode.getComponent(f.ComponentMesh).pivot.rotateY(180);
        planeNode.cmpTransform.local.translateZ(5);
        planeNode.cmpTransform.local.translateX(2);
        planeNode.cmpTransform.local.translateY(1);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(15);
        cmpCamera.pivot.rotateY(180);

        rootNode.appendChild(planeNode);
        rootNode.appendChild(node);

        let viewport : f.Viewport = new f.Viewport();
        viewport.initialize("Viewport", rootNode, cmpCamera, canvas);
        window.addEventListener("keydown", keyDownHandler);

        function keyDownHandler(event : KeyboardEvent){
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

        function initCheckboxes() : void {
            cube1Checkbox.addEventListener("change", () => {
                if(cube1Checkbox.checked) {
                    model = node;
                    cube2Checkbox.checked = false;
                    console.log("c1 : " + model);
                }
            });
            cube2Checkbox.addEventListener("change", () => {
                if(cube2Checkbox.checked) {
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

}