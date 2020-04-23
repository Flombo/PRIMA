namespace L02_FirstFudge {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.Debug.log(canvas);

        let node: ƒ.Node = new ƒ.Node("Quad");

        //spacial description of 3d object => ressource
        let mesh: ƒ.MeshQuad = new ƒ.MeshPyramid();
        //components can hold links of resources
        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        //container for components
        node.addComponent(cmpMesh);

        //coat describes visual properties of surface => material besteht aus einem shader und einem coat
        //shader => programm that runs on gpu => processes data(vertex position, camera matrix) to image, projects img to surface
        let mtrSolidWhite: ƒ.Material = new ƒ.Material("Salmon", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("Salmon")));
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        let cmpTransform: ƒ.Transformation = new ƒ.Transformation();

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(4);
        cmpCamera.pivot.rotateY(180);

        //interface between canvas and 3d scene, uses camera, knows what to render, what part of graphscene
        let viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
        // let startT = new Date().getMilliseconds();
        // let animate = function(){
        //     let now = new Date().getMilliseconds();
        //     let i = now - startT;
        //     i = now;
        //     viewport.draw();
        //     console.log(i);
        //     cmpCamera.pivot.rotateY(i/400);
        //     requestAnimationFrame(animate);
        // }
        // animate();
        viewport.draw();
    }
}