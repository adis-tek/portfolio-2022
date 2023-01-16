import * as THREE from "three";
import { useFrame, extend, MeshProps } from "@react-three/fiber";
import { useRef, useState } from "react";
import { shaderMaterial } from "@react-three/drei";

import vertex from "./shaders/shader.vert";
import fragment from "./shaders/shader.frag";

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    // resolution: new THREE.Vector2(),
  },
  vertex,
  fragment
);

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
ColorShiftMaterial.key = THREE.MathUtils.generateUUID();

extend({ ColorShiftMaterial });

type ShaderProps = Partial<MeshProps> & {
  onClick: () => void;
};

const ShaderExample = (props: ShaderProps) => {
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01;
    }
    if (meshRef.current.material) {
      meshRef.current.material.uniforms.time.value +=
        Math.sin(delta / 2) * Math.cos(delta / 2);
    }
  });

  return (
    <mesh
      ref={meshRef}
      // scale={hovered ? 1.1 : 1}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      position={[0, 0, 0]}
      {...props}
    >
      {/* <boxBufferGeometry args={[1, 1, 1]} /> */}
      <planeBufferGeometry args={[2, 2, 2]} />
      {/* @ts-ignore */}
      <colorShiftMaterial key={ColorShiftMaterial.key} time={0} />
    </mesh>
  );
};

export default ShaderExample;
