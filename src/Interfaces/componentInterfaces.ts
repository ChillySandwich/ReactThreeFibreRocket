import { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  nodes: {
    BezierCircle005: THREE.Mesh;
    BezierCircle005_1: THREE.Mesh;
    BezierCircle005_2: THREE.Mesh;
    BezierCircle005_3: THREE.Mesh;
    BezierCircle005_4: THREE.Mesh;
    BezierCircle005_5: THREE.Mesh;
    BezierCircle005_6: THREE.Mesh;
    BezierCircle005_7: THREE.Mesh;
  };
  materials: {
    RocketThruster: THREE.MeshStandardMaterial;
    RocketWindow: THREE.MeshStandardMaterial;
    RocketCentre: THREE.MeshStandardMaterial;
    RocketWindowOutline: THREE.MeshStandardMaterial;
    RocketTip: THREE.MeshStandardMaterial;
    RocketDividers: THREE.MeshStandardMaterial;
    RocketFins: THREE.MeshStandardMaterial;
    RocketBase: THREE.MeshStandardMaterial;
  };
};

export interface IState {
  current: string,
  items: IMaterialLocations
}

export interface IMaterialLocations {
  [x: string]: unknown
}
