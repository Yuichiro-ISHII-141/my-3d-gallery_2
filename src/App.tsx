import { Application } from "@playcanvas/react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import playcanvasLogo from "./assets/playcanvas.png";
import "./App.css";
import { Viewer } from "./components/Viewer";
import { GalleryList } from "./components/GalleryList";
import { works } from "./data/works";

function App() {
  const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWork = works[currentIndex];

  const handleViewerClick = () => {
    setCount((c) => c + 1);
    setCurrentIndex((i) => (i + 1) % works.length);
  };

  return (
    <>
      <div className="full-bleed">
        <Application className="playcanvas-app" graphicsDeviceOptions={{ antialias: false }}>
          {/* 3D（PlayCanvas）だけ */}
          <Viewer
            onClick={handleViewerClick} 
            label={currentWork.title}
            splatSrc={currentWork.splatSrc}
          />
        </Application>
      </div>

      {/* UI（DOM）だけ */}
      <div className="absolute overlay">
        {/* ← ここに Works を追加 */}
        <div className="sidebar pointer-events-auto">
          <GalleryList
            works={works}
            currentIndex={currentIndex}
            onSelect={setCurrentIndex}
          />
        </div>

        <div className="grow">
          <header>
            <h1>My 3D Gallery</h1>
            <a
              href="https://developer.playcanvas.com/user-manual/react/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={playcanvasLogo}
                className="playcanvas-logo logo"
                alt="PlayCanvas logo"
              />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </header>
        </div>

        <div>
          <span className="pill">Click Count: {count}</span>
          <span className="pill" style={{ marginLeft: 8 }}>
            Current: {currentWork.title}
          </span>
          <p>
            Click the sphere to cycle works. Edit <code>src/data/works.ts</code>{" "}
            to add more works.
          </p>
        </div>

        <p className="read-the-docs">
          Click on the PlayCanvas and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;