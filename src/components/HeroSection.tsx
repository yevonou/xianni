import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './Navbar';
import { ContactButton } from './ContactButton';
import {
  HERO_VIDEO_SRC,
  HERO_LANDING_VIDEO_SRC,
  HERO_POSTER_SRC,
  HERO_POSTER_FRAMES,
} from '../constants/assets';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenContact: () => void;
}

interface HeroTextScene {
  title: string;
  copy: string;
  titleStart: number;
  copyStart: number;
  exitStart: number;
  align: 'left' | 'right';
  positionClassName: string;
}

const HERO_TEXT_SCENES: HeroTextScene[] = [
  {
    title: 'REAL TESTING',
    copy: 'Hands-on AI product reviews built from real use, not launch-day noise.',
    titleStart: 3,
    copyStart: 4,
    exitStart: 5,
    align: 'left',
    positionClassName: 'left-[5%] top-[20%] md:left-[6%] md:top-[22%]',
  },
  {
    title: 'REPEATABLE WORKFLOW',
    copy: 'Tutorials that turn AI tools into clear, testable steps creators can actually follow.',
    titleStart: 6,
    copyStart: 7,
    exitStart: 9,
    align: 'right',
    positionClassName: 'right-[5%] top-[26%] md:right-[6%] md:top-[28%]',
  },
  {
    title: 'SIGNAL OVER NOISE',
    copy: 'Field notes on models, agents, AI search, video generation, and the future of creative work.',
    titleStart: 15,
    copyStart: 17,
    exitStart: 19,
    align: 'left',
    positionClassName: 'left-[5%] bottom-[17%] md:left-[6%] md:bottom-[19%]',
  },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeOutCubic = (value: number) => 1 - (1 - value) ** 3;
const easeInCubic = (value: number) => value ** 3;
const LANDING_COPY =
  'Clear signals, repeatable methods, and grounded judgment for the tools shaping creative work.';

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const mediaShellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const landingVideoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const landingAreaRef = useRef<HTMLDivElement>(null);
  const landingTextRef = useRef<HTMLDivElement>(null);
  const landingTitleRef = useRef<HTMLHeadingElement>(null);
  const landingCopyRef = useRef<HTMLParagraphElement>(null);
  const summaryBlockRef = useRef<HTMLDivElement>(null);
  const roleLabelRef = useRef<HTMLDivElement>(null);
  const studioFeedRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const accentDotRef = useRef<HTMLSpanElement>(null);
  const textSceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textTitleRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const textCopyRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Keep all copy animation on the same clock as video.currentTime. This is
  // called from ScrollTrigger's scrub update, so text never creates another
  // animation timeline or pauses the video.
  const updateTextOverlays = useCallback((currentTime: number) => {
    HERO_TEXT_SCENES.forEach((scene, index) => {
      const sceneElement = textSceneRefs.current[index];
      const titleElement = textTitleRefs.current[index];
      const copyElement = textCopyRefs.current[index];
      if (!sceneElement || !titleElement || !copyElement) return;

      const titleIn = easeOutCubic(clamp01((currentTime - scene.titleStart) / 0.55));
      const copyIn = easeOutCubic(clamp01((currentTime - scene.copyStart) / 0.65));
      const leave = easeInCubic(clamp01((currentTime - scene.exitStart) / 0.45));

      const titleOpacity = titleIn * (1 - leave);
      const copyOpacity = copyIn * (1 - leave);
      const titleY = (1 - titleIn) * 14 - leave * 10;
      const copyY = (1 - copyIn) * 10 - leave * 8;
      const copyLength = Math.round(scene.copy.length * copyIn);

      sceneElement.style.opacity = String(Math.max(titleOpacity, copyOpacity));
      titleElement.style.opacity = String(titleOpacity);
      titleElement.style.transform = `translate3d(0, ${titleY}px, 0)`;
      copyElement.style.opacity = String(copyOpacity);
      copyElement.style.transform = `translate3d(0, ${copyY}px, 0)`;
      copyElement.textContent = scene.copy.slice(0, copyLength);
    });

  }, []);

  // Initialize GSAP ScrollTrigger after video metadata or fallback is ready
  const initScrollTrigger = useCallback(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsReducedMotion(true);
      return;
    }

    const video = videoRef.current;
    const landingVideo = landingVideoRef.current;
    const container = containerRef.current;
    if (!container) return;

    let landingTimeline: gsap.core.Timeline | undefined;
    let landingTrigger: ScrollTrigger | undefined;
    const ctx = gsap.context(() => {
      // Keep the hero pinned for the full scroll-driven video sequence.
      const pinDistance = '+=240%';

      // One short-scrub timeline drives video, copy, parallax, and pinning.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: pinDistance,
          pin: true,
          scrub: 0.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      let isLandingVideoActive = false;
      const setLandingVideoActive = (isActive: boolean) => {
        if (!landingVideo || isLandingVideoActive === isActive) return;
        isLandingVideoActive = isActive;

        if (isActive) {
          landingVideo.currentTime = 0;
          landingVideo.style.opacity = '1';
          void landingVideo.play().catch(() => {
            // Muted inline playback is normally permitted. If the browser
            // still blocks it, keep the final frame of 4.mp4 visible.
            landingVideo.style.opacity = '0';
            isLandingVideoActive = false;
          });
          return;
        }

        landingVideo.style.opacity = '0';
        landingVideo.pause();
        landingVideo.currentTime = 0;
      };

      tl.eventCallback('onUpdate', () => {
        // Both the 4.mp4 scrub and the landing motion finish at timeline time
        // 0.9. Use absolute time because the timeline itself also ends there.
        setLandingVideoActive(tl.time() >= 0.899);
      });

      if (video && video.duration > 0) {
        video.pause();
        video.currentTime = 0;
        updateTextOverlays(0);

        const videoObj = { currentTime: 0 };
        // The video reaches its final frame at 90% of the pinned sequence.
        // The remaining 10% is reserved for the landing copy after the video
        // has finished moving and is fixed in the white area.
        tl.to(
          videoObj,
          {
            currentTime: video.duration,
            ease: 'none',
            duration: 0.9,
            onUpdate: () => {
              if (isFinite(videoObj.currentTime)) {
                video.currentTime = videoObj.currentTime;
                updateTextOverlays(videoObj.currentTime);
              }
            },
          },
          0
        );
      }

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

      // The final two video seconds occupy 81% -> 90% of this timeline. The
      // media reaches the white transition area before landing copy begins.
      tl.to(
        mediaShellRef.current,
        {
          // Place the full-size 16:9 shell directly below the viewport-sized
          // Hero content, centered inside a white area of the same height.
          y: () => {
            const heroHeight = heroContentRef.current?.offsetHeight ?? window.innerHeight;
            const mediaHeight = mediaShellRef.current?.offsetHeight ?? 0;
            return (heroHeight + mediaHeight) / 2;
          },
          scale: 1,
          ease: 'none',
          duration: 0.09,
        },
        0.81
      );

    }, containerRef);

    // Trigger the landing copy from its actual viewport entry rather than
    // from the Hero pin progress. The timeline is paused until the white gap
    // is genuinely visible, so the animation cannot be consumed off-screen.
    const landingArea = landingAreaRef.current;
    const landingElement = landingTextRef.current;
    const landingTitle = landingTitleRef.current;
    const landingCopy = landingCopyRef.current;
    if (landingArea && landingElement && landingTitle && landingCopy) {
      landingTimeline = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          landingCopy.textContent = '';
        },
      });
      const copyState = { progress: 0 };
      landingCopy.textContent = '';
      landingTimeline.set(landingElement, { opacity: 1 }, 0);
      landingTimeline.fromTo(
        landingTitle,
        { opacity: 0, x: -28, y: 14 },
        { opacity: 1, x: 0, y: 0, ease: 'power2.out', duration: 0.32 },
        0
      );
      landingTimeline.fromTo(
        landingCopy,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.28 },
        0.28
      );
      landingTimeline.to(
        copyState,
        {
          progress: 1,
          ease: 'none',
          duration: 0.72,
          onUpdate: () => {
            landingCopy.textContent = LANDING_COPY.slice(
              0,
              Math.round(LANDING_COPY.length * copyState.progress)
            );
          },
        },
        0.28
      );

      landingTrigger = ScrollTrigger.create({
        trigger: landingArea,
        start: 'top 78%',
        invalidateOnRefresh: true,
        onEnter: () => landingTimeline?.play(),
        onLeaveBack: () => landingTimeline?.reverse(),
      });
    }

    // Resize event listener to refresh ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (landingVideo) {
        landingVideo.style.opacity = '0';
        landingVideo.pause();
        landingVideo.currentTime = 0;
      }
      landingTrigger?.kill();
      landingTimeline?.kill();
      ctx.revert();
      updateTextOverlays(0);
    };
  }, [updateTextOverlays]);

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
      className="relative w-full bg-[#FAFAFA] overflow-visible select-none"
    >
      <div
        ref={heroContentRef}
        className="relative w-full h-screen min-h-[620px] sm:min-h-[640px] md:min-h-[720px] flex flex-col justify-between overflow-visible bg-[#FAFAFA]"
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
              <>
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
                <video
                  ref={landingVideoRef}
                  id="hero-landing-video"
                  src={HERO_LANDING_VIDEO_SRC}
                  muted
                  playsInline
                  loop
                  preload="auto"
                  aria-hidden="true"
                  className="absolute inset-0 z-[1] h-full w-full object-contain object-center opacity-0 transition-opacity duration-300"
                />
              </>
            )}

            {/* Scroll-synchronised editorial copy. The overlay stays inside the
                16:9 shell so it occupies the video's negative space without
                adding a mask, tint, or extra visual treatment. */}
            <div className="absolute inset-0 z-[15] pointer-events-none">
              {HERO_TEXT_SCENES.map((scene, index) => (
                <div
                  key={scene.title}
                  ref={(element) => {
                    textSceneRefs.current[index] = element;
                  }}
                  className={`absolute max-w-[44%] sm:max-w-[38%] md:max-w-[32%] ${scene.positionClassName} ${
                    scene.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                  style={{ opacity: 0 }}
                >
                  <h2
                    ref={(element) => {
                      textTitleRefs.current[index] = element;
                    }}
                    className="text-[clamp(0.95rem,2.8vw,3.2rem)] font-semibold leading-[0.95] tracking-[0.08em] text-[#0C0C0C] will-change-transform"
                    style={{ opacity: 0, transform: 'translate3d(0, 14px, 0)' }}
                  >
                    {scene.title}
                  </h2>
                  <p
                    ref={(element) => {
                      textCopyRefs.current[index] = element;
                    }}
                    aria-label={scene.copy}
                    className="mt-2 text-[clamp(0.58rem,1.1vw,1rem)] font-light leading-snug tracking-[0.02em] text-[#0C0C0C]/75 will-change-transform sm:mt-3"
                    style={{ opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
                  >
                    {scene.copy}
                  </p>
                </div>
              ))}
            </div>
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

      {/* Final-frame landing area between Erick Chen and Tested Interfaces.
          It matches the responsive height of the full-size 16:9 media shell. */}
      <div
        ref={landingAreaRef}
        className="relative w-full bg-[#FAFAFA] pointer-events-none"
        style={{ height: 'min(56.25vw, 945px, 82vh)' }}
      >
        <div
          ref={landingTextRef}
          className="absolute left-6 sm:left-8 md:left-10 top-1/2 -translate-y-1/2 z-20 max-w-[min(32rem,42vw)] text-left"
          style={{ opacity: isReducedMotion ? 1 : 0 }}
        >
          <h2
            ref={landingTitleRef}
            className="text-[clamp(1.25rem,3vw,3.25rem)] font-semibold leading-none tracking-[0.08em] text-[#0C0C0C] will-change-transform"
            style={{
              opacity: isReducedMotion ? 1 : 0,
              transform: isReducedMotion ? 'none' : 'translate3d(0, 14px, 0)',
            }}
          >
            PRACTICAL SIGNAL
          </h2>
          <p
            ref={landingCopyRef}
            aria-label={LANDING_COPY}
            className="mt-3 text-[clamp(0.65rem,1.05vw,1rem)] font-light leading-snug tracking-[0.02em] text-[#0C0C0C]/75 will-change-transform"
            style={{
              opacity: isReducedMotion ? 1 : 0,
              transform: isReducedMotion ? 'none' : 'translate3d(0, 10px, 0)',
            }}
          >
            {LANDING_COPY}
          </p>
        </div>
      </div>
    </section>
  );
};
