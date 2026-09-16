export interface ToolMeta {
  slug: string;
  name: string;
  category: 'Compiler' | 'Finance' | 'YouTube' | 'Image Crop' | 'Image' | 'PDF' | 'Developer' | 'Text';
  badge: string;
  description: string;
  keywords: string[];
  companionToolSlug: string;
  companionPitch: string;
}

export const CATEGORIES = [
  'All',
  'Compiler',
  'Finance',
  'YouTube',
  'Image Crop',
  'Image',
  'PDF',
  'Developer',
  'Text'
] as const;

export const TOOLS_REGISTRY: ToolMeta[] = [
  // 1. Compiler Tools
  {
    slug: 'online-python-compiler',
    name: 'Online Python Compiler & Runner',
    category: 'Compiler',
    badge: 'Pyodide WASM',
    description: 'Run Python 3 code with math and standard libraries directly in your browser. Zero cloud execution latency.',
    keywords: ['online python compiler', 'run python in browser', 'free python ide online'],
    companionToolSlug: 'json-prettifier',
    companionPitch: 'Parsing API payloads from Python? Format and validate your JSON outputs instantly.'
  },
  {
    slug: 'online-sql-sandbox',
    name: 'Online SQL / MySQL Query Sandbox',
    category: 'Compiler',
    badge: 'SQLite WASM',
    description: 'Execute SQL queries, test relational JOINs, and preview data tables locally with zero database server load.',
    keywords: ['online sql compiler', 'run mysql online', 'browser sql sandbox'],
    companionToolSlug: 'uuid-generator',
    companionPitch: 'Need dummy unique keys for testing SQL inserts? Generate v4 UUID batches.'
  },

  // 2. Finance Tools
  {
    slug: 'sip-calculator',
    name: 'SIP Wealth & Compounding Calculator',
    category: 'Finance',
    badge: 'Mathematical',
    description: 'Calculate future wealth maturity, expected interest gains, and inflation projections on mutual fund SIP investments.',
    keywords: ['sip calculator', 'mutual fund returns calculator', 'sip interest compounding'],
    companionToolSlug: 'compound-interest-calculator',
    companionPitch: 'Compare standard recurring equity compounding against lump-sum bank deposits.'
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Schedule Calculator',
    category: 'Finance',
    badge: 'Schedule Table',
    description: 'Simulate annual, quarterly, and monthly compounding schedules with complete year-by-year amortization breakdown.',
    keywords: ['compound interest calculator', 'interest compounding table', 'investment planner'],
    companionToolSlug: 'sip-calculator',
    companionPitch: 'Planning monthly systematic investments instead? Switch to SIP Wealth Planner.'
  },

  // 3. YouTube Tools
  {
    slug: 'youtube-thumbnail-grabber',
    name: 'YouTube 4K Thumbnail Grabber',
    category: 'YouTube',
    badge: 'Direct CDN',
    description: 'Extract pristine 1080p, 720p, and HD static covers from public videos with instant Canvas export.',
    keywords: ['youtube thumbnail grabber', 'download youtube cover hd', 'get youtube thumbnail 4k'],
    companionToolSlug: 'image-cropper',
    companionPitch: 'Extracted thumbnail needs aspect adjustments? Crop to custom ratios in browser.'
  },

  // 4. Image Crop Tools
  {
    slug: 'image-cropper',
    name: 'Custom Freeform Image Cropper',
    category: 'Image Crop',
    badge: 'HTML5 Canvas',
    description: 'Crop images with interactive bounding boxes, strict aspect presets (16:9, 1:1, 9:16), and instant local export.',
    keywords: ['crop image online free', 'freeform photo cropper', 'canvas aspect ratio cropper'],
    companionToolSlug: 'image-compressor',
    companionPitch: 'Reduce file size after cropping without uploading photos to external servers.'
  },

  // 5. Image Tools
  {
    slug: 'image-compressor',
    name: 'Client-Side Image Compressor',
    category: 'Image',
    badge: 'Zero Upload',
    description: 'Compress PNG, JPEG, and WebP files down to 50KB or 100KB directly in memory using Web Workers.',
    keywords: ['compress image without upload', 'reduce photo kb online', 'client side image optimizer'],
    companionToolSlug: 'image-cropper',
    companionPitch: 'Need to trim borders first? Crop your image before compressing.'
  },

  // 6. PDF Tools
  {
    slug: 'merge-pdf',
    name: 'Merge Multiple PDF Documents',
    category: 'PDF',
    badge: 'pdf-lib Local',
    description: 'Combine multiple PDF files into one clean document entirely within browser memory with complete data privacy.',
    keywords: ['merge pdf online free', 'combine pdf files browser', 'join pdf documents'],
    companionToolSlug: 'word-counter',
    companionPitch: 'Need to audit text volume or check character counts for documentation?'
  },

  // 7. Developer Tools
  {
    slug: 'json-prettifier',
    name: 'JSON Prettifier & Validator',
    category: 'Developer',
    badge: 'Instant AST',
    description: 'Format unindented JSON payloads, validate syntax structures, and export clean minified code blocks.',
    keywords: ['json prettifier', 'format json online', 'json syntax validator'],
    companionToolSlug: 'online-python-compiler',
    companionPitch: 'Testing scripts that consume this JSON? Run Python directly in browser.'
  },

  // 8. Text Tools
  {
    slug: 'word-counter',
    name: 'Live Word & Character Counter',
    category: 'Text',
    badge: 'Real-Time',
    description: 'Audit word count, character density, sentence structures, and estimated reading time as you type.',
    keywords: ['word counter online', 'character counter free', 'reading time estimator'],
    companionToolSlug: 'json-prettifier',
    companionPitch: 'Working with structured text or copy? Clean and format data structures.'
  }
];
