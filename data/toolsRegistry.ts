export interface ToolMeta {
  name: string;
  slug: string;
  category: string;
  description: string;
  targetKeyword?: string;
}

export const CATEGORIES = [
  'All',
  'PDF',
  'Image',
  'Compiler',
  'Finance',
  'Developer',
  'Text',
  'Converters',
  'Calculators',
  'YouTube',
] as const;

export const TOOLS_REGISTRY: ToolMeta[] = [
  // ==========================================
  // 1. PDF TOOLS (Exact Google Search Intent)
  // ==========================================
  {
    name: 'Merge PDF Online',
    slug: 'merge-pdf',
    category: 'PDF',
    description: 'Combine multiple PDF files into one clean document in your chosen order.',
  },
  {
    name: 'Split PDF Pages',
    slug: 'split-pdf',
    category: 'PDF',
    description: 'Separate individual pages or extract specific page ranges from PDF files.',
  },
  {
    name: 'PDF to JPG Converter',
    slug: 'pdf-to-jpg',
    category: 'PDF',
    description: 'Extract pages from your PDF document and export them as high-quality JPG images.',
  },
  {
    name: 'Protect & Lock PDF',
    slug: 'protect-pdf-password',
    category: 'PDF',
    description: 'Add secure password protection and encryption to your private PDF documents.',
  },
  {
    name: 'Unlock Protected PDF',
    slug: 'unlock-pdf-password',
    category: 'PDF',
    description: 'Remove passwords and permissions from encrypted PDF documents locally.',
  },
  {
    name: 'Rotate PDF Pages',
    slug: 'rotate-pdf',
    category: 'PDF',
    description: 'Rotate individual or all pages inside a PDF document 90, 180, or 270 degrees.',
  },
  {
    name: 'Compress PDF Size',
    slug: 'compress-pdf',
    category: 'PDF',
    description: 'Reduce PDF document file footprint while maintaining clean text resolution.',
  },
  {
    name: 'Add Page Numbers to PDF',
    slug: 'add-page-numbers-pdf',
    category: 'PDF',
    description: 'Insert header or footer page numbers across your entire PDF file.',
  },
  {
    name: 'PDF to Word Converter',
    slug: 'pdf-to-word',
    category: 'PDF',
    description: 'Convert PDF files into editable DOCX Word format without losing text structure.',
  },
  {
    name: 'Word to PDF Converter',
    slug: 'word-to-pdf',
    category: 'PDF',
    description: 'Convert Microsoft Word documents (DOCX, DOC) into standard PDF files.',
  },
  {
    name: 'Delete Pages from PDF',
    slug: 'delete-pdf-pages',
    category: 'PDF',
    description: 'Select and remove unwanted pages from any PDF file with instant download.',
  },
  {
    name: 'Reorder PDF Pages',
    slug: 'reorder-pdf-pages',
    category: 'PDF',
    description: 'Drag, drop, and rearrange the page sequence of your PDF document.',
  },
  {
    name: 'PDF Grayscale Converter',
    slug: 'pdf-grayscale-converter',
    category: 'PDF',
    description: 'Convert colored PDF documents into monochrome black and white for cheap printing.',
  },

  // ==========================================
  // 2. IMAGE TOOLS (Targeted Search Volume)
  // ==========================================
  {
    name: 'Compress Image Online',
    slug: 'compress-image',
    category: 'Image',
    description: 'Compress PNG, JPEG, and WebP files down to target KB size with zero quality loss.',
  },
  {
    name: 'Crop Image Online',
    slug: 'crop-image-online',
    category: 'Image',
    description: 'Crop images with preset aspect ratios (16:9, 1:1, 4:3) or freeform box selection.',
  },
  {
    name: 'Image Resizer (Pixel & CM)',
    slug: 'image-resizer',
    category: 'Image',
    description: 'Resize image dimensions by custom width, height, or percentages in pixels and cm.',
  },
  {
    name: 'WebP to PNG Converter',
    slug: 'webp-to-png-converter',
    category: 'Image',
    description: 'Convert modern WebP images into transparent lossless PNG graphics in browser memory.',
  },
  {
    name: 'WebP to JPG Converter',
    slug: 'webp-to-jpg-converter',
    category: 'Image',
    description: 'Convert modern WebP images into standard JPG format in high quality.',
  },
  {
    name: 'PNG to JPG Converter',
    slug: 'png-to-jpg-converter',
    category: 'Image',
    description: 'Quickly convert large PNG images into lightweight JPG pictures.',
  },
  {
    name: 'JPG to PNG Converter',
    slug: 'jpg-to-png-converter',
    category: 'Image',
    description: 'Convert JPEG/JPG pictures to lossless PNG image format with zero compression artifacts.',
  },
  {
    name: 'SVG to PNG Converter',
    slug: 'svg-to-png-converter',
    category: 'Image',
    description: 'Rasterize vector SVG files into crisp, high-resolution raster graphics.',
  },
  {
    name: 'Black & White Image Filter',
    slug: 'black-and-white-image-filter',
    category: 'Image',
    description: 'Convert colored photographs into black and white monochrome representations.',
  },
  {
    name: 'Flip & Rotate Image',
    slug: 'flip-rotate-image',
    category: 'Image',
    description: 'Flip images horizontally, vertically, or rotate 90 degrees with instant canvas preview.',
  },

  // ==========================================
  // 3. COMPILERS & RUNNERS (Programiz Competitors)
  // ==========================================
  {
    name: 'Online Python Compiler',
    slug: 'online-python-compiler',
    category: 'Compiler',
    description: 'Run Python 3 scripts in browser sandbox with real-time terminal output.',
  },
  {
    name: 'Online JavaScript Compiler',
    slug: 'online-javascript-compiler',
    category: 'Compiler',
    description: 'Execute modern ES6+ JavaScript code snippets in browser environment.',
  },
  {
    name: 'Online HTML CSS JS Editor',
    slug: 'online-html-editor',
    category: 'Compiler',
    description: 'Live interactive HTML, CSS, and JavaScript editor with split-screen DOM preview.',
  },
  {
    name: 'JSON Formatter & Validator',
    slug: 'json-formatter-validator',
    category: 'Compiler',
    description: 'Prettify, format, validate, and minify messy JSON data strings with syntax highlighting.',
  },
  {
    name: 'Online C++ Compiler',
    slug: 'online-cpp-compiler',
    category: 'Compiler',
    description: 'Compile and test C++ programs online in browser memory with instant console logs.',
  },
  {
    name: 'Online Java Compiler',
    slug: 'online-java-compiler',
    category: 'Compiler',
    description: 'Write, debug, and run standard Java code snippets directly in your web browser.',
  },
  {
    name: 'Online SQL Runner',
    slug: 'online-sql-runner',
    category: 'Compiler',
    description: 'Execute SQL queries, test database tables, and verify relational commands.',
  },
  {
    name: 'Base64 Encoder & Decoder',
    slug: 'base64-encoder-decoder',
    category: 'Compiler',
    description: 'Convert text, hashes, and binary files to and from Base64 string formats.',
  },

  // ==========================================
  // 4. FINANCIAL CALCULATORS (High CPC Keywords)
  // ==========================================
  {
    name: 'SIP Wealth Calculator',
    slug: 'sip-calculator',
    category: 'Finance',
    description: 'Compute compound interest returns and estimated future maturity on mutual fund SIPs.',
  },
  {
    name: 'EMI Calculator (Home & Car)',
    slug: 'emi-calculator',
    category: 'Finance',
    description: 'Calculate monthly loan installments, total interest costs, and amortization schedules.',
  },
  {
    name: 'Compound Interest Calculator',
    slug: 'compound-interest-calculator',
    category: 'Finance',
    description: 'Calculate annual, monthly, and daily compound interest growth on savings and deposits.',
  },
  {
    name: 'Lumpsum Investment Calculator',
    slug: 'lumpsum-calculator',
    category: 'Finance',
    description: 'Estimate total maturity returns on one-time lumpsum mutual fund investments.',
  },
  {
    name: 'Percentage Calculator Online',
    slug: 'percentage-calculator',
    category: 'Finance',
    description: 'Calculate percentage increase, percentage decrease, and fraction differences instantly.',
  },
  {
    name: 'GST Calculator Online',
    slug: 'gst-calculator',
    category: 'Finance',
    description: 'Calculate inclusive and exclusive Goods and Services Tax (GST) for commercial invoices.',
  },
  {
    name: 'Salary & In-Hand Pay Calculator',
    slug: 'salary-calculator',
    category: 'Finance',
    description: 'Calculate monthly in-hand take-home salary after taxes and deductions.',
  },
  {
    name: 'Simple Interest Calculator',
    slug: 'simple-interest-calculator',
    category: 'Finance',
    description: 'Calculate basic simple interest accrued on principal amounts with fixed rates.',
  },

  // ==========================================
  // 5. YOUTUBE TOOLS (High Search CTR)
  // ==========================================
  {
    name: 'YouTube Thumbnail Downloader',
    slug: 'youtube-thumbnail-downloader',
    category: 'YouTube',
    description: 'Grab full-resolution HD, 1080p, and 4K cover thumbnails from any public YouTube video.',
  },
  {
    name: 'YouTube Tag Generator',
    slug: 'youtube-tag-generator',
    category: 'YouTube',
    description: 'Generate high-ranking viral SEO tags and keywords for your YouTube video uploads.',
  },
  {
    name: 'YouTube Title Generator',
    slug: 'youtube-title-generator',
    category: 'YouTube',
    description: 'Create high-CTR click-worthy titles for YouTube video content and shorts.',
  },
  {
    name: 'YouTube Money Calculator',
    slug: 'youtube-money-calculator',
    category: 'YouTube',
    description: 'Estimate estimated ad revenue and RPM earnings based on monthly channel views.',
  },
];
