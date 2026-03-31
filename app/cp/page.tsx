"use client";
import { useState } from "react";
import Link from "next/link";

export default function CpTp() {
  const [page, setPage] = useState(0);
  const backgrounds = ["/cp-bg.png", "/tp-bg.png"];

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      {/* Background */}
      <img
        src={backgrounds[page]}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Tombol Home Kiri - hanya halaman 1 */}
      {page === 0 && (
        <div className="absolute" style={{bottom: '-50px', left: '-120px', zIndex: 30}}>
          <Link href="/menu">
            <img src="/tombol-home.png" alt="home" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </Link>
        </div>
      )}

      {/* Tombol Next - hanya halaman 1 */}
      {page === 0 && (
        <div className="absolute" style={{bottom: '-50px', right: '-120px', zIndex: 30}}>
          <button onClick={() => setPage(1)}>
            <img src="/tombol-next.png" alt="next" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Tombol Kembali Kiri - hanya halaman 2 */}
      {page === 1 && (
        <div className="absolute" style={{bottom: '-50px', left: '-120px', zIndex: 30}}>
          <button onClick={() => setPage(0)}>
            <img src="/tombol-kembali.png" alt="kembali" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Tombol Home Kanan - hanya halaman 2 */}
      {page === 1 && (
        <div className="absolute" style={{bottom: '-50px', right: '-120px', zIndex: 30}}>
          <Link href="/menu">
            <img src="/tombol-home.png" alt="home" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </Link>
        </div>
      )}

    </main>
  );
}