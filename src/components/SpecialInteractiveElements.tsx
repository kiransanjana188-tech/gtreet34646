import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Server, Globe, Sparkles, BookOpen, Heart, Award, Send, Film, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, RotateCcw, ChevronLeft, ChevronRight, Camera, Maximize2, Sliders, Image as ImageIcon, Video } from "lucide-react";

import soundaryaClosed from "../assets/images/Screenshot 2026-06-06 162634.png";
import soundaryaOpen from "../assets/images/Screenshot 2026-06-06 162649.png";
import photoLeft from "./Screenshot 2026-06-06 201350.png";
import photoRight from "./Screenshot 2026-06-06 201411.png";

import video1 from "../4841F133BD82DE2C0D5443719AEDC3B2_video_dashinit.mp4";
import video2 from "../269906625_1423173191411846_3612290292881754380_n.mp4";
import video3 from "../DE4E04B0DBED9603D5FA26FE669FA09A_video_dashinit.mp4";
import video4 from "../654497BCFB3FACDF8A254682A3292B93_video_dashinit.mp4";


// ==========================================
// 1. INTERACTIVE GREETING CARD (TEARING ANIMATION) - MOBILE ADAPTIVE
// ==========================================
export const InteractiveGreetingCard: React.FC = () => {
  const [isTorn, setIsTorn] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center my-8 md:my-12 relative w-full px-2">
      <div className="text-[10px] sm:text-xs font-mono text-amber-300/90 mb-4 uppercase tracking-widest flex items-center gap-1.5 justify-center text-center">
        <Sparkles className="h-3 w-3 animate-spin text-amber-300" /> Interactive Memory: Someone's Greeting Card
      </div>

      <div className="relative h-80 w-full max-w-[300px] sm:max-w-[340px] perspective-1000 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {!isTorn ? (
            <motion.div
              layoutId="greeting-card"
              className="w-60 sm:w-64 h-80 bg-gradient-to-br from-rose-700 to-amber-900 border-2 border-amber-400 rounded-lg shadow-2xl p-5 sm:p-6 flex flex-col justify-between items-center cursor-pointer select-none text-center relative overflow-hidden"
              whileHover={{ scale: 1.04, rotateY: 5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsTorn(true)}
              initial={{ rotate: -2, opacity: 0, y: 30 }}
              animate={{ rotate: -1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              id="greeting-card-whole"
            >
              {/* Card Gold Trim lines */}
              <div className="absolute inset-2 border border-amber-400/40 rounded pointer-events-none" />

              <div className="text-amber-300 font-serif italic text-sm sm:text-base mt-2">Made with Love</div>
              
              <div className="flex flex-col items-center gap-1.5">
                <Heart className="h-9 w-9 text-amber-200 fill-amber-300/20 animate-pulse" />
                <h3 className="font-display font-bold text-lg sm:text-xl text-amber-100 leading-tight">
                  For Soundarya
                </h3>
              </div>

              <div className="text-[11px] sm:text-xs text-amber-300/90 font-serif max-w-[190px] leading-relaxed mb-3">
                "Every single day... I truly started liking you more and more... "
              </div>

              <div className="bg-amber-400 text-amber-950 font-display text-[9px] sm:text-[10px] uppercase tracking-widest px-3.5 py-2 rounded-full font-bold hover:bg-amber-300 transition-colors animate-bounce shadow">
                Click to Open Card
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-between w-full h-80 relative select-none" id="greeting-card-torn">
              {/* Left piece */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ x: -45, y: 30, rotate: -18, opacity: 0.85 }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
                className="w-[47%] h-80 bg-gradient-to-br from-rose-700 to-amber-900 border-l-2 border-y-2 border-amber-400 rounded-l-lg shadow-xl p-3 sm:p-4 flex flex-col justify-between items-end relative overflow-hidden"
              >
                <div className="absolute inset-y-2 left-2 right-0 border-l border-y border-amber-400/40 rounded-l pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-3 bg-transparent border-r-2 border-dashed border-rose-950/70" />

                <div className="text-amber-300 font-serif italic text-[10px] sm:text-xs mt-3">Made with...</div>
                <div className="font-display font-bold text-sm sm:text-base text-amber-100 pr-1 truncate max-w-full">For Soun...</div>
                <span className="text-[9px] text-amber-400/75 font-mono pr-1">9th Class</span>
              </motion.div>

              {/* Right piece */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ x: 45, y: 40, rotate: 20, opacity: 0.85 }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
                className="w-[47%] h-80 bg-gradient-to-bl from-rose-700 to-amber-900 border-r-2 border-y-2 border-amber-400 rounded-r-lg shadow-xl p-3 sm:p-4 flex flex-col justify-between items-start relative overflow-hidden"
              >
                <div className="absolute inset-y-2 right-2 left-0 border-r border-y border-amber-400/40 rounded-r pointer-events-none" />
                <div className="absolute top-0 left-0 h-full w-3 bg-transparent border-l-2 border-dashed border-rose-950/70" />

                <div className="text-amber-300 font-serif italic text-[10px] sm:text-xs mt-3">...Love</div>
                <div className="font-display font-bold text-sm sm:text-base text-amber-100 pl-1 truncate max-w-full">...darya</div>
                <span className="text-[9px] text-amber-400/75 font-mono pl-1">July 2022</span>
              </motion.div>

              {/* Floating torn particles */}
              {[...Array(12)].map((_, i) => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 30 + Math.random() * 90;
                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 80, scale: 1, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance + 30,
                      scale: 0.25,
                      opacity: 0,
                      rotate: Math.random() * 360,
                    }}
                    transition={{ duration: 1.6, delay: Math.random() * 0.1 }}
                    className="absolute w-2 h-2 bg-rose-400 rounded-sm pointer-events-none"
                    style={{
                      left: "50%",
                      top: "40%",
                    }}
                  />
                );
              })}

              <div className="absolute inset-x-0 bottom-[-50px] text-center flex flex-col items-center">
                <span className="text-[11px] text-rose-400/90 font-mono font-medium animate-pulse">
                  The greeting card was torn to pieces...
                </span>
                <button
                  onClick={() => setIsTorn(false)}
                  className="mt-2 text-[9px] bg-slate-900/90 hover:bg-slate-800 text-slate-300 font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-700/60 flex items-center gap-1 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3 text-rose-400" /> Reassemble Card
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};



