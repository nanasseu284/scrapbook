"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbygxqyEznyQfgakKDesxNBRD8N3ZrVxGxuH5Rghqi9hFOAXi7-2e916PRgZfgWeDFbh/exec";

const MAX_PER_HALAMAN = 18;

const warnaNote = [
  { warna: "#ffb3c6", warnaText: "#8b1a4a" },
  { warna: "#ffd6a5", warnaText: "#7a3d00" },
  { warna: "#fff9a5", warnaText: "#7a6d00" },
  { warna: "#b8f0c8", warnaText: "#0a4a1e" },
  { warna: "#a8d8f0", warnaText: "#0a3d5c" },
  { warna: "#c8b4f0", warnaText: "#3d1a8b" },
  { warna: "#ffc8e8", warnaText: "#8b1060" },
  { warna: "#ffe0b0", warnaText: "#6a3800" },
];

type NoteShape = "scallop" | "star" | "heart" | "cloud" | "flower" | "strawberry";
const allShapes: NoteShape[] = ["scallop", "star", "heart", "cloud", "flower", "strawberry"];

type JawabanSiswa = {
  id: string;
  nama: string;
  jawaban1: string;
  jawaban2: string;
  warna: string;
  warnaText: string;
  size: number;
  rotate: number;
  shape: NoteShape;
};

type EmojiPilihan = "sangat" | "senang" | "biasa" | "tidak" | null;

const emojiData = [
  { id: "sangat", label: "Sangat\nMenyenangkan", emoji: "🤩" },
  { id: "senang", label: "Menyenangkan",        emoji: "🤗" },
  { id: "biasa",  label: "Biasa saja",           emoji: "😌" },
  { id: "tidak",  label: "Tidak\nmenyenangkan",  emoji: "😢" },
];

// ┌─────────────────────────────────────────────────────┐
// │  ATUR POSISI & UKURAN TEKS DI DALAM NOTE            │
// │  fs      → ukuran teks isi (0.065 = default)       │
// │  fsSmall → ukuran label "Belajar:" / "Narasi:"      │
// │  top     → jarak dari atas note (%)                 │
// │  left    → jarak dari kiri note (%)                 │
// │  right   → jarak dari kanan note (%)                │
// │  bottom  → jarak dari bawah note (%)                │
// └─────────────────────────────────────────────────────┘
function NoteText({ size, warnaText, jawaban1, jawaban2, nama }: {
  size: number; warnaText: string; jawaban1: string; jawaban2: string; nama: string;
}) {
  const fs      = Math.max(7, Math.min(11, size * 0.065)); // ← ubah 0.065
  const fsSmall = Math.max(6, Math.min(9,  size * 0.055)); // ← ubah 0.055
  const maxChars = Math.floor(size * 0.28);
  const trim = (t: string) => t.length > maxChars ? t.slice(0, maxChars) + "…" : t;
  return (
    <div style={{
      position: "absolute",
      top: "12%",    // ← geser atas/bawah
      left: "20%",   // ← geser kiri
      right: "20%",  // ← geser kanan
      bottom: "10%", // ← geser bawah
      pointerEvents: "none",
      display: "flex", flexDirection: "column", justifyContent: "center",
      overflow: "hidden",
    }}>
      <p style={{
        fontFamily: "Nunito, sans-serif", fontSize: fs, fontWeight: 800,
        color: warnaText, lineHeight: 1.35, margin: 0,
        wordBreak: "break-word", overflow: "hidden",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
      }}>
        <span style={{ fontSize: fsSmall, fontWeight: 700, opacity: 0.6 }}>Belajar: </span>
        {trim(jawaban1)}
      </p>
      <p style={{
        fontFamily: "Nunito, sans-serif", fontSize: fs, fontWeight: 800,
        color: warnaText, lineHeight: 1.35, margin: "5px 0 0",
        wordBreak: "break-word", overflow: "hidden",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
      }}>
        <span style={{ fontSize: fsSmall, fontWeight: 700, opacity: 0.6 }}>Narasi: </span>
        {trim(jawaban2)}
      </p>
      <p style={{
        fontFamily: "Nunito, sans-serif", fontSize: fsSmall, fontWeight: 700,
        color: warnaText, opacity: 0.45, margin: "5px 0 0", textAlign: "right",
        overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
      }}>— {nama}</p>
    </div>
  );
}

