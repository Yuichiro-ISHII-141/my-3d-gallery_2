// src/components/Viewer.tsx

// @ts-expect-error - PlayCanvas ESM scripts don't have type declarations
import { CameraControls } from "playcanvas/scripts/esm/camera-controls.mjs";
// @ts-expect-error - PlayCanvas ESM scripts don't have type declarations
import { Grid } from "playcanvas/scripts/esm/grid.mjs";
import { useEffect, useState } from "react";
import { Entity } from "@playcanvas/react";
import { useEnvAtlas, useMaterial } from "@playcanvas/react/hooks";
import { Camera, Environment, Render, Script } from "@playcanvas/react/components";

/**
 * Viewer renders a sphere with a grid and camera controls
 */
export function Viewer({ onClick, label }: ViewerProps) {
  // Track the hover state and set the color based on the hover state
  const [hovering, setHovering] = useState(false);

  // Set a material color based on the hover state
  const diffuse = hovering ? "orange" : "lightgrey";

  // Create a material for the sphere
  const material = useMaterial({ diffuse });

  // Load the environment map
  const { asset: envMap } = useEnvAtlas("/environment-map.png");

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

  // Don't render until the environment map is loaded
  if (!envMap) return null;

  return (
    <>
      {/* Render some environment lighting using the environment map */}
      <Environment envAtlas={envMap} showSkybox={false} />

      {/* Render a background grid */}
      <Entity scale={[1000, 1000, 1000]}>
        <Script script={Grid} />
      </Entity>

      {/* Create a camera entity with camera controls */}
      <Entity name="camera" position={[4, 1, 4]}>
        <Camera clearColor="#171717" />
        <Script script={CameraControls} />
      </Entity>

      {/* Create and position entity with pointer events */}
      <Entity
        position={[0, 0.5, 0]}
        onClick={onClick}
        onPointerOver={() => setHovering(true)}
        onPointerOut={() => setHovering(false)}
      >
        {/* Render a sphere with the material */}
        <Render type="sphere" material={material} />
      </Entity>
    </>
  );
}

type ViewerProps = {
  onClick: () => void;
  label?: string;
};