// ==========================================
// 3. AIRPLANE FLYING PATH ANIMATION
// ==========================================
export const AirplaneAnimation: React.FC = () => {
  return (
    <div className="w-full h-36 bg-slate-950/30 rounded-xl border border-white/[0.04] relative overflow-hidden my-4 flex items-center justify-center" id="airplane-mount">
      <div className="absolute bottom-0 w-full h-6 bg-slate-900/10 border-t border-white/[0.01]" />
      
      {/* Dynamic line vector */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M -20 80 Q 120 15, 350 45 T 750 -10"
          fill="none"
          stroke="rgba(251, 191, 36, 0.3)"
          strokeWidth="1.5"
          strokeDasharray="5,4"
        />
      </svg>

      {/* Travelling Plane icon */}
      <motion.div
        className="absolute flex flex-col items-center gap-0.5 z-10"
        initial={{ x: "-10%", y: 70, rotate: -20 }}
        animate={{
          x: ["-10%", "50%", "110%"],
          y: [80, 35, -10],
          rotate: [-12, 0, 12],
        }}
        transition={{
          duration: 9.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1,
        }}
        style={{
          transformOrigin: "center center"
        }}
      >
        <span className="text-3xl sm:text-4xl filter drop-shadow-[0_4px_10px_rgba(251,191,36,0.45)]">✈️</span>
        <span className="text-[8px] sm:text-[9px] bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full font-bold font-mono tracking-wider shadow">
          Going Abroad
        </span>
      </motion.div>

      {/* Cloud indicators */}
      <div className="absolute top-3 left-5 text-xl sm:text-2xl opacity-10">☁️</div>
      <div className="absolute top-10 right-10 text-2xl sm:text-3xl opacity-8">☁️</div>
    </div>
  );
};

// ==========================================
// 4. CINEMATIC FILM REEL & LIGHTS INTERACTIVE
// ==========================================
export const CinemaStageSpotlight: React.FC = () => {
  const [brightnessL, setBrightnessL] = useState<number>(75);
  const [brightnessR, setBrightnessR] = useState<number>(85);
  
  // Immersive Modal states
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<string>("");
  
  // Custom states for cinema-level simulation
  const [filterMode, setFilterMode] = useState<"vintage" | "noir" | "cyber" | "raw">("vintage");
  const [hasLetterbox, setHasLetterbox] = useState<boolean>(true);
  const [hasFilmGrain, setHasFilmGrain] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Cinema upload Video show states
  const [isCinemaActive, setIsCinemaActive] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fullscreen video lightbox states
  const [isFullScreenVideo, setIsFullScreenVideo] = useState<boolean>(false);
  const [fsPlaying, setFsPlaying] = useState<boolean>(false);
  const [fsMuted, setFsMuted] = useState<boolean>(true);
  const [fsProgress, setFsProgress] = useState<number>(0);
  const [fsDuration, setFsDuration] = useState<number>(0);
  const fsVideoRef = useRef<HTMLVideoElement>(null);

  // Active hover/touch feedback
  const [hoveredScreen, setHoveredScreen] = useState<"left" | "right" | "video" | null>(null);

  // Video Playlist config
  const CINEMA_PLAYLIST = [
    { id: "vid1", title: "Theater Reel I", url: video1, subtitle: "Capturing Soundarya's incredible radiant smile in true cinema format" },
    { id: "vid2", title: "Theater Reel II", url: video2, subtitle: "A heartwarming cinematic frame showing gentle, charming expressions" },
    { id: "vid3", title: "Theater Reel III", url: video3, subtitle: "Pure artistic essence under the dazzling studio and stage spotlights" },
    { id: "vid4", title: "Theater Reel IV", url: video4, subtitle: "Where dreams, passion, and the screen universe collide in masterpiece motion" }
  ];

  // Map filters to inline styles
  const getFilterStyle = (brightness: number) => {
    const baseBrightness = `brightness(${brightness}%)`;
    switch (filterMode) {
      case "vintage":
        return `${baseBrightness} sepia(25%) contrast(1.1) saturate(1.15) hue-rotate(5deg)`;
      case "noir":
        return `${baseBrightness} grayscale(100%) contrast(1.3) contrast(1.2)`;
      case "cyber":
        return `${baseBrightness} hue-rotate(180deg) saturate(1.4) contrast(1.1)`;
      case "raw":
      default:
        return `${baseBrightness} contrast(1.05) saturate(1.1)`;
    }
  };

  const openPhotoModal = (photo: string, title: string, subtitle: string) => {
    setSelectedPhoto(photo);
    setSelectedTitle(title);
    setSelectedSub(subtitle);
  };

  // Video handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoProgress(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsVideoPlaying(true);
        }).catch(err => {
          console.log("Play failed, starting muted play", err);
          setIsVideoMuted(true);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().then(() => {
              setIsVideoPlaying(true);
            });
          }
        });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isVideoMuted;
      videoRef.current.muted = newMutedState;
      setIsVideoMuted(newMutedState);
    }
  };

  const handleNextVideo = () => {
    const nextIdx = (currentVideoIndex + 1) % CINEMA_PLAYLIST.length;
    setCurrentVideoIndex(nextIdx);
    setVideoProgress(0);
    setIsVideoPlaying(true);
  };

  const handlePrevVideo = () => {
    const prevIdx = (currentVideoIndex - 1 + CINEMA_PLAYLIST.length) % CINEMA_PLAYLIST.length;
    setCurrentVideoIndex(prevIdx);
    setVideoProgress(0);
    setIsVideoPlaying(true);
  };

  const handleVideoEnded = () => {
    handleNextVideo();
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setVideoProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime = newProgress;
    }
  };

  // Full-screen Video handlers and synchronization
  const enterFullScreenVideo = () => {
    let currentProgress = 0;
    if (videoRef.current) {
      currentProgress = videoRef.current.currentTime;
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setFsProgress(currentProgress);
    setIsFullScreenVideo(true);
    setFsPlaying(true);
    setFsMuted(isVideoMuted);

    setTimeout(() => {
      if (fsVideoRef.current) {
        fsVideoRef.current.currentTime = currentProgress;
        fsVideoRef.current.muted = isVideoMuted;
        fsVideoRef.current.play().catch((err) => {
          console.log("Automatic full-screen playback initiation error:", err);
          setFsMuted(true);
          if (fsVideoRef.current) {
            fsVideoRef.current.muted = true;
            fsVideoRef.current.play().catch(() => {});
          }
        });
      }
    }, 150);
  };

  const exitFullScreenVideo = () => {
    let currentProgress = 0;
    if (fsVideoRef.current) {
      currentProgress = fsVideoRef.current.currentTime;
      fsVideoRef.current.pause();
    }
    setFsPlaying(false);
    setVideoProgress(currentProgress);
    setIsFullScreenVideo(false);
    setIsVideoPlaying(true);
    setIsVideoMuted(fsMuted);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = currentProgress;
        videoRef.current.muted = fsMuted;
        videoRef.current.play().catch(() => {});
      }
    }, 150);
  };

  const handleFsTimeUpdate = () => {
    if (fsVideoRef.current) {
      setFsProgress(fsVideoRef.current.currentTime);
    }
  };

  const handleFsLoadedMetadata = () => {
    if (fsVideoRef.current) {
      setFsDuration(fsVideoRef.current.duration);
    }
  };

  const handleFsSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setFsProgress(newProgress);
    if (fsVideoRef.current) {
      fsVideoRef.current.currentTime = newProgress;
    }
  };

  const toggleFsVideoPlay = () => {
    if (fsVideoRef.current) {
      if (fsPlaying) {
        fsVideoRef.current.pause();
        setFsPlaying(false);
      } else {
        fsVideoRef.current.play().then(() => {
          setFsPlaying(true);
        }).catch(() => {
          setFsMuted(true);
          if (fsVideoRef.current) {
            fsVideoRef.current.muted = true;
            fsVideoRef.current.play().then(() => {
              setFsPlaying(true);
            });
          }
        });
      }
    }
  };

  const toggleFsMute = () => {
    if (fsVideoRef.current) {
      const newMuted = !fsMuted;
      fsVideoRef.current.muted = newMuted;
      setFsMuted(newMuted);
    }
  };

  const handleFsNextVideo = () => {
    const nextIdx = (currentVideoIndex + 1) % CINEMA_PLAYLIST.length;
    setCurrentVideoIndex(nextIdx);
    setFsProgress(0);
    setVideoProgress(0);
    setFsPlaying(true);
    
    setTimeout(() => {
      if (fsVideoRef.current) {
        fsVideoRef.current.currentTime = 0;
        fsVideoRef.current.play().catch(() => {});
      }
    }, 100);
  };

  const handleFsPrevVideo = () => {
    const prevIdx = (currentVideoIndex - 1 + CINEMA_PLAYLIST.length) % CINEMA_PLAYLIST.length;
    setCurrentVideoIndex(prevIdx);
    setFsProgress(0);
    setVideoProgress(0);
    setFsPlaying(true);

    setTimeout(() => {
      if (fsVideoRef.current) {
        fsVideoRef.current.currentTime = 0;
        fsVideoRef.current.play().catch(() => {});
      }
    }, 100);
  };

  useEffect(() => {
    if (isFullScreenVideo && fsVideoRef.current) {
      fsVideoRef.current.load();
      if (fsPlaying) {
        fsVideoRef.current.play().catch(() => {});
      }
    }
  }, [currentVideoIndex, isFullScreenVideo]);

  // Synchronize playing states
  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentVideoIndex, isVideoPlaying, isCinemaActive]);

  return (
    <div className="w-full glass-panel p-5 sm:p-7 rounded-2xl border border-blue-500/10 shadow-2xl relative overflow-hidden" id="cinema-spotlights">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Film sprocket layout on outer panel sides */}
      <div className="absolute top-3 bottom-3 left-1.5 w-1 flex flex-col justify-between opacity-20 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={`sprocket-l-${i}`} className="w-1 h-2.5 bg-white/40 rounded-[1px]" />
        ))}
      </div>
      <div className="absolute top-3 bottom-3 right-1.5 w-1 flex flex-col justify-between opacity-20 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={`sprocket-r-${i}`} className="w-1 h-2.5 bg-white/40 rounded-[1px]" />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3 mb-4">
        <h3 className="font-display font-medium text-sm sm:text-base text-blue-300 flex items-center gap-2">
          <Film className={`h-4.5 w-4.5 text-blue-400 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "10s" }} /> 
          Cinema Projection Stage & Studio Light
        </h3>
        
        {/* Rapid Custom Effects Toggle switches */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => {
              setIsCinemaActive(prev => !prev);
              if (!isCinemaActive) {
                setIsPlaying(true);
                setIsVideoPlaying(true);
              } else {
                setIsVideoPlaying(false);
              }
            }}
            className={`text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
              isCinemaActive 
                ? "bg-rose-600/35 border-rose-400/50 text-rose-200 animate-pulse" 
                : "bg-blue-600/20 border-blue-400/40 text-blue-300 hover:bg-blue-600/30"
            }`}
            title="Toggle cinema theater videos show"
          >
            <Video className="h-2.5 w-2.5 text-rose-400" />
            {isCinemaActive ? "🛑 Show Photos" : "🎬 Watch Videos"}
          </button>

          <button
            onClick={() => setHasLetterbox(prev => !prev)}
            className={`text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              hasLetterbox 
                ? "bg-blue-600/25 border-blue-400/40 text-blue-200" 
                : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
            }`}
            title="Aspect ratio Letterbox toggle (2.39:1 crop)"
          >
            🎥 Wide Bars: {hasLetterbox ? "ON" : "OFF"}
          </button>
          
          <button
            onClick={() => setHasFilmGrain(prev => !prev)}
            className={`text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              hasFilmGrain 
                ? "bg-amber-600/25 border-amber-400/40 text-amber-200" 
                : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
            }`}
            title="Analog film grain texture toggle"
          >
            🎞️ Grain: {hasFilmGrain ? "ON" : "OFF"}
          </button>

          <button
            onClick={() => setIsPlaying(prev => !prev)}
            className={`text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              isPlaying 
                ? "bg-emerald-600/20 border-emerald-400/30 text-emerald-300" 
                : "bg-slate-900 border-slate-800 text-rose-400 border-rose-500/20"
            }`}
            title="Toggle playback state (affects visual speeds)"
          >
            {isPlaying ? "⏺️ Playing" : "⏸️ Paused"}
          </button>
        </div>
      </div>

      {/* Main Immersive Projection Theatre Window */}
      <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-900 to-black border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between p-4 shadow-inner">
        
        {/* Left Projector Spotlight Light Flare Cone */}
        <div
          className="absolute top-0 left-12 h-[250px] w-[200px] sm:w-[240px] pointer-events-none transition-all duration-300 origin-top-left"
          style={{
            background: `radial-gradient(ellipse at top left, rgba(251, 191, 36, ${brightnessL / 320}) 0%, rgba(20, 20, 30, 0.28) 60%, rgba(0,0,0,0) 80%)`,
            transform: `rotate(${10 + (brightnessL - 75) / 10}deg) scale(${0.8 + brightnessL / 120})`,
            mixBlendMode: "screen",
          }}
        />

        {/* Right Projector Spotlight Light Flare Cone */}
        <div
          className="absolute top-0 right-12 h-[250px] w-[200px] sm:w-[240px] pointer-events-none transition-all duration-300 origin-top-right"
          style={{
            background: `radial-gradient(ellipse at top right, rgba(147, 197, 253, ${brightnessR / 320}) 0%, rgba(20, 20, 30, 0.28) 60%, rgba(0,0,0,0) 80%)`,
            transform: `rotate(${-10 + (brightnessR - 85) / 10}deg) scale(${0.8 + brightnessR / 120})`,
            mixBlendMode: "screen",
          }}
        />

        {/* Vintage Film Grain Overlay Effect */}
        {hasFilmGrain && (
          <div 
            className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-35" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              animation: isPlaying ? "grain 0.6s steps(6) infinite" : "none"
            }}
          />
        )}

        {/* Top Theatre Header Indicators */}
        <div className="z-20 flex justify-between items-center w-full">
          <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-mono bg-black/55 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/5">
            <span className={`w-1.5 h-1.5 rounded-full bg-rose-500 ${isPlaying ? "animate-ping" : ""}`} />
            PROJ A & B • {isPlaying ? "ONLINE" : "PAUSED"}
          </div>
          <span className="text-[8px] sm:text-[9px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 uppercase tracking-widest">
            {isCinemaActive ? "PLAYING STREAM" : "PHOTO ARCHIVE"}
          </span>
        </div>

        {/* Center Canvas */}
        <div className="z-10 w-full flex-grow flex items-center justify-center gap-4 px-2 sm:px-6 relative overflow-hidden">
          
          {/* Left Projector Screen (Photo 1) */}
          <motion.div
            className="flex-1 max-w-[155px] relative group/screen cursor-pointer"
            onMouseEnter={() => setHoveredScreen("left")}
            onMouseLeave={() => setHoveredScreen(null)}
            onClick={() => openPhotoModal(
              photoLeft, 
              "Soundarya — Behind The Scene I", 
              "Your expressions bring incredible natural truth to the cinema screen. Truly an artist of rare grace."
            )}
            animate={{ 
              x: isCinemaActive ? -250 : 0, 
              opacity: isCinemaActive ? 0 : 1,
              scale: isCinemaActive ? 0.35 : 1,
              pointerEvents: isCinemaActive ? "none" : "auto"
            }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hanging Cable Strings */}
            <div className="absolute -top-6 left-1/4 w-[1px] h-6 bg-slate-700/60" />
            <div className="absolute -top-6 right-1/4 w-[1px] h-6 bg-slate-700/60" />

            {/* Projection Frame Wrapper */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-1 sm:p-1.5 rounded-md shadow-2xl relative overflow-hidden transition-all duration-300 group-hover/screen:border-amber-400/60">
              <div className="absolute inset-0 bg-amber-500/[0.02] pointer-events-none group-hover/screen:bg-amber-300/[0.04]" />
              
              {/* Image element with reactive dial brightness & filter */}
              <div className="aspect-[4/3] bg-black rounded overflow-hidden relative">
                <img
                  src={photoLeft}
                  alt="Cinematic Preview Left"
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ filter: getFilterStyle(brightnessL) }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom film-strip sprocket dots */}
              <div className="flex justify-between items-center px-1 mt-1 font-mono text-[8px] text-slate-500">
                <span>REEL A-1350</span>
                <Maximize2 className="h-2 w-2 text-slate-400 hover:text-amber-400 transition-colors" />
              </div>
            </div>

            {/* Label Badge */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-950 font-mono text-[7px] text-amber-300 px-2 py-0.5 rounded border border-amber-400/20 opacity-0 group-hover/screen:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              Zoom Screen I
            </div>
          </motion.div>

          {/* Glowing Play Overlay Prompt in Middle */}
          {!isCinemaActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, shadow: "0px 0px 25px rgba(251,191,36,0.5)" }}
              onClick={() => {
                setIsCinemaActive(true);
                setIsPlaying(true);
                setIsVideoPlaying(true);
              }}
              className="absolute z-30 cursor-pointer bg-slate-950/90 border border-amber-400/30 p-4 sm:p-5 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.25)] flex flex-col items-center justify-center gap-1.5"
            >
              <Play className="h-6 sm:h-7 w-6 sm:w-7 text-amber-300 fill-amber-300 animate-pulse" />
              <span className="font-mono text-[8px] sm:text-[9px] text-amber-200 uppercase tracking-widest font-bold">
                PLAY ALL VIDEOS
              </span>
            </motion.div>
          )}

          {/* Interactive Cinema Video Projection Screen (revealed behind) */}
          <AnimatePresence>
            {isCinemaActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                className="absolute inset-0 z-20 flex flex-col justify-between bg-black/90 p-1 rounded-xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
                onMouseEnter={() => setHoveredScreen("video")}
                onMouseLeave={() => setHoveredScreen(null)}
              >
                <div className="absolute inset-2 pointer-events-none border border-amber-400/5 rounded h-full w-full max-w-[calc(100%-16px)] z-20" />
                
                {/* Curved Screen Aspect container */}
                <div className="relative w-full h-full flex-grow flex items-center justify-center rounded-lg overflow-hidden bg-black select-none group/player">
                  <video
                    ref={videoRef}
                    src={CINEMA_PLAYLIST[currentVideoIndex].url}
                    className="w-full h-full object-contain rounded-md"
                    style={{ filter: getFilterStyle(Math.max(brightnessL, brightnessR)) }}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleVideoEnded}
                    playsInline
                    autoPlay={isVideoPlaying}
                    muted={isVideoMuted}
                  />

                  {/* Dynamic room lights pulsing on film playback */}
                  {isVideoPlaying && (
                    <motion.div 
                      className="absolute inset-0 bg-amber-400/[0.04] mix-blend-color-dodge pointer-events-none"
                      animate={{ opacity: [0.02, 0.08, 0.02] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {/* Central Quick Indicator overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleVideoPlay(); }}
                      className="p-3 bg-black/60 rounded-full hover:bg-slate-900 border border-slate-700 hover:border-amber-400 cursor-pointer pointer-events-auto"
                    >
                      {isVideoPlaying ? <Pause className="h-5 w-5 text-amber-300" /> : <Play className="h-5 w-5 text-emerald-400 fill-emerald-400" />}
                    </button>
                  </div>

                  {/* Floating Controller overlay */}
                  <div className="absolute bottom-2.5 inset-x-2.5 bg-slate-950/90 backdrop-blur-md p-2 rounded-lg flex items-center justify-between gap-3 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 z-30 border border-white/5 shadow-2xl">
                    <button
                      onClick={toggleVideoPlay}
                      className="p-1 hover:bg-white/10 text-white rounded transition-colors cursor-pointer"
                      title={isVideoPlaying ? "Pause Video" : "Play Video"}
                    >
                      {isVideoPlaying ? <Pause className="h-3.5 w-3.5 text-amber-300" /> : <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />}
                    </button>

                    <button
                      onClick={handlePrevVideo}
                      className="p-1 hover:bg-white/10 text-slate-300 rounded transition-colors cursor-pointer"
                      title="Previous Reel"
                    >
                      <SkipBack className="h-3.5 w-3.5" />
                    </button>

                    {/* Progress tracking details */}
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-400 gap-2">
                        <span className="text-amber-200 capitalize truncate max-w-[130px]">
                          REEL A-{currentVideoIndex + 1}: {CINEMA_PLAYLIST[currentVideoIndex].title}
                        </span>
                        <span>
                          {formatTime(videoProgress)} / {formatTime(videoDuration)}
                        </span>
                      </div>
                      
                      {/* Live progress seek indicator */}
                      <input
                        type="range"
                        min="0"
                        max={videoDuration || 100}
                        value={videoProgress}
                        onChange={handleSeekChange}
                        className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-400 mt-1"
                      />
                    </div>

                    <button
                      onClick={handleNextVideo}
                      className="p-1 hover:bg-white/10 text-slate-300 rounded transition-colors cursor-pointer"
                      title="Next Reel"
                    >
                      <SkipForward className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1 hover:bg-white/10 text-white rounded transition-colors cursor-pointer"
                      title={isVideoMuted ? "Unmute sound" : "Mute sound"}
                    >
                      {isVideoMuted ? <VolumeX className="h-3.5 w-3.5 text-rose-400" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        enterFullScreenVideo();
                      }}
                      className="p-1 hover:bg-white/10 text-white rounded transition-colors cursor-pointer"
                      title="Watch in Full Screen Cinema"
                    >
                      <Maximize2 className="h-3.5 w-3.5 text-amber-300 hover:text-amber-200" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Projector Screen (Photo 2) */}
          <motion.div
            className="flex-1 max-w-[155px] relative group/screen cursor-pointer"
            onMouseEnter={() => setHoveredScreen("right")}
            onMouseLeave={() => setHoveredScreen(null)}
            onClick={() => openPhotoModal(
              photoRight, 
              "Soundarya — Behind The Scene II", 
              "Scaling great horizons. Watching you act doesn't feel like a performance; it is genuine aesthetic presence."
            )}
            animate={{ 
              x: isCinemaActive ? 250 : 0, 
              opacity: isCinemaActive ? 0 : 1,
              scale: isCinemaActive ? 0.35 : 1,
              pointerEvents: isCinemaActive ? "none" : "auto"
            }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hanging Cable Strings */}
            <div className="absolute -top-6 left-1/4 w-[1px] h-6 bg-slate-700/60" />
            <div className="absolute -top-6 right-1/4 w-[1px] h-6 bg-slate-700/60" />

            {/* Projection Frame Wrapper */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-1 sm:p-1.5 rounded-md shadow-2xl relative overflow-hidden transition-all duration-300 group-hover/screen:border-blue-400/60">
              <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none group-hover/screen:bg-blue-300/[0.04]" />
              
              {/* Image element with reactive dial brightness & filter */}
              <div className="aspect-[4/3] bg-black rounded overflow-hidden relative">
                <img
                  src={photoRight}
                  alt="Cinematic Preview Right"
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ filter: getFilterStyle(brightnessR) }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom film-strip sprocket dots */}
              <div className="flex justify-between items-center px-1 mt-1 font-mono text-[8px] text-slate-500">
                <span>REEL B-1411</span>
                <Maximize2 className="h-2 w-2 text-slate-400 hover:text-blue-400 transition-colors" />
              </div>
            </div>

            {/* Label Badge */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-950 font-mono text-[7px] text-blue-300 px-2 py-0.5 rounded border border-blue-400/20 opacity-0 group-hover/screen:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              Zoom Screen II
            </div>
          </motion.div>

        </div>

        {/* Black Letterbox Bars (Framer-motion powered slider) */}
        <AnimatePresence>
          {hasLetterbox && (
            <>
              {/* Top Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "26px" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 inset-x-0 bg-black z-15 border-b border-white/[0.03] select-none pointer-events-none"
              />
              {/* Bottom Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "26px" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 inset-x-0 bg-black z-15 border-t border-white/[0.03] select-none pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>

        {/* Bottom Slate Overlay: Cinematic Subtitle captions */}
        <div className="z-20 text-center w-full px-2">
          <p className="font-serif italic text-amber-200/90 text-[11px] sm:text-xs tracking-wide bg-black/60 backdrop-blur-[4px] py-1 px-3 rounded-full inline-block border border-white/5 select-none animate-pulse">
            {isCinemaActive && `"${CINEMA_PLAYLIST[currentVideoIndex].subtitle}"`}
            {!isCinemaActive && hoveredScreen === "left" && '"Capturing the subtle depth of your gaze..."'}
            {!isCinemaActive && hoveredScreen === "right" && '"Where dreams meet the magical canvas of Tollywood..."'}
            {!isCinemaActive && !hoveredScreen && '"Happy Birthday, Soundarya. Shining bright like a cinema screen."'}
          </p>
        </div>

        {/* Analog Camera Lens Lines bottom indicators */}
        <div className="absolute bottom-2 left-4 z-20 flex items-center gap-1.5 text-slate-500 text-[8px] sm:text-[9px] font-mono">
          <Film className={`h-2.5 w-2.5 text-red-500 ${isPlaying ? "animate-pulse" : ""}`} /> 
          SHM • 24 FPS • SHUTTER 180°
        </div>
      </div>


      {/* Retro Presets Panel */}
      <div className="mt-4 flex items-center justify-between gap-1.5 p-2 rounded-xl bg-slate-900/50 border border-white/[0.03]">
        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1">
          <Sliders className="h-3 w-3 text-blue-400" /> Presets:
        </span>
        <div className="flex gap-1">
          {(["vintage", "noir", "cyber", "raw"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`text-[8px] sm:text-[9px] font-mono uppercase px-2 py-1 rounded transition-all cursor-pointer ${
                filterMode === mode
                  ? "bg-amber-400 text-slate-950 font-bold"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Stage spotlight dials */}
      <div className="grid grid-cols-2 gap-4 mt-3 pt-3.5 border-t border-white/[0.04]">
        <div className="space-y-1">
          <label className="text-[9px] sm:text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Left Projector: {brightnessL}%
          </label>
          <input
            type="range"
            min="30"
            max="120"
            value={brightnessL}
            onChange={(e) => setBrightnessL(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] sm:text-[10px] font-mono text-slate-400 flex items-center gap-1 justify-end">
            Right Projector: {brightnessR}% <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          </label>
          <input
            type="range"
            min="30"
            max="120"
            value={brightnessR}
            onChange={(e) => setBrightnessR(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
        </div>
      </div>

      {/* Credit subtitle requested by user */}
      <div className="mt-4 pt-2 border-t border-white/[0.03] flex justify-end items-center text-[9px] font-mono tracking-widest text-slate-500 select-none">
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 bg-blue-500/80 rounded-full animate-pulse" />
          DEVELOPED BY FYP TEAM
        </span>
      </div>

      {/* FULL-SCREEN THEATRE VIEW MODAL LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Visual particle lights in background */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close instruction backdrop */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-slate-400 uppercase pointer-events-none bg-slate-900/60 px-4 py-2 border border-slate-800 rounded-full">
              Tap anywhere to close projection
            </div>

            {/* Immersive Film strip photo container */}
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-[500px] h-auto bg-slate-950 p-3 sm:p-5 border-y-8 border-x-2 border-slate-900 rounded-xl shadow-[0_50px_100px_rgba(0,0,0,0.9)] text-center flex flex-col gap-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()} // stop close on container tap
            >
              {/* Upper film camera indicators */}
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                  SCENE PLAYBACK
                </span>
                <span className="text-amber-400">100% EXPOSURE</span>
              </div>

              {/* Dynamic Aspect Ratio Box */}
              <div className="w-full aspect-[4/3] bg-black rounded-lg overflow-hidden border border-white/5 relative flex items-center justify-center">
                <img
                  src={selectedPhoto}
                  alt={selectedTitle}
                  className="w-full h-full object-contain"
                  style={{ filter: getFilterStyle(100) }}
                  referrerPolicy="no-referrer"
                />

                {/* Simulated Lens vignette */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none" />
                
                {/* Vintage Letterbox bars in preview */}
                {hasLetterbox && (
                  <>
                    <div className="absolute top-0 inset-x-0 h-8 bg-black pointer-events-none border-b border-white/5" />
                    <div className="absolute bottom-0 inset-x-0 h-8 bg-black pointer-events-none border-t border-white/5" />
                  </>
                )}
              </div>

              {/* Subtitles Overlay */}
              <div className="space-y-2 mt-1 sm:mt-2">
                <h4 className="font-display font-medium text-sm sm:text-base text-amber-200">
                  {selectedTitle}
                </h4>
                <p className="font-serif italic text-xs sm:text-[13px] text-slate-300 leading-relaxed max-w-sm mx-auto">
                  "{selectedSub}"
                </p>
              </div>

              {/* Action commands */}
              <div className="flex justify-between items-center pt-2.5 border-t border-slate-900 font-mono text-[8px] text-slate-500">
                <span>ZOOM ACTIVE</span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-amber-300 font-sans text-[10px] rounded hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
                >
                  Return to Theatre
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* FULL-SCREEN IMMERSIVE VIDEO CINEMA LIGHTBOX */}
        {isFullScreenVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 bg-slate-950/98 backdrop-blur-2xl text-white select-none overflow-y-auto sm:overflow-hidden md:flex-row md:items-stretch md:gap-6"
            onClick={exitFullScreenVideo}
          >
            {/* Ambient project lights */}
            <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

            {/* MAIN CINEMA SCREEN (LEFT PANEL) */}
            <div 
              className="flex-grow flex flex-col justify-center gap-4 relative z-10 md:w-3/4 max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Theater header info */}
              <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-white/[0.04] backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-300">
                    IMAX Projection Room • Reel {currentVideoIndex + 1}
                  </span>
                </div>
                <button
                  onClick={exitFullScreenVideo}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[9px] rounded-md hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                >
                  [Esc] Exit Theatre
                </button>
              </div>

              {/* Theater screen bezel */}
              <div className="relative w-full aspect-[2.39/1] sm:aspect-[16/9] md:aspect-[2.39/1] bg-black rounded-xl overflow-hidden border-2 border-slate-800 shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex items-center justify-center p-1 group/fsplayer">
                
                {/* Curved visual border */}
                <div className="absolute inset-2 pointer-events-none border border-amber-400/10 rounded h-full w-full max-w-[calc(100%-16px)] z-20" />

                <video
                  ref={fsVideoRef}
                  src={CINEMA_PLAYLIST[currentVideoIndex].url}
                  className="w-full h-full object-contain col-span-full row-span-full rounded-md"
                  style={{ filter: getFilterStyle(Math.max(brightnessL, brightnessR)) }}
                  onTimeUpdate={handleFsTimeUpdate}
                  onLoadedMetadata={handleFsLoadedMetadata}
                  onEnded={handleFsNextVideo}
                  playsInline
                  autoPlay={fsPlaying}
                  muted={fsMuted}
                />

                {/* Light reflection flicker */}
                {fsPlaying && (
                  <motion.div 
                    className="absolute inset-0 bg-white/[0.02] mix-blend-color-dodge pointer-events-none"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Noise filter */}
                {hasFilmGrain && (
                  <div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fsNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fsNoise)'/%3E%3C/svg%3E")`,
                      animation: fsPlaying ? "grain 0.5s steps(6) infinite" : "none"
                    }}
                  />
                )}

                {/* Central play overlay toggle */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <button 
                    onClick={toggleFsVideoPlay}
                    className="p-5 bg-black/80 rounded-full hover:bg-slate-900 border border-slate-700 hover:border-amber-400 cursor-pointer pointer-events-auto shadow-2xl transition-all"
                  >
                    {fsPlaying ? <Pause className="h-6 w-6 text-amber-300" /> : <Play className="h-6 w-6 text-emerald-400 fill-emerald-400" />}
                  </button>
                </div>
              </div>

              {/* Dynamic Subtitle banner */}
              <div className="text-center py-2 bg-gradient-to-r from-transparent via-black/80 to-transparent rounded px-4">
                <p className="font-serif italic text-amber-200/90 text-sm tracking-wide animate-pulse inline-block">
                  "{CINEMA_PLAYLIST[currentVideoIndex].subtitle}"
                </p>
              </div>

              {/* CONTROLS DESK */}
              <div className="bg-slate-900/80 p-3 sm:p-4 rounded-xl border border-white/[0.03] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* Playing buttons */}
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <button
                      onClick={handleFsPrevVideo}
                      className="p-2 hover:bg-white/5 active:scale-95 text-slate-300 rounded-lg border border-slate-800 transition-all cursor-pointer"
                      title="Previous Reel"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>

                    <button
                      onClick={toggleFsVideoPlay}
                      className="px-4 py-2 bg-slate-950 hover:bg-slate-800 active:scale-95 border border-slate-800 text-white rounded-lg flex items-center gap-2 transition-all cursor-pointer min-w-[100px] justify-center"
                    >
                      {fsPlaying ? (
                        <>
                          <Pause className="h-4.5 w-4.5 text-amber-300 shrink-0" />
                          <span className="font-mono text-xs text-amber-200 tracking-wider">PAUSE</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4.5 w-4.5 text-emerald-400 fill-emerald-400 shrink-0" />
                          <span className="font-mono text-xs text-emerald-300 tracking-wider">PLAY</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleFsNextVideo}
                      className="p-2 hover:bg-white/5 active:scale-95 text-slate-300 rounded-lg border border-slate-800 transition-all cursor-pointer"
                      title="Next Reel"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Seeker slider */}
                  <div className="flex-grow flex items-center justify-between gap-3 bg-slate-950/70 p-2 rounded-lg border border-white/[0.02]">
                    <span className="font-mono text-[10px] text-slate-400">
                      {formatTime(fsProgress)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={fsDuration || 100}
                      value={fsProgress}
                      onChange={handleFsSeekChange}
                      className="flex-grow h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                    <span className="font-mono text-[10px] text-slate-400">
                      {formatTime(fsDuration)}
                    </span>
                  </div>

                  {/* Audio Volume */}
                  <button
                    onClick={toggleFsMute}
                    className="p-2 sm:px-3 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-805 transition-colors flex items-center gap-1.5 self-center sm:self-auto cursor-pointer"
                    title={fsMuted ? "Unmute video" : "Mute video"}
                  >
                    {fsMuted ? (
                      <>
                        <VolumeX className="h-4 w-4 text-rose-500" />
                        <span className="font-mono text-[10px] text-rose-300 uppercase">MUTED</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4 text-emerald-400 animate-bounce" />
                        <span className="font-mono text-[10px] text-emerald-300 uppercase font-bold text-emerald-200">SOUND ON</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Preset Filters selector on Controls Desk */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase text-slate-400 flex items-center gap-1">
                      <Sliders className="h-3 w-3 text-sky-400" /> Dynamic Presets:
                    </span>
                    <div className="flex gap-1">
                      {(["vintage", "noir", "cyber", "raw"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setFilterMode(mode)}
                          className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded transition-all cursor-pointer ${
                            filterMode === mode
                              ? "bg-amber-400 text-slate-950 font-bold"
                              : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wide Bars and Film grain controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHasLetterbox(p => !p)}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                        hasLetterbox ? "bg-amber-400/20 border-amber-300/40 text-amber-200" : "bg-slate-950 border-slate-800 text-slate-500"
                      }`}
                    >
                      Letterbox {hasLetterbox ? "ON" : "OFF"}
                    </button>
                    <button
                      onClick={() => setHasFilmGrain(p => !p)}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                        hasFilmGrain ? "bg-amber-400/20 border-amber-300/40 text-amber-200" : "bg-slate-950 border-slate-800 text-slate-500"
                      }`}
                    >
                      Grain {hasFilmGrain ? "ON" : "OFF"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SELECTION PLAYLIST RACK (RIGHT PANEL) */}
            <div 
              className="flex-shrink-0 flex flex-col gap-3 relative z-10 w-full md:w-80 bg-slate-900/40 border border-white/[0.03] p-3 sm:p-4 rounded-xl backdrop-blur-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-white/[0.04] pb-2">
                <h4 className="font-sans font-bold text-xs text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Film className="h-3.5 w-3.5 text-amber-400" /> Cinema Playlist Reels
                </h4>
                <p className="text-[9px] font-mono text-slate-400">Click any reel below to project</p>
              </div>

              {/* Playlist reel rack */}
              <div className="flex flex-row md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[140px] md:max-h-[380px] pb-2 md:pb-0 scrollbar-thin">
                {CINEMA_PLAYLIST.map((item, idx) => {
                  const isActive = currentVideoIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentVideoIndex(idx);
                        setFsProgress(0);
                        setVideoProgress(0);
                        setFsPlaying(true);
                      }}
                      className={`flex-shrink-0 w-32 md:w-full p-2 rounded-lg border text-left transition-all relative overflow-hidden flex flex-col md:flex-row gap-2 cursor-pointer ${
                        isActive 
                          ? "bg-amber-400/10 border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.15)] scale-[0.98]" 
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-amber-400 rounded-full animate-ping" />
                      )}

                      {/* Side sprocket look */}
                      <div className="hidden md:flex flex-col justify-between items-center bg-slate-900/80 px-1 border-r border-slate-800 select-none">
                        {[1, 2, 3].map(n => (
                          <div key={n} className="h-1.5 w-1 bg-black rounded-sm border border-slate-850" />
                        ))}
                      </div>

                      <div className="flex-grow space-y-0.5">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
                          Reel A-0{idx + 1}
                        </div>
                        <div className={`font-sans font-medium text-[11px] truncate ${isActive ? "text-amber-200" : "text-slate-200"}`}>
                          {item.title}
                        </div>
                        <p className="text-[8px] text-slate-400 truncate max-w-[120px] md:max-w-[200px]">
                          {item.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back out controller */}
              <div className="mt-auto pt-3 border-t border-slate-800/60 flex flex-col gap-2">
                <button
                  onClick={exitFullScreenVideo}
                  className="w-full py-2 bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-[0_4px_15px_rgba(251,191,36,0.25)]"
                >
                  <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
                  Return to Studio Room
                </button>

                <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 uppercase tracking-widest px-1 mt-1">
                  <span>CINEMA SCREEN ACTIVE</span>
                  <span className="flex items-center gap-1">
                    <span className="h-1 w-1 bg-sky-500 rounded-full animate-pulse" />
                    FYP TEAM
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 5. CINEMATIC SCRAPBOOK SLIDER (CHAPTER 9 UPGRADE)
// ==========================================
interface ScrapbookItem {
  tag: string;
  sceneName: string;
  description: string;
  reflection: string;
  colorClass: string;
}

const CINEMATIC_HIGHLIGHTS: ScrapbookItem[] = [
  {
    tag: "Natural Grace",
    sceneName: "The Serial Debut",
    description: "Your expressions bring so much authenticity and life to the character on screen. It is an extraordinary talent.",
    reflection: "Honestly, your screen presence is stunning. Watching you act doesn't feel like a performance; it feels like real grace.",
    colorClass: "border-amber-400/25 bg-amber-950/20 text-amber-300"
  },
  {
    tag: "Captivating Emotion",
    sceneName: "The Cinematic Depth",
    description: "Every emotion expressed in your eyes communicates a complete silent paragraph. That depth is extremely rare for an artist.",
    reflection: "When I see your triumph on screen, a quiet wave of genuine pride travels deep inside my soul.",
    colorClass: "border-blue-500/25 bg-blue-950/20 text-blue-300"
  },
  {
    tag: "A Star Reaches High",
    sceneName: "Scaling Great Peaks",
    description: "No matter what hills lay in the past, your future is designed for brilliant galaxies and cinematic canvases.",
    reflection: "Keep shining, keep smiling, and keep believing in your art. You deserve every success coming your way.",
    colorClass: "border-purple-400/25 bg-purple-950/20 text-purple-300"
  }
];

export const CinemaScrapbookSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % CINEMATIC_HIGHLIGHTS.length);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + CINEMATIC_HIGHLIGHTS.length) % CINEMATIC_HIGHLIGHTS.length);
  };

  return (
    <div className="w-full glass-panel p-5 sm:p-6 rounded-2xl border border-rose-500/10 shadow-xl space-y-4 relative overflow-hidden" id="scrapbook-slides">
      <div className="absolute top-0 left-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex justify-between items-center border-b border-white/[0.05] pb-2.5">
        <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold flex items-center gap-1.5">
          <Camera className="h-4 w-4 text-amber-400 animate-pulse" /> Cinematic Highlights
        </span>
        <span className="text-[9px] font-mono text-slate-500">
          Highlight {activeTab + 1} of {CINEMATIC_HIGHLIGHTS.length}
        </span>
      </div>

      <div className="relative min-h-[175px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className={`text-[8px] sm:text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${CINEMATIC_HIGHLIGHTS[activeTab].colorClass}`}>
                {CINEMATIC_HIGHLIGHTS[activeTab].tag}
              </span>
              <span className="text-xs font-mono text-slate-400">
                — {CINEMATIC_HIGHLIGHTS[activeTab].sceneName}
              </span>
            </div>

            <p className="font-serif italic text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              "{CINEMATIC_HIGHLIGHTS[activeTab].description}"
            </p>

            <p className="text-[11px] sm:text-xs text-slate-400 font-mono italic border-l-2 border-white/10 pl-3 pt-0.5">
              Reflection: {CINEMATIC_HIGHLIGHTS[activeTab].reflection}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Carousel buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-white/[0.04]">
          <div className="flex gap-1.5">
            {CINEMATIC_HIGHLIGHTS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveTab(dotIdx)}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === dotIdx ? "bg-amber-400 w-3" : "bg-slate-700 hover:bg-slate-500"
                }`}
                title={`View slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevTab}
              className="p-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 active:scale-90 transition-all cursor-pointer"
              title="Previous Highlights"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextTab}
              className="p-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 active:scale-90 transition-all cursor-pointer"
              title="Next Highlights"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. CINEMATIC LIVING PORTRAIT PANEL (EXACT ORIGINAL PHOTOS)
// ==========================================
export const BirthdayLivingPanel: React.FC = () => {
  const [isGazing, setIsGazing] = useState<boolean>(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; scale: number; duration: number }[]>([]);
  const [loveCount, setLoveCount] = useState<number>(0);

  // Generate magical sparkles/ambient gold dust in background
  const [sparks, setSparks] = useState<{ id: number; left: number; top: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const list = Array.from({ length: 18 }, (_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2.5,
      duration: Math.random() * 5 + 4,
      size: Math.random() * 2.5 + 1.2,
    }));
    setSparks(list);
  }, []);

  // Soft touch/hover interactions
  const handleStartGaz = () => setIsGazing(true);
  const handleEndGaz = () => setIsGazing(false);

  // Add highly fluid heart particle streamers on interactions
  const launchHearts = () => {
    setLoveCount((prev) => prev + 1);
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.random() * 80 + 10, // random offset across percent width
      scale: Math.random() * 0.45 + 0.6,
      duration: Math.random() * 2 + 1.8,
    }));
    setHearts((prev) => [...prev, ...newHearts].slice(-32)); // keep last 32 elements to preserve performance
  };

  // Auto clean stale heart particles
  useEffect(() => {
    if (hearts.length === 0) return;
    const timer = setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id > Date.now() - 4000));
    }, 4000);
    return () => clearTimeout(timer);
  }, [hearts]);

  return (
    <div 
      className="w-full relative py-2" 
      id="birthday-living-portrait-wrapper"
    >
      {/* Visual background lights halo */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-r from-amber-500/10 via-rose-500/8 to-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Primary Immersive Portrait Frame Container */}
      <div 
        className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5.5] mx-auto bg-[#08060a] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-amber-500/15 group select-none cursor-pointer"
        onMouseEnter={handleStartGaz}
        onMouseLeave={handleEndGaz}
        onTouchStart={handleStartGaz}
        onTouchEnd={handleEndGaz}
        onClick={launchHearts}
      >
        {/* Dynamic transition background layers */}
        <div className="absolute inset-0 z-0">
          {/* Layer 1: Eyes Closed (Warm Atmosphere resting pose) */}
          <img 
            src={soundaryaClosed} 
            alt="Soundarya Resting" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-100 group-hover:scale-[1.025] transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Layer 2: Eyes Open - Absolute Crossfade triggered on Gaze state change */}
          <AnimatePresence>
            {isGazing && (
              <motion.img 
                key="soundarya-active-eyes"
                src={soundaryaOpen} 
                alt="Soundarya Active Glance" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                referrerPolicy="no-referrer"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Cinematic Vignette Overlay to ensure legibility and dramatic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/70 opacity-80 z-10 pointer-events-none" />

        {/* Ambient Floating Dust / Solar Gold Flecks particles */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-60">
          {sparks.map((sp) => (
            <motion.div
              key={sp.id}
              className="absolute bg-gradient-to-r from-amber-400 to-rose-400 rounded-full blur-[0.5px]"
              style={{
                left: `${sp.left}%`,
                top: `${sp.top}%`,
                width: `${sp.size}px`,
                height: `${sp.size}px`,
              }}
              animate={{
                y: [0, -140],
                opacity: [0, 0.95, 0],
                scale: [0.75, 1.25, 0.6],
              }}
              transition={{
                duration: sp.duration,
                repeat: Infinity,
                delay: sp.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Holographic lens scratch lines / light beams sweep */}
        <motion.div 
          className="absolute left-0 right-0 h-16 bg-gradient-to-b from-[#f59e0b]/0 via-[#f59e0b]/8 to-[#f59e0b]/0 z-15 pointer-events-none"
          animate={{ top: ["5%", "85%", "5%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rising heart stream trigger layer */}
        <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                className="absolute text-rose-500 fill-rose-500 font-sans select-none text-2xl filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                style={{
                  left: `${h.x}%`,
                  bottom: "35%",
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.9, 0], 
                  scale: [h.scale * 0.4, h.scale, h.scale * 1.3, h.scale * 0.8], 
                  y: -250,
                  x: Math.sin(h.id) * 45 // beautiful side-to-side drift
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: h.duration, ease: "easeOut" }}
              >
                ❤️
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Elegant top floating badge indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          <span className="backdrop-blur-xl bg-black/45 border border-white/10 px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase text-amber-200 shadow-xl flex items-center gap-1.5 leading-none">
            <Sparkles className="h-2.5 w-2.5 animate-spin text-amber-400" />
            {isGazing ? "Shared Gaze Active" : "Interactive Portrait"}
          </span>
        </div>

        {/* Embedded Birthday Greeting Card styled directly on top of the original portrait */}
        <div className="absolute inset-x-4 bottom-4 z-20 flex flex-col items-center">
          <motion.div 
            className="w-full backdrop-blur-[14px] bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5 text-center space-y-3.5 shadow-2xl relative overflow-hidden group/card"
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.3 }}
          >
            {/* Soft backdrop golden glow */}
            <div className="absolute -inset-10 bg-radial-gradient from-amber-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Emojis rows with fancy custom entries */}
            <div className="flex gap-2.5 justify-center text-sm">
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}>🕯️</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>🎈</motion.span>
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>🕯️</motion.span>
            </div>

            {/* Birthday Greeting Message */}
            <p className="font-serif italic text-amber-100/95 text-xs sm:text-[13px] leading-relaxed max-w-xs mx-auto drop-shadow-md">
              "Happy Birthday, Soundarya. May happiness, success, and beautiful memories follow you wherever life takes you."
            </p>

            {/* Interactive hint footer */}
            <div className="pt-1 select-none pointer-events-none border-t border-white/[0.06]">
              <p className="text-[9px] font-mono tracking-wider uppercase text-slate-400/90 flex items-center justify-center gap-1">
                {isGazing ? (
                  <span className="text-amber-400 font-bold animate-pulse">👁️ Sharing her living look with you...</span>
                ) : (
                  <span>👇 Tap here</span>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Counter showing number of shared birthdays wishes */}
      {loveCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-3 text-[10px] font-mono text-rose-400 flex items-center justify-center gap-1.5"
        >
          <span>❤️ Gifted {loveCount} birthday blessing{loveCount > 1 ? "s" : ""}</span>
        </motion.div>
      )}
    </div>
  );
};



