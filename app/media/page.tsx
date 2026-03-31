"use client";
import { useState } from "react";
import Link from "next/link";

const semuaFoto = [
  "/foto-1.png", "/foto-2.png", "/foto-3.png",
  "/foto-4.png", "/foto-5.png", "/foto-6.png",
  "/foto-7.png", "/foto-8.png", "/foto-9.png",
  "/foto-10.png", "/foto-11.png", "/foto-12.png",
];

const halamanFoto = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
];

export default function Media() {
  const [page, setPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("halamanGaleri");
      if (saved) {
        localStorage.removeItem("halamanGaleri");
        return parseInt(saved);
      }
    }
    return 0;
  });

  const [dipilih, setDipilih] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("fotoDipilih");
      if (saved) {
        const fotoUrls: string[] = JSON.parse(saved);
        return fotoUrls.map((url) => semuaFoto.indexOf(url)).filter((i) => i !== -1);
      }
    }
    return [];
  });

  const [tersimpan, setTersimpan] = useState(false);

  const togglePilih = (index: number) => {
    if (dipilih.includes(index)) {
      setDipilih(dipilih.filter((i) => i !== index));
    } else {
      if (dipilih.length >= 9) return;
      setDipilih([...dipilih, index]);
    }
    setTersimpan(false);
  };

  const handlePilihGambar = () => {
    localStorage.setItem("fotoDipilih", JSON.stringify(dipilih.map((i) => semuaFoto[i])));
    setTersimpan(true);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      <img
        src="/galeri-bg.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Grid Foto */}
      <div className="absolute flex items-center justify-center gap-8"
        style={{top: '300px', left: '140px', right: '140px'}}>
        {halamanFoto[page].map((fotoIndex) => (
          <div
            key={fotoIndex}
            className="relative cursor-pointer"
            style={{width: '240px', height: '240px'}}
            onClick={() => togglePilih(fotoIndex)}
          >
            <img
              src={semuaFoto[fotoIndex]}
              alt={`foto-${fotoIndex + 1}`}
              style={{
                width: '240px',
                height: '240px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: dipilih.includes(fotoIndex) ? '5px solid #22c55e' : '5px solid transparent'
              }}
            />
            {dipilih.includes(fotoIndex) && (
              <div className="absolute top-2 right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Notifikasi tersimpan */}
      {tersimpan && (
        <div className="absolute top-4 left-0 right-0 flex justify-center" style={{zIndex: 40}}>
          <div className="bg-green-500 text-white px-6 py-2 rounded-full font-bold text-lg">
            ✓ Gambar berhasil disimpan!
          </div>
        </div>
      )}

      {/* Info jumlah dipilih */}
      <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2" style={{zIndex: 30}}>
        <span className="font-bold text-gray-700">{dipilih.length}/9 dipilih</span>
      </div>

      {/* Tombol Pilih Gambar */}
      <div className="absolute left-0 right-0 flex justify-center" style={{bottom: '-100px', zIndex: 30}}>
        <button onClick={handlePilihGambar}>
          <img src="/tombol-pilih.png" alt="pilih" style={{width: '600px'}} className="cursor-pointer hover:scale-105 transition-transform" />
        </button>
      </div>

      {/* Tombol Kiri */}
      <div className="absolute" style={{bottom: '-50px', left: '-120px', zIndex: 30}}>
        {page === 0 ? (
          <Link href="/menu">
            <img src="/tombol-home.png" alt="home" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </Link>
        ) : (
          <button onClick={() => setPage(page - 1)}>
            <img src="/tombol-kembali.png" alt="kembali" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* Tombol Next halaman 1-3 */}
      {page < 3 && (
        <div className="absolute" style={{bottom: '-50px', right: '-120px', zIndex: 30}}>
          <button onClick={() => setPage(page + 1)}>
            <img src="/tombol-next.png" alt="next" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Tombol Next ke halaman susun - halaman 4 */}
      {page === 3 && (
        <div className="absolute" style={{bottom: '-50px', right: '-120px', zIndex: 30}}>
          <Link href="/susun">
            <img src="/tombol-next.png" alt="next" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </Link>
        </div>
      )}

    </main>
  );
}