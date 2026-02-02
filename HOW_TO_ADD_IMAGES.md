# How to Add or Remove Panorama Images

## Adding Images

### Step 1: Copy Your Image to the `images/` Folder

Simply place your panorama image files into the `images/` folder a.

Supported formats:
- `.png`
- `.jpg` or `.jpeg`
- `.webp`

For best results, use **equirectangular panorama images** with a **2:1 aspect ratio** (width:height).

Examples of good resolutions:
- 4096 × 2048 pixels
- 8192 × 4096 pixels
- 6000 × 3000 pixels

### Step 2: Update the Image List in JavaScript

1. Open the file: `js/panorama-viewer.js`

2. Find **line 43** (the `loadPanoramaList()` method)

3. Add your new image filename to the `imageNames` array:

```javascript
const imageNames = [
    'panorama_1.png',
    'panorama_2.png',        // ← Add your new images here
    'my_building.jpg',       // ← Just add the filename
    'exterior_view.png',     // ← Each on a new line with a comma
];
```

### Step 3: Done!

Refresh your browser and your new panorama will appear in the switcher panel.

---

## Removing Images

### Step 1: Delete from JavaScript

1. Open `js/panorama-viewer.js`
2. Go to **line 43**
3. Remove the line with the image filename you want to delete

**Before:**
```javascript
const imageNames = [
    'panorama_1.png',
    'panorama_2.png',        // ← Delete this line
    'my_building.jpg',
];
```

**After:**
```javascript
const imageNames = [
    'panorama_1.png',
    'my_building.jpg',
];
```

### Step 2: Delete from `images/` Folder (Optional)

You can also delete the actual image file from the `images/` folder to save space, but this isn't required.

---

## Example: Complete Workflow

Let's say you want to add 3 new panoramas of your building project:

1. **Prepare your images:**
   - `exterior.jpg`
   - `lobby.png`
   - `rooftop.jpg`

2. **Copy them to `images/` folder:**
   ```
   images/
   ├── panorama_1.png    (existing)
   ├── exterior.jpg      (new)
   ├── lobby.png         (new)
   └── rooftop.jpg       (new)
   ```

3. **Update `js/panorama-viewer.js` line 43:**
   ```javascript
   const imageNames = [
       'panorama_1.png',
       'exterior.jpg',
       'lobby.png',
       'rooftop.jpg',
   ];
   ```

4. **Refresh your browser** → Done! All 4 panoramas will appear.

---

## Tips

✅ **Name your files clearly** - The filename (without extension) will appear in the switcher

✅ **Keep files organized** - All panorama images must be in the `images/` folder

✅ **Check your syntax** - Make sure each filename has a comma after it (except the last one)

✅ **Test in browser** - If an image doesn't load, check the browser console (F12) for errors

---

## Troubleshooting

**Problem:** New image doesn't appear

- ✅ Check that the filename in the JavaScript **exactly matches** the actual file (including `.png` or `.jpg`)
- ✅ Make sure the image is in the `images/` folder
- ✅ Verify you saved the `panorama-viewer.js` file
- ✅ Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)

**Problem:** Image appears but won't load

- ✅ Verify the image file isn't corrupted
- ✅ Check that it's a supported format (PNG, JPG, WebP)
- ✅ Try opening the image directly in your browser: `images/your-image.png`

---

That's it! The viewer automatically handles everything else:
- Thumbnail generation
- Image counter badge
- Navigation controls
- Loading states

No other files need to be edited.
