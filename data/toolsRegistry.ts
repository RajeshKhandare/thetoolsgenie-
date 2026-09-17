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
  // 1. PDF TOOLS
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

  // 2. IMAGE TOOLS
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

  // 3. COMPILERS & RUNNERS
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

  // 4. DEVELOPER TOOLS (Active for Developer Filter)
  {
    name: 'JSON Prettifier & Validator',
    slug: 'json-formatter-validator',
    category: 'Developer',
    description: 'Prettify, format, validate, and minify messy JSON data strings with syntax highlighting.',
  },
  {
    name: 'Base64 Text & Data Encoder',
    slug: 'base64-encoder-decoder',
    category: 'Developer',
    description: 'Encode and decode UTF-8 plain text or binary assets to and from Base64.',
  },
  {
    name: 'Clean URL Slug Generator',
    slug: 'clean-url-slug-generator',
    category: 'Developer',
    description: 'Convert article titles and raw strings into SEO-friendly URL slugs.',
  },
  {
    name: 'HTML Entity Encoder',
    slug: 'html-entity-encoder',
    category: 'Developer',
    description: 'Convert special symbols and characters into secure HTML entities.',
  },
  {
    name: 'CSS Minifier & Cleaner',
    slug: 'css-minifier-cleaner',
    category: 'Developer',
    description: 'Compress stylesheet rules by stripping whitespace and comments.',
  },
  {
    name: 'Unix Timestamp Converter',
    slug: 'unix-timestamp-converter',
    category: 'Developer',
    description: 'Convert Epoch timestamps to human-readable dates and back.',
  },
  {
    name: 'HEX to RGB/HSL Converter',
    slug: 'hex-to-rgb-hsl-converter',
    category: 'Developer',
    description: 'Convert HEX color codes into CSS RGB, RGBA, and HSL formats.',
  },
  {
    name: 'URL Component Encoder/Decoder',
    slug: 'url-component-encoder-decoder',
    category: 'Developer',
    description: 'Safely encode or decode URL query strings and URI parameters.',
  },
  {
    name: 'JWT Token Inspector',
    slug: 'jwt-token-inspector',
    category: 'Developer',
    description: 'Decode JSON Web Tokens and view payload claims locally.',
  },
  {
    name: 'UUID / GUID v4 Generator',
    slug: 'uuid-guid-v4-generator',
    category: 'Developer',
    description: 'Generate cryptographically secure v4 random UUIDs in bulk.',
  },
  {
    name: 'Strong Password Generator',
    slug: 'strong-password-generator',
    category: 'Developer',
    description: 'Generate customizable, high-entropy random passwords.',
  },
  {
    name: 'User-Agent String Parser',
    slug: 'user-agent-string-parser',
    category: 'Developer',
    description: 'Parse browser client strings to detect OS, engine, and device models.',
  },

  // 5. TEXT TOOLS (Active for Text Filter)
  {
    name: 'Online Word & Character Counter',
    slug: 'word-character-counter',
    category: 'Text',
    description: 'Count real-time words, characters, sentences, paragraphs, and reading duration.',
  },
  {
    name: 'Text Case Converter',
    slug: 'text-case-converter',
    category: 'Text',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, and camelCase.',
  },
  {
    name: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator',
    category: 'Text',
    description: 'Generate dummy placeholder text paragraphs and sentences for mockups.',
  },
  {
    name: 'Remove Duplicate Lines',
    slug: 'remove-duplicate-lines',
    category: 'Text',
    description: 'Strip repetitive lines from lists and sort clean text items.',
  },
  {
    name: 'Markdown to HTML Live Converter',
    slug: 'markdown-to-html-converter',
    category: 'Text',
    description: 'Render Markdown markdown code to sanitized clean HTML tags.',
  },
  {
    name: 'Text Diff Checker',
    slug: 'text-diff-checker',
    category: 'Text',
    description: 'Compare two text documents side-by-side to highlight added and removed text.',
  },

  // 6. CONVERTERS (Active for Converters Filter)
  {
    name: 'Unit Length & Distance Converter',
    slug: 'unit-length-converter',
    category: 'Converters',
    description: 'Convert between Meters, Kilometers, Miles, Feet, Inches, and Yards.',
  },
  {
    name: 'Weight & Mass Converter',
    slug: 'weight-mass-converter',
    category: 'Converters',
    description: 'Convert between Kilograms, Grams, Pounds (lbs), Ounces, and Metric Tons.',
  },
  {
    name: 'Temperature Scale Converter',
    slug: 'temperature-converter',
    category: 'Converters',
    description: 'Instant conversion between Celsius, Fahrenheit, and Kelvin temperature scales.',
  },
  {
    name: 'Digital Data Size Converter',
    slug: 'data-size-converter',
    category: 'Converters',
    description: 'Convert Bytes, KB, MB, GB, TB, and Petabytes with exact binary powers.',
  },

  // 7. FINANCIAL TOOLS & CALCULATORS (Active for Finance & Calculators Filters)
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
    category: 'Calculators',
    description: 'Calculate annual, monthly, and daily compound interest growth on savings.',
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
    category: 'Calculators',
    description: 'Calculate percentage increase, percentage decrease, and fraction differences instantly.',
  },
  {
    name: 'GST Calculator Online',
    slug: 'gst-calculator',
    category: 'Finance',
    description: 'Calculate inclusive and exclusive Goods and Services Tax (GST) for invoices.',
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
    category: 'Calculators',
    description: 'Calculate basic simple interest accrued on principal amounts with fixed rates.',
  },

  // 8. YOUTUBE TOOLS (Active for YouTube Filter)
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
