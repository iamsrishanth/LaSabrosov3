"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { neon } from "@/data/palette";

/**
 * NeonSign — Warm Cream WebGL Signature for LaSabroso.
 *
 * Features:
 * - Pure floating neon wordmark with NO dark/translucent background box.
 * - Warm cream luminous multi-pass neon tube lighting in Histerm typography.
 * - Procedural radial gradient ambient wall illumination spreading into forest backdrop.
 * - Floating warm amber/cream bokeh dust motes.
 * - Viewport-adaptive dynamic typography (zero clipping on all viewports).
 * - 4.2s organic breathing waveform, subtle vintage neon voltage micro-dips, and pointer parallax.
 * - Strict reduced-motion compliance.
 */

interface SignProps {
  reducedMotion: boolean;
  parallax: boolean;
  text: string;
}

/** Procedural multi-stop radial gradient for soft warm cream atmospheric light falloff */
function useGlowTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, "rgba(255, 253, 208, 0.54)");
    gradient.addColorStop(0.2, "rgba(254, 240, 138, 0.38)");
    gradient.addColorStop(0.45, "rgba(245, 158, 11, 0.18)");
    gradient.addColorStop(0.72, "rgba(22, 101, 52, 0.05)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

/** Floating atmospheric bokeh dust motes in warm cream */
function AtmosphericDust({ count = 22, reducedMotion }: { count?: number; reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const pha = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 8.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      pha[i] = Math.random() * Math.PI * 2;
    }
    return [pos, pha];
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !pointsRef.current) return;
    const t = state.clock.elapsedTime * 0.4;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      arr[idx + 1] += Math.sin(t + phases[i]) * 0.0015;
      arr[idx + 0] += Math.cos(t * 0.8 + phases[i]) * 0.0012;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={neon.creamLight}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NeonWordmark({ reducedMotion, parallax, text }: SignProps) {
  const group = useRef<THREE.Group>(null);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);
  const haloMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  const wallGlowMat = useRef<THREE.MeshBasicMaterial>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  const { pointer, viewport } = useThree();
  const glowTexture = useGlowTexture();

  useEffect(() => {
    return () => {
      if (glowTexture) glowTexture.dispose();
    };
  }, [glowTexture]);

  // Viewport-adaptive dynamic sizing
  const fontSize = useMemo(() => {
    const charRatio = 0.44;
    const maxW = viewport.width * 0.78;
    const maxH = viewport.height * 0.42;
    const sizeFromW = maxW / (Math.max(text.length, 6) * charRatio);
    const sizeFromH = maxH;
    return Math.max(0.75, Math.min(sizeFromW, sizeFromH, 1.85));
  }, [viewport.width, viewport.height, text.length]);

  const textWidth = fontSize * text.length * 0.44;
  const glowW = textWidth * 1.95;
  const glowH = fontSize * 3.4;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (coreMat.current) {
      if (reducedMotion) {
        coreMat.current.emissiveIntensity = 3.4;
      } else {
        // 4.2s organic breathing cycle
        const breathe = 2.9 + Math.sin((t / 4.2) * Math.PI * 2) * 0.45;

        // Vintage neon micro-voltage fluctuation
        const micro1 = Math.sin(t * 19.3);
        const micro2 = Math.sin(t * 37.1);
        const isDip = micro1 > 0.985 && micro2 > 0.4;
        const dipFactor = isDip ? 0.48 : 1.0;

        const currentIntensity = breathe * dipFactor;
        coreMat.current.emissiveIntensity = currentIntensity;

        const normFactor = currentIntensity / 3.0;
        if (haloMat.current) haloMat.current.opacity = 0.42 * normFactor;
        if (glowMat.current) glowMat.current.opacity = 0.75 * normFactor;
        if (wallGlowMat.current) wallGlowMat.current.opacity = 0.58 * normFactor;
        if (pointLightRef.current) pointLightRef.current.intensity = 12 * normFactor;
      }
    }

    // Spring-damped pointer parallax (desktop only)
    if (group.current && parallax && !reducedMotion) {
      const targetRotX = pointer.y * 0.055;
      const targetRotY = pointer.x * 0.055;
      group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.06;
      group.current.rotation.y += (-targetRotY - group.current.rotation.y) * 0.06;
    }
  });

  return (
    <group ref={group}>
      {/* 1. Procedural Soft Warm Cream Radial Wall Glow */}
      {glowTexture && (
        <mesh position={[0, 0, -0.15]}>
          <planeGeometry args={[glowW, glowH]} />
          <meshBasicMaterial
            ref={wallGlowMat}
            map={glowTexture}
            transparent
            opacity={0.58}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* 2. Dynamic Warm Cream Point Light Source */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 0.9]}
        intensity={12}
        color={neon.cream}
        distance={7}
        decay={2}
      />

      {/* 3. Neon Wordmark: Outer Wide Atmospheric Bloom Halo */}
      <Text
        font="/fonts/Histerm.ttf"
        fontSize={fontSize}
        letterSpacing={-0.01}
        outlineWidth={0.075 * (fontSize / 1.5)}
        outlineBlur={0.2}
        outlineColor={neon.creamDeep}
        outlineOpacity={0.65}
        position={[0, 0, -0.02]}
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <meshBasicMaterial
          ref={haloMat}
          color={neon.creamWarm}
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </Text>

      {/* 4. Neon Wordmark: Mid Contoured Warm Cream Glass Envelope */}
      <Text
        font="/fonts/Histerm.ttf"
        fontSize={fontSize}
        letterSpacing={-0.01}
        outlineWidth={0.032 * (fontSize / 1.5)}
        outlineBlur={0.045}
        outlineColor={neon.cream}
        outlineOpacity={0.95}
        position={[0, 0, 0.0]}
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <meshBasicMaterial
          ref={glowMat}
          color={neon.creamLight}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </Text>

      {/* 5. Neon Wordmark: Glowing White-Hot Gas Core Filament */}
      <Text
        font="/fonts/Histerm.ttf"
        fontSize={fontSize}
        letterSpacing={-0.01}
        position={[0, 0, 0.028]}
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <meshStandardMaterial
          ref={coreMat}
          color={neon.creamCore}
          emissive={neon.cream}
          emissiveIntensity={3.6}
          roughness={0.08}
          metalness={0.05}
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
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active && !reducedMotion ? "always" : "demand"}
    >
      <ambientLight intensity={0.4} color={neon.forestDeep} />
      <pointLight position={[3.5, 2.5, 3]} intensity={5.5} color={neon.warmLight} distance={12} />
      <pointLight position={[-3.5, -2, 2.5]} intensity={4} color={neon.creamLight} distance={10} />
      
      {/* Floating atmospheric warm bokeh dust motes */}
      <AtmosphericDust count={24} reducedMotion={reducedMotion} />

      <NeonWordmark
        reducedMotion={reducedMotion}
        parallax={parallax}
        text={text}
      />
    </Canvas>
  );
}
