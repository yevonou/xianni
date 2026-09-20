import { ProjectData, ResumeAchievement } from '../types';

/**
 * Primary hero video path.
 * Uploaded 3.MP4 used for GSAP ScrollTrigger scroll-driven playback.
 */
export const HERO_VIDEO_SRC = '/3.MP4';
export const HERO_POSTER_SRC = '/assets/hero/poster.jpg';

/**
 * Four provided source/reference frames and fallback poster images (1680 x 945, 16:9).
 */
export const HERO_POSTER_FRAMES = [
  {
    id: 'frame-01',
    name: 'Wide Left Angle',
    path: '/assets/hero/frame-01-wide-left.svg',
    pngFallback: '/assets/hero/frame-01-wide-left.png',
  },
  {
    id: 'frame-02',
    name: 'Close Front Portrait',
    path: '/assets/hero/frame-02-close-front.svg',
    pngFallback: '/assets/hero/frame-02-close-front.png',
  },
  {
    id: 'frame-03',
    name: 'Gesture Right Glow',
    path: '/assets/hero/frame-03-gesture-right.svg',
    pngFallback: '/assets/hero/frame-03-gesture-right.png',
  },
  {
    id: 'frame-04',
    name: 'Goggles Touch Detail',
    path: '/assets/hero/frame-04-goggles-touch.svg',
    pngFallback: '/assets/hero/frame-04-goggles-touch.png',
  },
];

/**
 * 21 GIF images from motionsites.ai
 */
export const MARQUEE_GIFS_ROW_1 = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

export const MARQUEE_GIFS_ROW_2 = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

/**
 * Resume & Major Achievements for Erick Chen
 */
export const RESUME_ACHIEVEMENTS: ResumeAchievement[] = [
  {
    number: '01',
    category: 'AI Product Reviews',
    title: 'Real testing before loud conclusions',
    description:
      'Hands-on reviews of AI assistants, search tools, writing tools, image and video models, coding tools, agents, knowledge bases, and productivity systems, focused on who each product is for, what problem it solves, where it works, and where it breaks.',
    isCurrent: true,
  },
  {
    number: '02',
    category: 'Practical Tutorials',
    title: 'Workflows people can actually repeat',
    description:
      'Step-by-step AI tutorials for scripting, topic research, knowledge management, prompt rewriting, short-video planning, data analysis, and tool-to-tool automation, built around copyable steps and verifiable results.',
  },
  {
    number: '03',
    category: 'Technology Trends',
    title: 'Separating signal from product-launch noise',
    description:
      'Long-term observations on how large models, AI search, agents, and video generation are changing creators, product teams, knowledge work, and the value of human judgment.',
  },
  {
    number: '04',
    category: 'Creator Methods',
    title: 'AI as a creative accelerator, not a replacement',
    description:
      'Content methods for ideation, titles, scripts, materials, research, audience insight, account positioning, short-form video, long-form writing, and editorial systems, always anchored in taste, perspective, and lived experience.',
  },
  {
    number: '05',
    category: 'Responsible AI',
    title: 'Clear eyes on risk, limits, and misuse',
    description:
      'A grounded view of AI ethics, privacy, copyright, bias, fabricated content, overdependence, and the boundary between useful technology and exaggerated claims.',
  },
];

/**
 * 3 Projects with exact CloudFront image URLs and white-theme case evaluations
 */
export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'project-01',
    number: '01',
    category: 'Field Test',
    name: 'AI Tool Reviews',
    headline: 'Real-world Stress Testing of Next-Gen Generative & Multimodal Models',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    caseDetails: {
      testedTool: 'Multimodal Frontier LLMs & Agentic Systems',
      objective: 'Benchmarking latency, factual consistency, multimodal perception, and edge-case hallucination across 140 real-world technical queries.',
      metrics: [
        { label: 'Evaluation Sets', value: '140 Tests' },
        { label: 'Factual Accuracy', value: '94.2%' },
        { label: 'Reproducibility', value: '100% Verifiable' },
      ],
      reproducibleTakeaways: [
        'Structured schema validation prevents 83% of typical multi-step agentic drop-offs.',
        'Zero-shot context compression outperforms excessive chained prompting in token conservation.',
        'Clear separation between retrieval layers and synthesis guards eliminates hallucinated references.',
      ],
      hardwareEnvironment: 'Workstation Studio Rig: Dual RTX 4090, 128GB ECC DDR5, NVMe Scratch Array.',
    },
  },
  {
    id: 'project-02',
    number: '02',
    category: 'Method',
    name: 'Reproducible Tutorials',
    headline: 'High-Velocity Creator Automation Pipelines & Scripting Stacks',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    caseDetails: {
      testedTool: 'Automated Research, Transcription, & Editorial Synthesizers',
      objective: 'Constructing an end-to-end editorial pipeline that transforms raw research documents into cinematic scripts and visual storyboards with zero manual formatting friction.',
      metrics: [
        { label: 'Time Saved', value: '68% per Episode' },
        { label: 'Script Retention', value: '4.8/5.0 Rating' },
        { label: 'Pipeline Steps', value: '4 Automated Nodes' },
      ],
      reproducibleTakeaways: [
        'Deterministic text chunking maintains tone consistency across lengthy technical breakdowns.',
        'Automated hook-testing routines generate 5 distinct reader entry hooks based on verified engagement psychology.',
        'Exportable markdown logs enable direct friction-free video production handoff.',
      ],
      hardwareEnvironment: 'Edge Node Runner + Cloud API Orchestration with Webhook Verification.',
    },
  },
  {
    id: 'project-03',
    number: '03',
    category: 'Insight',
    name: 'Trend Breakdowns',
    headline: 'Macro Technology Signals, Enterprise Adoption, & Creative Agency',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    caseDetails: {
      testedTool: 'Macro Market Analysis & Open-Weights Foundation Ecosystems',
      objective: 'Deep-dive analysis on real enterprise implementation costs versus speculative product hype in AI search, coding assistants, and local model inference.',
      metrics: [
        { label: 'Case Studies', value: '24 Deployments' },
        { label: 'Noise Filtered', value: 'High Signal' },
        { label: 'Reader Base', value: '50K+ Tech Leads' },
      ],
      reproducibleTakeaways: [
        'Local fine-tuning on proprietary corpora consistently outperforms monolithic prompt stuffing.',
        'The primary bottleneck in enterprise AI is schema alignment and data governance, not model size.',
        'Human editorial judgment remains the non-negotiable differentiator in high-stakes publishing.',
      ],
      hardwareEnvironment: 'Benchmarked across Consumer Silicon (M-Series) and Dedicated GPU Cloud Instances.',
    },
  },
];
