namespace L01_FirstFudge {
    import f = FudgeCore;

    window.addEventListener("load", (event) => {
        hndLoad(event);
    });

    function hndLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.setAttribute("style", "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px");

        let xTranslationSlider : HTMLInputElement = <HTMLInputElement>document.getElementById("xTranslation");
        let yTranslationSlider : HTMLInputElement = <HTMLInputElement>document.getElementById("yTranslation");
        let zTranslationSlider : HTMLInputElement = <HTMLInputElement>document.getElementById("zTranslation");
        let xRotationSlider : HTMLInputElement = <HTMLInputElement>document.getElementById("xRotation");
        let yRotationSlider : HTMLInputElement = <HTMLInputElement>document.getElementById("yRotation");
        let zRotationSlider : HTMLInputElement = <HTMLInputElement>document.getElementById("zRotation");
        let outputX : HTMLInputElement = <HTMLInputElement>document.getElementById("xOutput");
        let outputY : HTMLInputElement = <HTMLInputElement>document.getElementById("yOutput");
        let outputZ : HTMLInputElement = <HTMLInputElement>document.getElementById("zOutput");
        let yRotationOutput : HTMLInputElement = <HTMLInputElement>document.getElementById("yRotationOutput");
        let xOutputRotation : HTMLInputElement = <HTMLInputElement>document.getElementById("xOutputRotation");
        let zOutputRotation : HTMLInputElement = <HTMLInputElement>document.getElementById("zOutputRotation");

        let x = 0;
        let z = 0;
        let y = 0;

        let node: f.Node = new f.Node("Quad");

        let mesh: f.MeshQuad = new f.MeshCube();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        node.addComponent(cmpMesh);

        node.addComponent(new f.ComponentTransform());
        node.getComponent(f.ComponentMesh).pivot.scaleY(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleX(0.5);
        node.getComponent(f.ComponentMesh).pivot.scaleZ(0.5);

        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("lightgreen")));
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);

        let viewport : f.Viewport = new f.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        window.addEventListener("keydown", keyDownHandler);

        function keyDownHandler(event : KeyboardEvent){
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

        function initRotationHandling(){
            changeRotationOutputBoxes();
            xRotationSlider.addEventListener("input", rotateModel);
            yRotationSlider.addEventListener("input", rotateModel);
            zRotationSlider.addEventListener("input", rotateModel);
            xOutputRotation.addEventListener("input",  ()=> {
                changeSliderValue(xRotationSlider, xOutputRotation)
            });
            yRotationOutput.addEventListener("input", ()=> {
                changeSliderValue(yRotationSlider, yRotationOutput);
            });
            zOutputRotation.addEventListener("input", ()=> {
                changeSliderValue(zRotationSlider, zOutputRotation);
            });
        }

        function changeSliderValue(slider : HTMLInputElement, output : HTMLInputElement){
            slider.value = output.value;
            rotateModel();
            translateModel();
        }

        function initTranslationHandling(){
            changeTranslationOutputBoxes();
            xTranslationSlider.addEventListener("input", () => { translateModel()});
            yTranslationSlider.addEventListener("input", () => { translateModel() });
            zTranslationSlider.addEventListener("input", () => { translateModel() });
            outputX.addEventListener("input", ()=> {
                changeSliderValue(xTranslationSlider, outputX);
            });
            outputZ.addEventListener("input", ()=> {
                changeSliderValue(zTranslationSlider, outputZ);
            });
            outputY.addEventListener("input", ()=> {
                changeSliderValue(yTranslationSlider, outputY);
            });
        }

        function changeRotationOutputBoxes() {
            changeOutputSlider(xOutputRotation, xRotationSlider);
            changeOutputSlider(yRotationOutput, yRotationSlider);
            changeOutputSlider(zOutputRotation, zRotationSlider);
        }

        function changeTranslationOutputBoxes(){
            changeOutputSlider(outputX, xTranslationSlider);
            changeOutputSlider(outputY, yTranslationSlider);
            changeOutputSlider(outputZ, zTranslationSlider);
        }

        function changeOutputSlider(output : HTMLInputElement, slider : HTMLInputElement){
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

        function translateByValueAndAxisCode(value : number, axisCode){
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

        function translateXByValue(value){
            if(value > x){
                node.cmpTransform.local.translateX(0.01);
            } else if( value < x){
                node.cmpTransform.local.translateX(-0.01);
            }
            x = value;
        }

        function translateYByValue(value){
            if(value > y){
                node.cmpTransform.local.translateY(0.01);
            } else if(value < y){
                node.cmpTransform.local.translateY(-0.01);
            }
            y = value;
        }

        function translateZByValue(value){
            if(value > z){
                node.cmpTransform.local.translateZ(0.01);
            } else if(value < z){
                node.cmpTransform.local.translateZ(-0.01);
            }
            z = value;
        }

       viewport.draw();
    }

}