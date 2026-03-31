"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const semuaStiker = Array.from({length: 24}, (_, i) => `/stiker-${i + 1}.png`);

export default function Buku() {
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const [bingkaiFinal, setBingkaiFinal] = useState<(string | null)[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [stikerPerHalaman, setStikerPerHalaman] = useState<{src: string, x: number, y: number, id: number, size: number}[][]>([[], []]);
  const [dragStiker, setDragStiker] = useState<string | null>(null);
  const [selectedStiker, setSelectedStiker] = useState<number | null>(null);
  const [draggingStikerId, setDraggingStikerId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<'next' | 'prev'>('next');
  const bukuRef = useRef<HTMLDivElement>(null);
  const toolbarScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("bingkaiFinal");
    if (data) setBingkaiFinal(JSON.parse(data));
  }, []);

  const stikerList = stikerPerHalaman[page] || [];

  const updateStiker = (newList: typeof stikerList) => {
    const updated = [...stikerPerHalaman];
    updated[page] = newList;
    setStikerPerHalaman(updated);
  };

  const handleDropStiker = (e: React.DragEvent) => {
    e.preventDefault();
    if (!bukuRef.current) return;
    const rect = bukuRef.current.getBoundingClientRect();
    if (dragStiker && !draggingStikerId) {
      const x = e.clientX - rect.left - 40;
      const y = e.clientY - rect.top - 40;
      updateStiker([...stikerList, {src: dragStiker, x, y, id: Date.now(), size: 80}]);
      setDragStiker(null);
    }
    if (draggingStikerId) {
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      updateStiker(stikerList.map((s) =>
        s.id === draggingStikerId ? {...s, x, y} : s
      ));
      setDraggingStikerId(null);
    }
  };

  const handleHapusStiker = (id: number) => {
    updateStiker(stikerList.filter((s) => s.id !== id));
    setSelectedStiker(null);
  };

  const handleResizeStiker = (id: number, delta: number) => {
    updateStiker(stikerList.map((s) =>
      s.id === id ? {...s, size: Math.max(30, Math.min(300, s.size + delta))} : s
    ));
  };

  const handlePindahHalaman = (arah: 'next' | 'prev') => {
    if (flipping) return;
    const tujuan = arah === 'next' ? page + 1 : page - 1;
    setFlipDir(arah);
    setNextPage(tujuan);
    setFlipping(true);
    setSelectedStiker(null);
    setTimeout(() => {
      setPage(tujuan);
      setFlipping(false);
    }, 700);
  };

  const scrollToolbar = (arah: 'left' | 'right') => {
    if (toolbarScrollRef.current) {
      toolbarScrollRef.current.scrollBy({left: arah === 'right' ? 300 : -300, behavior: 'smooth'});
    }
  };

  const fotoHalaman = [
    [...bingkaiFinal[0], ...bingkaiFinal[1]],
    [...bingkaiFinal[2]],
  ];

  const posisiBingkai = [
    [
      {top: '250px', left: '90px'},
      {top: '250px', left: '400px'},
      {top: '400px', left: '250px'},
      {top: '250px', left: '680px'},
      {top: '250px', left: '980px'},
      {top: '400px', left: '830px'},
    ],
    [
      {top: '300px', left: '150px'},
      {top: '300px', left: '360px'},
      {top: '300px', left: '825px'},
    ],
  ];

  const renderIsiHalaman = (halamanIdx: number) => (
    <>
      <img src={`/buku-bg-${halamanIdx + 1}.png`} alt="buku"
        className="absolute inset-0 w-full h-full object-cover" />
      {fotoHalaman[halamanIdx]?.map((foto, i) => (
        foto && posisiBingkai[halamanIdx]?.[i] && (
          <div key={i} className="absolute bg-white p-2 shadow-lg"
            style={{...posisiBingkai[halamanIdx][i], width: '200px', height: '230px',
              transform: `rotate(${(i % 2 === 0 ? -2 : 2)}deg)`, zIndex: 5}}>
            <img src={foto} alt={`foto-${i}`}
              style={{width: '100%', height: '170px', objectFit: 'cover'}} />
          </div>
        )
      ))}
      {(stikerPerHalaman[halamanIdx] || []).map((s) => (
        <div key={s.id}
          style={{position: 'absolute', left: s.x, top: s.y, width: s.size, height: s.size, zIndex: 20}}>
          <img src={s.src} alt="stiker" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
        </div>
      ))}
    </>
  );

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-amber-800">

      <style>{`
        @keyframes flipFromRight {
          0%   { transform: perspective(2500px) rotateY(0deg); opacity: 1; }
          50%  { transform: perspective(2500px) rotateY(-90deg); opacity: 0.5; }
          100% { transform: perspective(2500px) rotateY(-180deg); opacity: 0; }
        }
        @keyframes flipFromLeft {
          0%   { transform: perspective(2500px) rotateY(0deg); opacity: 1; }
          50%  { transform: perspective(2500px) rotateY(90deg); opacity: 0.5; }
          100% { transform: perspective(2500px) rotateY(180deg); opacity: 0; }
        }
        .flip-out-next {
          animation: flipFromRight 0.7s ease-in-out forwards;
          transform-origin: left center;
        }
        .flip-out-prev {
          animation: flipFromLeft 0.7s ease-in-out forwards;
          transform-origin: right center;
        }
      `}</style>

      {flipping && (
        <div className="absolute inset-0 z-0">
          {renderIsiHalaman(nextPage)}
        </div>
      )}

      <div
        ref={bukuRef}
        className={`absolute inset-0 z-10 ${flipping ? (flipDir === 'next' ? 'flip-out-next' : 'flip-out-prev') : ''}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropStiker}
        onClick={() => setSelectedStiker(null)}
      >
        <img src={`/buku-bg-${page + 1}.png`} alt="buku"
          className="absolute inset-0 w-full h-full object-cover" />

        {fotoHalaman[page]?.map((foto, i) => (
          foto && posisiBingkai[page]?.[i] && (
            <div key={i} className="absolute bg-white p-2 shadow-lg"
              style={{...posisiBingkai[page][i], width: '200px', height: '230px',
                transform: `rotate(${(i % 2 === 0 ? -2 : 2)}deg)`, zIndex: 5}}>
              <img src={foto} alt={`foto-${i}`}
                style={{width: '100%', height: '170px', objectFit: 'cover'}} />
            </div>
          )
        ))}

        {stikerList.map((s) => (
          <div
            key={s.id}
            draggable
            onDragStart={(e) => {
              setDraggingStikerId(s.id);
              const rect = e.currentTarget.getBoundingClientRect();
              setDragOffset({x: e.clientX - rect.left, y: e.clientY - rect.top});
            }}
            onDragEnd={() => setDraggingStikerId(null)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStiker(selectedStiker === s.id ? null : s.id);
            }}
            style={{position: 'absolute', left: s.x, top: s.y,
              width: s.size, height: s.size, zIndex: 20, cursor: 'grab'}}
          >
            <img src={s.src} alt="stiker"
              style={{width: '100%', height: '100%', objectFit: 'contain'}} />
            {selectedStiker === s.id && (
              <>
                <button onClick={(e) => { e.stopPropagation(); handleHapusStiker(s.id); }}
                  style={{position: 'absolute', top: '-12px', right: '-12px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'red', color: 'white', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✕</button>
                <button onClick={(e) => { e.stopPropagation(); handleResizeStiker(s.id, 20); }}
                  style={{position: 'absolute', bottom: '-12px', right: '-12px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'green', color: 'white', fontWeight: 'bold', fontSize: '18px', border: 'none', cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>+</button>
                <button onClick={(e) => { e.stopPropagation(); handleResizeStiker(s.id, -20); }}
                  style={{position: 'absolute', bottom: '-12px', left: '-12px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', fontSize: '18px', border: 'none', cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>-</button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Toolbar Stiker */}
      <div className="absolute left-0 right-0 z-50"
        style={{bottom: toolbarOpen ? '0px' : '-160px', transition: 'bottom 0.3s ease'}}>
        <div className="flex items-center" style={{background: 'rgba(139, 90, 43, 0.95)', borderRadius: '12px 12px 0 0', padding: '8px 12px', height: '160px'}}>
          <button onClick={() => scrollToolbar('left')}
            style={{background: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', color: 'white', flexShrink: 0}}>‹</button>
          <div ref={toolbarScrollRef}
            className="flex flex-row items-center gap-3 overflow-x-auto mx-3"
            style={{flex: 1, paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px', scrollbarWidth: 'none'}}>
            {semuaStiker.map((stiker, i) => (
              <img key={i} src={stiker} alt={`stiker-${i}`} draggable
                onDragStart={() => { setDragStiker(stiker); setDraggingStikerId(null); }}
                style={{width: '110px', height: '110px', objectFit: 'contain', cursor: 'grab', flexShrink: 0}} />
            ))}
          </div>
          <button onClick={() => scrollToolbar('right')}
            style={{background: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', color: 'white', flexShrink: 0}}>›</button>
        </div>
      </div>

      {/* Tombol Toolbar */}
      <div className="absolute z-50"
        style={{bottom: toolbarOpen ? '350px' : '-80px', left: '400px', transition: 'bottom 0.3s ease'}}>
        <button onClick={() => setToolbarOpen(!toolbarOpen)}>
          <img src="/tombol-toolbar.png" alt="toolbar" style={{width: '400px'}}
            className="cursor-pointer hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Tombol Kembali */}
      {!toolbarOpen && (
        <div className="absolute" style={{bottom: '-70px', left: '-70px', zIndex: 60}}>
          {page === 0 ? (
            <Link href="/konsep"> {/* ← DIUBAH: dari /drag ke /konsep */}
              <img src="/tombol-kembali.png" alt="kembali" style={{width: '400px'}}
                className="cursor-pointer hover:scale-110 transition-transform" />
            </Link>
          ) : (
            <button onClick={() => handlePindahHalaman('prev')}>
              <img src="/tombol-kembali.png" alt="kembali" style={{width: '400px'}}
                className="cursor-pointer hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      )}

      {/* Tombol Next halaman 0 */}
      {!toolbarOpen && page === 0 && (
        <div className="absolute" style={{bottom: '-70px', right: '-80px', zIndex: 60}}>
          <button onClick={() => handlePindahHalaman('next')}>
            <img src="/tombol-next.png" alt="next" style={{width: '400px'}}
              className="cursor-pointer hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Tombol Next halaman 1 → ke kesimpulan */}
      {!toolbarOpen && page === 1 && (
        <div className="absolute" style={{bottom: '-70px', right: '-80px', zIndex: 60}}>
          <Link href="/kesimpulan">
            <img src="/tombol-next.png" alt="next" style={{width: '400px'}}
              className="cursor-pointer hover:scale-110 transition-transform" />
          </Link>
        </div>
      )}

    </main>
  );
}