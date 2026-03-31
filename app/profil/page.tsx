import Link from "next/link";

export default function Profil() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">

      {/* Background */}
      <img
        src="/profil-bg.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Tombol Home */}
      <div className="absolute" style={{bottom: '-50px', left: '-120px', zIndex: 30}}>
        <Link href="/menu">
          <img
            src="/tombol-home.png"
            alt="home"
            style={{width: '400px'}}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>
      </div>

    </main>
  );
}