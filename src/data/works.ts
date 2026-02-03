// src/data/works.ts

export type Work = {
  id: string;
  title: string;
  description?: string;
  modelUrl?: string; // 例: "/models/sample.ply"（後で使用）
  tags?: string[];
};

export const works: Work[] = [
  {
    id: "work-001",
    title: "Sample Work 001",
    description: "PlayCanvas React quick start baseline",
    // modelUrl: "/models/sample.ply",
    tags: ["sample"],
  },
];