"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [nama, setNama] = useState("");
  const [namaTemp, setNamaTemp] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("namaSiswa");
    if (saved) setNama(saved);
  }, []);

  const handleSimpan = () => {
    if (!namaTemp.trim()) return;
    localStorage.setItem("namaSiswa", namaTemp.trim());
    setNama(namaTemp.trim());
    setShowPopup(false);
  };

  const handleMulai = (e: React.MouseEvent) => {
    if (!nama) {
      e.preventDefault();
      setNamaTemp("");
      setShowPopup(true);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      {/* Background */}
      <Image src="/background.png" alt="background" fill className="object-cover" priority />

      {/* ── Tombol User pojok kanan atas ── */}
      <button
        onClick={() => { setNamaTemp(nama); setShowPopup(true); }}
        className="absolute z-30 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
        style={{ top: "20px", right: "24px" }}
      >
        {/* Lingkaran ikon user */}
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: "linear-gradient(135deg, #f97316, #ea580c)",
          boxShadow: "0 3px 10px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.3) inset",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "2px solid rgba(255,255,255,0.6)",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4,20 Q4,14 12,14 Q20,14 20,20" fill="white"/>
          </svg>
        </div>
        {/* Label nama kalau sudah diisi */}
        {nama && (
          <div style={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: "20px", padding: "4px 12px",
            fontFamily: "Nunito, sans-serif", fontWeight: 800,
            fontSize: "13px", color: "#7a3d00",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            maxWidth: "140px", overflow: "hidden",
            whiteSpace: "nowrap", textOverflow: "ellipsis",
          }}>
            {nama}
          </div>
        )}
      </button>

      {/* ── Tombol Mulai ── */}
      <div className="absolute inset-0 flex items-end justify-center pb-16">
        <Link href="/menu" onClick={handleMulai}>
          <Image
            src="/tombol-mulai.png"
            alt="mulai"
            width={200}
            height={80}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>
      </div>

      {/* ── Popup Input Nama ── */}
      {showPopup && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowPopup(false); }}
        >
          <div style={{
            background: "linear-gradient(145deg, #fff9f0, #fff3e0)",
            borderRadius: "24px",
            padding: "32px 28px 24px",
            width: "340px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
            border: "3px solid #f97316",
            position: "relative",
          }}>
            {/* Tombol tutup */}
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute", top: "-12px", right: "-12px",
                width: "30px", height: "30px", borderRadius: "50%",
                background: "#e03030", color: "#fff",
                border: "2px solid white", fontSize: "14px",
                fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}>✕</button>

            {/* Ikon user */}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                margin: "0 auto",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(249,115,22,0.4)",
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4,20 Q4,14 12,14 Q20,14 20,20" fill="white"/>
                </svg>
              </div>
            </div>

            {/* Judul */}
            <p style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: "20px", color: "#7a3d00",
              textAlign: "center", margin: "0 0 6px",
            }}>Halo! Siapa namamu?</p>
            <p style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "12px", color: "#a06030",
              textAlign: "center", margin: "0 0 16px",
            }}>Tulis namamu sebelum mulai belajar 😊</p>

            {/* Input nama */}
            <input
              type="text"
              value={namaTemp}
              onChange={e => setNamaTemp(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSimpan(); }}
              placeholder="Tulis namamu di sini..."
              autoFocus
              style={{
                width: "100%", padding: "12px 16px",
                borderRadius: "14px",
                border: "2px solid #f97316",
                fontFamily: "Nunito, sans-serif",
                fontSize: "15px", fontWeight: 600,
                color: "#5a3a10", outline: "none",
                background: "white",
                boxSizing: "border-box",
                boxShadow: "0 2px 8px rgba(249,115,22,0.15)",
              }}
            />

            {/* Tombol simpan */}
            <button
              onClick={handleSimpan}
              disabled={!namaTemp.trim()}
              style={{
                width: "100%", marginTop: "14px",
                padding: "12px",
                background: namaTemp.trim()
                  ? "linear-gradient(135deg, #f97316, #ea580c)"
                  : "#ccc",
                color: "#fff", border: "none",
                borderRadius: "14px",
                fontFamily: "'Fredoka One', cursive",
                fontSize: "17px",
                cursor: namaTemp.trim() ? "pointer" : "not-allowed",
                boxShadow: namaTemp.trim() ? "0 4px 0 #c2410c" : "none",
                transition: "background 0.2s",
              }}
            >
              Simpan & Mulai! 🎉
            </button>
          </div>
        </div>
      )}

    </main>
  );
}