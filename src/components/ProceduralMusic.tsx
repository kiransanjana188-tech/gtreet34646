import React, { useEffect, useRef, useState } from "react";
import { Music, VolumeX, Volume2, Settings, X, BookOpen, Sparkles, SlidersHorizontal } from "lucide-react";

export const ProceduralMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3); // 0.0 to 1.0

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>(() => {
    return (localStorage.getItem("soundtrack_font_size") as 'normal' | 'large') || 'normal';
  });
  const [disableParticles, setDisableParticles] = useState<boolean>(() => {
    return localStorage.getItem("soundtrack_disable_particles") === "true";
  });

  // Apply typography class to document body
  useEffect(() => {
    if (fontSize === "large") {
      document.body.classList.add("story-font-large");
    } else {
      document.body.classList.remove("story-font-large");
    }
  }, [fontSize]);

  // Apply particles performance class to document body
  useEffect(() => {
    if (disableParticles) {
      document.body.classList.add("performance-mode-no-particles");
    } else {
      document.body.classList.remove("performance-mode-no-particles");
    }
  }, [disableParticles]);

  const handleFontSizeChange = (size: 'normal' | 'large') => {
    setFontSize(size);
    localStorage.setItem("soundtrack_font_size", size);
  };

  const handleToggleParticles = () => {
    const newVal = !disableParticles;
    setDisableParticles(newVal);
    localStorage.setItem("soundtrack_disable_particles", newVal ? "true" : "false");
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and handle play/pause
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;

    // Direct path for user-uploaded .flac, cascading to high-reliability archive.org .mp3
    const sources = [
      "/src/04. Cigarettes After Sex - Apocalypse.flac",
      "https://archive.org/download/cigarettes-after-sex-songs-compilation/Cigarettes%20After%20Sex%20-%20Apocalypse%20%28Espa%C3%B1ol%29.mp3"
    ];

    let currentSourceIdx = 0;

    const loadSource = (src: string) => {
      audio.src = src;
      // Handle fallback on error
      const handleError = () => {
        currentSourceIdx++;
        if (currentSourceIdx < sources.length) {
          console.warn("Cascading to fallback stream:", sources[currentSourceIdx]);
          loadSource(sources[currentSourceIdx]);
          if (isPlaying) {
            audio.play().catch(e => console.log("Fallback play delayed:", e));
          }
        }
      };
      audio.onerror = handleError;
    };

    loadSource(sources[currentSourceIdx]);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Sync isPlaying state
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play blocked/failed:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Sync volume state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
  };

  // Expose play function to global trigger if needed
  useEffect(() => {
    const handleGlobalTrigger = (event: Event) => {
      if (!isPlaying) {
        setIsPlaying(true);
      }
    };
    
    window.addEventListener("start_tribute_music", handleGlobalTrigger);
    return () => {
      window.removeEventListener("start_tribute_music", handleGlobalTrigger);
    };
  }, [isPlaying]);

  return (
    <div className="fixed top-3 right-3 z-50 flex flex-col items-end gap-1.5 select-none pointer-events-auto">
      {/* Settings Toggle Trigger Button */}
      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        id="experience-settings-trigger"
        className="glass-panel text-slate-300 hover:text-amber-300 p-2 rounded-full border border-white/[0.05] shadow-md flex items-center justify-center transition-all cursor-pointer bg-slate-950/80 hover:bg-slate-900 active:scale-95 relative"
        title="Open Experience Settings"
      >
        <Settings className={`h-3.5 w-3.5 transition-transform duration-500 ${isSettingsOpen ? "rotate-90 text-amber-400" : ""}`} />
        {isPlaying && (
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        )}
      </button>

      {/* Settings Popover Menu */}
      {isSettingsOpen && (
        <div
          className="glass-panel p-3 rounded-lg border border-white/[0.06] shadow-xl w-[200px] bg-slate-950/95 backdrop-blur-xl space-y-2.5 text-left relative overflow-hidden"
          id="experience-settings-menu"
        >
          {/* Menu Title Accent header */}
          <div className="flex justify-between items-center border-b border-white/[0.03] pb-1.5">
            <span className="text-[7.5px] font-mono tracking-widest text-amber-300 uppercase font-black flex items-center gap-1">
              <SlidersHorizontal className="h-2.5 w-2.5 text-amber-400" /> Settings Panel
            </span>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-0.5 rounded-full text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
              title="Close Panel"
            >
              <X className="h-3 w-3" />
            </button>
          </div>

          {/* Option Block: SOUNDTRACK CONTROLS */}
          <div className="space-y-1">
            <label className="text-[8px] font-mono tracking-wider text-slate-400 font-bold uppercase flex items-center gap-1">
              🎵 Soundtrack
            </label>

            <div className="bg-slate-900/60 border border-white/[0.04] rounded-lg p-1.5 flex flex-col gap-0.5" id="soundtrack-badge">
              <span className="text-[9px] font-mono font-bold text-amber-300 truncate">
                Apocalypse
              </span>
            </div>

            {/* Exactly replica of the Golden Sound controller capsule as pictured in the user uploaded screenshot */}
            <div 
              className="flex items-center gap-1.5 bg-[#0d0f16]/95 border border-slate-900 rounded-full px-2 py-1 shadow-inner relative justify-between" 
              id="soundtrack-capsule-unit"
            >
              {/* Golden square indices/dots viz on the left */}
              <div className="flex gap-0.5 items-center">
                {[0, 1, 2, 3].map((idx) => (
                  <span
                    key={idx}
                    className={`w-0.5 h-1.5 rounded-full transition-all duration-300 ${
                      isPlaying ? "bg-amber-400 opacity-100 scale-y-110" : "bg-amber-400/25 opacity-60 scale-y-75"
                    }`}
                  />
                ))}
              </div>

              {/* Volume status button inside unit */}
              <button
                onClick={handleTogglePlay}
                className="text-amber-400 hover:text-amber-300 transition-colors focus:outline-none cursor-pointer flex items-center"
                title={isPlaying ? "Mute soundtrack" : "Unmute soundtrack"}
              >
                {isPlaying ? (
                  <Volume2 className="h-3 w-3 text-amber-400 animate-pulse" />
                ) : (
                  <VolumeX className="h-3 w-3 text-slate-500" />
                )}
              </button>

              {/* Vertical border line indicator */}
              <span className="w-px h-2.5 bg-slate-800/80 block" />

              {/* Custom styled Range Slider matching yellow rounded button thumb in the mockup */}
              <div className="flex items-center grow pl-0.5">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-0.5 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300 focus:outline-none focus:ring-0
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:h-2 
                    [&::-webkit-slider-thumb]:w-2 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-amber-400 
                    [&::-webkit-slider-thumb]:hover:bg-amber-300
                    [&::-webkit-slider-thumb]:transition-all"
                  title="Volume Control"
                />
              </div>
            </div>
          </div>

          {/* Option Block: NARRATIVE FONT SIZE */}
          <div className="space-y-1 border-t border-white/[0.03] pt-2">
            <label className="text-[8px] font-mono tracking-wider text-slate-400 font-bold uppercase flex items-center gap-1">
              <BookOpen className="h-2.5 w-2.5 text-blue-400" /> Text Size
            </label>

            <div className="grid grid-cols-2 gap-1 pt-0.5">
              <button
                onClick={() => handleFontSizeChange("normal")}
                className={`px-1 py-0.5 rounded border text-[8px] font-mono font-bold tracking-wide uppercase transition-all cursor-pointer ${
                  fontSize === "normal"
                    ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
                    : "border-slate-850 hover:border-slate-800 hover:text-slate-200 text-slate-500"
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => handleFontSizeChange("large")}
                className={`px-1 py-0.5 rounded border text-[8px] font-mono font-bold tracking-wide uppercase transition-all cursor-pointer ${
                  fontSize === "large"
                    ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
                    : "border-slate-850 hover:border-slate-800 hover:text-slate-200 text-slate-500"
                }`}
              >
                Cinema
              </button>
            </div>
          </div>

          {/* Option Block: GLOBAL CANVAS PARTICLES TOGGLE */}
          <div className="space-y-1 border-t border-white/[0.03] pt-2 pb-0.5">
            <div className="flex justify-between items-center gap-1.5">
              <label className="text-[8px] font-mono tracking-wider text-slate-400 font-bold uppercase flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5 text-purple-400" /> FX Starfield
              </label>

              <button
                onClick={handleToggleParticles}
                className={`relative inline-flex h-3.5 w-6.5 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  !disableParticles ? "bg-amber-400" : "bg-slate-800"
                }`}
                title="Toggle Background VFX"
              >
                <span
                  className={`pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-slate-950 shadow ring-0 transition duration-200 ease-in-out ${
                    !disableParticles ? "translate-x-3" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Option Footer Credit Line */}
          <div className="border-t border-white/[0.03] pt-1.5 text-center">
            <span className="text-[7.5px] font-mono text-slate-650/90 tracking-widest uppercase">
              Developed by FYP Team
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

