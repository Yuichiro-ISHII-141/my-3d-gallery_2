import { Link } from "react-router-dom";

export function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center", padding: 24, maxWidth: 720 }}>

        <div className="profile-image">
        <img
            src={`${import.meta.env.BASE_URL}icons/image14.png`}
            alt="Profile Icon"
            className="profile-icon"
        />
        </div>


        <h1 style={{ marginBottom: 8 }}>My 3D Gallery</h1>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          Yu-chan(@yu_chan141)が3D Gaussian Splatting で作成した3Dモデルのギャラリーです。
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

        {/* Twitter / X リンク */}
        <div className="social-links">
            <a
            href="https://x.com/yu_chan141"
            target="_blank"
            rel="noreferrer"
            className="twitter-link"
            >
            {/*X (Twitter)*/}
            <img
            src={`${import.meta.env.BASE_URL}icons/x-logo-black.png`}
            alt="X (Twitter)"
            className="social-icon"
            />
            </a>
        </div>
      </div>
    </div>
  );
}