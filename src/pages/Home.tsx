import { Link } from "react-router-dom";

export function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center", padding: 24, maxWidth: 720 }}>
        <h1 style={{ marginBottom: 8 }}>My 3D Gallery</h1>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          Gaussian Splatting作品のギャラリーです。
        </p>

        <Link to="/gallery" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "12px 18px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
            }}
          >
            ギャラリーを見る →
          </button>
        </Link>
      </div>
    </div>
  );
}