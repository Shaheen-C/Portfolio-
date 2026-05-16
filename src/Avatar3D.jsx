import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/avatar.glb");
  return <primitive object={scene} scale={2} position={[0, -1.5, 0]} />;
}

export default function Avatar3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
      }}
    >
      <ambientLight intensity={1.5} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}