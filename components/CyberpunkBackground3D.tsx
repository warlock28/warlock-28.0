import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Infinite grid component
const InfiniteGrid: React.FC = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      // Scroll effect
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 60;
    }
  });

  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    const size = 1200;
    const divisions = 20;
    const step = size / divisions;
    const color = new THREE.Color('#00ff41');

    // Vertical lines
    for (let i = -divisions; i <= divisions; i++) {
      const points = [
        new THREE.Vector3(i * step, 0, -size),
        new THREE.Vector3(i * step, 0, size)
      ];
      lines.push(
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} opacity={0.4} transparent />
        </line>
      );
    }

    // Horizontal lines
    for (let i = -divisions; i <= divisions; i++) {
      const points = [
        new THREE.Vector3(-size, 0, i * step),
        new THREE.Vector3(size, 0, i * step)
      ];
      lines.push(
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} opacity={0.4} transparent />
        </line>
      );
    }

    return lines;
  }, []);

  return (
    <group ref={gridRef} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -5, 0]}>
      {gridLines}
    </group>
  );
};

// Hexagonal prism wireframe
const HexagonalPrism: React.FC = () => {
  const prismRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (prismRef.current) {
      prismRef.current.rotation.y = (state.clock.elapsedTime * Math.PI * 2) / 20;
      prismRef.current.rotation.x = Math.PI / 12;
    }
  });

  const hexPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const radius = 2;
    const depth = 1.6;

    // Front hexagon vertices
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        depth / 2
      ));
    }

    // Back hexagon vertices
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -depth / 2
      ));
    }

    return points;
  }, []);

  const edges = useMemo(() => {
    const lines: JSX.Element[] = [];
    const color = new THREE.Color('#00ff41');

    // Front hexagon edges
    for (let i = 0; i < 6; i++) {
      const start = hexPoints[i];
      const end = hexPoints[(i + 1) % 6];
      lines.push(
        <line key={`front-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} linewidth={2} />
        </line>
      );
    }

    // Back hexagon edges
    for (let i = 6; i < 12; i++) {
      const start = hexPoints[i];
      const end = hexPoints[i === 11 ? 6 : i + 1];
      lines.push(
        <line key={`back-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} linewidth={2} />
        </line>
      );
    }

    // Connecting edges
    for (let i = 0; i < 6; i++) {
      const start = hexPoints[i];
      const end = hexPoints[i + 6];
      lines.push(
        <line key={`connect-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} linewidth={2} />
        </line>
      );
    }

    return lines;
  }, [hexPoints]);

  // Glowing vertices
  const vertices = useMemo(() => {
    return hexPoints.map((point, i) => (
      <mesh key={`vertex-${i}`} position={[point.x, point.y, point.z]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00ff41" />
      </mesh>
    ));
  }, [hexPoints]);

  return (
    <group ref={prismRef} position={[0, 0, 0]}>
      {edges}
      {vertices}
    </group>
  );
};

// Coordinate labels
const CoordinateLabels: React.FC = () => {
  return (
    <>
      <Text
        position={[-3, 2, 0]}
        fontSize={0.2}
        color="#00ff41"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#001122"
      >
        → (-0.552, 0.442)
      </Text>
      <Text
        position={[0, 3, 0]}
        fontSize={0.2}
        color="#00ff41"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#001122"
      >
        ↑ (0.000, 0.884)
      </Text>
      <Text
        position={[3, 2, 0]}
        fontSize={0.2}
        color="#00ff41"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#001122"
      >
        ↗ (0.552, 0.442)
      </Text>
    </>
  );
};

// Main component
export const CyberpunkBackground3D: React.FC<{ enableBloom?: boolean }> = ({ enableBloom = true }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas>
        <color attach="background" args={['#001122']} />
        <PerspectiveCamera makeDefault position={[0, 8, 12]} fov={60} />
        
        <InfiniteGrid />
        <HexagonalPrism />
        <CoordinateLabels />

        {enableBloom && (
          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};
