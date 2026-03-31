"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const semuaStiker = Array.from({ length: 24 }, (_, i) => `/stiker-${i + 1}.png`);
const semuaGambar = ["/g-1.png", "/g-2.png", "/g-3.png", "/g-4.png", "/g-5.png"];

const semuaNotes = [
  { id: "note-1",  warna: "#ffb3c6", warnaText: "#8b1a4a", teks: "Linda – Baik dan Ramah" },
  { id: "note-2",  warna: "#ffd6a5", warnaText: "#7a3d00", teks: "Sekolah" },
  { id: "note-3",  warna: "#fff9a5", warnaText: "#7a6d00", teks: "Ramai" },
  { id: "note-4",  warna: "#ffb3c6", warnaText: "#8b1a4a", teks: "Bu Guru – Lemah lembut" },
  { id: "note-5",  warna: "#c8b4f0", warnaText: "#3d1a8b", teks: "Sepi" },
  { id: "note-6",  warna: "#a8d8f0", warnaText: "#0a3d5c", teks: "Pagi" },
  { id: "note-7",  warna: "#ffd6a5", warnaText: "#7a3d00", teks: "Siang" },
  { id: "note-8",  warna: "#b8f0c8", warnaText: "#0a4a1e", teks: "Dika – Pemalu" },
  { id: "note-9",  warna: "#a8d8f0", warnaText: "#0a3d5c", teks: "Maju" },
  { id: "note-10", warna: "#fff9a5", warnaText: "#7a6d00", teks: "Sore" },
  { id: "note-11", warna: "#ffd6a5", warnaText: "#7a3d00", teks: "Bertemanlah dengan siapapun." },
  { id: "note-12", warna: "#b8f0c8", warnaText: "#0a4a1e", teks: "Jangan takut berkenalan di tempat baru karena kita bisa mendapatkan teman." },
  { id: "note-13", warna: "#fff9a5", warnaText: "#7a6d00", teks: "Pada hari pertama masuk sekolah ..." },
  { id: "note-14", warna: "#ffb3c6", warnaText: "#8b1a4a", teks: "Suatu pagi ..." },
  { id: "note-15", warna: "#a8d8f0", warnaText: "#0a3d5c", teks: "Pada hari Senin ..." },
  { id: "note-16", warna: "#ffd6a5", warnaText: "#7a3d00", teks: "Hari itu adalah hari pertamaku ..." },
  { id: "note-17", warna: "#c8b4f0", warnaText: "#3d1a8b", teks: "Aku merasa bingung ketika di sekolah ..." },
  { id: "note-18", warna: "#ffb3c6", warnaText: "#8b1a4a", teks: "Aku merasa malu untuk memulai berkenalan dengan teman ..." },
  { id: "note-19", warna: "#fff9a5", warnaText: "#7a6d00", teks: "Aku merasa takut saat berada di sekolahku yang baru ..." },
  { id: "note-20", warna: "#c8b4f0", warnaText: "#3d1a8b", teks: "Perasaan khawatir menyelimutiku ..." },
  { id: "note-21", warna: "#b8f0c8", warnaText: "#0a4a1e", teks: "Akhirnya aku mendapatkan teman baru ..." },
  { id: "note-22", warna: "#a8d8f0", warnaText: "#0a3d5c", teks: "Seseorang menghampiriku dan mengajakku berkenalan ..." },
  { id: "note-23", warna: "#b8f0c8", warnaText: "#0a4a1e", teks: "Akhirnya aku memiliki banyak teman dan merasa senang di sekolah" },
];

