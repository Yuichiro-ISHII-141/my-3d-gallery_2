// src/components/Viewer.tsx

// @ts-expect-error - PlayCanvas ESM scripts don't have type declarations
import { CameraControls } from "../scripts/camera-controls-custom.mjs";
// @ts-expect-error - PlayCanvas ESM scripts don't have type declarations
import { Grid } from "playcanvas/scripts/esm/grid.mjs";

import { useEffect, useRef, useState } from "react";
import type { Entity as PcEntity } from "playcanvas";
import { Vec3 } from "playcanvas";
import { useApp } from "@playcanvas/react/hooks";
import { Entity } from "@playcanvas/react";
import { useEnvAtlas, useSplat } from "@playcanvas/react/hooks";
import { Camera, Environment, GSplat, Script } from "@playcanvas/react/components";
import { memo } from "react";

export function Viewer({ onClick, label, splatSrc, bgColor }: ViewerProps) {
  const [hovering, setHovering] = useState(false);

  const app = useApp();

  // Ref to the PlayCanvas camera Entity.
  // We use this to call Entity methods like lookAt() from React.
  const cameraRef = useRef<PcEntity | null>(null);

  // Ref to the PlayCanvas model root Entity.
  // We move this entity when the user right-drags (screen-plane pan).
  const modelRef = useRef<PcEntity | null>(null);

  // Load the environment map
  const { asset: envMap } = useEnvAtlas("/environment-map.png");

  // Load Gaussian Splat asset (.ply / .compressed.ply)
  const { asset: splatAsset } = useSplat(splatSrc);

  const SplatNode = memo(function SplatNode({ asset }: { asset: any }) {
    return <GSplat asset={asset} />;
  });

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

  // Update camera clear color when bgColor changes
  useEffect(() => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current.camera;
    if (!camera) return;

    camera.clearColor.fromString(bgColor);
  }, [bgColor, app]);

    // Prevent the browser context menu from stealing right-drag input.
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    window.addEventListener("contextmenu", onContextMenu);
    return () => window.removeEventListener("contextmenu", onContextMenu);
  }, []);

  // Enable right-drag to pan the MODEL on the screen plane (camera right/up),
  // while keeping left-drag orbit rotation handled by CameraControls.
  useEffect(() => {
    if (!app) return;

    const canvas = app.graphicsDevice.canvas;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const tmp = new Vec3();
    const right = new Vec3();
    const up = new Vec3();

    // Prevent default context menu on right-click drag
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    const onPointerDown = (e: PointerEvent) => {
      // Right button only
      if (e.button !== 2) return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;

      // capture pointer so we keep receiving move events even if cursor leaves canvas
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.button !== 2) return;
      dragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      if (!cameraRef.current || !modelRef.current) return;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      // Sensitivity: adjust this value to taste
      const s = 0.002;

      // Move model along camera's screen plane axes
      right.copy(cameraRef.current.right).mulScalar(dx * s);
      up.copy(cameraRef.current.up).mulScalar(-dy * s);

      tmp.copy(modelRef.current.getPosition()).add(right).add(up);
      modelRef.current.setPosition(tmp);
    };

    canvas.addEventListener("contextmenu", onContextMenu);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      canvas.removeEventListener("contextmenu", onContextMenu);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, [app]);

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
        <Camera />
        <Script script={CameraControls} />
      </Entity>

      {/* Pointer events container */}
      {/* GSplatは独立して描画（hover再レンダの巻き込みを避ける） */}
      {/* Model transform wrapper:
          Your model's axes are: +X = left, +Y = up, +Z = forward (into screen).
          Wrap GSplat with an Entity and rotate it so it appears "front-facing" in our viewer coordinate system.
      */}
      <Entity ref={modelRef} rotation={[180, 0, 0]} position={[0, 0, 0]}>
        {/*{splatAsset ? <GSplat asset={splatAsset} /> : null}*/}
        {splatAsset ? <SplatNode asset={splatAsset} /> : null}
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
  bgColor: string;
};