// ════════════ 1. SCALLOP ════════════
function ScallopNote({ warna, warnaText, size, rotate, selected, jawaban1, jawaban2, nama }: JawabanSiswa & { selected: boolean }) {
  const tapeColors = ["#f9a8d4","#fbbf24","#86efac","#93c5fd","#c4b5fd"];
  const tc = tapeColors[nama.length % tapeColors.length];
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `rotate(${rotate}deg) scale(${selected ? 1.08 : 1})`, transition: "transform 0.2s cubic-bezier(0.34,1.4,0.64,1)", filter: selected ? "drop-shadow(0 8px 18px rgba(0,0,0,0.3))" : "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))" }}>
      <svg viewBox="0 0 100 104" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <rect x="34" y="-2" width="32" height="13" rx="3" fill={tc} opacity="0.9"/>
        {[40,50,60].map(cx => <circle key={cx} cx={cx} cy="4.5" r="1.8" fill="white" opacity="0.7"/>)}
        {[45,55].map(cx => <circle key={cx} cx={cx} cy="9" r="1.4" fill="white" opacity="0.5"/>)}
        <path fill={warna + "cc"} d="M18,16 Q12,10 18,6 Q24,2 28,8 Q34,2 40,6 Q46,2 50,6 Q54,2 60,6 Q66,2 72,8 Q76,2 82,6 Q88,10 82,16 Q90,20 90,28 Q94,34 90,40 Q94,46 90,52 Q94,58 90,64 Q90,72 82,76 Q80,84 72,86 Q66,92 60,88 Q54,94 50,94 Q46,94 40,88 Q34,92 28,86 Q20,84 18,76 Q10,72 10,64 Q6,58 10,52 Q6,46 10,40 Q6,34 10,28 Q10,20 18,16 Z"/>
        <path fill="#fffdf5" d="M20,20 Q14,14 20,10 Q25,7 30,12 Q35,7 40,10 Q46,7 50,10 Q54,7 60,10 Q65,7 70,12 Q75,7 80,10 Q86,14 80,20 Q87,24 87,31 Q90,37 87,43 Q90,49 87,55 Q90,61 87,67 Q87,74 80,77 Q79,83 72,85 Q67,90 61,86 Q56,91 50,91 Q44,91 39,86 Q33,90 28,85 Q21,83 20,77 Q13,74 13,67 Q10,61 13,55 Q10,49 13,43 Q10,37 13,31 Q13,24 20,20 Z"/>
      </svg>
      <NoteText size={size} warnaText={warnaText} jawaban1={jawaban1} jawaban2={jawaban2} nama={nama} />
    </div>
  );
}

// ════════════ 2. STAR ════════════
function StarNote({ warna, warnaText, size, rotate, selected, jawaban1, jawaban2, nama }: JawabanSiswa & { selected: boolean }) {
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `rotate(${rotate}deg) scale(${selected ? 1.08 : 1})`, transition: "transform 0.2s cubic-bezier(0.34,1.4,0.64,1)", filter: selected ? "drop-shadow(0 8px 18px rgba(0,0,0,0.3))" : "drop-shadow(2px 5px 10px rgba(0,0,0,0.2))" }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#e0d8c8" transform="translate(3,4)"/>
        <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill={warna}/>
        <polygon points="50,14 59,38 85,38 65,53 73,78 50,63 27,78 35,53 15,38 41,38" fill="#fffdf5" opacity="0.5"/>
        <ellipse cx="37" cy="27" rx="8" ry="4" fill="white" opacity="0.35" transform="rotate(-30,37,27)"/>
      </svg>
      <NoteText size={size} warnaText={warnaText} jawaban1={jawaban1} jawaban2={jawaban2} nama={nama} />
    </div>
  );
}

