// src/data/works.ts

const BASE = import.meta.env.BASE_URL; // devなら "/" / Pagesなら "/my-3d-gallery_2/"

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
    description: "午年ということもあり、馬の人形です。子供の頃、実家で五月人形のお供として飾っていたものです。",
    tags: ["sample"],
    splatSrc: `${BASE}splats/work_001.compressed.ply`,
  },

    {
    id: "work-002",
    title: "002: 黒松の盆栽",
    description: "私が育てている黒松の盆栽です。植え替え前なので、まだビニールポットに植えられています。",
    tags: ["sample"],
    splatSrc: `${BASE}splats/work_002.compressed.ply`,
  },

  {
    id: "work-003",
    title: "003: 蔓の籠",
    description: "太めの蔓で編まれた籠です。",
    tags: ["sample"],
    splatSrc: `${BASE}splats/work_003.compressed.ply`,
  },
];