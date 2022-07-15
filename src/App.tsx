import './App.css'
//REACT
import { MutableRefObject, useState, Suspense, useEffect, useRef  } from 'react'

//REACT THREE FIBER + THREE
import { Canvas} from "@react-three/fiber";
import { Group } from 'three';

//DREI
import { useGLTF, OrbitControls } from '@react-three/drei'

//VALTIO
import { proxy, useSnapshot } from 'valtio'

//INTERFACES
import { GLTFResult, IState } from './Interfaces/componentInterfaces'

//REACT-COLORFUL
import { HexColorPicker } from 'react-colorful'


// uses Valtio for state management
const state: IState = proxy({
  current: "",
  items: {
    RocketThruster: "#000000",
    RocketWindow: "#000000",
    RocketCentre: "#000000",
    RocketWindowOutline: "#000000",
    RocketTip: "#000000",
    RocketDividers: "#000000",
    RocketFins: "#000000",
    RocketBase: "#000000"
  }

})

export const Rocket = ({ ...props }: JSX.IntrinsicElements["group"]) => {
  const group = useRef<THREE.Group>() as MutableRefObject<Group>;
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/Rocket.glb") as GLTFResult;

  const [hovered, set] = useState(null)


  //Change pointer icon if hovering over mesh which can be clicked
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
  })

  return (
    <group ref={group} {...props} dispose={null}
      //stop propagation stops current/existing event, then set current object's material.
      onPointerOver={(e) => { e.stopPropagation(), set((e.object as any).material.name) }}
      
      onPointerOut={(e) => { e.intersections.length === 0 && set(null) }}
      //stop propagation stops current/existing event, then changes state.current to object's material
      onPointerDown={(e) => { e.stopPropagation(); state.current = (e.object as any).material.name }}
      //reset state to ""
      onPointerMissed={(e) => { state.current }}>

      <group >
        <mesh material-color={snap.items.RocketThruster} castShadow receiveShadow geometry={nodes.BezierCircle005.geometry} material={materials.RocketThruster} />
        <mesh material-color={snap.items.RocketWindow} castShadow receiveShadow geometry={nodes.BezierCircle005_1.geometry} material={materials.RocketWindow} />
        <mesh material-color={snap.items.RocketCentre} castShadow receiveShadow geometry={nodes.BezierCircle005_2.geometry} material={materials.RocketCentre} />
        <mesh material-color={snap.items.RocketWindowOutline} castShadow receiveShadow geometry={nodes.BezierCircle005_3.geometry} material={materials.RocketWindowOutline} />
        <mesh material-color={snap.items.RocketTip} castShadow receiveShadow geometry={nodes.BezierCircle005_4.geometry} material={materials.RocketTip} />
        <mesh material-color={snap.items.RocketDividers} geometry={nodes.BezierCircle005_5.geometry} material={materials.RocketDividers} />
        <mesh material-color={snap.items.RocketFins} geometry={nodes.BezierCircle005_6.geometry} material={materials.RocketFins} />
        <mesh material-color={snap.items.RocketBase} castShadow receiveShadow geometry={nodes.BezierCircle005_7.geometry} material={materials.RocketBase} />
      </group>
    </group>
  );
}

useGLTF.preload("/Rocket.glb");


const Picker = () => {
  const snap = useSnapshot(state)
  return (
    <div className="picker">
      <HexColorPicker color={snap.items[snap.current] as string}
        onChange={(color: string) => (state.items[snap.current] = color)}
      />
      <h1>{snap.current}</h1>
    </div>
  )
}


const ThreeScene = () => {
  return (
    <>
      <Picker />
      <Canvas>

        <ambientLight intensity={0.6} />
        <directionalLight position={[-180, -5, 10]} color={"white"} intensity={4} />

        <Suspense fallback={null} >
          <Rocket scale={9} position={[0, -1, 0]} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>

  )
}



function App() {
  return (
    <ThreeScene />
  )
}

export default App
