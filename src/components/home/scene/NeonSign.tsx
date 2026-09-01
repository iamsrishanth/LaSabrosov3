"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { neon } from "@/data/palette";

/**
 * NeonSign — the single sanctioned WebGL signature.
 * Forest-deep stage with a layered additive-blended cream glow halo behind an
 * emissive forest-green wordmark. Bloom-like glow is achieved with stacked
 * transparent planes (no postprocessing) so the glow touches ONLY the sign.
 *
 * Flicker + parallax disabled under reduced motion (parent flags).
 */

interface SignProps {
  reducedMotion: boolean;
  parallax: boolean;
  text: string;
}

function NeonWordmark({ reducedMotion, parallax, text }: SignProps) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const glowMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const { pointer, size } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mat.current) {
      if (reducedMotion) {
        mat.current.emissiveIntensity = 3.4;
      } else {
        const breathe = 2.6 + Math.sin((t / 4.2) * Math.PI * 2) * 0.55;
        const dip = Math.sin(t * 13.0) > 0.985 ? 0.65 : 1;
        mat.current.emissiveIntensity = breathe * dip;
      }
    }
    if (glowMats.current.length && !reducedMotion) {
      const p = 0.5 + Math.sin((t / 4.2) * Math.PI * 2) * 0.5;
      glowMats.current.forEach((m, i) => {
        if (m) m.opacity = (0.35 - i * 0.08) * (0.7 + p * 0.3);
      });
    }
    if (group.current && parallax && !reducedMotion) {
      const targetX = pointer.y * 0.05;
      const targetY = pointer.x * 0.05;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.08;
      group.current.rotation.y += (-targetY - group.current.rotation.y) * 0.08;
    }
  });

  const fontSize = useMemo(() => {
    return size.width < 640 ? 1.5 : size.width < 1024 ? 2.2 : 2.8;
  }, [size.width]);

  const planeW = fontSize * text.length * 0.62;

  return (
    <group ref={group}>
      {/* layered additive glow halo (bloom substitute) */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 0, -0.4 - i * 0.12]}>
          <planeGeometry args={[planeW * (1 + i * 0.6), fontSize * (1.6 + i * 0.7)]} />
          <meshBasicMaterial
            ref={(m) => {
              if (m) glowMats.current[i] = m;
            }}
            color={neon.cream}
            transparent
            opacity={0.35 - i * 0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* the neon wordmark */}
      <Text
        font="/fonts/DancingScript.ttf"
        fontSize={fontSize}
        letterSpacing={-0.02}
        position={[0, 0, 0]}
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <meshStandardMaterial
          ref={mat}
          color={neon.cream}
          emissive={neon.forest}
          emissiveIntensity={3.2}
          toneMapped={false}
        />
      </Text>
    </group>
  );
}

export default function NeonSign({
  reducedMotion,
  parallax,
  active,
  text,
}: SignProps & { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      frameloop={active && !reducedMotion ? "always" : "demand"}
    >
      <color attach="background" args={[neon.forestDeep]} />
      <fog attach="fog" args={[neon.forestDeep, 8, 18]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[2, 2, 4]} intensity={18} color={neon.warmLight} distance={20} />
      <pointLight position={[-3, -2, 3]} intensity={8} color={neon.cream} distance={16} />
      <NeonWordmark reducedMotion={reducedMotion} parallax={parallax} text={text} />
    </Canvas>
  );
}