// ════════════ 3. HEART NOTE ════════════
function HeartNote({ warna, warnaText, size, rotate, selected, jawaban1, jawaban2, nama }: JawabanSiswa & { selected: boolean }) {
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `rotate(${rotate}deg) scale(${selected ? 1.08 : 1})`, transition: "transform 0.2s cubic-bezier(0.34,1.4,0.64,1)", filter: selected ? "drop-shadow(0 8px 18px rgba(0,0,0,0.3))" : "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))" }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <rect x="6" y="6" width="88" height="88" rx="16" fill={warna}/>
        <rect x="12" y="12" width="76" height="76" rx="11" fill="none" stroke={warnaText} strokeWidth="1.5" strokeDasharray="5,3" strokeOpacity="0.28"/>
        <path d="M20,24 Q20,14 29,14 Q38,14 38,24 Q38,14 47,14 Q56,14 56,24 Q56,34 38,44 Q20,34 20,24 Z" fill="#f9a8d4"/>
      </svg>
      <NoteText size={size} warnaText={warnaText} jawaban1={jawaban1} jawaban2={jawaban2} nama={nama} />
    </div>
  );
}

// ════════════ 4. CLOUD ════════════
function CloudNote({ warna, warnaText, size, rotate, selected, jawaban1, jawaban2, nama }: JawabanSiswa & { selected: boolean }) {
  return (
    <div style={{ width: size, height: size * 0.82, position: "relative", transform: `rotate(${rotate}deg) scale(${selected ? 1.08 : 1})`, transition: "transform 0.2s cubic-bezier(0.34,1.4,0.64,1)", filter: selected ? "drop-shadow(0 8px 18px rgba(0,0,0,0.3))" : "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))" }}>
      <svg viewBox="0 0 120 96" width={size} height={size * 0.82} style={{ position: "absolute", inset: 0 }}>
        <path fill={warna} d="M26,68 Q8,68 8,52 Q8,38 22,36 Q18,18 34,16 Q42,6 56,10 Q66,4 78,14 Q93,12 97,28 Q112,28 113,44 Q116,60 102,66 Q96,76 80,74 Z"/>
        <ellipse cx="40" cy="26" rx="11" ry="5" fill="white" opacity="0.3" transform="rotate(-20,40,26)"/>
      </svg>
      <NoteText size={size} warnaText={warnaText} jawaban1={jawaban1} jawaban2={jawaban2} nama={nama} />
    </div>
  );
}

// ════════════ 5. FLOWER ════════════
function FlowerNote({ warna, warnaText, size, rotate, selected, jawaban1, jawaban2, nama }: JawabanSiswa & { selected: boolean }) {
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `rotate(${rotate}deg) scale(${selected ? 1.08 : 1})`, transition: "transform 0.2s cubic-bezier(0.34,1.4,0.64,1)", filter: selected ? "drop-shadow(0 8px 18px rgba(0,0,0,0.3))" : "drop-shadow(2px 5px 10px rgba(0,0,0,0.18))" }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        {[0,60,120,180,240,300].map(deg => (
          <ellipse key={deg} cx="50" cy="22" rx="13" ry="22" fill={warna} opacity="0.85" transform={`rotate(${deg},50,50)`}/>
        ))}
        <circle cx="50" cy="50" r="26" fill="#fffdf5"/>
        <circle cx="50" cy="50" r="11" fill="#fde68a" opacity="0.8"/>
      </svg>
      <NoteText size={size} warnaText={warnaText} jawaban1={jawaban1} jawaban2={jawaban2} nama={nama} />
    </div>
  );
}

