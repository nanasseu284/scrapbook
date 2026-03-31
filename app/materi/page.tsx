"use client";
import { useState } from "react";
import Link from "next/link";

// ╔══════════════════════════════════════════════════════╗
// ║           PANDUAN ATUR POSISI & UKURAN               ║
// ║  left: "50%"  → geser kiri/kanan (50% = tengah)     ║
// ║  top: "50%"   → geser atas/bawah (50% = tengah)     ║
// ║  height: "60vh" → ukuran tinggi (vh = % layar)      ║
// ║  translateX("-50%") → selalu pasangkan dengan left  ║
// ║  translateY("-50%") → selalu pasangkan dengan top   ║
// ╚══════════════════════════════════════════════════════╝

// ── HALAMAN 1 ── Amplop Realistis Full Code
function Halaman1() {
  const [amplopState, setAmplopState] = useState<0 | 1 | 2>(0);

  // ┌─────────────────────────────────────────┐
  // │  ATUR UKURAN & POSISI HALAMAN 1         │
  // └─────────────────────────────────────────┘
  const centerPosisi: React.CSSProperties = {
    position: "absolute",
    left: "43%",      // ← geser KIRI / KANAN
    top: "55%",       // ← geser ATAS / BAWAH
    transform: "translate(-50%, -50%)",
  };

  const SegelLilin = () => (
    <div style={{
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%, -20%)",
      width: "98px", height: "98px",
      borderRadius: "50%",
      background: "radial-gradient(circle at 38% 32%, #c04040, #7a1010 65%, #500808 100%)",
      boxShadow: "0 4px 12px rgba(80,10,10,0.55), inset 0 1px 3px rgba(255,180,180,0.2)",
      zIndex: 5,
    }}>
      <svg viewBox="0 0 56 56" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="28" cy="28" r="25" fill="none" stroke="rgba(255,200,180,0.25)" strokeWidth="1"/>
        {[0,60,120,180,240,300].map(deg => (
          <ellipse key={deg} cx="28" cy="17" rx="5" ry="9"
            fill="rgba(255,150,130,0.28)"
            transform={`rotate(${deg},28,28)`}/>
        ))}
        <circle cx="28" cy="28" r="5.5" fill="rgba(255,170,150,0.3)"/>
        <circle cx="28" cy="28" r="2.5" fill="rgba(255,210,190,0.45)"/>
        <ellipse cx="19" cy="37" rx="3.5" ry="6.5" fill="rgba(80,180,80,0.22)" transform="rotate(-40,19,37)"/>
        <ellipse cx="37" cy="39" rx="3" ry="5.5" fill="rgba(80,180,80,0.22)" transform="rotate(35,37,39)"/>
        <line x1="28" y1="38" x2="28" y2="46" stroke="rgba(80,160,80,0.25)" strokeWidth="1.5"/>
      </svg>
    </div>
  );

  const AmplopTutup = () => (
    <div onClick={() => setAmplopState(1)} style={{ ...centerPosisi, width: "320px", height: "220px", cursor: "pointer", userSelect: "none", filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.28))", animation: "amplopPopIn 0.35s cubic-bezier(0.34,1.2,0.64,1)" }}>
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(155deg,#ecdbb8 0%,#ddc898 40%,#ccb57a 100%)", borderRadius: "4px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 0, height: 0, borderBottom: "110px solid #c9a96a", borderRight: "160px solid transparent", zIndex: 1 }}/>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 0, height: 0, borderBottom: "110px solid #bb9a5e", borderLeft: "160px solid transparent", zIndex: 1 }}/>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 0, borderLeft: "160px solid transparent", borderRight: "160px solid transparent", borderTop: "110px solid #c2a265", zIndex: 2 }}/>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 0, borderLeft: "160px solid transparent", borderRight: "160px solid transparent", borderTop: "110px solid rgba(80,50,10,0.09)", zIndex: 3, filter: "blur(2px)" }}/>
        <SegelLilin />
      </div>
    </div>
  );

  const AmplopBuka = () => (
    <div onClick={() => setAmplopState(2)} style={{ ...centerPosisi, width: "320px", cursor: "pointer", userSelect: "none", filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.28))", animation: "amplopPopIn 0.35s cubic-bezier(0.34,1.2,0.64,1)" }}>
      <div style={{ width: "256px", height: "88px", margin: "0 auto", marginBottom: "-2px", background: "linear-gradient(160deg,#fffde8 0%,#fff9c0 100%)", borderRadius: "3px 3px 0 0", boxShadow: "0 -4px 12px rgba(0,0,0,0.08)", position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {[26,44,60,74].map(t => <div key={t} style={{ position: "absolute", left: "16px", right: "16px", top: `${t}px`, height: "1px", background: "rgba(100,150,220,0.18)" }}/>)}
        <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: "15px", color: "#2090e0", opacity: 0.6, letterSpacing: "0.5px" }}>Teks narasi</span>
      </div>
      <div style={{ width: "100%", height: "200px", background: "linear-gradient(155deg,#ecdbb8 0%,#ddc898 40%,#ccb57a 100%)", borderRadius: "0 0 4px 4px", position: "relative", overflow: "hidden", zIndex: 3 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 0, borderLeft: "160px solid transparent", borderRight: "160px solid transparent", borderBottom: "100px solid #c2a265", zIndex: 3 }}/>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 0, height: 0, borderBottom: "110px solid #c9a96a", borderRight: "160px solid transparent", zIndex: 1 }}/>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 0, height: 0, borderBottom: "110px solid #bb9a5e", borderLeft: "160px solid transparent", zIndex: 1 }}/>
      </div>
    </div>
  );

  const KertasKuning = () => (
    <div onClick={() => setAmplopState(0)} style={{ ...centerPosisi, width: "248px", cursor: "pointer", userSelect: "none", animation: "kertasSlideUp 0.4s cubic-bezier(0.34,1.2,0.64,1)" }}>
      <div style={{ background: "linear-gradient(160deg,#fffde8 0%,#fff9c0 60%,#f5ec90 100%)", borderRadius: "6px", padding: "24px 22px 20px", boxShadow: "3px 6px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)", position: "relative", transform: "rotate(-1.5deg)" }}>
        {[62,82,102,122,142,162].map(t => <div key={t} style={{ position: "absolute", left: "18px", right: "18px", top: `${t}px`, height: "1px", background: "rgba(100,150,220,0.18)" }}/>)}
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "22px", color: "#1888d8", textAlign: "center", marginBottom: "14px", textShadow: "0 1px 0 rgba(255,255,255,0.9)" }}>Teks narasi</div>
        <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: "#4a3a10", lineHeight: 1.75, textAlign: "center", margin: 0 }}>
          Sebuah teks yang menceritakan serangkaian peristiwa secara berurutan dalam kurun waktu tertentu.
        </p>
        <div style={{ textAlign: "center", marginTop: "16px", fontFamily: "Nunito, sans-serif", fontSize: "9px", color: "rgba(0,0,0,0.22)" }}>klik untuk tutup</div>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0">
      <style>{`
        @keyframes amplopPopIn { from { transform: translate(-50%,-50%) scale(0.88); opacity:0; } to { transform: translate(-50%,-50%) scale(1); opacity:1; } }
        @keyframes kertasSlideUp { from { transform: translate(-50%,-35%) scale(0.92); opacity:0; } to { transform: translate(-50%,-50%) scale(1); opacity:1; } }
      `}</style>
      {amplopState === 0 && <AmplopTutup />}
      {amplopState === 1 && <AmplopBuka />}
      {amplopState === 2 && <KertasKuning />}
    </div>
  );
}

