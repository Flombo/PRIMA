namespace TUT_ForestScene{
    import f = FudgeCore;
    window.addEventListener("load", init);
    let node : f.Node;
    let camera : f.Node;
    let viewPort : f.Viewport;

    function init() : void {
        f.RenderManager.initialize();
        createMiniForest();
        viewPort.draw();
        viewPort.showSceneGraph();
    }

    function createCompleteMeshNode(name: string, material: f.Material, mesh: f.Mesh): f.Node {
        let node: f.Node = new f.Node(name);
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(material);
        let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        node.addComponent(cmpTransform);
        return node;
    }

    function createViewport(canvas: HTMLCanvasElement = null): void {
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.width = 800;
            canvas.height = 600;
            document.body.appendChild(canvas);
        }
        viewPort = new f.Viewport();
        camera = createCamera();
        viewPort.initialize("viewport", node, camera.getComponent(f.ComponentCamera), canvas);
    }

    function createCamera(translation: f.Vector3 = new f.Vector3(1, 1, 10), lookAt: f.Vector3 = new f.Vector3(1,1,10)): f.Node {
        let camera: f.Node = new f.Node("Camera");
        let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
        cmpTransform.local.translate(translation);
        cmpTransform.local.lookAt(lookAt);
        camera.addComponent(cmpTransform);
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL);
        camera.addComponent(cmpCamera);
        return camera;
    }

    function createBroadleaf(_name: string, _clrTrunk: f.Color, _clrTop: f.Color, _pos: f.Vector3, _scale: f.Vector3): f.Node {
        let tree: f.Node = new f.Node(_name);
        let treeTrunk: f.Node = createCompleteMeshNode(
            "TreeTrunk", new f.Material("TrunkTree", f.ShaderUniColor, new f.CoatColored(_clrTrunk)), new f.MeshCube
        );
        let cmpTrunkMesh: f.ComponentMesh = treeTrunk.getComponent(f.ComponentMesh);

        cmpTrunkMesh.pivot.scale(_scale);
        cmpTrunkMesh.pivot.translateY(_scale.y / 2);
        let treeTop: f.Node = createCompleteMeshNode(
            "TreeTop", new f.Material("TreeTop", f.ShaderUniColor, new f.CoatColored(_clrTop)), new f.MeshCube
        );
        let cmpTreeTopMesh: f.ComponentMesh = treeTop.getComponent(f.ComponentMesh);

        cmpTreeTopMesh.pivot.scale(new f.Vector3((_scale.x * 2), (_scale.y * 3), (_scale.z * 2)));

        cmpTreeTopMesh.pivot.translateY((_scale.y * 2));
        tree.appendChild(treeTop);
        tree.appendChild(treeTrunk);
        tree.addComponent(new f.ComponentTransform);
        tree.cmpTransform.local.translate(_pos);
        return tree;
    }

    function createMiniForest(): void {
        let forest: f.Node = new f.Node("Forest");
        let clrLeaves: f.Color = new f.Color(0.2, 0.6, 0.3, 1);
        let clrNeedles: f.Color = new f.Color(0.1, 0.5, 0.3, 1);
        let clrTrunkTree: f.Color = new f.Color(0.5, 0.3, 0, 1);
        let clrCapMushroomBrown: f.Color = new f.Color(0.6, 0.4, 0, 1);
        let clrCapMushroomRed: f.Color = new f.Color(0.5, 0, 0, 1);
        let clrTrunkMushroom: f.Color = new f.Color(0.9, 0.8, 0.7, 1);
        let clrGround: f.Color = new f.Color(0.3, 0.6, 0.5, 1);
        let ground: f.Node = createCompleteMeshNode("Ground",
            new f.Material("Ground", f.ShaderUniColor, new
            f.CoatColored(clrGround)), new f.MeshCube());
        let cmpGroundMesh: f.ComponentMesh = ground.getComponent(f.ComponentMesh);

        cmpGroundMesh.pivot.scale(new f.Vector3(6, 0.05, 6));
        node = ground;
        createViewport();
        let cmpCamera: f.ComponentTransform = camera.getComponent(f.ComponentTransform);
        cmpCamera.local.translateY(2);
        cmpCamera.local.rotateX(-10);
        //Creates a forest of broadleaves
        for (let i: number = 1; i <= 5; i++) {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let broadleaf: f.Node = createBroadleaf(
                "BroadLeaf" + i, clrTrunkTree, clrLeaves,
                new f.Vector3(Math.random() * 4 * plusOrMinus, 0, Math.random() * 4 * plusOrMinus),
                new f.Vector3(0.2, 0.5, 0.2)
            );

            forest.appendChild(broadleaf);
        }
        //Creates a forest of conifers
        for (let i: number = 1; i <= 5; i++) {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let conifer: f.Node = createConifer(
                "Conifer" + i, clrTrunkTree, clrNeedles,
                new f.Vector3(Math.random() * 3 * plusOrMinus, 0, Math.random() * 3 * plusOrMinus),
                new f.Vector3(0.2, 0.5, 0.2)
            );

            forest.appendChild(conifer);
        }

        //Creates mushrooms
        for (let i: number = 1; i <= 4; i++) {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let mushroomRed: f.Node = createMushroom(
                "MushroomRed" + i, clrTrunkMushroom, clrCapMushroomRed,
                new f.Vector3(Math.random() * 2 * plusOrMinus, 0, Math.random() * 2 * plusOrMinus),
                new f.Vector3(0.1, 0.2, 0.1));

            let mushroomBrown: f.Node = createMushroom(
                "MushroomBrown" + i, clrTrunkMushroom, clrCapMushroomBrown,
                new f.Vector3(Math.random() * 2 * plusOrMinus, 0, Math.random() * 2 * plusOrMinus),
                new f.Vector3(0.1, 0.2, 0.1));

            forest.appendChild(mushroomRed);
            forest.appendChild(mushroomBrown);
        }
        node.appendChild(forest);
    }

    function createConifer(_name: string, _clrTrunk: f.Color, _clrTop: f.Color, _pos: f.Vector3, _scale: f.Vector3): f.Node {

        let tree: f.Node = new f.Node(_name);

        let treeTrunk: f.Node = createCompleteMeshNode(
            "TreeTrunk", new f.Material(
                "TrunkTree", f.ShaderUniColor, new f.CoatColored(_clrTrunk)), new f.MeshCube
        );

        let cmpTrunkMesh: f.ComponentMesh = treeTrunk.getComponent(f.ComponentMesh);

        cmpTrunkMesh.pivot.scale(_scale);
        cmpTrunkMesh.pivot.translateY(_scale.y / 2);
        let treeTop: f.Node = createCompleteMeshNode(
            "TreeTop", new f.Material("TreeTop", f.ShaderUniColor, new f.CoatColored(_clrTop)), new f.MeshPyramid
        );

        let cmpTreeTopMesh: f.ComponentMesh = treeTop.getComponent(f.ComponentMesh);

        cmpTreeTopMesh.pivot.scale(new f.Vector3((_scale.x * 2), (_scale.y * 3), (_scale.z * 2)));

        cmpTreeTopMesh.pivot.translateY((_scale.y / 2));
        tree.appendChild(treeTop);
        tree.appendChild(treeTrunk);
        tree.addComponent(new f.ComponentTransform);
        tree.cmpTransform.local.translate(_pos);
        return tree;
    }

