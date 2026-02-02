# 360° Panorama Viewer

A fullscreen, minimalist panorama viewer for architectural visualizations and 360° images. Features smooth rotation, zoom controls, and a hidden image switcher with an ultra-clean interface.

## Features

✨ **Fullscreen 360° Viewing**
- Drag to rotate the panorama (mouse or touch)
- Scroll to zoom in/out (mouse wheel or pinch gestures)
- True fullscreen experience with minimal UI

🎨 **Minimalist Interface**
- No headers, no backgrounds - just your panorama
- Tiny overlaid controls that don't distract
- Hidden image switcher panel (click top-left button)
- Clean, professional aesthetic

🖼️ **Multi-Image Support**
- Hidden switcher panel with thumbnail grid
- Automatic image detection and counting
- Badge shows number of available panoramas
- Easy navigation between images

⚡ **Performance Optimized**
- Vanilla JavaScript (no dependencies)
- Hardware-accelerated rendering
- Efficient canvas-based display
- Small footprint (~8KB total)

📱 **Fully Responsive**
- Perfect on desktop, tablet, and mobile
- Touch gestures for mobile devices
- Adaptive UI for all screen sizes

## Quick Start

### 1. Add Your Panorama Images

Place your panorama images in the `images/` folder.

Supported formats: PNG, JPG, WebP

Best format: Equirectangular panoramas with 2:1 aspect ratio (e.g., 4096×2048)

### 2. Update the Image List

Open `js/panorama-viewer.js` and go to **line 43**. Add your image filenames:

```javascript
const imageNames = [
    'panorama_1.png',
    'panorama_2.png',
    'my_building.jpg',
    // Add as many as you need!
];
```

### 3. Open in Browser

Double-click `index.html` - that's it!

📖 **For detailed instructions, see [HOW_TO_ADD_IMAGES.md](HOW_TO_ADD_IMAGES.md)**

## Controls

### Desktop
- **Rotate View**: Click and drag anywhere
- **Zoom In/Out**: Scroll wheel or use buttons (bottom-right)
- **Reset View**: Click reset button (↻)
- **Switch Images**: Click grid button (top-left) to open switcher panel

### Mobile
- **Rotate View**: Touch and drag with one finger
- **Zoom**: Pinch with two fingers
- **Switch Images**: Tap grid button (top-left)

## UI Elements

The viewer has only **two control groups** that overlay the panorama:

1. **Switcher Button** (top-left)
   - Grid icon with badge showing image count
   - Click to open/close the image switcher panel
   - Hidden automatically if you only have one image

2. **Zoom Controls** (bottom-right)
   - Zoom in (+)
   - Zoom out (-)
   - Reset view (↻)

Everything else is your panorama - fullscreen!

## Project Structure

```
panorama-viewer/
├── index.html                  # Main HTML file
├── css/
│   └── styles.css             # Minimal, fullscreen styles
├── js/
│   └── panorama-viewer.js     # Viewer logic
├── images/
│   ├── panorama_1.png         # Your panorama images
│   ├── panorama_2.png
│   └── ...
├── HOW_TO_ADD_IMAGES.md       # Detailed guide for managing images
└── README.md                   # This file
```

## Adding/Removing Images

See the complete guide: **[HOW_TO_ADD_IMAGES.md](HOW_TO_ADD_IMAGES.md)**

**Quick version:**

To add images:
1. Copy image to `images/` folder
2. Add filename to the array in `js/panorama-viewer.js` (line 43)
3. Refresh browser

To remove images:
1. Remove filename from the array in `js/panorama-viewer.js` (line 43)
2. Optionally delete the file from `images/` folder

## Customization

### Changing Control Colors

Edit CSS variables in `css/styles.css` (lines 3-9):

```css
:root {
    --color-control-bg: rgba(0, 0, 0, 0.6);     /* Control background */
    --color-control-hover: rgba(0, 0, 0, 0.8);  /* Hover state */
    --color-accent: #3b82f6;                     /* Accent color (badge) */
}
```

### Adjusting View Settings

Edit defaults in `js/panorama-viewer.js` (lines 15-18):

```javascript
this.yaw = 0;           // Initial horizontal angle (0-360)
this.pitch = 0;         // Initial vertical angle (-90 to 90)
this.fov = 90;          // Initial field of view (30-120)
this.minFov = 30;       // Maximum zoom in
this.maxFov = 120;      // Maximum zoom out
```

### Changing Rotation/Zoom Sensitivity

In `js/panorama-viewer.js`:

- **Mouse drag sensitivity**: Lines 203-204 (currently `0.3`)
- **Touch drag sensitivity**: Lines 234-235 (currently `0.5`)
- **Wheel zoom sensitivity**: Line 250 (currently `0.1`)

## Image Requirements

### Format
- PNG (best for renders with transparency)
- JPG (best for photos, smaller file size)
- WebP (best compression, modern browsers)

### Dimensions
Panoramas should be **equirectangular** with a **2:1 ratio**:
- Recommended: 4096 × 2048 or higher
- Minimum: 2048 × 1024
- Maximum: Limited only by browser memory

### File Size
- Optimize images for web (use tools like TinyPNG or ImageOptim)
- Target: 1-3 MB per image for good balance
- WebP format recommended for smallest files

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |
| Mobile  | Modern  | ✅ Full |

## Performance

- Fullscreen rendering at 60fps on modern devices
- Hardware-accelerated canvas
- Images loaded on-demand
- Optimized for both desktop and mobile
- Smooth touch gestures with proper event handling

## Tips for Best Results

1. **Use high-quality panoramas** - 4K or higher for sharp detail
2. **Maintain 2:1 aspect ratio** - Essential for proper spherical mapping
3. **Optimize file sizes** - Balance quality and loading speed
4. **Name files descriptively** - The filename becomes the label
5. **Test on mobile** - Ensure touch controls work smoothly

## Using with a Web Server

For local development, you can use a simple web server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## License

Free to use for personal and commercial projects.

## Credits

Built with vanilla JavaScript, HTML5 Canvas, and CSS3.  
Designed for architectural visualization and 360° photography.  
Zero dependencies. Pure web standards.

---

**Need help?** Check the [HOW_TO_ADD_IMAGES.md](HOW_TO_ADD_IMAGES.md) guide or open the browser console (F12) to see any error messages.
