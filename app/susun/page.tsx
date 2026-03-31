"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Susun() {
  const [fotoDipilih, setFotoDipilih] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("fotoDipilih");
    if (data) setFotoDipilih(JSON.parse(data));
  }, []);

  const handleSelesai = () => {
    localStorage.setItem("fotoFinal", JSON.stringify(fotoDipilih));
    router.push("/drag");
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      <img
        src="/koleksi-bg.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Grid 9 Foto */}
      <div className="absolute grid grid-cols-5 gap-8"
        style={{top: '210px', left: '190px', right: '190px'}}>
        {Array.from({length: 9}).map((_, i) => (
          <div key={i} style={{width: '160px', height: '170px'}}>
            {fotoDipilih[i] ? (
              <img
                src={fotoDipilih[i]}
                alt={`koleksi-${i + 1}`}
                style={{
                  width: '180px',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <div style={{
                width: '150px',
                height: '130px',
                backgroundColor: '#d1c4a8',
                borderRadius: '8px',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Tombol Kembali */}
      <div className="absolute" style={{bottom: '-50px', left: '-120px', zIndex: 30}}>
        <Link href="/media">
          <img src="/tombol-kembali.png" alt="kembali" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
        </Link>
      </div>

      {/* Tombol Centang */}
      <div className="absolute" style={{bottom: '-50px', right: '-120px', zIndex: 30}}>
        <button onClick={handleSelesai}>
          <img src="/tombol-next.png" alt="selesai" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
        </button>
      </div>

    </main>
  );
}