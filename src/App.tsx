import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Heart, 
  Play, 
  Award, 
  Calendar, 
  Star, 
  Compass, 
  ArrowRight,
  BookOpen,
  Volume2,
  X,
  Send
} from "lucide-react";

import { STORY_SECTIONS } from "./data";
import { BackgroundCanvas } from "./components/BackgroundCanvas";
import { ProceduralMusic } from "./components/ProceduralMusic";
import { 
  InteractiveGreetingCard, 
  AirplaneAnimation, 
  CinemaStageSpotlight,
  CinemaScrapbookSlider,
  BirthdayLivingPanel
} from "./components/SpecialInteractiveElements";

// Utility to parse emojis in text and render them inside premium glossy iOS style elements
const renderWithIOSEmojis = (text: string) => {
  if (!text) return "";
  // High fidelity emoji matcher regex supporting variations and modifiers
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?)/gu;
  
  const parts = text.split(emojiRegex);
  if (!parts || parts.length <= 1) return text;
  
  return parts.map((part, index) => {
    // Reset regex index state since the global flag is set
    emojiRegex.lastIndex = 0;
    const isEmoji = emojiRegex.test(part);
    
    if (isEmoji) {
      return (
        <span 
          key={index} 
          className="inline-block mx-0.5 filter drop-shadow-[0_2.5px_4.5px_rgba(0,0,0,0.55)] scale-115 hover:scale-135 active:scale-150 transition-all font-['Apple_Color_Emoji','Segoe_UI_Emoji','Noto_Color_Emoji','Segoe_UI_Symbol'] saturate-[1.3] antialiased select-none cursor-pointer align-middle"
          style={{ 
            textShadow: "0 0 1px rgba(255,255,255,0.3)",
            lineHeight: "1"
          }}
          title="iOS Glazed Style"
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

export default function App() {
  const [hasBegun, setHasBegun] = useState<boolean>(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showMusicNotification, setShowMusicNotification] = useState<boolean>(false);

  // Chapter resonance & interactive heart tracker states
  const [chapterResonance, setChapterResonance] = useState<Record<number, number>>({
    0: 412, 1: 524, 2: 785, 3: 631, 4: 719, 5: 938, 6: 1052, 7: 1391, 8: 1184, 9: 1642
  });
  const [resonatedChapters, setResonatedChapters] = useState<Record<number, boolean>>({});

  // Establish live Server-Sent Events (SSE) stream on mount for real-time multiplayer resonance
  useEffect(() => {
    let sse: EventSource | null = null;
    let retryTimeout: any = null;

    const connectSSE = () => {
      sse = new EventSource("/api/resonance/stream");

      sse.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed && typeof parsed === "object") {
            setChapterResonance(parsed);
          }
        } catch (err) {
          console.error("SSE parse error", err);
        }
      };

      sse.onerror = (err) => {
        console.warn("SSE connection interrupted, retrying in 3s...", err);
        if (sse) sse.close();
        retryTimeout = setTimeout(connectSSE, 3000);
      };
    };

    connectSSE();

    return () => {
      if (sse) sse.close();
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  const handleResonateWithChapter = (index: number, title: string) => {
    if (resonatedChapters[index]) return;
    playLuxuryChime();
    
    // Spawn floating lantern with heart emoji and clean title
    const cleanTitle = title.replace(/[&'"]/g, "").slice(0, 16);
    window.dispatchEvent(new CustomEvent("spawn_custom_lantern", {
      detail: { wish: `❤️ Resonated: ${cleanTitle}` }
    }));

    // Optimistically increment state locally
    setChapterResonance(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + 1
    }));
    setResonatedChapters(prev => ({
      ...prev,
      [index]: true
    }));

    // Commit resonance to the server which saves to disk and broadcasts to all clients in real-time
    fetch("/api/resonance/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ index })
    }).catch(err => {
      console.error("Failed to commit resonance:", err);
    });
  };

  // References for section observation
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update active section based on scroll position - with debounced responsiveness
  useEffect(() => {
    if (!hasBegun) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }

      // Check which section is in center view - fine-tuned threshold for mobile screens
      const viewportMiddle = window.scrollY + window.innerHeight * 0.45;
      
      let currentActiveIdx = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (viewportMiddle >= top && viewportMiddle <= bottom) {
            currentActiveIdx = i;
            break;
          }
        }
      }
      setActiveSectionIdx(currentActiveIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasBegun]);

  const activeSection = STORY_SECTIONS[activeSectionIdx] || STORY_SECTIONS[0];
  const activeTheme = activeSection.theme;

  const beginJourney = () => {
    setHasBegun(true);
    setShowMusicNotification(true);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("start_tribute_music"));
    }, 100);
    setTimeout(() => {
      setShowMusicNotification(false);
    }, 5500);
  };

  const playLuxuryChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } catch (err) {
      console.warn("Chime skipped:", err);
    }
  };

  const scrollToNextSection = (index: number) => {
    const nextEl = sectionRefs.current[index];
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-rose-500/30 selection:text-rose-300">
      
      {/* Dynamic Ambient Background Canvas */}
      <BackgroundCanvas theme={activeTheme} />

      {/* Procedural Soundtrack Controller */}
      <AnimatePresence>
        {hasBegun && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ProceduralMusic />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Sound Suggestion Notification (5-6 Second Duration) */}
      <AnimatePresence>
        {showMusicNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100%-2rem)] mx-auto overflow-hidden pointer-events-auto"
          >
            <div className="glass-panel p-4 rounded-2xl border border-amber-400/35 bg-slate-950/92 backdrop-blur-xl shadow-[0_15px_40px_rgba(251,191,36,0.18)] text-left relative overflow-hidden flex flex-col gap-3">
              {/* Dynamic countdown visual line at the top of the card */}
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5.5, ease: "linear" }}
                className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"
              />

              <div className="flex items-start gap-3 pt-1">
                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 shrink-0 relative">
                  <Volume2 className="h-4.5 w-4.5 animate-bounce" />
                  <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                </div>

                <div className="space-y-1 select-none">
                  <h4 className="font-display font-black text-[11px] sm:text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    🎧 Optimal Experience
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-300 font-mono tracking-wide leading-relaxed">
                    Put on headphones or enable the background song for an immersive, deeply emotional chronological journey of Soundarya's special tribute.
                  </p>
                </div>

                <button
                  onClick={() => setShowMusicNotification(false)}
                  className="p-1 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-full cursor-pointer shrink-0"
                  title="Dismiss notification"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Directly activate sound by user gesture (circumvents browser autoplay blocking) */}
              <div className="flex items-center gap-2 mt-1 justify-between bg-slate-900/50 p-2 rounded-xl border border-white/[0.03]">
                <div className="flex items-center gap-1.5 pr-1">
                  {/* Mini bouncing sound bar animation */}
                  <div className="flex items-end gap-0.5 h-3">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <motion.span
                        key={val}
                        animate={{ height: ["20%", "100%", "20%"] }}
                        transition={{ duration: 0.4 + val * 0.1, repeat: Infinity, ease: "easeInOut" }}
                        className="w-0.5 bg-amber-400 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono tracking-widest uppercase text-amber-200">Song is Armed</span>
                </div>
                
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("start_tribute_music"));
                    setShowMusicNotification(false);
                  }}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-[9px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  Enable Song 🎵
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!hasBegun ? (
          // ==========================================
          // OPENING SCREEN (HERO SPOTLIGHT) - MOBILE ENHANCED
          // ==========================================
          <motion.div
            key="opening-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="min-h-screen flex flex-col justify-between items-center px-4 py-6 sm:py-8 relative overflow-hidden"
            id="opening-hero"
          >
            {/* Celestial backglow decorations for subtle high-end luxury */}
            <div className="celestial-glow" />
            <div className="celestial-orbit" />

            {/* Top decorative glass chip */}
            <div className="w-full max-w-xl text-center pt-6 sm:pt-8 relative z-10">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-amber-300 bg-amber-400/10 px-3 sm:px-4 py-1.5 rounded-full border border-amber-400/20 shadow-inner inline-flex items-center gap-1">
                {renderWithIOSEmojis("💝")} Words From Someone's Heart
              </span>
            </div>

            {/* Core Titles */}
            <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6 max-w-2xl relative z-10 w-full px-2 mt-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                className="space-y-2.5 sm:space-y-3"
              >
                <h1 className="font-display font-extrabold text-4xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 drop-shadow-[0_4px_16px_rgba(245,158,11,0.15)] animate-gold-shimmer">
                  To Soundarya
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-amber-100/90 tracking-wide font-medium">
                  {renderWithIOSEmojis('"The story that remained unspoken..." 🤫❤️')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              />

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9 }}
                className="text-xs sm:text-sm text-slate-300/90 font-mono tracking-wide max-w-md leading-relaxed"
              >
                At times, the deepest words are those left unsaid. This is an interactive chronological journey about a secret admiration, painful trials, resilience, and ultimate rebirth.
              </motion.p>
            </div>

            {/* Core Action triggers */}
            <div className="w-full max-w-xl mx-auto text-center relative z-10 px-2 mt-3 mb-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 90 }}
                className="pt-2"
              >
                <button
                  onClick={beginJourney}
                  id="begin-journey-btn"
                  className="group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-display font-bold text-xs sm:text-sm uppercase tracking-widest text-[#0e1017] bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-200 transition-all shadow-xl shadow-amber-500/10 active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto"
                >
                  <Play className="h-4 w-4 fill-current mr-1 text-[#0e1017]" />
                  Begin Journey
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Footer indicators */}
            <div className="w-full text-center text-[10px] font-mono text-slate-400/75 max-w-md border-t border-white/[0.04] pt-4 flex justify-between items-center px-4">
              <span>EST. TIME: ~5-7 MINS</span>
              <span>WRITTEN BY SOMEONE</span>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b121c]/40 via-transparent to-[#100c14]/40 -z-20" />
          </motion.div>
        ) : (
          // ==========================================
          // MAIN TIMELINE STORY TELLING INTERFACE
          // ==========================================
          <motion.div
            key="timeline-storyboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative pb-24 md:pb-32"
          >
            {/* Reading Scroll Progress Ribbon */}
            <div className="fixed top-0 inset-x-0 h-1 bg-slate-900/50 z-50">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 transition-all duration-100 shadow-[0_1px_8px_rgba(245,158,11,0.5)]"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* Reading Timeline Navigator - Hidden on Mobile */}
            <div className="fixed top-24 left-3 lg:left-6 z-40 hidden md:flex flex-col gap-4 w-48 lg:w-56 select-none">
              <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/30 backdrop-blur-md shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.03]">
                  <span className="text-[9px] font-mono tracking-widest text-amber-300 uppercase font-black flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 animate-spin text-amber-400" style={{ animationDuration: "12s" }} /> Chronicle Road
                  </span>
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider">MAP</span>
                </div>
                
                <div className="pl-1 space-y-3 relative">
                  {/* Dynamic scroll progress trace bar overlaying the vertical tracker line */}
                  <div className="w-[1.5px] bg-slate-800/85 absolute left-2 top-2 bottom-2 rounded-full" />
                  <div 
                    className="w-[1.5px] bg-gradient-to-b from-amber-400 via-rose-500 to-indigo-500 absolute left-2 top-2 rounded-full transition-all duration-300" 
                    style={{ height: `${(activeSectionIdx / (STORY_SECTIONS.length - 1)) * 94}%`, minHeight: "5px" }}
                  />

                  {STORY_SECTIONS.map((sec, idx) => {
                    const isPassed = idx < activeSectionIdx;
                    const isActive = idx === activeSectionIdx;
                    const indicators = ["🌅", "👀", "✉️", "🛑", "🏚️", "🌱", "✈️", "🎂", "🌟", "🕊️"];
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToNextSection(idx)}
                        className="group flex items-center gap-3 w-full text-left focus:outline-none select-none relative py-1 cursor-pointer"
                      >
                        {/* Interactive state indicator point */}
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 z-10 transition-all text-[8px] font-mono">
                          {isActive ? (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
                            </span>
                          ) : isPassed ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                          ) : (
                            <div className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-slate-500" />
                          )}
                        </div>

                        {/* Beautiful Sliding active glass pill/cap */}
                        {isActive && (
                          <motion.div
                            layoutId="active-chapter-pill"
                            className="absolute inset-0 -left-1.5 right-[-8px] bg-amber-400/[0.04] border-l border-amber-400/80 rounded-r-lg -z-10"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}

                        <div className="flex flex-col min-w-0 pr-1 pl-1">
                          <span className={`text-[10px] font-mono leading-tight tracking-wide uppercase transition-colors truncate ${
                            isActive 
                              ? "text-amber-300 font-bold" 
                              : isPassed 
                                ? "text-slate-300/85" 
                                : "text-slate-500 group-hover:text-slate-400"
                          }`}>
                            {sec.title}
                          </span>
                          <span className="text-[7px] font-mono text-slate-500/90 tracking-wider">
                            {indicators[idx]} CH {idx + 1} • {sec.timeEstimate}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Integrated Progress feedback box */}
                <div className="pt-2 border-t border-white/[0.03] text-[9.5px] font-mono text-slate-300 space-y-1.5 pl-1">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Reading Status:</span>
                    <span className="text-amber-300 font-bold text-[10.5px] tracking-wide">{Math.round(scrollProgress * 100)}%</span>
                  </div>
                  
                  {/* Subtle decorative progress loader */}
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden border border-white/[0.02]">
                    <div 
                      className="bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400 h-full transition-all duration-300"
                      style={{ width: `${scrollProgress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Header indicator - Beautifully glassmorphed sticky band */}
            <div className="sticky top-2 inset-x-0 z-30 md:hidden px-3.5 py-1 flex items-center justify-center">
              <span className="glass-panel text-[10px] font-mono tracking-wider text-amber-200 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/20 shadow-lg flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-amber-400" /> Chapter {activeSectionIdx + 1} of {STORY_SECTIONS.length} • {activeSection.timeEstimate}
              </span>
            </div>

            {/* ==========================================
                CHRONOLOGICAL PARAGRAPH BLOCKS
               ========================================== */}
            <div className="max-w-xl sm:max-w-2xl mx-auto px-4 md:px-0 pt-10 md:pt-24 space-y-24 sm:space-y-32 relative z-10">
              
              {STORY_SECTIONS.map((sec, idx) => {
                return (
                  <div
                    key={sec.id}
                    ref={(el) => { sectionRefs.current[idx] = el; }}
                    className="relative focus:outline-none"
                    id={`story-section-${sec.id}`}
                  >
                    {/* Chapter marker pill */}
                    <div className="flex items-center gap-2 mb-3.5">
                      <span className="text-[9px] font-mono tracking-widest text-[#0e1017] bg-amber-400 font-extrabold uppercase px-2 py-0.5 rounded shadow">
                        Chapter 0{idx + 1}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">— {sec.timeEstimate}</span>
                    </div>

                    {/* Stage Headings with Cinematic Fade and Slides */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.7 }}
                      className="space-y-1 mb-6 sm:mb-8"
                    >
                      <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight bg-gradient-to-r from-amber-200 via-amber-100 to-slate-100 bg-clip-text text-transparent">
                        {sec.title}
                      </h2>
                      <p className="font-serif italic text-sm sm:text-base text-amber-300/80 font-medium tracking-wide">
                        {sec.subtitle}
                      </p>
                    </motion.div>

                    {/* Story paragraphs block inside glass panel */}
                    <div className="space-y-5 sm:space-y-6">
                      {sec.paragraphs.map((p, pIdx) => {
                        const isFirstParagraph = pIdx === 0;
                        return (
                          <motion.p
                            key={pIdx}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-12%" }}
                            transition={{ duration: 0.75, delay: pIdx * 0.1 }}
                            className={`text-sm sm:text-base md:text-lg leading-relaxed text-slate-300/95 font-sans tracking-wide border-l-2 border-white/5 pl-3.5 sm:pl-4 hover:border-amber-400/30 transition-all ${
                              isFirstParagraph 
                                ? "first-letter:float-left first-letter:text-4xl first-letter:sm:text-5xl first-letter:font-serif first-letter:font-extrabold first-letter:text-amber-400 first-letter:mr-3 first-letter:leading-none first-letter:mt-1" 
                                : ""
                            }`}
                          >
                            {renderWithIOSEmojis(p)}
                          </motion.p>
                        );
                      })}
                    </div>

                    {/* ==========================================
                        RENDER SPECIAL INTERACTIVE WIDGETS
                       ========================================== */}
                    
                    {/* Greeting card incident occurs at Section Index 2 */}
                    {idx === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="pt-4"
                      >
                        <InteractiveGreetingCard />
                      </motion.div>
                    )}



                    {/* Airplane path occurs at Section Index 6 */}
                    {idx === 6 && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="pt-3"
                      >
                        <AirplaneAnimation />
                      </motion.div>
                    )}

                    {/* Cinematic theme lighting for Soundarya occurs at Section Index 8 (Chapter 9) */}
                    {idx === 8 && (
                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="pt-6 sm:pt-8 space-y-6"
                      >
                        {/* Two elegant widgets stack for the improved Chapter 9 experience */}
                        <CinemaScrapbookSlider />
                        <CinemaStageSpotlight />
                      </motion.div>
                    )}

                    {/* Birthday Atmosphere Candles occurs at Section Index 7 */}
                    {idx === 7 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="pt-6 sm:pt-8"
                      >
                        <BirthdayLivingPanel />
                      </motion.div>
                    )}

                    {/* Final Signature write-out and floating lantern trigger at Section Index 9 */}
                    {idx === 9 && (
                      <div className="pt-10 text-center space-y-6 sm:space-y-8" id="closing-signature">
                        <div className="w-12 h-0.5 bg-slate-800 mx-auto" />
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5, duration: 1.4 }}
                          className="space-y-1.5"
                        >
                          <div className="text-slate-400 font-serif italic text-xs sm:text-sm">
                            With endless belief and hope,
                          </div>
                          <h4 className="text-rose-400/95 font-display font-bold text-2xl sm:text-3xl tracking-widest pl-1">
                            — Someone
                          </h4>
                        </motion.div>

                        <div className="flex flex-col items-center gap-1 opacity-25 hover:opacity-100 transition-opacity">
                          <Star className="h-3.5 w-3.5 text-amber-300 animate-spin" style={{ animationDuration: "20s" }} />
                          <span className="text-[8px] font-mono text-slate-500 select-none uppercase tracking-widest">
                            Lanterns are rising into the eternal night...
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Chapter End Marker & Interactive Resonance Deck */}
                    <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.04]">
                      <div className="flex items-center gap-2.5">
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleResonateWithChapter(idx, sec.title)}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all border cursor-pointer select-none ${
                            resonatedChapters[idx]
                              ? "bg-amber-400 border-amber-300 text-[#0e1017] font-black shadow-[0_0_12px_rgba(251,191,36,0.3)] animate-pulse"
                              : "bg-slate-950/60 border-white/5 text-slate-400 hover:text-amber-200 hover:border-amber-400/30"
                          }`}
                        >
                          <Heart className={`h-3 w-3 ${resonatedChapters[idx] ? "fill-current text-[#0e1017] scale-110" : "text-amber-400"}`} />
                          {resonatedChapters[idx] ? "Shared resonance 💝" : "Send Silent Heartbeat"}
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-1.5 opacity-30 select-none hidden sm:flex">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
                        <Sparkles className="h-2.5 w-2.5 text-amber-300 animate-pulse" />
                        <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
                      </div>
                    </div>

                    {/* Scroll assistant at the bottom of each narrative card */}
                    {idx < STORY_SECTIONS.length - 1 && (
                      <div className="flex justify-end pt-8">
                        <button
                          onClick={() => scrollToNextSection(idx + 1)}
                          className="group flex items-center gap-1.5 text-[11px] font-mono text-slate-500 hover:text-amber-300 transition-colors focus:outline-none cursor-pointer"
                        >
                          Scroll to next chapter
                          <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

            {/* Persistent bottom footer showing a replay option */}
            <div className="mt-32 text-center pb-20 max-w-md mx-auto px-4 border-t border-white/[0.04] pt-8 space-y-4" id="timeline-footer">
              <div>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setTimeout(() => setHasBegun(false), 900);
                  }}
                  className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-amber-300 hover:text-amber-200 uppercase font-mono tracking-widest bg-slate-900 border border-slate-800 px-4 py-2 rounded-full hover:border-amber-400/20 active:scale-95 transition-all shadow cursor-pointer"
                >
                  Replay Journey
                </button>
              </div>

              <div className="pt-2 text-[9px] font-mono text-slate-500/70 tracking-widest uppercase">
                Developed by FYP Team
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
