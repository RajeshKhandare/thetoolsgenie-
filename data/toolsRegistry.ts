export interface ToolMeta {
  name: string;
  slug: string;
  category: 'PDF' | 'Image' | 'Compiler' | 'Finance' | 'YouTube';
  description: string;
  targetKeyword: string;
}

export const CATEGORIES = ['All', 'PDF', 'Image', 'Compiler', 'Finance', 'YouTube'] as const;

export const TOOLS_REGISTRY: ToolMeta[] = [
  // ==========================================
  // 1. PDF TOOLS (High-Volume Exact Keywords)
  // ==========================================
  {
    name: 'Merge PDF Online',
    slug: 'merge-pdf',
    category: 'PDF',
    description: 'Combine multiple PDF files into one document online for free without watermarks.',
    targetKeyword: 'merge pdf online free',
  },
  {
    name: 'Split PDF Pages',
    slug: 'split-pdf',
    category: 'PDF',
    description: 'Extract specific pages or separate single PDF pages into individual documents instantly.',
    targetKeyword: 'split pdf pages free',
  },
  {
    name: 'Compress PDF Online',
    slug: 'compress-pdf',
    category: 'PDF',
    description: 'Reduce PDF file size without losing quality directly in your browser memory.',
    targetKeyword: 'compress pdf online to 100kb',
  },
  {
    name: 'PDF to JPG Converter',
    slug: 'pdf-to-jpg',
    category: 'PDF',
    description: 'Convert PDF pages into high-resolution JPG image files online in seconds.',
    targetKeyword: 'pdf to jpg converter online',
  },
  {
    name: 'JPG to PDF Converter',
    slug: 'jpg-to-pdf',
    category: 'PDF',
    description: 'Convert JPG, JPEG, and PNG photos into a single clean PDF document.',
    targetKeyword: 'jpg to pdf converter free',
  },
  {
    name: 'Protect PDF with Password',
    slug: 'protect-pdf-password',
    category: 'PDF',
    description: 'Encrypt and lock your PDF document with a secure password client-side.',
    targetKeyword: 'protect pdf with password online',
  },
  {
    name: 'Unlock PDF Password',
    slug: 'unlock-pdf-password',
    category: 'PDF',
    description: 'Remove passwords and permissions from encrypted PDF documents locally.',
    targetKeyword: 'unlock password protected pdf',
  },
  {
    name: 'Rotate PDF Pages',
    slug: 'rotate-pdf',
    category: 'PDF',
    description: 'Rotate individual or all pages in your PDF 90, 180, or 270 degrees permanently.',
    targetKeyword: 'rotate pdf pages permanently online',
  },
  {
    name: 'Add Page Numbers to PDF',
    slug: 'add-page-numbers-pdf',
    category: 'PDF',
    description: 'Insert header or footer page numbers with custom font styling into your PDF.',
    targetKeyword: 'number pdf pages online',
  },
  {
    name: 'PDF to Word Converter',
    slug: 'pdf-to-word',
    category: 'PDF',
    description: 'Convert PDF files into editable DOCX Word format without losing text structure.',
    targetKeyword: 'convert pdf to word docx online free',
  },
  {
    name: 'Word to PDF Converter',
    slug: 'word-to-pdf',
    category: 'PDF',
    description: 'Convert Microsoft Word documents (DOCX, DOC) into standard PDF files.',
    targetKeyword: 'word to pdf online converter',
  },
  {
    name: 'Delete Pages from PDF',
    slug: 'delete-pdf-pages',
    category: 'PDF',
    description: 'Select and remove unwanted pages from any PDF file with instant download.',
    targetKeyword: 'delete pages from pdf online',
  },
  {
    name: 'Reorder PDF Pages',
    slug: 'reorder-pdf-pages',
    category: 'PDF',
    description: 'Drag, drop, and rearrange the page sequence of your PDF document.',
    targetKeyword: 'reorder pdf pages online free',
  },
  {
    name: 'PDF Grayscale Converter',
    slug: 'pdf-grayscale-converter',
    category: 'PDF',
    description: 'Convert colored PDF documents into monochrome black and white for cheap printing.',
    targetKeyword: 'convert pdf to black and white online',
  },

  // ==========================================
  // 2. IMAGE TOOLS (Search-Engine Optimized)
  // ==========================================
  {
    name: 'Compress Image Online',
    slug: 'compress-image',
    category: 'Image',
    description: 'Compress JPG, PNG, and WebP images down to KB sizes with zero visible loss.',
    targetKeyword: 'compress image online to 50kb',
  },
  {
    name: 'Image Resizer (Pixel & CM)',
    slug: 'image-resizer',
    category: 'Image',
    description: 'Resize image dimensions by custom width, height, or percentages in pixels and cm.',
    targetKeyword: 'resize image pixels online free',
  },
  {
    name: 'Crop Image Online',
    slug: 'crop-image-online',
    category: 'Image',
    description: 'Crop images freeform with custom box or standard aspect ratios (1:1, 16:9, 4:3).',
    targetKeyword: 'crop image online free form',
  },
  {
    name: 'WebP to JPG Converter',
    slug: 'webp-to-jpg-converter',
    category: 'Image',
    description: 'Convert modern WebP images into standard JPG format in high quality.',
    targetKeyword: 'convert webp to jpg online',
  },
  {
    name: 'WebP to PNG Converter',
    slug: 'webp-to-png-converter',
    category: 'Image',
    description: 'Convert WebP files into transparent, lossless PNG images client-side.',
    targetKeyword: 'webp to transparent png converter',
  },
  {
    name: 'PNG to JPG Converter',
    slug: 'png-to-jpg-converter',
    category: 'Image',
    description: 'Quickly convert large PNG images into lightweight JPG pictures.',
    targetKeyword: 'png to jpg converter high resolution',
  },
  {
    name: 'JPG to PNG Converter',
    slug: 'jpg-to-png-converter',
    category: 'Image',
    description: 'Convert JPEG/JPG pictures to lossless PNG image format with zero compression artifacts.',
    targetKeyword: 'jpg to png converter online',
  },
  {
    name: 'SVG to PNG Converter',
    slug: 'svg-to-png-converter',
    category: 'Image',
    description: 'Rasterize vector SVG files into crisp, ultra-high-resolution PNG graphics.',
    targetKeyword: 'convert svg to high resolution png',
  },
  {
    name: 'Black and White Image Filter',
    slug: 'black-and-white-image-filter',
    category: 'Image',
    description: 'Turn colored photographs into classic monochrome grayscale pictures.',
    targetKeyword: 'turn photo black and white online',
  },
  {
    name: 'Flip and Rotate Image',
    slug: 'flip-rotate-image',
    category: 'Image',
    description: 'Flip images horizontally, vertically, or rotate 90 degrees with instant canvas preview.',
    targetKeyword: 'flip image horizontally online',
  },

  // ==========================================
  // 3. COMPILERS & RUNNERS (Programiz Competitor)
  // ==========================================
  {
    name: 'Online Python Compiler',
    slug: 'online-python-compiler',
    category: 'Compiler',
    description: 'Run Python 3 code in browser with instant terminal output and zero setup.',
    targetKeyword: 'online python compiler programiz free',
  },
  {
    name: 'Online JavaScript Compiler',
    slug: 'online-javascript-compiler',
    category: 'Compiler',
    description: 'Execute modern JavaScript (ES6+) sandbox with real-time console inspect output.',
    targetKeyword: 'online javascript console compiler',
  },
  {
    name: 'Online HTML CSS JS Editor',
    slug: 'online-html-editor',
    category: 'Compiler',
    description: 'Live interactive HTML, CSS, and JavaScript editor with split-screen DOM preview.',
    targetKeyword: 'online html editor live preview',
  },
  {
    name: 'JSON Formatter & Validator',
    slug: 'json-formatter-validator',
    category: 'Compiler',
    description: 'Prettify, format, validate, and minify messy JSON data strings with syntax highlighting.',
    targetKeyword: 'json formatter and validator online',
  },
  {
    name: 'Online C++ Compiler',
    slug: 'online-cpp-compiler',
    category: 'Compiler',
    description: 'Compile and test C++ programs online in browser memory with instant console logs.',
    targetKeyword: 'online c++ compiler runner',
  },
  {
    name: 'Online Java Compiler',
    slug: 'online-java-compiler',
    category: 'Compiler',
    description: 'Write, debug, and run standard Java code snippets directly in your web browser.',
    targetKeyword: 'online java compiler free',
  },
  {
    name: 'Online SQL Runner',
    slug: 'online-sql-runner',
    category: 'Compiler',
    description: 'Execute SQL queries, test database tables, and verify relational commands.',
    targetKeyword: 'online sql runner playground',
  },
  {
    name: 'Base64 Encoder & Decoder',
    slug: 'base64-encoder-decoder',
    category: 'Compiler',
    description: 'Convert text, hashes, and binary files to and from Base64 string formats.',
    targetKeyword: 'base64 encode decode online string',
  },

  // ==========================================
  // 4. FINANCIAL CALCULATORS (High CPC & Volume)
  // ==========================================
  {
    name: 'SIP Calculator Online',
    slug: 'sip-calculator',
    category: 'Finance',
    description: 'Calculate future wealth and compound returns on your monthly Mutual Fund SIP investments.',
    targetKeyword: 'sip calculator mutual fund returns',
  },
  {
    name: 'EMI Calculator (Home & Car Loan)',
    slug: 'emi-calculator',
    category: 'Finance',
    description: 'Calculate monthly loan EMI payments, total interest breakdown, and tenure repayment plans.',
    targetKeyword: 'loan emi calculator online monthly',
  },
  {
    name: 'Compound Interest Calculator',
    slug: 'compound-interest-calculator',
    category: 'Finance',
    description: 'Calculate annual, monthly, and daily compound interest growth on savings and deposits.',
    targetKeyword: 'compound interest calculator formula online',
  },
  {
    name: 'Lumpsum Mutual Fund Calculator',
    slug: 'lumpsum-calculator',
    category: 'Finance',
    description: 'Estimate total maturity returns on one-time lumpsum mutual fund investments.',
    targetKeyword: 'lumpsum investment calculator online',
  },
  {
    name: 'Percentage Calculator Online',
    slug: 'percentage-calculator',
    category: 'Finance',
    description: 'Calculate percentage increase, percentage decrease, and fraction differences instantly.',
    targetKeyword: 'percentage calculator online math',
  },
  {
    name: 'GST Calculator Online',
    slug: 'gst-calculator',
    category: 'Finance',
    description: 'Calculate inclusive and exclusive Goods and Services Tax (GST) for commercial invoices.',
    targetKeyword: 'gst calculator online inclusive exclusive',
  },
  {
    name: 'Salary & In-Hand Pay Calculator',
    slug: 'salary-calculator',
    category: 'Finance',
    description: 'Calculate monthly in-hand take-home salary after taxes and deductions.',
    targetKeyword: 'in hand salary calculator online',
  },
  {
    name: 'Simple Interest Calculator',
    slug: 'simple-interest-calculator',
    category: 'Finance',
    description: 'Calculate basic simple interest accrued on principal amounts with fixed rates.',
    targetKeyword: 'simple interest calculator online',
  },

  // ==========================================
  // 5. YOUTUBE & CREATOR TOOLS
  // ==========================================
  {
    name: 'YouTube Thumbnail Downloader',
    slug: 'youtube-thumbnail-downloader',
    category: 'YouTube',
    description: 'Extract and download YouTube video cover thumbnails in HD, 1080p, and 4K quality.',
    targetKeyword: 'youtube thumbnail downloader hd 4k',
  },
  {
    name: 'YouTube Tag Generator',
    slug: 'youtube-tag-generator',
    category: 'YouTube',
    description: 'Generate high-ranking viral SEO tags and keywords for your YouTube video uploads.',
    targetKeyword: 'youtube tags generator for views',
  },
  {
    name: 'YouTube Title Generator',
    slug: 'youtube-title-generator',
    category: 'YouTube',
    description: 'Create high-CTR click-worthy titles for YouTube video content and shorts.',
    targetKeyword: 'youtube title generator free ai',
  },
  {
    name: 'YouTube Money Calculator',
    slug: 'youtube-money-calculator',
    category: 'YouTube',
    description: 'Estimate estimated ad revenue and RPM earnings based on monthly channel views.',
    targetKeyword: 'youtube money calculator by views',
  },
];
