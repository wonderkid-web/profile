"use client";

import { useRef, useMemo, useState } from "react";
import Image from "next/image";
import profile from "/public/profile.jpg";
import react from "/public/stack/react.png";
import next from "/public/stack/next.png";
import firebase from "/public/stack/firebase.png";
import supabase from "/public/stack/supabase(black).png";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Pyramid() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((delta: any) => {
    ref.current.rotation.y += delta * 0.2;
  });

  return (
    <Tetrahedron ref={ref} args={[1, 0]} scale={1.5}>
      <meshStandardMaterial color="white" wireframe />
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
    ref.current.lookAt(0, ref.current.position.y, 0);
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.3}
      color="black"
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
    <Html center className="w-screen flex justify-center">
      <Card className="w-1/2 bg-black border border-white text-white">
        <CardHeader>
          <CardTitle className="text-4xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {content}
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
  const cubesCount = 150;

  const contentItems = useMemo(() => {
    const items = [
      {
        text: "My Profile",
        content: (
          <div className="flex flex-col gap-2 items-center p-6 bg-black text-white rounded-lg border border-white max-w-lg mx-auto">
            <div className="w-44 h-44 rounded-full relative overflow-hidden border-2 border-white mr-4">
              <Image src={profile} alt="Foto Profil" objectFit="cover" />
            </div>
            <div className="flex flex-col justify-center text-base text-center">
              <p>Halo 👋!</p>
              <p>Nama saya Muhammad Wahyu Ramadhan </p>
              <p>Saya seorang Frontend Developer dari Medan 📌</p>
            </div>
          </div>
        ),
      },
      {
        text: "What I've Done",
        content: (
          <div className="overflow-auto max-h-64 flex flex-col gap-2 items-center p-6 bg-black text-white rounded-lg max-full mx-auto">
            <div className="grid grid-cols-3 gap-3 border-white border w-full">
              <div className="m-2 mt-5 w-44 h-44 col-start-1 col-end-2 rounded-md relative overflow-hidden border-2 border-white mr-4">
                <Image src={profile} alt="Foto Profil" objectFit="cover" />
              </div>
              <div className="p-4 col-start-2 col-span-2">
                <p className="text-2xl mb-2 font-bold">Barber Shop Langkat</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the {"industry's"}
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 border-white border w-full">
              <div className="m-2 mt-5 w-44 h-44 col-start-1 col-end-2 rounded-md relative overflow-hidden border-2 border-white mr-4">
                <Image src={profile} alt="Foto Profil" objectFit="cover" />
              </div>
              <div className="p-4 col-start-2 col-span-2">
                <p className="text-2xl mb-2 font-bold">Barber Shop Langkat</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the {"industry's"}
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 border-white border w-full">
              <div className="m-2 mt-5 w-44 h-44 col-start-1 col-end-2 rounded-md relative overflow-hidden border-2 border-white mr-4">
                <Image src={profile} alt="Foto Profil" objectFit="cover" />
              </div>
              <div className="p-4 col-start-2 col-span-2">
                <p className="text-2xl mb-2 font-bold">Barber Shop Langkat</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the {"industry's"}
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        text: "My Skills",
        content: (
          <div className="grid grid-cols-4 grid-rows-4 gap-4 h-[50vh]">
            <div className="col-span-2 row-span-3 col-start-3 row-start-1 relative rounded-md border border-white">
              <Image
                src={react}
                alt="Foto Profil"
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
            <div className="col-span-2 row-span-3 col-start-1 relative rounded-md border border-white row-start-2">
              <Image
                src={next}
                alt="Foto Profil"
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
            <div className="col-start-1 col-span-2 relative rounded-md border border-white">
              <Image
                src={supabase}
                alt="Foto Profil"
                layout="cover"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
            <div className="col-span-2 col-start-3 row-start-4 relative rounded-md border border-white">
              <Image
                src={firebase}
                alt="Foto Profil"
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
          </div>
        ),
      },
      {
        text: "Contact Me",
        content:
          "Get in touch at johndoe@example.com or connect with me on LinkedIn and GitHub.",
      },
    ];

    return items.map((item, index) => {
      const angle = (index / items.length) * Math.PI * 2;
      const radius = 2.5;
      const yOffset = Math.random() * 1.5 - 0.75;
      return {
        ...item,
        position: [
          Math.sin(angle) * radius,
          1.5 + yOffset,
          Math.cos(angle) * radius,
        ] as [number, number, number],
      };
    });
  }, []);

  const handleContentClick = (text: string) => {
    setActiveContent(text);
    if (cameraRef.current && controlsRef.current) {
      controlsRef.current.enabled = false;
      const targetPosition = new THREE.Vector3(0, 0, 3);
      const duration = 1000; // ms
      const start = Date.now();
      const startPosition = camera.position.clone();

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        camera.position.lerpVectors(startPosition, targetPosition, progress);
        camera.lookAt(0, 0, 0);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          controlsRef.current.enabled = true;
        }
      };
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
          //@ts-ignore
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
