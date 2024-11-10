const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// Ensure icons directory exists
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
}

// Create SVG content directly in the script
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <!-- Circular progress background -->
  <circle cx="24" cy="24" r="20" fill="white" stroke="#E2E8F0" stroke-width="4"/>
  
  <!-- Progress arc (about 75% complete) -->
  <path 
    d="M24,4 A20,20 0 1,1 24,44 A20,20 0 1,1 24,4"
    fill="none" 
    stroke="#3B82F6" 
    stroke-width="4"
    stroke-dasharray="125.6 125.6"
    stroke-dashoffset="31.4"
    transform="rotate(-90 24 24)"
  />
  
  <!-- Small circles for time segments -->
  <circle cx="24" cy="8" r="2" fill="#3B82F6"/>
  <circle cx="36" cy="24" r="2" fill="#3B82F6"/>
  <circle cx="24" cy="40" r="2" fill="#3B82F6"/>
  <circle cx="12" cy="24" r="2" fill="#3B82F6"/>
  
  <!-- Center dot -->
  <circle cx="24" cy="24" r="3" fill="#2563EB"/>
</svg>
`;

// Save the SVG content to a temporary buffer
const svgBuffer = Buffer.from(svgContent);

// Generate different sizes
async function generateIcons() {
    const sizes = [48, 96];
    
    try {
        for (const size of sizes) {
            await sharp(svgBuffer)
                .resize(size, size)
                .png()
                .toFile(path.join(iconsDir, `icon-${size}.png`));
            console.log(`✓ Generated icon-${size}.png`);
        }
        console.log('Icon generation complete!');
    } catch (error) {
        console.error('Error generating icons:', error);
        process.exit(1);
    }
}

// Run the generation
generateIcons();