// src/data/works.ts

export type Work = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  splatSrc: string;
};

export const works: Work[] = [
  {
    id: "work-001",
    title: "Sample Work 001",
    description: "compressed ply test",
    tags: ["sample"],
    splatSrc: "/splats/sample.compressed.ply",
  },
  {
    id: "work-002",
    title: "Sample Work 002",
    description: "ply test",
    tags: ["sample"],
    splatSrc: "/splats/sample.ply",
  },
];