// ── HALAMAN 2 ── 5 Sticky Note Cards
function Halaman2() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // ┌─────────────────────────────────────────┐
  // │  ATUR UKURAN & POSISI HALAMAN 2         │
  // └─────────────────────────────────────────┘
  const wrapperPosisi: React.CSSProperties = {
    position: "absolute",
    left: "42%",      // ← geser KIRI / KANAN
    top: "70%",       // ← geser ATAS / BAWAH
    transform: "translate(-50%, -50%)",
    width: "560px",   // ← LEBAR area kartu
  };

  // ┌──────────────────────────────────────────────────────────────────┐
  // │  DATA KARTU — edit teks, gambar, & tinggi gambar di sini        │
  // │  tinggi: "90px"  → ubah angka untuk perbesar/perkecil per foto  │
  // └──────────────────────────────────────────────────────────────────┘
  const kartuData = [
    {
      id: "tema", label: "Tema",
      warna: "#ffb3c6", warnaJudul: "#c060a0",
      teks: "Tema adalah ide utama yang menjadi dasar sebuah cerita.",
      gambar: [
        { src: "/img-kisah-persahabatan.png", label: "Kisah Persahabatan", tinggi: "90px" },  // ← ubah tinggi
        { src: "/img-pengalaman-liburan.png", label: "Pengalaman Liburan", tinggi: "150px" },  // ← ubah tinggi
      ],
    },
    {
      id: "tokoh", label: "Tokoh & Watak",
      warna: "#ffd6a5", warnaJudul: "#d07020",
      teks: "Tokoh adalah pelaku dalam cerita sedangkan watak adalah sifat yang dimiliki tokoh.",
      gambar: [
        { src: "/img-aldi.png",  label: "Aldi - Baik & Ceria", tinggi: "150px" },  // ← ubah tinggi
        { src: "/img-citra.png", label: "Citra - Sombong",     tinggi: "150px" },  // ← ubah tinggi
      ],
    },
    {
      id: "latar", label: "Latar",
      warna: "#c8b4f0", warnaJudul: "#7040c0",
      teks: "Latar adalah keterangan tentang tempat, waktu, dan suasana cerita.",
      gambar: [
        { src: "/img-latar-sekolah.png", label: "Tempat: Di Sekolah", tinggi: "90px" },  // ← ubah tinggi
        { src: "/img-latar-malam.png",   label: "Waktu: Malam Hari",  tinggi: "90px" },  // ← ubah tinggi
        { src: "/img-latar-ramai.png",   label: "Suasana: Ramai",     tinggi: "90px" },  // ← ubah tinggi
      ],
    },
    {
      id: "alur", label: "Alur",
      warna: "#a8d8f0", warnaJudul: "#2080c0",
      teks: "Alur adalah jalan cerita dari sebuah peristiwa.",
      gambar: [
        { src: "/img-alur-maju.png",   label: "Alur Maju",   tinggi: "90px" },  // ← ubah tinggi
        { src: "/img-alur-mundur.png", label: "Alur Mundur", tinggi: "90px" },  // ← ubah tinggi
      ],
    },
    {
      id: "amanat", label: "Amanat",
      warna: "#b8f0c8", warnaJudul: "#30a060",
      teks: "Amanat adalah sebuah pesan moral yang hendak disampaikan oleh penulis kepada pembaca melalui cerita karangannya.",
      gambar: [],
    },
  ];

  const active = activeCard ? kartuData.find(k => k.id === activeCard) : null;
  const rotations = [-2, 1.5, -1, 2, -1.5];

  return (
    <div className="absolute inset-0">
      {!active && (
        <div style={{ ...wrapperPosisi, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, auto)", gap: "16px", padding: "8px", justifyItems: "center" }}>
          {kartuData.map((kartu, i) => (
            <div key={kartu.id} onClick={() => setActiveCard(kartu.id)}
              style={{ gridColumn: i < 3 ? `${i+1}` : i === 3 ? "1" : "3", gridRow: i < 3 ? "1" : "2", width: "155px", height: "130px", background: kartu.warna, borderRadius: "4px", boxShadow: "2px 4px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.6)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${rotations[i]}deg)`, transition: "transform 0.2s ease", userSelect: "none", position: "relative" }}
              className="hover:scale-105 hover:z-10"
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(180deg,rgba(0,0,0,0.08),transparent)", borderRadius: "4px 4px 0 0" }}/>
              <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: "18px", color: "rgba(0,0,0,0.55)", textAlign: "center", padding: "0 12px", lineHeight: 1.3 }}>{kartu.label}</span>
            </div>
          ))}
        </div>
      )}

      {active && (
        <div style={{ ...wrapperPosisi, top: "50%", transform: "translate(-50%,-50%)" }} onClick={() => setActiveCard(null)}>
          <div style={{ background: active.warna, borderRadius: "6px", boxShadow: "4px 6px 20px rgba(0,0,0,0.2)", padding: "20px 22px 18px", width: "240px", margin: "0 auto", cursor: "pointer", position: "relative", animation: "stickyPopIn 0.25s cubic-bezier(0.34,1.4,0.64,1)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "linear-gradient(180deg,rgba(0,0,0,0.1),transparent)", borderRadius: "6px 6px 0 0" }}/>
            <div style={{ background: active.warnaJudul, color: "#fff", fontFamily: "'Fredoka One', cursive", fontSize: "18px", textAlign: "center", borderRadius: "20px", padding: "6px 20px", marginBottom: "12px", boxShadow: "0 3px 0 rgba(0,0,0,0.15)" }}>{active.label}</div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#333", textAlign: "center", lineHeight: 1.55, fontFamily: "Nunito, sans-serif", marginBottom: active.gambar.length > 0 ? "10px" : "0" }}>{active.teks}</p>
            {active.gambar.length > 0 && <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, color: "#e06020", marginBottom: "8px" }}>Contoh :</div>}
            {active.gambar.map((g) => (
              <div key={g.src} style={{ marginBottom: "8px" }}>
                <div style={{
                  width: "100%",
                  height: g.tinggi,   // ← pakai tinggi per gambar
                  borderRadius: "8px", overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}>
                  <img src={g.src} alt={g.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "9px", fontWeight: 700, color: "#555", textAlign: "center", marginTop: "2px" }}>{g.label}</div>
              </div>
            ))}
            <div style={{ textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: "9px", color: "rgba(0,0,0,0.3)", marginTop: "6px" }}>klik untuk tutup</div>
          </div>
        </div>
      )}
      <style>{`@keyframes stickyPopIn { from { transform:scale(0.85); opacity:0; } to { transform:scale(1); opacity:1; } }`}</style>
    </div>
  );
}

