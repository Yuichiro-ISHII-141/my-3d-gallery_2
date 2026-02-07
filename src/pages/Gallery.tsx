// 必ず先頭に import を書く
import { Application } from "@playcanvas/react";
import { useState } from "react";

import "../App.css";

import { Viewer } from "../components/Viewer";
import { GalleryList } from "../components/GalleryList";
import { works } from "../data/works";


// Gallery ページ本体
export function Gallery() {

  // 現在表示中の作品インデックス
  const [currentIndex, setCurrentIndex] = useState(0);

  // 現在の作品
  const currentWork = works[currentIndex];


  // Viewer クリック時の処理
  const handleViewerClick = () => {
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
          </header>
        </div>


        {/* ステータス表示 */}
        <div>
          <span className="pill" style={{ marginLeft: 8 }}>
            Current: {currentWork.title}
          </span>
        </div>


      </div>
    </>
  );
}