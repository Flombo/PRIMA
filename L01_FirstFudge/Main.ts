namespace L02_FirstFudge {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.Debug.log(canvas);

        let node: ƒ.Node = new ƒ.Node("Quad");

        let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);

        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);
        let rotate:boolean = true;
        let i = 10;
        while (rotate) {
            try {
                cmpMesh.pivot.rotateY(180 + i);
                cmpMesh.pivot.rotateX(45 + i);
                i++;
            } catch (e) {
                console.log("error");
            } finally {
                rotate = false;
            }
        }

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        ƒ.Debug.log(viewport);

        viewport.draw();
    }
}