// ════════════ 6. STRAWBERRY ════════════
function StrawberryNote({ warna, warnaText, size, rotate, selected, jawaban1, jawaban2, nama }: JawabanSiswa & { selected: boolean }) {
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `rotate(${rotate}deg) scale(${selected ? 1.08 : 1})`, transition: "transform 0.2s cubic-bezier(0.34,1.4,0.64,1)", filter: selected ? "drop-shadow(0 8px 18px rgba(0,0,0,0.3))" : "drop-shadow(2px 5px 10px rgba(0,0,0,0.18))" }}>
      <svg viewBox="0 0 100 110" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <path fill="#86efac" d="M50,10 Q42,3 36,9 Q31,3 39,15 Q44,11 50,15 Q56,11 61,15 Q69,3 64,9 Q58,3 50,10 Z"/>
        <path fill={warna} d="M30,22 Q17,27 15,43 Q13,58 20,71 Q28,85 40,91 Q50,96 60,91 Q72,85 80,71 Q87,58 85,43 Q83,27 70,22 Q60,16 50,17 Q40,16 30,22 Z"/>
        {[[37,42],[54,40],[44,57],[61,58],[34,62],[51,72],[41,74]].map(([cx,cy],i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="2.5" ry="3.5" fill={warnaText} opacity="0.18" transform={`rotate(-15,${cx},${cy})`}/>
        ))}
        <ellipse cx="37" cy="33" rx="7" ry="4" fill="white" opacity="0.3" transform="rotate(-20,37,33)"/>
      </svg>
      <NoteText size={size} warnaText={warnaText} jawaban1={jawaban1} jawaban2={jawaban2} nama={nama} />
    </div>
  );
}

function RenderNote(props: JawabanSiswa & { selected: boolean }) {
  switch (props.shape) {
    case "scallop":    return <ScallopNote    {...props} />;
    case "star":       return <StarNote       {...props} />;
    case "heart":      return <HeartNote      {...props} />;
    case "cloud":      return <CloudNote      {...props} />;
    case "flower":     return <FlowerNote     {...props} />;
    case "strawberry": return <StrawberryNote {...props} />;
    default:           return <ScallopNote    {...props} />;
  }
}