// ┌─────────────────────────────────────────────────────┐
// │  ATUR POSISI & UKURAN TEKS DI DALAM NOTE            │
// │  fs      → ukuran teks (0.09 = default)            │
// │  top/left/right/bottom → posisi area teks (%)      │
// └─────────────────────────────────────────────────────┘
function ScallopNote({ warna, warnaText, size, teks }: {
  warna: string; warnaText: string; size: number; teks: string;
}) {
  const tapeColors = ["#f9a8d4","#fbbf24","#86efac","#93c5fd","#c4b5fd"];
  const tc = tapeColors[teks.length % tapeColors.length];
  const fs = Math.max(7, Math.min(13, size * 0.09));        // ← ukuran teks
  const maxChars = Math.floor(size * 0.3);
  const trimmed = teks.length > maxChars ? teks.slice(0, maxChars) + "…" : teks;

  return (
    <div style={{ width: size, height: size, position: "relative", filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))" }}>
      <svg viewBox="0 0 100 104" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        {/* Washitape polkadot */}
        <rect x="34" y="-2" width="32" height="13" rx="3" fill={tc} opacity="0.9"/>
        {[40,50,60].map(cx => <circle key={cx} cx={cx} cy="4.5" r="1.8" fill="white" opacity="0.7"/>)}
        {[45,55].map(cx => <circle key={cx} cx={cx} cy="9" r="1.4" fill="white" opacity="0.5"/>)}
        {/* Border scallop luar */}
        <path fill={warna + "cc"} d="M18,16 Q12,10 18,6 Q24,2 28,8 Q34,2 40,6 Q46,2 50,6 Q54,2 60,6 Q66,2 72,8 Q76,2 82,6 Q88,10 82,16 Q90,20 90,28 Q94,34 90,40 Q94,46 90,52 Q94,58 90,64 Q90,72 82,76 Q80,84 72,86 Q66,92 60,88 Q54,94 50,94 Q46,94 40,88 Q34,92 28,86 Q20,84 18,76 Q10,72 10,64 Q6,58 10,52 Q6,46 10,40 Q6,34 10,28 Q10,20 18,16 Z"/>
        {/* Area dalam putih cream */}
        <path fill="#fffdf5" d="M20,20 Q14,14 20,10 Q25,7 30,12 Q35,7 40,10 Q46,7 50,10 Q54,7 60,10 Q65,7 70,12 Q75,7 80,10 Q86,14 80,20 Q87,24 87,31 Q90,37 87,43 Q90,49 87,55 Q90,61 87,67 Q87,74 80,77 Q79,83 72,85 Q67,90 61,86 Q56,91 50,91 Q44,91 39,86 Q33,90 28,85 Q21,83 20,77 Q13,74 13,67 Q10,61 13,55 Q10,49 13,43 Q10,37 13,31 Q13,24 20,20 Z"/>
      </svg>
      {/* Teks */}
      <div style={{
        position: "absolute",
        top: "5%",    // ← geser atas/bawah
        left: "14%",   // ← geser kiri
        right: "14%",  // ← geser kanan
        bottom: "10%", // ← jarak bawah
        pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <p style={{
          fontFamily: "Nunito, sans-serif", fontSize: fs, fontWeight: 800,
          color: warnaText, textAlign: "center", lineHeight: 1.4,
          margin: 0, wordBreak: "break-word", overflow: "hidden",
          display: "-webkit-box", WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical" as const,
        }}>{trimmed}</p>
      </div>
    </div>
  );
}

type Item = {
  id: number;
  type: "stiker" | "gambar" | "note";
  src: string;
  teks?: string;
  warna?: string;
  warnaText?: string;
  noteId?: string;
  gambarSrc?: string;
  x: number;
  y: number;
  size: number;
};

type Toolbar = "stiker" | "kamera" | "amplop" | null;

const noDrag = { draggable: false, onDragStart: (e: React.DragEvent) => e.preventDefault() };

export default function Konsep() {
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");
  const [nextPageIdx, setNextPageIdx] = useState(0);
  const [itemsPerHalaman, setItemsPerHalaman] = useState<Item[][]>([[], []]);
  const [activeToolbar, setActiveToolbar] = useState<Toolbar>(null);
  const [draggingNew, setDraggingNew] = useState<Omit<Item, "id" | "x" | "y"> | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const areaRef = useRef<HTMLDivElement | null>(null);
  const stikerScrollRef = useRef<HTMLDivElement | null>(null);
  const kameraScrollRef = useRef<HTMLDivElement | null>(null);
  const amplopScrollRef = useRef<HTMLDivElement | null>(null);

  const items = itemsPerHalaman[page] || [];
  const allItems = itemsPerHalaman.flat();
  const notesDipakai = new Set(allItems.filter(it => it.noteId).map(it => it.noteId!));
  const gambarDipakai = new Set(allItems.filter(it => it.gambarSrc).map(it => it.gambarSrc!));

  const updateItems = (newItems: Item[]) => {
    const updated = [...itemsPerHalaman];
    updated[page] = newItems;
    setItemsPerHalaman(updated);
  };

  const toggleToolbar = (toolbar: Toolbar) => {
    setActiveToolbar(prev => prev === toolbar ? null : toolbar);
    setSelectedId(null);
  };

  const scrollPanel = (ref: React.RefObject<HTMLDivElement | null>, arah: "left" | "right") => {
    ref.current?.scrollBy({ left: arah === "right" ? 300 : -300, behavior: "smooth" });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    if (draggingNew) {
      const x = e.clientX - rect.left - draggingNew.size / 2;
      const y = e.clientY - rect.top - draggingNew.size / 2;
      updateItems([...items, { ...draggingNew, id: Date.now(), x, y }]);
      setDraggingNew(null);
    }
    if (draggingId !== null) {
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      updateItems(items.map(it => it.id === draggingId ? { ...it, x, y } : it));
      setDraggingId(null);
    }
  };

  const handleHapus = (id: number) => {
    updateItems(items.filter(it => it.id !== id));
    setSelectedId(null);
  };

  const handleResize = (id: number, delta: number) => {
    updateItems(items.map(it =>
      it.id === id ? { ...it, size: Math.max(40, Math.min(400, it.size + delta)) } : it
    ));
  };

  const handlePindah = (arah: "next" | "prev") => {
    if (flipping) return;
    const tujuan = arah === "next" ? page + 1 : page - 1;
    setFlipDir(arah);
    setNextPageIdx(tujuan);
    setFlipping(true);
    setSelectedId(null);
    setActiveToolbar(null);
    setTimeout(() => { setPage(tujuan); setFlipping(false); }, 700);
  };

  const renderHalamanBg = (idx: number) => (
    <img src={`/konsep-bg-${idx + 1}.png`} alt="background"
      className="absolute inset-0 w-full h-full object-cover" {...noDrag} />
  );

  const renderItems = (halamanItems: Item[]) =>
    halamanItems.map(it => (
      <div key={it.id} draggable
        onDragStart={(e) => {
          setDraggingId(it.id);
          const rect = e.currentTarget.getBoundingClientRect();
          setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onDragEnd={() => setDraggingId(null)}
        onClick={(e) => { e.stopPropagation(); setSelectedId(selectedId === it.id ? null : it.id); }}
        style={{ position: "absolute", left: it.x, top: it.y, width: it.size, height: it.size, zIndex: 20, cursor: "grab" }}
      >
        {it.type === "note" ? (
          <ScallopNote
            warna={it.warna || "#ffb3c6"}
            warnaText={it.warnaText || "#8b1a4a"}
            size={it.size}
            teks={it.teks || ""}
          />
        ) : (
          <img src={it.src} alt="item" style={{ width: "100%", height: "100%", objectFit: "contain" }} {...noDrag} />
        )}
        {selectedId === it.id && (
          <>
            <button onClick={(e) => { e.stopPropagation(); handleHapus(it.id); }}
              style={{ position: "absolute", top: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "red", color: "#fff", border: "none", fontSize: "14px", fontWeight: 700, cursor: "pointer", zIndex: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            <button onClick={(e) => { e.stopPropagation(); handleResize(it.id, 20); }}
              style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "green", color: "#fff", border: "none", fontSize: "18px", fontWeight: 700, cursor: "pointer", zIndex: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
            <button onClick={(e) => { e.stopPropagation(); handleResize(it.id, -20); }}
              style={{ position: "absolute", bottom: "-12px", left: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "blue", color: "#fff", border: "none", fontSize: "18px", fontWeight: 700, cursor: "pointer", zIndex: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
          </>
        )}
      </div>
    ));

  const renderPanel = (
    type: Toolbar,
    scrollRef: React.RefObject<HTMLDivElement | null>,
    konten: React.ReactNode
  ) => (
    <div className="absolute left-0 right-0 z-50"
      style={{ bottom: activeToolbar === type ? "0px" : "-160px", transition: "bottom 0.3s ease" }}
      {...noDrag}
    >
      <div className="flex items-center"
        style={{ background: "rgba(139,90,43,0.95)", borderRadius: "12px 12px 0 0", padding: "8px 12px", height: "160px" }}>
        <button onClick={() => scrollPanel(scrollRef, "left")}
          style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "20px", cursor: "pointer", color: "white", flexShrink: 0 }}>&#8249;</button>
        <div ref={scrollRef}
          className="flex flex-row items-center gap-3 overflow-x-auto mx-3"
          style={{ flex: 1, padding: "8px", scrollbarWidth: "none" }}>
          {konten}
        </div>
        <button onClick={() => scrollPanel(scrollRef, "right")}
          style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "20px", cursor: "pointer", color: "white", flexShrink: 0 }}>&#8250;</button>
      </div>
    </div>
  );

  const kontenStiker = semuaStiker.map((src, i) => (
    <img key={i} src={src} alt={`stiker-${i}`} draggable
      onDragStart={(e) => { e.stopPropagation(); setDraggingNew({ type: "stiker", src, size: 80 }); }}
      style={{ width: "110px", height: "110px", objectFit: "contain", cursor: "grab", flexShrink: 0 }} />
  ));

  const kontenKamera = semuaGambar
    .filter(src => !gambarDipakai.has(src))
    .map((src, i) => (
      <img key={i} src={src} alt={`gambar-${i}`} draggable
        onDragStart={(e) => { e.stopPropagation(); setDraggingNew({ type: "gambar", src, size: 160, gambarSrc: src }); }}
        style={{ width: "140px", height: "110px", objectFit: "cover", borderRadius: "8px", cursor: "grab", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }} />
    ));

  const kontenAmplop = semuaNotes
    .filter(note => !notesDipakai.has(note.id))
    .map((note) => (
      <div key={note.id} draggable
        onDragStart={(e) => { e.stopPropagation(); setDraggingNew({ type: "note", src: "", teks: note.teks, warna: note.warna, warnaText: note.warnaText, size: 120, noteId: note.id }); }}
        style={{ flexShrink: 0, cursor: "grab" }}>
        <ScallopNote warna={note.warna} warnaText={note.warnaText} size={120} teks={note.teks} />
      </div>
    ));

  const anyToolbarOpen = activeToolbar !== null;

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <style>{`
        @keyframes flipFromRight { 0%{transform:perspective(2500px) rotateY(0deg);opacity:1} 50%{transform:perspective(2500px) rotateY(-90deg);opacity:0.5} 100%{transform:perspective(2500px) rotateY(-180deg);opacity:0} }
        @keyframes flipFromLeft  { 0%{transform:perspective(2500px) rotateY(0deg);opacity:1} 50%{transform:perspective(2500px) rotateY(90deg);opacity:0.5}  100%{transform:perspective(2500px) rotateY(180deg);opacity:0} }
        .flip-out-next { animation: flipFromRight 0.7s ease-in-out forwards; transform-origin: left center; }
        .flip-out-prev { animation: flipFromLeft  0.7s ease-in-out forwards; transform-origin: right center; }
      `}</style>

      {flipping && (
        <div className="absolute inset-0 z-0">
          {renderHalamanBg(nextPageIdx)}
          {renderItems(itemsPerHalaman[nextPageIdx] || [])}
        </div>
      )}

      <div ref={areaRef}
        className={`absolute inset-0 z-10 ${flipping ? (flipDir === "next" ? "flip-out-next" : "flip-out-prev") : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => { setSelectedId(null); setActiveToolbar(null); }}
      >
        {renderHalamanBg(page)}
        {renderItems(items)}
      </div>

      {renderPanel("stiker", stikerScrollRef, kontenStiker)}
      {renderPanel("kamera", kameraScrollRef, kontenKamera)}
      {renderPanel("amplop", amplopScrollRef, kontenAmplop)}

      {!anyToolbarOpen && (
        <div className="absolute" style={{ bottom: "50px", left: "400px", zIndex: 50 }} {...noDrag}>
          <button onClick={() => toggleToolbar("stiker")}>
            <img src="/tombol-toolbar.png" alt="stiker" style={{ width: "500px" }} className="cursor-pointer hover:scale-110 transition-transform" {...noDrag} />
          </button>
        </div>
      )}
      {!anyToolbarOpen && (
        <div className="absolute" style={{ bottom: "200px", left: "51%", transform: "translateX(-50%)", zIndex: 50 }} {...noDrag}>
          <button onClick={() => toggleToolbar("kamera")}>
            <img src="/tombol-kamera.png" alt="kamera" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" {...noDrag} />
          </button>
        </div>
      )}
      {!anyToolbarOpen && (
        <div className="absolute" style={{ bottom: "340px", right: "425px", zIndex: 50 }} {...noDrag}>
          <button onClick={() => toggleToolbar("amplop")}>
            <img src="/tombol-amplop.png" alt="amplop" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" {...noDrag} />
          </button>
        </div>
      )}

      {!anyToolbarOpen && (
        <div className="absolute" style={{ bottom: "-70px", left: "-70px", zIndex: 60 }} {...noDrag}>
          {page === 0 ? (
            <Link href="/drag">
              <img src="/tombol-kembali.png" alt="kembali" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" {...noDrag} />
            </Link>
          ) : (
            <button onClick={() => handlePindah("prev")}>
              <img src="/tombol-kembali.png" alt="kembali" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" {...noDrag} />
            </button>
          )}
        </div>
      )}
      {!anyToolbarOpen && page === 0 && (
        <div className="absolute" style={{ bottom: "-70px", right: "-80px", zIndex: 60 }} {...noDrag}>
          <button onClick={() => handlePindah("next")}>
            <img src="/tombol-next.png" alt="next" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" {...noDrag} />
          </button>
        </div>
      )}
      {!anyToolbarOpen && page === 1 && (
        <div className="absolute" style={{ bottom: "-70px", right: "-80px", zIndex: 60 }} {...noDrag}>
          <Link href="/buku">
            <img src="/tombol-next.png" alt="next" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" {...noDrag} />
          </Link>
        </div>
      )}
    </main>
  );
}