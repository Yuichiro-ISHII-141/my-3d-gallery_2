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
    title: "001: 馬の人形",
    description: "五月人形として飾っていた馬の人形です。",
    tags: ["sample"],
    splatSrc: "/splats/work_001.compressed.ply",
  },
];