export default function Kesimpulan() {
  const [page, setPage] = useState(0);
  const [jawaban1, setJawaban1] = useState("");
  const [jawaban2, setJawaban2] = useState("");
  const [jawaban1Saved, setJawaban1Saved] = useState(false);
  const [jawaban2Saved, setJawaban2Saved] = useState(false);
  const [semuaJawaban, setSemuaJawaban] = useState<JawabanSiswa[]>([]);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [emojiPilihan, setEmojiPilihan] = useState<EmojiPilihan>(null);
  const [sudahKirim, setSudahKirim] = useState(false);
  const [mengirim, setMengirim] = useState(false);
  const [emojiAnimate, setEmojiAnimate] = useState<EmojiPilihan>(null);
  const [namaSiswa, setNamaSiswa] = useState("Anonim");

  useEffect(() => {
    const nama = localStorage.getItem("namaSiswa") || "Anonim";
    setNamaSiswa(nama);
    const saved = localStorage.getItem("kesimpulanJawaban");
    if (saved) setSemuaJawaban(JSON.parse(saved));
    const j1 = localStorage.getItem(`kesimpulan1_${nama}`);
    const j2 = localStorage.getItem(`kesimpulan2_${nama}`);
    if (j1) { setJawaban1(j1); setJawaban1Saved(true); }
    if (j2) { setJawaban2(j2); setJawaban2Saved(true); }
  }, []);

  const handleSimpanJawaban1 = () => {
    if (!jawaban1.trim()) return;
    localStorage.setItem(`kesimpulan1_${namaSiswa}`, jawaban1);
    setJawaban1Saved(true);
  };

  const handleSimpanJawaban2 = () => {
    if (!jawaban2.trim()) return;
    localStorage.setItem(`kesimpulan2_${namaSiswa}`, jawaban2);
    const warnaIdx = semuaJawaban.length % warnaNote.length;
    const warna = warnaNote[warnaIdx];
    const newJawaban: JawabanSiswa = {
      id: namaSiswa, nama: namaSiswa,
      jawaban1, jawaban2,
      warna: warna.warna, warnaText: warna.warnaText,
      size: 150, rotate: (Math.random() * 10 - 5),
      shape: allShapes[semuaJawaban.length % allShapes.length],
    };
    const updated = semuaJawaban.filter(j => j.id !== namaSiswa);
    updated.push(newJawaban);
    setSemuaJawaban(updated);
    localStorage.setItem("kesimpulanJawaban", JSON.stringify(updated));
    setJawaban2Saved(true);
  };

  const handleHapusNote = (id: string) => {
    const updated = semuaJawaban.filter(j => j.id !== id);
    setSemuaJawaban(updated);
    localStorage.setItem("kesimpulanJawaban", JSON.stringify(updated));
    setSelectedNote(null);
  };

  const handleResizeNote = (id: string, delta: number) => {
    setSemuaJawaban(prev => {
      const updated = prev.map(j => j.id === id ? { ...j, size: Math.max(80, Math.min(250, j.size + delta)) } : j);
      localStorage.setItem("kesimpulanJawaban", JSON.stringify(updated));
      return updated;
    });
  };

  const handleKirimEmoji = async () => {
    if (!emojiPilihan || mengirim) return;
    setMengirim(true);
    try {
      await fetch(SHEETS_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ namaSiswa, emoji: emojiPilihan }) });
      setSudahKirim(true);
    } catch { alert("❌ Gagal mengirim. Coba lagi."); }
    finally { setMengirim(false); }
  };

  const totalNotes = semuaJawaban.length;
  const totalNotesPage = Math.max(1, Math.ceil(totalNotes / MAX_PER_HALAMAN));
  const emojiPageIdx = 2 + totalNotesPage;
  const isEmojiPage = page === emojiPageIdx;
  const isNotesPage = page >= 2 && page < emojiPageIdx;
  const notesPageIdx = isNotesPage ? page - 2 : 0;
  const notesSlice = semuaJawaban.slice(notesPageIdx * MAX_PER_HALAMAN, (notesPageIdx + 1) * MAX_PER_HALAMAN);

  const notePositions = Array.from({ length: MAX_PER_HALAMAN }, (_, i) => ({
    left: `${8 + (i % 6) * 15.5}%`,
    top: `${12 + Math.floor(i / 6) * 30}%`,
  }));

  const goNext = () => setPage(p => p + 1);
  const goPrev = () => setPage(p => p - 1);

  return (
    <main className="relative w-screen h-screen overflow-hidden" onClick={() => setSelectedNote(null)}>
      <style>{`
        @keyframes notePopIn { from { transform: scale(0.7); opacity:0; } to { transform: scale(1); opacity:1; } }
        .note-item { animation: notePopIn 0.3s cubic-bezier(0.34,1.4,0.64,1) both; }
        @keyframes emojiPop { 0%{transform:scale(1)} 30%{transform:scale(0.85)} 60%{transform:scale(1.35)} 80%{transform:scale(0.95)} 100%{transform:scale(1.2)} }
        @keyframes emojiIdle { 0%,100%{transform:scale(1.2) translateY(0)} 50%{transform:scale(1.2) translateY(-6px)} }
        .emoji-pop  { animation: emojiPop  0.45s cubic-bezier(0.34,1.4,0.64,1) forwards; }
        .emoji-idle { animation: emojiIdle 1.2s ease-in-out infinite; }
      `}</style>

      {/* ══ HALAMAN 1 ══ */}
      {page === 0 && (
        <>
          <img src="/kesimpulan-bg-1.png" alt="bg" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute" style={{ top: "65%", left: "49%", transform: "translate(-50%, -50%)", width: "480px" }}>
            <textarea value={jawaban1} onChange={e => { setJawaban1(e.target.value); setJawaban1Saved(false); }} placeholder="Tuliskan jawabanmu disini!"
              style={{ width: "100%", height: "120px", borderRadius: "12px", border: "none", padding: "14px 16px", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: 600, color: "#5a3a10", resize: "none", outline: "none", background: "rgba(255,255,255,0.92)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button onClick={handleSimpanJawaban1} disabled={!jawaban1.trim()}
                style={{ background: jawaban1.trim() ? "#e07030" : "#ccc", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 24px", fontFamily: "'Fredoka One', cursive", fontSize: "15px", cursor: jawaban1.trim() ? "pointer" : "not-allowed", boxShadow: jawaban1.trim() ? "0 3px 0 #a04010" : "none" }}>
                {jawaban1Saved ? "✓ Tersimpan" : "Simpan Jawaban"}
              </button>
            </div>
          </div>
          <div className="absolute" style={{ bottom: "-70px", left: "-70px", zIndex: 60 }}>
            <Link href="/buku"><img src="/tombol-kembali.png" alt="kembali" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" /></Link>
          </div>
          <div className="absolute" style={{ bottom: "-70px", right: "-80px", zIndex: 60 }}>
            <button onClick={goNext}><img src="/tombol-next.png" alt="next" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" /></button>
          </div>
        </>
      )}

      {/* ══ HALAMAN 2 ══ */}
      {page === 1 && (
        <>
          <img src="/kesimpulan-bg-2.png" alt="bg" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute" style={{ top: "65%", left: "49%", transform: "translate(-50%, -50%)", width: "480px" }}>
            <textarea value={jawaban2} onChange={e => { setJawaban2(e.target.value); setJawaban2Saved(false); }} placeholder="Tuliskan jawabanmu disini!"
              style={{ width: "100%", height: "120px", borderRadius: "12px", border: "none", padding: "14px 16px", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: 600, color: "#5a3a10", resize: "none", outline: "none", background: "rgba(255,255,255,0.92)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <button onClick={handleSimpanJawaban2} disabled={!jawaban2.trim()}
                style={{ background: jawaban2.trim() ? "#e07030" : "#ccc", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 24px", fontFamily: "'Fredoka One', cursive", fontSize: "15px", cursor: jawaban2.trim() ? "pointer" : "not-allowed", boxShadow: jawaban2.trim() ? "0 3px 0 #a04010" : "none" }}>
                {jawaban2Saved ? "✓ Tersimpan" : "Simpan Jawaban"}
              </button>
            </div>
          </div>
          <div className="absolute" style={{ bottom: "-70px", left: "-70px", zIndex: 60 }}>
            <button onClick={goPrev}><img src="/tombol-kembali.png" alt="kembali" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" /></button>
          </div>
          <div className="absolute" style={{ bottom: "-70px", right: "-80px", zIndex: 60 }}>
            <button onClick={goNext}><img src="/tombol-next.png" alt="next" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" /></button>
          </div>
        </>
      )}

      {/* ══ HALAMAN NOTES ══ */}
      {isNotesPage && (
        <>
          <img src="/kesimpulan-bg-3.png" alt="bg" className="absolute inset-0 w-full h-full object-cover" />
          {totalNotesPage > 1 && (
            <div style={{ position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Fredoka One', cursive", fontSize: "14px", color: "rgba(90,60,20,0.6)", zIndex: 5 }}>
              {notesPageIdx + 1} / {totalNotesPage}
            </div>
          )}
          {notesSlice.map((j, i) => (
            <div key={j.id} className="note-item"
              onClick={(e) => { e.stopPropagation(); setSelectedNote(selectedNote === j.id ? null : j.id); }}
              style={{ position: "absolute", left: notePositions[i]?.left, top: notePositions[i]?.top, width: `${j.size}px`, height: `${j.size}px`, zIndex: selectedNote === j.id ? 30 : 10, cursor: "pointer", animationDelay: `${i * 0.06}s` }}
            >
              <RenderNote {...j} selected={selectedNote === j.id} />
              {selectedNote === j.id && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); handleHapusNote(j.id); }}
                    style={{ position: "absolute", top: "-12px", right: "-12px", width: "26px", height: "26px", borderRadius: "50%", background: "#e03030", color: "#fff", border: "2px solid white", fontSize: "14px", fontWeight: 700, cursor: "pointer", zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>✕</button>
                  <button onClick={(e) => { e.stopPropagation(); handleResizeNote(j.id, 20); }}
                    style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "26px", height: "26px", borderRadius: "50%", background: "#30a060", color: "#fff", border: "2px solid white", fontSize: "16px", fontWeight: 700, cursor: "pointer", zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>+</button>
                  <button onClick={(e) => { e.stopPropagation(); handleResizeNote(j.id, -20); }}
                    style={{ position: "absolute", bottom: "-12px", left: "-12px", width: "26px", height: "26px", borderRadius: "50%", background: "#3060c0", color: "#fff", border: "2px solid white", fontSize: "16px", fontWeight: 700, cursor: "pointer", zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>-</button>
                </>
              )}
            </div>
          ))}
          <div className="absolute" style={{ bottom: "-70px", left: "-70px", zIndex: 60 }}>
            <button onClick={goPrev}><img src="/tombol-kembali.png" alt="kembali" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" /></button>
          </div>
          <div className="absolute" style={{ bottom: "-70px", right: "-80px", zIndex: 60 }}>
            <button onClick={goNext}><img src="/tombol-next.png" alt="next" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" /></button>
          </div>
        </>
      )}

      {/* ══ HALAMAN EMOJI ══ */}
      {isEmojiPage && (
        <>
          <img src="/kesimpulan-bg-4.png" alt="bg" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute" style={{ bottom: "200px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "48px", alignItems: "flex-end" }}>
            {emojiData.map((em) => (
              <button key={em.id}
                onClick={() => { if (sudahKirim) return; setEmojiPilihan(em.id as EmojiPilihan); setEmojiAnimate(em.id as EmojiPilihan); setTimeout(() => setEmojiAnimate(null), 450); }}
                style={{ background: "none", border: "none", cursor: sudahKirim ? "default" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", filter: sudahKirim && emojiPilihan !== em.id ? "grayscale(0.6) opacity(0.5)" : "none", outline: "none" }}>
                <div className={emojiAnimate === em.id ? "emoji-pop" : emojiPilihan === em.id ? "emoji-idle" : ""}
                  style={{ fontSize: "72px", display: "inline-block", filter: emojiPilihan === em.id ? "drop-shadow(0 6px 16px rgba(0,0,0,0.35))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.15))", transformOrigin: "center bottom" }}>
                  {em.emoji}
                </div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 800, color: emojiPilihan === em.id ? "#e07030" : "#5a3a10", textAlign: "center", whiteSpace: "pre-line", transition: "color 0.2s ease" }}>
                  {em.label}
                </div>
              </button>
            ))}
          </div>
          {emojiPilihan && !sudahKirim && (
            <button onClick={handleKirimEmoji} disabled={mengirim}
              style={{ position: "absolute", bottom: "80px", left: "50%", transform: "translateX(-50%)", background: "#e07030", color: "#fff", border: "none", borderRadius: "24px", padding: "10px 32px", fontFamily: "'Fredoka One', cursive", fontSize: "16px", cursor: mengirim ? "wait" : "pointer", boxShadow: "0 4px 0 #a04010", zIndex: 10 }}>
              {mengirim ? "Mengirim..." : "📤 Kirim Jawabanku"}
            </button>
          )}
          {sudahKirim && (
            <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: "rgba(160,240,160,0.9)", borderRadius: "16px", padding: "10px 32px", fontFamily: "'Fredoka One', cursive", fontSize: "16px", color: "#207040", zIndex: 10 }}>
              ✅ Jawaban berhasil terkirim!
            </div>
          )}
          <div className="absolute" style={{ bottom: "-70px", left: "-70px", zIndex: 60 }}>
            <button onClick={goPrev}><img src="/tombol-kembali.png" alt="kembali" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" /></button>
          </div>
          <div className="absolute" style={{ bottom: "-70px", right: "-80px", zIndex: 60 }}>
            <Link href="/menu"><img src="/tombol-home.png" alt="home" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform" /></Link>
          </div>
        </>
      )}
    </main>
  );
}