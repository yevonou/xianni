import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './Navbar';
import { ContactButton } from './ContactButton';
import { HERO_VIDEO_SRC, HERO_POSTER_SRC, HERO_POSTER_FRAMES } from '../constants/assets';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const mediaShellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryBlockRef = useRef<HTMLDivElement>(null);
  const roleLabelRef = useRef<HTMLDivElement>(null);
  const studioFeedRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const accentDotRef = useRef<HTMLSpanElement>(null);

  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Initialize GSAP ScrollTrigger after video metadata or fallback is ready
  const initScrollTrigger = useCallback(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsReducedMotion(true);
      return;
    }

    const video = videoRef.current;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Pin distance: allow smooth scroll scrub through video duration
      const pinDistance = '+=240%';

      // 1. Video frame-by-frame scrub animation
      if (video && video.duration > 0) {
        // Ensure video is paused, muted, and at start frame
        video.pause();
        video.currentTime = 0;

        // Virtual object to animate currentTime with GSAP scrub
        const videoObj = { currentTime: 0 };

        gsap.to(videoObj, {
          currentTime: video.duration,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: pinDistance,
            scrub: true,
            onUpdate: () => {
              if (video && isFinite(videoObj.currentTime)) {
                video.currentTime = videoObj.currentTime;
              }
            },
          },
        });
      }

      // 2. Coordinated timeline for hero layout, parallax, and pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: pinDistance,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Video scale subtle zoom-out parallax: from 1.04 down to 1.0
      tl.fromTo(
        mediaShellRef.current,
        { scale: 1.04 },
        { scale: 1.0, ease: 'none', duration: 0.8 },
        0
      );

      // Hero text subtle upward parallax: moves slightly upward during scroll
      tl.to(
        headingRef.current,
        { y: -36, ease: 'none', duration: 0.8 },
        0
      );

      tl.to(
        summaryBlockRef.current,
        { y: -24, ease: 'none', duration: 0.8 },
        0
      );

      // Slower moving micro-decorations (slower parallax)
      if (roleLabelRef.current) {
        tl.to(
          roleLabelRef.current,
          { y: -12, ease: 'none', duration: 0.8 },
          0
        );
      }

      if (studioFeedRef.current) {
        tl.to(
          studioFeedRef.current,
          { y: -10, ease: 'none', duration: 0.8 },
          0
        );
      }

      // Accent marks fade-in and subtle upward drift
      if (accentLineRef.current && accentDotRef.current) {
        tl.fromTo(
          [accentLineRef.current, accentDotRef.current],
          { opacity: 0.2, y: 15 },
          { opacity: 1, y: -15, ease: 'none', duration: 0.8 },
          0
        );
      }

      // Smooth slide-away transition near the end of the pin
      tl.to(
        heroContentRef.current,
        { yPercent: -100, ease: 'none', duration: 0.2 },
        0.8
      );
    }, containerRef);

    // Resize event listener to refresh ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsReducedMotion(true);
      return;
    }

    const video = videoRef.current;
    if (!video) {
      // In case video doesn't exist, init immediately
      return initScrollTrigger();
    }

    let cleanupFn: (() => void) | undefined;

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
      cleanupFn = initScrollTrigger();
    };

    // If metadata is already loaded (ready state >= 1)
    if (video.readyState >= 1 && video.duration > 0) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, [initScrollTrigger]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full h-screen min-h-[620px] sm:min-h-[640px] md:min-h-[720px] bg-[#FFFFFF] overflow-hidden select-none"
    >
      <div
        ref={heroContentRef}
        className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#FFFFFF]"
      >
        {/* Top Navbar */}
        <Navbar onOpenContact={onOpenContact} id="hero-navbar" />

        {/* Small Upper-Left Role Label - Micro parallax element */}
        <div
          ref={roleLabelRef}
          className="absolute top-20 sm:top-24 md:top-28 left-6 md:left-10 z-20 pointer-events-none will-change-transform"
        >
          <p
            id="hero-tagline-role"
            className="uppercase text-xs sm:text-sm tracking-[0.22em] text-[#0C0C0C]/60 font-medium"
          >
            AI PRODUCT REVIEWER / TECH TRANSLATOR
          </p>
        </div>

        {/* Studio Camera Angles Switcher - Micro parallax element */}
        <div
          ref={studioFeedRef}
          className="absolute top-20 sm:top-24 md:top-28 right-6 md:right-10 z-20 flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#0C0C0C]/10 text-[10px] tracking-widest font-mono text-[#0C0C0C]/60 will-change-transform"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1FD66E] animate-pulse" />
          <span className="hidden sm:inline">STUDIO FEED:</span>
          {HERO_POSTER_FRAMES.map((frame, idx) => (
            <button
              key={frame.id}
              onClick={() => setActiveFrameIndex(idx)}
              className={`px-1.5 py-0.5 rounded transition-colors uppercase ${
                activeFrameIndex === idx
                  ? 'bg-[#0C0C0C] text-white font-semibold'
                  : 'hover:text-[#0C0C0C]'
              }`}
              title={`View ${frame.name}`}
            >
              F0{idx + 1}
            </button>
          ))}
        </div>

        {/* Main 16:9 Media Shell & Centerpiece - Clean White Studio Aesthetic */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            ref={mediaShellRef}
            id="hero-media-shell"
            className="relative flex items-center justify-center aspect-[16/9] w-full max-w-[1680px] h-auto max-h-[82vh] will-change-transform"
          >
            {/* Poster fallback for reduced motion, loading, or video error */}
            {(isReducedMotion || videoError || !isVideoReady) && (
              <img
                src={HERO_POSTER_SRC}
                alt="Erick Chen - Futuristic Creator Studio Poster"
                className="absolute inset-0 w-full h-full object-contain object-center select-none"
              />
            )}

            {/* Video layer: scroll-driven frame scrubbing via video.currentTime */}
            {!videoError && !isReducedMotion && (
              <video
                ref={videoRef}
                id="hero-creator-video"
                src={HERO_VIDEO_SRC}
                poster={HERO_POSTER_SRC}
                muted
                playsInline
                preload="auto"
                onError={() => setVideoError(true)}
                className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-300 ${
                  isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>
        </div>

        {/* Bottom Hero Layout: Massive Name Heading + Editorial Summary & CTA */}
        <div className="relative z-20 w-full px-6 md:px-10 pb-8 sm:pb-10 md:pb-12 mt-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
            {/* Left Column: Accent mark + Short bottom-left paragraph with parallax */}
            <div
              ref={summaryBlockRef}
              className="relative flex items-start gap-3 max-w-[340px] will-change-transform"
            >
              {/* Thin purple vertical accent line (#7621B0) and tiny green dot (#1FD66E) */}
              <div
                ref={accentLineRef}
                className="flex flex-col items-center gap-1.5 pt-1 shrink-0"
              >
                <div className="w-[1.5px] h-6 bg-[#7621B0]" />
                <span
                  ref={accentDotRef}
                  className="w-2 h-2 rounded-full bg-[#1FD66E] shadow-[0_0_6px_#1FD66E]"
                />
              </div>

              <p
                id="hero-summary-paragraph"
                className="text-[clamp(0.75rem,1.3vw,1.35rem)] text-[#0C0C0C]/75 font-light uppercase tracking-wide leading-snug"
              >
                Clear AI product reviews, reproducible workflows, and calm judgment for creators, teams, and curious users.
              </p>
            </div>

            {/* Right Column: Contact Button */}
            <div className="flex items-center justify-start md:justify-end">
              <ContactButton
                id="hero-cta-work-with-me"
                onClick={onOpenContact}
              />
            </div>
          </div>

          {/* Massive Display H1 "Erick Chen" with parallax upward shift */}
          <div className="w-full mt-4 sm:mt-6 overflow-hidden">
            <h1
              ref={headingRef}
              id="hero-main-heading"
              className="hero-heading text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[15.5vw] text-[#0C0C0C] font-black uppercase tracking-tight leading-none whitespace-nowrap will-change-transform"
            >
              Erick Chen
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
