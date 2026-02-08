# My 3D Gallery

This repository hosts a web-based 3D gallery built with React and PlayCanvas, showcasing original Gaussian Splatting works (.ply / .compressed.ply) for interactive viewing in the browser.

---

## 🌐 Live Demo

After deployment, the site will be available at:

https://<your-github-username>.github.io/<your-repository-name>/

(This URL will be updated after the first public deployment.)

---

## 🖼️ About

This project provides an online gallery for viewing 3D models created using 3D Gaussian Splatting.

Features:

- Interactive rotation, zoom, and panning
- Background color switching
- Multiple work management via data file
- Responsive sidebar UI
- Home / Gallery navigation

This project is intended for portfolio presentation, research reference, and public exhibition of 3D works.

---

## 🛠️ Tech Stack
(Tested with the following versions)

- React (v19.2.4)
- React Router (v7.13.0)
- TypeScript (v5.9.3)
- Vite (v7.3.1)
- PlayCanvas / @playcanvas/react (v0.11.3, playcanvas v2.15.3)

---

## 📁 Project Structure

```
src/
 ├ components/     # Viewer and UI components (PlayCanvas viewer, sidebar, etc.)
 ├ data/           # Work definitions (works.ts)
 ├ pages/          # Home and Gallery pages
 ├ assets/         # Images and icons
 └ scripts/        # Custom PlayCanvas scripts

public/
 └ splats/          # 3D model files (.ply / .compressed.ply)
```

---

## 🚀 Development Setup

### Requirements

- Node.js v24.13.0 or later

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open in browser:

http://localhost:5173

---

## 📦 Build & Deployment (GitHub Pages)

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Deploy

```bash
npm run deploy
```

---

## 🗂️ Adding New Works

Make sure file paths match the public directory structure.

1. Place model file in:

```
public/splats/
```

2. Edit:

```
src/data/works.ts
```

3. Add new entry:

```ts
{
  id: "work-xxx",
  title: "New Work",
  description: "Description",
  splatSrc: "/splats/your-file.ply"
}
```

4. Commit and deploy.

---

## 👤 Author

Name: Yuichiro ISHII

X (Twitter): https://x.com/yu_chan141

---

## 📄 License

### License

This project is developed primarily for personal portfolio and research purposes.

The source code in this repository is released under the MIT License.

All original 3D models, images, and related assets are © 2026 Yuichiro Ishii.
All rights reserved.


### Third-Party Brand Assets

The X logo and brand assets used in this project were obtained from the official X Brand Toolkit:  
https://about.x.com/en/who-we-are/brand-toolkit

These assets are the property of X Corp. and are used here solely for identification and linking purposes in accordance with the brand guidelines.