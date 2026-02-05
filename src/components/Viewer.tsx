// src/components/Viewer.tsx

// @ts-expect-error - PlayCanvas ESM scripts don't have type declarations
import { CameraControls } from "playcanvas/scripts/esm/camera-controls.mjs";
// @ts-expect-error - PlayCanvas ESM scripts don't have type declarations
import { Grid } from "playcanvas/scripts/esm/grid.mjs";

import { useEffect, useRef, useState } from "react";
import type { Entity as PcEntity } from "playcanvas";
import { Entity } from "@playcanvas/react";
import { useEnvAtlas, useSplat } from "@playcanvas/react/hooks";
import { Camera, Environment, GSplat, Script } from "@playcanvas/react/components";

export function Viewer({ onClick, label, splatSrc }: ViewerProps) {
  const [hovering, setHovering] = useState(false);

  // Ref to the PlayCanvas camera Entity.
  // We use this to call Entity methods like lookAt() from React.
  const cameraRef = useRef<PcEntity | null>(null);

  // Load the environment map
  const { asset: envMap } = useEnvAtlas("/environment-map.png");

  // Load Gaussian Splat asset (.ply / .compressed.ply)
  const { asset: splatAsset } = useSplat(splatSrc);

  // Change the mouse cursor based on the hover state
  useEffect(() => {
    document.body.style.cursor = hovering ? "pointer" : "default";
  }, [hovering]);

  // DEBUG: Confirm that props (label) are passed correctly from App to Viewer.
  // This is a temporary console log; later we will render the label in the UI instead.
  useEffect(() => {
    if (label) {
      console.log("Viewer label:", label);
    }
  }, [label]);

  // Set the initial camera orientation once after mount:
  // make the camera look at the world origin (0,0,0).
  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current.lookAt(0, 0, 0);
  }, []);

  // Don't render until the environment map is loaded
  // Wait until the environment map is loaded before rendering.
  // Returning null avoids rendering a partially-initialized scene.
  if (!envMap) return null;

  return (
    <>
      <Environment envAtlas={envMap} showSkybox={false} />

      {/*
      <Entity scale={[1000, 1000, 1000]}>
        <Script script={Grid} />
      </Entity>
      */}

      {/* Camera (tweak later if needed) */}
      <Entity ref={cameraRef} name="camera" position={[0, 0.5, 2.5]}>
        <Camera clearColor="#000000" />
        <Script script={CameraControls} />
      </Entity>

      {/* Pointer events container */}
      {/* GSplatは独立して描画（hover再レンダの巻き込みを避ける） */}
      {/* Model transform wrapper:
          Your model's axes are: +X = left, +Y = up, +Z = forward (into screen).
          Wrap GSplat with an Entity and rotate it so it appears "front-facing" in our viewer coordinate system.
      */}
      <Entity rotation={[180, 0, 0]}>
        {splatAsset ? <GSplat asset={splatAsset} /> : null}
      </Entity>

      {/* イベントは別Entityで拾う（中身無し） */}
      <Entity
        position={[0, 0, 0]}
        onClick={onClick}
        onPointerOver={() => setHovering(true)}
        onPointerOut={() => setHovering(false)}
      />
    </>
  );
}

type ViewerProps = {
  onClick: () => void;
  label?: string;
  splatSrc: string;
};