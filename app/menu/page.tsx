import Link from "next/link";
export default function Menu() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      
      <img
        src="/menu-bg.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6" style={{marginTop: '60px'}}>
        <Link href="/panduan">
          <button className="bg-green-500 text-white text-2xl font-bold px-20 py-8 rounded-full w-96 hover:scale-105 transition-transform">
            Panduan Penggunaan
          </button>
        </Link>
        <div className="flex gap-4">
          <Link href="/profil">
            <button className="bg-orange-400 text-white text-2xl font-bold px-18 py-8 rounded-full hover:scale-105 transition-transform">
              Profil Pengembang
            </button>
          </Link>
          <Link href="/cp">
            <button className="bg-pink-500 text-white text-2xl font-bold px-18 py-8 rounded-full hover:scale-105 transition-transform">
              CP dan TP
            </button>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/materi">
            <button className="bg-blue-500 text-white text-2xl font-bold px-18 py-8 rounded-full hover:scale-105 transition-transform">
              Materi Pengantar
            </button>
          </Link>
          <Link href="/media">
            <button className="bg-blue-400 text-white text-2xl font-bold px-18 py-8 rounded-full hover:scale-105 transition-transform">
              Media
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute" style={{bottom: '-50px', left: '-120px'}}>
        <Link href="/">
          <img
            src="/tombol-kembali.png"
            alt="kembali"
            style={{width: '400px'}}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>
      </div>
    </main>
  );
}