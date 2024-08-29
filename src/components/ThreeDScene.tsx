"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Tetrahedron,
  Text,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Pyramid() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2;
  });

  return (
    <Tetrahedron ref={ref} args={[1, 0]} scale={3}>
      <meshStandardMaterial color="white" wireframeLinewidth={500} wireframe />
    </Tetrahedron>
  );
}

function SparklingCube({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  const position = useMemo(() => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 2.5;
    return [
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 2,
      Math.sin(angle) * radius,
    ];
  }, [index, total]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(time * 2 + index) * 0.3;
    ref.current.rotation.x += delta * 0.5;
    ref.current.rotation.y += delta * 0.5;
    ref.current.scale.setScalar(0.1 + Math.sin(time * 3 + index) * 0.05);
  });

  return (
    <mesh ref={ref} position={position as [number, number, number]}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function FloatingText({
  text,
  position,
  onClick,
}: {
  text: string;
  position: [number, number, number];
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const initialY = position[1];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.position.y = initialY + Math.sin(time + position[0]) * 0.2;
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.3}
      color="#000"
      anchorX="center"
      anchorY="middle"
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      {text}
    </Text>
  );
}

function ContentCard({
  title,
  content,
  onClose,
}: {
  title: string;
  content: string;
  onClose: () => void;
}) {
  return (
    <Html center>
      <Card className="w-64 bg-black border border-white text-white">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
          <Button
            onClick={onClose}
            className="mt-4 bg-white text-black hover:bg-gray-200"
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </Html>
  );
}

function Scene() {
  const [activeContent, setActiveContent] = useState<string | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const controlsRef = useRef<any>(null!);
  const { camera } = useThree();
  const cubesCount = 20;

  const contentItems = [
    {
      text: "My Profile",
      position: [0, 0.005 + Math.random() * 0.5 - 0.75, 2] as [
        number,
        number,
        number,
      ],
      content:
        "Web developer passionate about creating immersive experiences with cutting-edge technologies.",
    },
    {
      text: "What I've Done",
      position: [1.5, 1.5 + Math.random() * 1.5 - 0.75, 1] as [
        number,
        number,
        number,
      ],
      content:
        "Developed responsive web applications, created interactive 3D visualizations, and optimized performance for high-traffic sites.",
    },
    {
      text: "My Skills",
      position: [-1.5, 1.5 + Math.random() * 1.5 - 0.75, 1] as [
        number,
        number,
        number,
      ],
      content:
        "Proficient in React, Three.js, Next.js, TypeScript, and WebGL. Experienced in creating performant and accessible web applications.",
    },
    {
      text: "Contact Me",
      position: [0, 1 + Math.random() * 1.5 - 0.75, 1] as [
        number,
        number,
        number,
      ],
      content:
        "Get in touch at johndoe@example.com or connect with me on LinkedIn and GitHub.",
    },
  ];

  const handleContentClick = (text: string) => {
    setActiveContent(text);
    if (cameraRef.current && controlsRef.current) {
      controlsRef.current.enabled = false;
      const targetPosition = new THREE.Vector3(0, 0, 3);
      const duration = 1000; // ms
      const start = Date.now();
      const startPosition = camera.position.clone();

      //@ts-ignore
      function animate() {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        camera.position.lerpVectors(startPosition, targetPosition, progress);
        camera.lookAt(0, 0, 0);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          controlsRef.current.enabled = true;
        }
      }
      animate();
    }
  };

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 5]} />
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
      />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <Pyramid />
      {Array.from({ length: cubesCount }).map((_, index) => (
        <SparklingCube key={index} index={index} total={cubesCount} />
      ))}

      {contentItems.map((item) => (
        <FloatingText
          key={item.text}
          text={item.text}
          position={item.position}
          onClick={() => handleContentClick(item.text)}
        />
      ))}
      {activeContent && (
        <ContentCard
          title={activeContent}
          content={
            contentItems.find((item) => item.text === activeContent)?.content ||
            ""
          }
          onClose={() => setActiveContent(null)}
        />
      )}
    </>
  );
}

export default function ThreeDScene() {
  return (
    <div className="w-full h-full bg-yellow-500">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
