// src/components/GalleryList.tsx
import type { Work } from "../data/works";

type GalleryListProps = {
  works: Work[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function GalleryList({
  works,
  currentIndex,
  onSelect,
}: GalleryListProps) {
  return (
    <aside className="gallery-list">
      <h2>3D Models</h2>
      <ul>
        {works.map((work, index) => (
          <li key={work.id}>
            <button
              className={index === currentIndex ? "active" : ""}
              onClick={() => onSelect(index)}
            >
              {work.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}