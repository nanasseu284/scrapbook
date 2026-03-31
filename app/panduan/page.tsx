"use client";
import { useState } from "react";
import Link from "next/link";

export default function Panduan() {
  const [page, setPage] = useState(0);
  const backgrounds = ["/panduan-bg-1.png", "/panduan-bg-2.png", "/panduan-bg-3.png", "/panduan-bg-4.png"];

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <img src={backgrounds[page]} alt="background" className="absolute inset-0 w-full h-full object-cover" />

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

      {/* Tombol Next halaman 0, 1, 2 */}
      {page < 3 && (
        <div className="absolute" style={{bottom: '-50px', right: '-120px', zIndex: 30}}>
          <button onClick={() => setPage(page + 1)}>
            <img src="/tombol-next.png" alt="next" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Tombol Home Halaman 4 — di tengah */}
      {page === 3 && (
        <div className="absolute" style={{bottom: '-50px', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 20}}>
          <Link href="/menu">
            <img src="/tombol-home.png" alt="home" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </Link>
        </div>
      )}

    </main>
  );
}