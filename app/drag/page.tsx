"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const halamanDrag = [
  { bg: "/drag-bg-1.png" },
  { bg: "/drag-bg-2.png" },
  { bg: "/drag-bg-3.png" },
];

const labelHalaman = [
  "Orientasi (Awal Cerita)",
  "Komplikasi (Masalah)",
  "Resolusi (Penyelesaian)",
];

export default function Drag() {
  const [page, setPage] = useState(0);
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const [fotoDipilih, setFotoDipilih] = useState<string[]>([]);
  const [bingkai, setBingkai] = useState<(string | null)[][]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("bingkaiDrag");
      if (saved) return JSON.parse(saved);
    }
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  });
  const [dragFoto, setDragFoto] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [alasan, setAlasan] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("alasanUrutan");
      if (saved) return JSON.parse(saved);
    }
    return ["", "", ""];
  });
  const [alasanTemp, setAlasanTemp] = useState("");

  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("fotoDipilih");
    if (data) setFotoDipilih(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("bingkaiDrag", JSON.stringify(bingkai));
  }, [bingkai]);

  useEffect(() => {
    localStorage.setItem("alasanUrutan", JSON.stringify(alasan));
  }, [alasan]);

  const fotoDipakai = bingkai.flat().filter((f) => f !== null) as string[];
  const fotoTersedia = fotoDipilih.filter((f) => !fotoDipakai.includes(f));

  const handleDrop = (pageIdx: number, slotIdx: number) => {
    if (!dragFoto) return;
    const newBingkai = bingkai.map((b) => [...b]);
    newBingkai[pageIdx][slotIdx] = dragFoto;
    setBingkai(newBingkai);
    setDragFoto(null);
  };

  const handleHapusBingkai = (pageIdx: number, slotIdx: number) => {
    const newBingkai = bingkai.map((b) => [...b]);
    newBingkai[pageIdx][slotIdx] = null;
    setBingkai(newBingkai);
  };

  const handleSelesai = () => {
    localStorage.setItem("bingkaiFinal", JSON.stringify(bingkai));
    router.push("/konsep"); // ← DIUBAH: dari /buku ke /konsep
  };

  const handleBukaModal = () => {
    setAlasanTemp(alasan[page]);
    setModalOpen(true);
  };

  const handleSimpanAlasan = () => {
    const newAlasan = [...alasan];
    newAlasan[page] = alasanTemp;
    setAlasan(newAlasan);
    setModalOpen(false);
  };

  const handleKirimJawaban = async () => {
    const namaSiswa = localStorage.getItem("namaSiswa") || "Anonim";
    const SHEETS_URL = "https://script.google.com/macros/s/AKfycbzPn2KoZNyN1o775LlRzkGTKIJVMLYAWWUXniAma3tdd8bJe9KW0FP0s7YNQ3NHgJ0ang/exec";
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namaSiswa,
          orientasi: alasan[0],
          komplikasi: alasan[1],
          resolusi: alasan[2],
        }),
      });
      alert("✅ Jawaban berhasil dikirim!");
    } catch (err) {
      alert("❌ Gagal mengirim jawaban. Coba lagi.");
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      {/* Background */}
      <img
        src={halamanDrag[page].bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Toolbar Foto - slide dari kiri */}
      <div
        className="absolute top-0 z-20 flex flex-col items-center gap-3 overflow-y-auto"
        style={{
          width: '160px',
          height: '100vh',
          background: 'rgba(139, 90, 43, 0.9)',
          borderRadius: '0 12px 12px 0',
          left: toolbarOpen ? '0px' : '-160px',
          transition: 'left 0.3s ease',
          paddingTop: '80px',
          paddingBottom: '150px',
          boxSizing: 'border-box',
        }}
      >
        {fotoTersedia.map((foto, i) => (
          <img
            key={i}
            src={foto}
            alt={`foto-${i}`}
            draggable
            onDragStart={() => setDragFoto(foto)}
            style={{
              width: '130px',
              height: '130px',
              objectFit: 'cover',
              borderRadius: '8px',
              cursor: 'grab',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Tombol Toolbar */}
      <div
        className="absolute z-50"
        style={{
          top: '-60px',
          left: toolbarOpen ? '168px' : '-150px',
          transition: 'left 0.3s ease',
        }}
      >
        <button onClick={() => setToolbarOpen(!toolbarOpen)}>
          <img src="/tombol-toolbar.png" alt="toolbar" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Tombol Tanda Tanya */}
      <button
        onClick={handleBukaModal}
        className="absolute z-50 cursor-pointer hover:scale-110 transition-transform"
        style={{ top: '12px', right: '20px' }}
      >
        <img
          src="/tombol-tanya.png"
          alt="tanda tanya"
          style={{ width: '400px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}
        />
      </button>

      {/* Bingkai 3 Slot */}
      <div className="absolute flex gap-6 items-center justify-center"
        style={{top: '200px', left: '50px', right: '50px', bottom: '30px'}}>
        {[0, 1, 2].map((slotIdx) => (
          <div
            key={slotIdx}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(page, slotIdx)}
            style={{
              width: '250px',
              height: '250px',
              backgroundColor: bingkai[page][slotIdx] ? 'transparent' : '#e8e0d0',
              borderRadius: '8px',
              border: '3px dashed #aaa',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {bingkai[page][slotIdx] ? (
              <>
                <img
                  src={bingkai[page][slotIdx]!}
                  alt="terpilih"
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
                <button
                  onClick={() => handleHapusBingkai(page, slotIdx)}
                  style={{
                    position: 'absolute', top: '6px', right: '6px',
                    width: '28px', height: '28px', borderRadius: '50%',
                    backgroundColor: 'red', color: 'white', fontWeight: 'bold',
                    fontSize: '16px', border: 'none', cursor: 'pointer', zIndex: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >✕</button>
              </>
            ) : null}
          </div>
        ))}
      </div>

      {/* Tombol Kembali */}
      <div className="absolute" style={{bottom: '-70px', left: '-1px', zIndex: 30}}>
        {page === 0 ? (
          <Link href="/susun">
            <img src="/tombol-kembali.png" alt="kembali" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </Link>
        ) : (
          <button onClick={() => setPage(page - 1)}>
            <img src="/tombol-kembali.png" alt="kembali" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* Tombol Next / Selesai */}
      <div className="absolute" style={{bottom: '-70px', right: '-80px', zIndex: 30}}>
        {page < 2 ? (
          <button onClick={() => setPage(page + 1)}>
            <img src="/tombol-next.png" alt="next" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </button>
        ) : (
          <button onClick={handleSelesai}>
            <img src="/tombol-next.png" alt="selesai" style={{width: '400px'}} className="cursor-pointer hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* Modal Alasan */}
      {modalOpen && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div
            style={{
              backgroundColor: '#F97316', borderRadius: '20px',
              padding: '28px 24px 24px', width: '360px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            }}
          >
            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', textAlign: 'center', margin: 0, lineHeight: '1.5' }}>
              Mengapa kamu memilih untuk menyusun gambar-gambar seperti itu?
            </p>
            <textarea
              value={alasanTemp}
              onChange={(e) => setAlasanTemp(e.target.value)}
              placeholder="Tulis alasanmu disini"
              style={{
                width: '100%', height: '120px', borderRadius: '12px',
                border: 'none', padding: '12px 14px', fontSize: '14px',
                resize: 'none', outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit', color: '#555', backgroundColor: '#ffffff',
              }}
            />
            <button
              onClick={handleSimpanAlasan}
              style={{ backgroundColor: '#22C55E', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', borderRadius: '12px', padding: '12px', cursor: 'pointer', width: '100%' }}
            >
              Simpan Jawaban
            </button>
            <button
              onClick={handleKirimJawaban}
              style={{ backgroundColor: '#1D4ED8', color: 'white', fontWeight: 'bold', fontSize: '14px', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', width: '100%' }}
            >
              📤 Kirim Semua Jawaban
            </button>
          </div>
        </div>
      )}

    </main>
  );
}