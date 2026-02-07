import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Gallery } from "./pages/Gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />

      {/* それ以外のURLはトップへ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;