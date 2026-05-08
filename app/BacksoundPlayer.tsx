"use client";
import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/backsound.mp3";

let _ctx: AudioContext | null = null;
function getCtx(): AudioContext {
  if (!_ctx) _ctx = new AudioContext();
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function playClickSfx() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

export default function BacksoundPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = true;
    audio.play().catch(() => {});

    const handleGlobalClick = (e: MouseEvent) => {
      if (audio.muted) {
        audio.muted = false;
        audio.play().catch(() => {});
        setPlaying(true);
      }

      const target = e.target as HTMLElement;
      const isClickable =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']");

      if (isClickable) {
        playClickSfx();
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = val;
    audio.muted = false;
    if (val === 0) {
      setPlaying(false);
    } else if (!playing) {
      audio.play();
      setPlaying(true);
    }
  };

  const icon = !playing || volume === 0 ? "🔇" : volume < 0.4 ? "🔉" : "🔊";

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop />

      <div style={{
        position: "fixed",
        top: "16px", left: "16px",
        zIndex: 9999,
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <button
          onClick={() => { togglePlay(); setShowSlider(s => !s); }}
          onMouseEnter={() => setShowSlider(true)}
          style={{
            width: "40px", height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.88)",
            border: "2px solid rgba(0,0,0,0.12)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px",
            transition: "transform 0.15s ease",
          }}
          title={playing ? "Matikan musik" : "Hidupkan musik"}
        >
          {icon}
        </button>

        <div
          onMouseEnter={() => setShowSlider(true)}
          onMouseLeave={() => setShowSlider(false)}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.88)",
            borderRadius: "20px",
            padding: "6px 12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            border: "2px solid rgba(0,0,0,0.12)",
            overflow: "hidden",
            maxWidth: showSlider ? "180px" : "0px",
            opacity: showSlider ? 1 : 0,
            transition: "max-width 0.3s ease, opacity 0.3s ease",
            whiteSpace: "nowrap",
          }}
        >
          <button
            onClick={() => {
              const newVol = Math.max(0, parseFloat((volume - 0.1).toFixed(1)));
              setVolume(newVol);
              if (audioRef.current) audioRef.current.volume = newVol;
              if (newVol === 0) setPlaying(false);
            }}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: "0 2px", lineHeight: 1 }}
          >➖</button>

          <input
            type="range"
            min="0" max="1" step="0.05"
            value={volume}
            onChange={handleVolume}
            style={{ width: "80px", accentColor: "#f97316", cursor: "pointer" }}
          />

          <button
            onClick={() => {
              const newVol = Math.min(1, parseFloat((volume + 0.1).toFixed(1)));
              setVolume(newVol);
              if (audioRef.current) audioRef.current.volume = newVol;
              if (!playing) { audioRef.current?.play(); setPlaying(true); }
            }}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: "0 2px", lineHeight: 1 }}
          >➕</button>
        </div>
      </div>
    </>
  );
}