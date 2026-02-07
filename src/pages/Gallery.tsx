// 必ず先頭に import を書く
import { Application } from "@playcanvas/react";
import { useState } from "react";

import reactLogo from "../assets/react.svg";
import playcanvasLogo from "../assets/playcanvas.png";

import "../App.css";

import { Viewer } from "../components/Viewer";
import { GalleryList } from "../components/GalleryList";
import { works } from "../data/works";


// Gallery ページ本体
export function Gallery() {

  // クリック回数
  const [count, setCount] = useState(0);

  // 現在表示中の作品インデックス
  const [currentIndex, setCurrentIndex] = useState(0);

  // 現在の作品
  const currentWork = works[currentIndex];


  // Viewer クリック時の処理
  const handleViewerClick = () => {
    setCount((c) => c + 1);
    setCurrentIndex((i) => (i + 1) % works.length);
  };


  return (
    <>
      {/* 3D 表示領域 */}
      <div className="full-bleed">
        <Application
          className="playcanvas-app"
          graphicsDeviceOptions={{ antialias: false }}
        >
          <Viewer
            onClick={handleViewerClick}
            label={currentWork.title}
            splatSrc={currentWork.splatSrc}
          />
        </Application>
      </div>


      {/* UI レイヤー */}
      <div className="absolute overlay">

        {/* サイドバー */}
        <div className="sidebar pointer-events-auto">
          <GalleryList
            works={works}
            currentIndex={currentIndex}
            onSelect={setCurrentIndex}
          />
        </div>


        {/* ヘッダー */}
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

            <a
              href="https://react.dev"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={reactLogo}
                className="logo react"
                alt="React logo"
              />
            </a>
          </header>
        </div>


        {/* ステータス表示 */}
        <div>
          <span className="pill">
            Click Count: {count}
          </span>

          <span className="pill" style={{ marginLeft: 8 }}>
            Current: {currentWork.title}
          </span>

          <p>
            Click the model to cycle works.
            Edit <code>src/data/works.ts</code> to add more works.
          </p>
        </div>


        <p className="read-the-docs">
          Click on the PlayCanvas and React logos to learn more
        </p>

      </div>
    </>
  );
}