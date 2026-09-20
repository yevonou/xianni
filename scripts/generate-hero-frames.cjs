const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create hero assets directory
const heroDir = path.join(__dirname, '..', 'public', 'assets', 'hero');
if (!fs.existsSync(heroDir)) {
  fs.mkdirSync(heroDir, { recursive: true });
}

// Visual definition of 4 frames (1680 x 945, 16:9)
// Frame 1: wide-left
// Frame 2: close-front
// Frame 3: gesture-right (purple light glow on wrist device)
// Frame 4: goggles-touch
function createHeroSvg(frameType) {
  const isGesture = frameType === 'gesture-right';
  const isClose = frameType === 'close-front';
  const isWide = frameType === 'wide-left';
  const isGogglesTouch = frameType === 'goggles-touch';

  const headX = isWide ? 760 : isGesture ? 780 : isClose ? 840 : 810;
  const headY = isClose ? 360 : 390;
  const headScale = isClose ? 1.35 : isWide ? 0.95 : 1.05;

  const wristX = isGesture ? 1040 : isGogglesTouch ? headX + 150 : 680;
  const wristY = isGesture ? 520 : isGogglesTouch ? headY + 40 : 660;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1680 945" width="1680" height="945">
  <defs>
    <!-- Studio Lighting Gradients -->
    <radialGradient id="studioKeyLight" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="70%" stop-color="#FAFAFA" />
      <stop offset="100%" stop-color="#F2F2F4" />
    </radialGradient>
    <radialGradient id="softGroundShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(12,12,12,0.14)" />
      <stop offset="60%" stop-color="rgba(12,12,12,0.04)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </radialGradient>
    
    <!-- AR Goggles Purple Translucent Lens -->
    <linearGradient id="purpleLensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7621B0" stop-opacity="0.92" />
      <stop offset="50%" stop-color="#9D38E2" stop-opacity="0.78" />
      <stop offset="100%" stop-color="#4F0F7A" stop-opacity="0.94" />
    </linearGradient>

    <linearGradient id="goggleReflect" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.5" />
      <stop offset="35%" stop-color="#FFFFFF" stop-opacity="0.05" />
      <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>

    <!-- Silver White Layered Hair Shading -->
    <linearGradient id="silverHairGrad" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#EDEDF0" />
      <stop offset="85%" stop-color="#D7D8E0" />
      <stop offset="100%" stop-color="#B8B9C6" />
    </linearGradient>

    <!-- Techwear Leather Black -->
    <linearGradient id="techwearBlack" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#1E1E22" />
      <stop offset="40%" stop-color="#121214" />
      <stop offset="80%" stop-color="#0A0A0C" />
      <stop offset="100%" stop-color="#16161A" />
    </linearGradient>

    <!-- Cyber Wrist Gauntlet Glow -->
    <filter id="purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur1" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Clean Pure White Studio Background -->
  <rect width="1680" height="945" fill="url(#studioKeyLight)" />

  <!-- Studio Ambient Floor Reflection / Shadow -->
  <ellipse cx="${headX}" cy="910" rx="340" ry="26" fill="url(#softGroundShadow)" />

  <!-- Character Group with Transform Center -->
  <g transform="translate(${headX - 840 * headScale}, ${headY - 380 * headScale}) scale(${headScale})">
    <!-- Torso & Techwear Short-sleeve Leather Top -->
    <path d="M 680 540 Q 840 500 1000 540 L 1050 945 L 630 945 Z" fill="url(#techwearBlack)" />
    <!-- Chest Straps & Utility Belts -->
    <path d="M 720 540 L 890 820 L 920 820 L 750 540 Z" fill="#202025" />
    <path d="M 960 540 L 790 820 L 760 820 L 930 540 Z" fill="#24242A" />
    <!-- Purple Garment Accents on Collar and Shoulder -->
    <path d="M 780 520 L 810 528 L 805 536 L 775 528 Z" fill="#7621B0" />
    <path d="M 870 528 L 900 520 L 905 528 L 875 536 Z" fill="#7621B0" />
    <circle cx="840" cy="620" r="4" fill="#1FD66E" filter="url(#greenGlow)" />

    <!-- Neck & Skin tone (clean high-key studio look) -->
    <path d="M 795 430 L 885 430 L 875 530 L 805 530 Z" fill="#F4EDE6" />
    <path d="M 805 470 Q 840 500 875 470 L 870 525 L 810 525 Z" fill="#E6DACF" opacity="0.45" />

    <!-- Arms -->
    <!-- Left Arm -->
    <path d="M 670 540 L 610 680 L 680 720 L 730 580 Z" fill="#F0E5DC" />
    <!-- Right Arm -->
    ${isGesture ? `
      <!-- Right Arm Gesturing Outward -->
      <path d="M 980 540 Q 1040 600 1080 580 L 1120 520 L 1060 480 Q 1010 500 980 540 Z" fill="#F0E5DC" />
    ` : isGogglesTouch ? `
      <!-- Right Arm Raised Touching Goggles -->
      <path d="M 980 540 Q 1040 480 1010 380 L 960 360 L 940 440 Q 970 500 980 540 Z" fill="#F0E5DC" />
    ` : `
      <!-- Right Arm Relaxed Utility Stance -->
      <path d="M 1010 540 L 1070 680 L 1000 720 L 950 580 Z" fill="#F0E5DC" />
    `}

    <!-- Head & Face Profile -->
    <ellipse cx="840" cy="380" rx="90" ry="115" fill="#F7EFE9" />
    <!-- Jawline definition -->
    <path d="M 760 380 Q 840 480 920 380 Q 920 440 840 475 Q 760 440 760 380 Z" fill="#EBDDCF" opacity="0.3" />

    <!-- Layered Silver-White Hair (Back layers) -->
    <path d="M 730 360 Q 710 240 840 210 Q 970 240 950 360 Q 980 440 930 460 Q 840 410 750 460 Q 700 420 730 360 Z" fill="url(#silverHairGrad)" />

    <!-- Futuristic White AR Ski Goggles (Signature Piece) -->
    <!-- Goggles Frame (Matte White Cyber Architecture) -->
    <rect x="740" y="325" width="200" height="75" rx="36" fill="#FDFDFE" stroke="#D1D4DE" stroke-width="2" />
    <!-- Aerodynamic Goggles Rim and Sensor Ports -->
    <path d="M 740 362 L 725 362 Q 720 362 720 350 L 720 340 Q 720 330 735 330 L 748 335" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
    <path d="M 940 362 L 955 362 Q 960 362 960 350 L 960 340 Q 960 330 945 330 L 932 335" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
    
    <!-- Translucent Purple Lens -->
    <rect x="752" y="335" width="176" height="55" rx="26" fill="url(#purpleLensGrad)" />
    <!-- Lens Specular Glare / Reflection -->
    <path d="M 760 342 Q 840 355 920 342 L 912 355 Q 840 368 768 355 Z" fill="url(#goggleReflect)" />
    <!-- HUD Micro-optics / Tech Indicators -->
    <circle cx="775" cy="362" r="3.5" fill="#1FD66E" opacity="0.9" />
    <line x1="785" y1="362" x2="805" y2="362" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.75" />
    <circle cx="905" cy="362" r="3.5" fill="#FFFFFF" opacity="0.7" />

    <!-- Layered Silver Hair Front Strands -->
    <path d="M 730 280 Q 790 230 840 260 Q 890 230 950 280 Q 870 290 840 320 Q 800 290 730 280 Z" fill="#FFFFFF" />
    <path d="M 760 260 Q 820 280 840 330 Q 810 310 760 260 Z" fill="#E8E9F2" />
    <path d="M 910 260 Q 860 280 840 330 Q 870 310 910 260 Z" fill="#E8E9F2" />
    <path d="M 790 220 Q 840 240 870 290 Q 850 250 790 220 Z" fill="#FFFFFF" />

    <!-- Cyber Wrist Device -->
    <g transform="translate(${isGesture ? 240 : isGogglesTouch ? 140 : -140}, ${isGesture ? 120 : isGogglesTouch ? -60 : 160})">
      <!-- White Gauntlet Shell -->
      <rect x="740" y="440" width="70" height="42" rx="10" fill="#FFFFFF" stroke="#D1D4DE" stroke-width="2" />
      <rect x="748" y="446" width="54" height="30" rx="6" fill="#16161B" />
      <!-- Purple Glow Screen -->
      <rect x="752" y="450" width="46" height="22" rx="4" fill="#7621B0" filter="${isGesture ? 'url(#purpleGlow)' : 'none'}" opacity="${isGesture ? '1' : '0.85'}" />
      <!-- Active Telemetry Dot -->
      <circle cx="760" cy="461" r="2.5" fill="#1FD66E" filter="url(#greenGlow)" />
      <line x1="768" y1="461" x2="790" y2="461" stroke="#FFFFFF" stroke-width="1.2" opacity="0.8" />
    </g>

    <!-- Hand & Fingers Touching Goggles or Gesturing -->
    ${isGogglesTouch ? `
      <!-- Hand poised at goggles edge -->
      <g transform="translate(140, -50)">
        <path d="M 800 400 L 815 375 L 825 385 L 815 410 Z" fill="#F0E5DC" />
        <circle cx="818" cy="380" r="4" fill="#E5D6CB" />
      </g>
    ` : ''}
  </g>

  <!-- Clean Studio Framing & Subtle Minimal Badge -->
  <g opacity="0.4" transform="translate(60, 50)">
    <text x="0" y="0" font-family="'Kanit', sans-serif" font-size="12" font-weight="600" fill="#0C0C0C" letter-spacing="3">FRAME REFERENCE // 1680x945 16:9 STUDIO</text>
    <text x="0" y="18" font-family="'Kanit', sans-serif" font-size="10" font-weight="400" fill="#7621B0" letter-spacing="2">ERICK CHEN -- ${frameType.toUpperCase()}</text>
  </g>
  <circle cx="1620" cy="50" r="4" fill="#1FD66E" />
  <line x1="1600" y1="50" x2="1612" y2="50" stroke="#0C0C0C" stroke-width="1" opacity="0.3" />
</svg>
`;
}

// Generate simple 1x1 or minimal PNG buffer as fallback
function createMinimalPng() {
  // 1x1 white pixel PNG
  return Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64');
}

const frames = [
  'frame-01-wide-left',
  'frame-02-close-front',
  'frame-03-gesture-right',
  'frame-04-goggles-touch'
];

frames.forEach(name => {
  const svgContent = createHeroSvg(name.replace('frame-', '').replace(/^\d+-/, ''));
  fs.writeFileSync(path.join(heroDir, `${name}.svg`), svgContent, 'utf8');
  // Also write PNG file so /assets/hero/frame-01-wide-left.png loads or can be referenced directly
  fs.writeFileSync(path.join(heroDir, `${name}.png`), createMinimalPng());
  console.log(`Generated ${name}.svg & ${name}.png`);
});

// Also create a tiny mock MP4 dummy or note so the video tag doesn't throw a 404 error before user replaces it
const dummyVideoPath = path.join(heroDir, 'creator-hero-video.mp4');
if (!fs.existsSync(dummyVideoPath)) {
  fs.writeFileSync(dummyVideoPath, Buffer.alloc(0));
}

console.log('All hero assets successfully created in /public/assets/hero');
