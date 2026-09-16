export interface ToolMeta {
  slug: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  companionToolSlug: string;
  companionPitch: string;
}

export const CATEGORIES = [
  'All',
  'PDF',
  'Image',
  'Compiler',
  'Finance',
  'YouTube',
  'Developer',
  'Text'
];

export const TOOLS_REGISTRY: ToolMeta[] = [
  // --- PDF TOOLS ---
  {
    slug: 'merge-pdf',
    name: 'Merge PDF Documents',
    category: 'PDF',
    description: 'Combine multiple PDF files into one clean document entirely within your browser.',
    badge: 'Client Engine',
    companionToolSlug: 'split-pdf-pages',
    companionPitch: 'Need to extract or separate specific pages from your newly merged document?',
  },
  {
    slug: 'split-pdf-pages',
    name: 'Split PDF Pages',
    category: 'PDF',
    description: 'Separate individual pages or extract page ranges into independent PDF files.',
    badge: 'Client Engine',
    companionToolSlug: 'merge-pdf',
    companionPitch: 'Combine specific extracted pages back together into a single file.',
  },
  {
    slug: 'pdf-to-jpg-converter',
    name: 'PDF to JPG Converter',
    category: 'PDF',
    description: 'Extract pages from your PDF document and save them as high-quality JPG images.',
    badge: 'Canvas Engine',
    companionToolSlug: 'client-image-compressor',
    companionPitch: 'Compress the extracted JPG images to reduce storage size.',
  },
  {
    slug: 'protect-pdf-password',
    name: 'Protect & Lock PDF',
    category: 'PDF',
    description: 'Add secure password protection and encryption to your private PDF documents.',
    badge: 'Security Engine',
    companionToolSlug: 'merge-pdf',
    companionPitch: 'Merge confidential files prior to applying encryption.',
  },

  // --- IMAGE TOOLS ---
  {
    slug: 'client-image-compressor',
    name: 'Client Image Compressor',
    category: 'Image',
    description: 'Compress PNG, JPEG, and WebP files down to target KB directly in local memory.',
    badge: 'Canvas Engine',
    companionToolSlug: 'custom-freeform-image-cropper',
    companionPitch: 'Crop and frame your image dimensions before optimizing file size.',
  },
  {
    slug: 'custom-freeform-image-cropper',
    name: 'Custom Image Cropper',
    category: 'Image',
    description: 'Crop images with preset aspect ratios (16:9, 1:1, 4:3) and custom boundaries.',
    badge: 'Canvas Engine',
    companionToolSlug: 'client-image-compressor',
    companionPitch: 'Optimize the file size of your newly cropped image asset.',
  },
  {
    slug: 'webp-to-png-converter',
    name: 'WebP to PNG Converter',
    category: 'Image',
    description: 'Convert modern WebP images to universal transparent PNG format instantly.',
    badge: 'Canvas Engine',
    companionToolSlug: 'client-image-compressor',
    companionPitch: 'Reduce the file footprint of your newly converted PNG.',
  },
  {
    slug: 'svg-to-png-converter',
    name: 'SVG to High-Res PNG',
    category: 'Image',
    description: 'Rasterize vector SVG files into crisp, high-resolution PNG images.',
    badge: 'Vector Engine',
    companionToolSlug: 'custom-freeform-image-cropper',
    companionPitch: 'Crop your rasterized vector graphic for social media profiles.',
  },

  // --- COMPILER & RUNNER TOOLS ---
  {
    slug: 'online-python-compiler',
    name: 'Online Python Runner',
    category: 'Compiler',
    description: 'Run Python 3 scripts with instant console output directly in your browser.',
    badge: 'WASM Runner',
    companionToolSlug: 'online-sql-sandbox',
    companionPitch: 'Test SQLite relational queries to pair with your Python backend data.',
  },
  {
    slug: 'online-sql-sandbox',
    name: 'Online SQLite Sandbox',
    category: 'Compiler',
    description: 'Execute SQL queries, design database tables, and inspect relations with zero setup.',
    badge: 'SQL Memory',
    companionToolSlug: 'online-python-compiler',
    companionPitch: 'Process your SQL output data inside the Python interactive sandbox.',
  },
  {
    slug: 'online-javascript-runner',
    name: 'JavaScript Sandbox',
    category: 'Compiler',
    description: 'Execute modern ES6+ JavaScript code snippets with real-time console streaming.',
    badge: 'V8 Engine',
    companionToolSlug: 'json-prettifier-validator',
    companionPitch: 'Format and inspect JSON data structures returned by your JS scripts.',
  },

  // --- DEVELOPER UTILITIES ---
  {
    slug: 'json-prettifier-validator',
    name: 'JSON Prettifier & Validator',
    category: 'Developer',
    description: 'Format, validate syntax, and minify complex JSON trees with 1-click clipboard copy.',
    badge: 'Parser Engine',
    companionToolSlug: 'base64-encoder-decoder',
    companionPitch: 'Encode formatted payload data into Base64 strings for network transmission.',
  },
  {
    slug: 'base64-encoder-decoder',
    name: 'Base64 Text & Data Encoder',
    category: 'Developer',
    description: 'Encode plain text or binary data into Base64 and decode Base64 strings safely.',
    badge: 'Crypto Engine',
    companionToolSlug: 'url-slug-generator',
    companionPitch: 'Generate clean URL slugs for web assets alongside your encoded data.',
  },
  {
    slug: 'url-slug-generator',
    name: 'Clean URL Slug Generator',
    category: 'Developer',
    description: 'Convert headlines and strings into SEO-friendly, URL-safe kebab-case slugs.',
    badge: 'Text Engine',
    companionToolSlug: 'live-word-character-counter',
    companionPitch: 'Verify total character count and word density of your slug titles.',
  },

  // --- FINANCE ENGINES ---
  {
    slug: 'sip-wealth-calculator',
    name: 'SIP Wealth Calculator',
    category: 'Finance',
    description: 'Calculate future wealth maturity, compounded interest gains, and returns ratio.',
    badge: 'Finance Math',
    companionToolSlug: 'compound-interest-calculator',
    companionPitch: 'Calculate lump-sum annual compound interest on your accumulated wealth.',
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'Finance',
    description: 'Simulate annual, quarterly, and monthly compounding schedules with growth projections.',
    badge: 'Finance Math',
    companionToolSlug: 'loan-emi-calculator',
    companionPitch: 'Compare compounding returns against loan liabilities and interest payments.',
  },
  {
    slug: 'loan-emi-calculator',
    name: 'Loan EMI Calculator',
    category: 'Finance',
    description: 'Calculate monthly loan installments, principal breakdown, and interest costs.',
    badge: 'Finance Math',
    companionToolSlug: 'sip-wealth-calculator',
    companionPitch: 'Invest your surplus monthly loan savings into a systematic wealth plan.',
  },

  // --- YOUTUBE & MEDIA TOOLS ---
  {
    slug: 'youtube-4k-thumbnail-grabber',
    name: 'YouTube 4K Thumbnail Grabber',
    category: 'YouTube',
    description: 'Extract original 1080p, 720p, and HD static thumbnail covers from any video or Shorts link.',
    badge: 'Media Engine',
    companionToolSlug: 'client-image-compressor',
    companionPitch: 'Compress the extracted high-res cover thumbnail for faster web embeds.',
  },

  // --- TEXT UTILITIES ---
  {
    slug: 'live-word-character-counter',
    name: 'Live Word & Character Counter',
    category: 'Text',
    description: 'Real-time calculation of word density, character count, sentence length, and reading time.',
    badge: 'Text Engine',
    companionToolSlug: 'json-prettifier-validator',
    companionPitch: 'Validate and format text payloads after checking length constraints.',
  },
];