// ── HALAMAN 3 ── Kartu Lonjong + Note Popup
function Halaman3() {
  const [step, setStep] = useState(0);
  const [activeNote, setActiveNote] = useState<null | "kotak1" | "kotak2" | "kotak3">(null);

  // ┌─────────────────────────────────────────┐
  // │  ATUR UKURAN & POSISI HALAMAN 3         │
  // └─────────────────────────────────────────┘
  const kartuStyle: React.CSSProperties = {
    position: "absolute",
    left: "68%",      // ← geser KIRI / KANAN
    top: "50%",       // ← geser ATAS / BAWAH
    transform: "translate(-50%, -50%)",
    width: "250px",   // ← LEBAR kartu lonjong
    height: "450px",  // ← TINGGI kartu lonjong
  };

  const boxes = [
    { id: 1, key: "kotak1" as const, label: "ORIENTASI",  bottom: 180, upY: -180, bg: "linear-gradient(160deg,#faf6f0 60%,#ede4d8 100%)" },
    { id: 2, key: "kotak2" as const, label: "KOMPLIKASI", bottom: 75,  upY: -120, bg: "linear-gradient(160deg,#c8a06a 60%,#b08050 100%)" },
    { id: 3, key: "kotak3" as const, label: "RESOLUSI",   bottom: 0,   upY: -80,  bg: "linear-gradient(160deg,#e8d89a 60%,#d4c070 100%)" },
  ];

  // ┌─────────────────────────────────────────────────────┐
  // │  ATUR ISI NOTE HALAMAN 3 — ganti teks di sini!     │
  // └─────────────────────────────────────────────────────┘
  const notes = {
    kotak1: { judul: "Orientasi", judulBg: "#d060a0", noteBg: "linear-gradient(145deg,#fff9d6,#fff0a0)", border: "#f0d060", teks: "Bagian awal cerita yang biasanya berisi pengenalan tokoh, latar tempat, waktu, dan situasi." },
    kotak2: { judul: "Komplikasi", judulBg: "linear-gradient(90deg,#60a0e0,#4080c0)", noteBg: "linear-gradient(145deg,#f5e8d0,#e8d0a8)", border: "#d0a870", teks: "Bagian cerita yang letaknya berada di pertengahan cerita di mana biasanya muncul sebuah permasalahan yang dialami oleh tokoh." },
    kotak3: { judul: "Resolusi", judulBg: "linear-gradient(90deg,#e08030,#c06010)", noteBg: "linear-gradient(145deg,#ffffff,#f0ece4)", border: "#d8d0c0", teks: "Bagian akhir cerita yang menceritakan akhir dari sebuah perjalanan cerita, solusi dari sebuah permasalahan, atau penyelesaian cerita." },
  };

  const note = activeNote ? notes[activeNote] : null;

  return (
    <div className="absolute inset-0">
      <div style={{ ...kartuStyle, background: "#f0e8d8", borderRadius: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "20px 16px 22px", boxShadow: "0 6px 24px rgba(160,100,50,0.18), inset 0 2px 8px rgba(255,255,255,0.55)", userSelect: "none" }}>
        <div style={{ width: "100%", flex: 1, position: "relative", overflow: "visible" }}>
          {boxes.map((box, i) => (
            <div key={box.id} onClick={() => step > i && setActiveNote(box.key)}
              style={{ position: "absolute", width: "100%", height: i === 0 ? "175px" : i === 1 ? "88px" : "68px", borderRadius: "18px", bottom: `${box.bottom}px`, zIndex: 3-i, background: box.bg, border: "2px solid rgba(255,255,255,0.8)", boxShadow: "0 2px 10px rgba(160,100,50,0.12)", transform: step > i ? `translateY(${box.upY}px)` : "translateY(0)", transition: "transform 0.5s cubic-bezier(0.34,1.4,0.64,1)", cursor: step > i ? "pointer" : "default", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "6px" }}>
              <span style={{ fontSize: "9px", fontWeight: 800, opacity: 0.4, color: "#5a3e20", letterSpacing: "0.5px" }}>{box.label}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { if (step < 3) setStep(step+1); else setStep(0); }}
          style={{ marginTop: "12px", background: "#c07b3a", color: "#fff", fontFamily: "'Fredoka One', cursive", fontSize: "12px", border: "none", borderRadius: "20px", padding: "5px 14px", cursor: "pointer", boxShadow: "0 3px 0px #8a5522", position: "relative", zIndex: 10 }}>
          {step === 0 ? "Klik disini!" : step < 3 ? "Buka lagi →" : "Reset ↩"}
        </button>
      </div>
      {note && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 20, background: "rgba(0,0,0,0.15)" }} onClick={() => setActiveNote(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "300px", borderRadius: "20px", padding: "20px 22px", background: note.noteBg, border: `2px solid ${note.border}`, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", position: "relative", transform: "rotate(-1deg)", animation: "notePopIn 0.3s cubic-bezier(0.34,1.4,0.64,1)" }}>
            <button onClick={() => setActiveNote(null)} style={{ position: "absolute", top: "-10px", right: "-10px", width: "28px", height: "28px", borderRadius: "50%", background: "#c04040", color: "#fff", border: "none", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>✕</button>
            <div style={{ display: "inline-block", background: note.judulBg, color: "#fff", fontFamily: "'Fredoka One', cursive", fontSize: "16px", borderRadius: "20px", padding: "4px 18px", marginBottom: "10px" }}>{note.judul}</div>
            <p style={{ fontSize: "11.5px", lineHeight: 1.65, color: "#3a2a10", fontWeight: 600, fontFamily: "Nunito, sans-serif", textAlign: "justify" }}>{note.teks}</p>
          </div>
        </div>
      )}
      <style>{`@keyframes notePopIn { from { transform:scale(0.8) rotate(-1deg); opacity:0; } to { transform:scale(1) rotate(-1deg); opacity:1; } }`}</style>
    </div>
  );
}

// ── HALAMAN 4 ── Kartu Lonjong + Note Popup (Contoh Teks)
function Halaman4() {
  const [step, setStep] = useState(0);
  const [activeNote, setActiveNote] = useState<null | "orientasi" | "komplikasi" | "resolusi">(null);

  // ┌─────────────────────────────────────────┐
  // │  ATUR UKURAN & POSISI HALAMAN 4         │
  // └─────────────────────────────────────────┘
  const kartuStyle: React.CSSProperties = {
    position: "absolute",
    left: "39%",      // ← geser KIRI / KANAN
    top: "60%",       // ← geser ATAS / BAWAH
    transform: "translate(-50%, -50%)",
    width: "200px",   // ← LEBAR kartu lonjong
    height: "420px",  // ← TINGGI kartu lonjong
  };

  const boxes = [
    { id: 1, key: "orientasi"  as const, label: "ORIENTASI",  bottom: 165, upY: -180, bg: "linear-gradient(160deg,#faf6f0 60%,#ede4d8 100%)" },
    { id: 2, key: "komplikasi" as const, label: "KOMPLIKASI", bottom: 75,  upY: -120, bg: "linear-gradient(160deg,#c8a06a 60%,#b08050 100%)" },
    { id: 3, key: "resolusi"   as const, label: "RESOLUSI",   bottom: 0,   upY: -80,  bg: "linear-gradient(160deg,#e8d89a 60%,#d4c070 100%)" },
  ];

  const notes = {
    orientasi: { judul: "Orientasi", judulBg: "#d060a0", noteBg: "linear-gradient(145deg,#fff9d6,#fff0a0)", border: "#f0d060", teks: "Pagi itu, suasana sekolah terasa berbeda dari biasanya. Spanduk warna-warni terpasang di sepanjang koridor dan lapangan sekolah tampak dihias dengan indah. Dina berdiri di depan kelasnya dengan jantung berdegup kencang. Hari ini adalah hari pelaksanaan lomba menyiapkan antarkelas yang sudah ia persiapkan selama dua minggu." },
    komplikasi: { judul: "Komplikasi", judulBg: "linear-gradient(90deg,#60a0e0,#4080c0)", noteBg: "linear-gradient(145deg,#f5e8d0,#e8d0a8)", border: "#d0a870", teks: "Ketika nama Dina dipanggil oleh panitia, ia melangkah maju ke atas panggung dengan gemetar. Namun, tepat saat musik pengiring mulai dimainkan, suara Dina tiba-tiba tercekat. Ia lupa lirik lagu yang sudah berkali-kali ia hafalkan. Wajahnya memerah dan tangannya berkeringat dingin." },
    resolusi: { judul: "Resolusi", judulBg: "linear-gradient(90deg,#e08030,#c06010)", noteBg: "linear-gradient(145deg,#ffffff,#f0ece4)", border: "#d8d0c0", teks: "Di tengah kepanikkannya, Dina mendengar suara teman-temannya yang bersorak dari barisan penonton. \"Ayo Dina, kamu pasti bisa!\" Semangat itu membuat Dina menarik napas dalam-dalam. Perlahan, ia mulai mengingat kembali lirik lagunya dan bernyanyi dengan sepenuh hati." },
  };

  const note = activeNote ? notes[activeNote] : null;

  return (
    <div className="absolute inset-0">
      <div style={{ ...kartuStyle, background: "#f0e8d8", borderRadius: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "20px 16px 22px", boxShadow: "0 6px 24px rgba(160,100,50,0.18), inset 0 2px 8px rgba(255,255,255,0.55)", userSelect: "none" }}>
        <div style={{ width: "100%", flex: 1, position: "relative", overflow: "visible" }}>
          {boxes.map((box, i) => (
            <div key={box.id} onClick={() => step > i && setActiveNote(box.key)}
              style={{ position: "absolute", width: "100%", height: i === 0 ? "175px" : i === 1 ? "88px" : "68px", borderRadius: "18px", bottom: `${box.bottom}px`, zIndex: 3-i, background: box.bg, border: "2px solid rgba(255,255,255,0.8)", boxShadow: "0 2px 10px rgba(160,100,50,0.12)", transform: step > i ? `translateY(${box.upY}px)` : "translateY(0)", transition: "transform 0.5s cubic-bezier(0.34,1.4,0.64,1)", cursor: step > i ? "pointer" : "default", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "6px" }}>
              <span style={{ fontSize: "9px", fontWeight: 800, opacity: 0.4, color: "#5a3e20", letterSpacing: "0.5px" }}>{box.label}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { if (step < 3) setStep(step+1); else setStep(0); }}
          style={{ marginTop: "12px", background: "#c07b3a", color: "#fff", fontFamily: "'Fredoka One', cursive", fontSize: "12px", border: "none", borderRadius: "20px", padding: "5px 14px", cursor: "pointer", boxShadow: "0 3px 0px #8a5522", position: "relative", zIndex: 10 }}>
          {step === 0 ? "Klik disini!" : step < 3 ? "Buka lagi →" : "Reset ↩"}
        </button>
      </div>
      {note && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 20, background: "rgba(0,0,0,0.15)" }} onClick={() => setActiveNote(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "300px", borderRadius: "20px", padding: "20px 22px", background: note.noteBg, border: `2px solid ${note.border}`, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", position: "relative", transform: "rotate(-1deg)", animation: "notePopIn 0.3s cubic-bezier(0.34,1.4,0.64,1)" }}>
            <button onClick={() => setActiveNote(null)} style={{ position: "absolute", top: "-10px", right: "-10px", width: "28px", height: "28px", borderRadius: "50%", background: "#c04040", color: "#fff", border: "none", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>✕</button>
            <div style={{ display: "inline-block", background: note.judulBg, color: "#fff", fontFamily: "'Fredoka One', cursive", fontSize: "16px", borderRadius: "20px", padding: "4px 18px", marginBottom: "10px" }}>{note.judul}</div>
            <p style={{ fontSize: "11.5px", lineHeight: 1.65, color: "#3a2a10", fontWeight: 600, fontFamily: "Nunito, sans-serif", textAlign: "justify" }}>{note.teks}</p>
          </div>
        </div>
      )}
      <style>{`@keyframes notePopIn { from { transform:scale(0.8) rotate(-1deg); opacity:0; } to { transform:scale(1) rotate(-1deg); opacity:1; } }`}</style>
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function Materi() {
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);
  const [displayPage, setDisplayPage] = useState(0);

  const backgrounds = ["/materi-bg-1.png", "/materi-bg-2.png", "/materi-bg-3.png", "/materi-bg-4.png"];
  const pageComponents = [<Halaman1 key="h1"/>, <Halaman2 key="h2"/>, <Halaman3 key="h3"/>, <Halaman4 key="h4"/>];

  const goTo = (nextPage: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => { setDisplayPage(nextPage); setPage(nextPage); }, 350);
    setTimeout(() => setFading(false), 700);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <style>{`
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeOut { from { opacity:1; } to { opacity:0; } }
        .page-fade-out { animation: fadeOut 0.35s ease forwards; }
        .page-fade-in  { animation: fadeIn  0.35s ease forwards; }
      `}</style>
      <div className={`absolute inset-0 ${fading ? "page-fade-out" : "page-fade-in"}`}>
        <img src={backgrounds[displayPage]} alt="background" className="absolute inset-0 w-full h-full object-cover"/>
        {pageComponents[displayPage]}
      </div>
      <div className="absolute" style={{ bottom: "-50px", left: "-120px", zIndex: 30 }}>
        {page === 0 ? (
          <Link href="/menu"><img src="/tombol-home.png" alt="home" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform"/></Link>
        ) : (
          <button onClick={() => goTo(page-1)}><img src="/tombol-kembali.png" alt="kembali" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform"/></button>
        )}
      </div>
      <div className="absolute" style={{ bottom: "-50px", right: "-120px", zIndex: 30 }}>
        {page < 3 ? (
          <button onClick={() => goTo(page+1)}><img src="/tombol-next.png" alt="next" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform"/></button>
        ) : (
          <Link href="/menu"><img src="/tombol-home.png" alt="home" style={{ width: "400px" }} className="cursor-pointer hover:scale-110 transition-transform"/></Link>
        )}
      </div>
    </main>
  );
}