function createMushroom(_name: string, _clrTrunk: f.Color, _clrCap: f.Color,
                        _pos: f.Vector3, _scale: f.Vector3): f.Node {

    let mushroom: f.Node = new f.Node(_name);
    let mushroomTrunk: f.Node =
        createCompleteMeshNode("MushroomTrunk", new
        f.Material("MushroomTrunk", f.ShaderUniColor, new
        f.CoatColored(_clrTrunk)), new f.MeshCube);

    let cmpMesh: f.ComponentMesh = mushroomTrunk.getComponent(f.ComponentMesh);

    cmpMesh.pivot.scale(_scale);
    cmpMesh.pivot.translateY(_scale.y / 2);
    let mushroomCap: f.Node =
        createCompleteMeshNode("MushroomCapRed", new
        f.Material("MushroomCapRed", f.ShaderUniColor, new
        f.CoatColored(_clrCap)), new f.MeshCube);

    let cmpCapMesh: f.ComponentMesh = mushroomCap.getComponent(f.ComponentMesh);

    cmpCapMesh.pivot.scale(new f.Vector3((_scale.x * 2), (_scale.y - 0.05), (_scale.z * 2)));

    cmpCapMesh.pivot.translateY((_scale.y));
    mushroom.appendChild(mushroomCap);
    mushroom.appendChild(mushroomTrunk);
    mushroom.addComponent(new f.ComponentTransform);
    mushroom.cmpTransform.local.translate(_pos);
    return mushroom;
}

}