// 必ず先頭に import を書く
import { Application } from "@playcanvas/react";
import { useState } from "react";

import "../App.css";

import { Viewer } from "../components/Viewer";
import { GalleryList } from "../components/GalleryList";
import { works } from "../data/works";
import { useNavigate } from "react-router-dom";


// Gallery ページ本体
export function Gallery() {

  // 現在表示中の作品インデックス
  const [currentIndex, setCurrentIndex] = useState(0);

  const [bgColor, setBgColor] = useState("#777777");

  // 現在の作品
  const currentWork = works[currentIndex];

  const navigate = useNavigate();


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
            bgColor={bgColor}
            />
        </Application>
        </div>

        {/* UI レイヤー */}
        <div className="absolute overlay">

        {/* サイドバー */}
        <div className="sidebar pointer-events-auto">

            {/* 固定ヘッダー */}
            <div className="sidebar-header">

            {/* Home button */}
            <div className="home-button-area">
                <button
                className="home-btn"
                onClick={() => navigate("/")}
                >
                ← Home
                </button>
            </div>

            {/* Background */}
            <div className="sidebar-top">
                <div className="sidebar-section-title">
                Background Color
                </div>

                <div className="bg-preset-row">
                <button className="bg-btn" onClick={() => setBgColor("#252525")}>
                    Dark
                </button>

                <button className="bg-btn" onClick={() => setBgColor("#777777")}>
                    Light Gray
                </button>

                <button className="bg-btn" onClick={() => setBgColor("#E4E4E4")}>
                    Light
                </button>

                <button className="bg-btn" onClick={() => setBgColor("#f5f1e8")}>
                    Ivory
                </button>
                </div>
            </div>
            </div>

            {/* スクロール領域 */}
            <div className="sidebar-body">
            <GalleryList
                works={works}
                currentIndex={currentIndex}
                onSelect={setCurrentIndex}
            />
            </div>

        </div>


        {/* ヘッダー（モデル名＋説明） */}
        <div className="grow">
            <header className="viewer-header">

            <h1 className="viewer-title">
                {currentWork.title}
            </h1>

            {currentWork.description && (
                <p className="viewer-description">
                {currentWork.description}
                </p>
            )}

            </header>
        </div>

        </div>
    </>
    );
}