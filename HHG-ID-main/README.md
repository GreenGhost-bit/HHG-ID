# HH Goa 2026 - Builder ID Card Generator

A web tool to generate personalized Builder ID Cards for Hacker House Goa 2026. Upload your photo, customize your details, and share your builder identity on social media.

## ✨ Features

- **📸 Photo Upload & Crop** - Upload JPG, PNG, or HEIC images with built-in cropping (4:5 aspect ratio)
- **🎨 Terminal-Themed Design** - Hacker aesthetic with scanline effects, ASCII art, and command-line narrative
- **⚡ Instant Generation** - Fast client-side image generation using html2canvas
- **📥 Download** - Export your ID card as a high-quality PNG
- **🐦 Social Sharing** - One-click share to X (Twitter), LinkedIn, and Instagram with pre-filled captions
- **📱 Mobile-Friendly** - Responsive design that works great on all devices
- **🔒 No Login Required** - Works immediately, no signup or authentication needed

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hhgoa2026-id.git
cd hhgoa2026-id

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **html2canvas** - Client-side image generation
- **react-easy-crop** - Photo cropping functionality
- **Lucide React** - Icons

## 📁 Project Structure

```
├── public/
│   ├── favicon.svg       # Browser favicon
│   ├── favicon.webp      # Alternative favicon
│   ├── icons.svg         # Icon sprites
│   └── og-preview.png    # Social media preview image
├── src/
│   ├── App.jsx           # Main application component
│   ├── App.css           # Component styles
│   ├── IDCard.jsx        # ID Card component
│   ├── index.css         # Global styles
│   ├── main.jsx          # Entry point
│   ├── cropImage.js      # Image cropping utility
│   └── logoBase64.js     # Base64 encoded logo
├── index.html            # HTML template with meta tags
├── package.json
└── vite.config.js
```

## 🔧 Configuration

### Generating the OG Preview Image

Before deploying, generate the Open Graph preview image:

1. Open `scripts/generate-og-image.html` in your browser
2. Click "DOWNLOAD OG IMAGE" button
3. Save the downloaded `og-preview.png` to the `public/` folder
4. Commit and deploy

### Update Deployment URL

After deploying, update these files with your actual URL:

1. **index.html** - Update all `og:url`, `twitter:url`, and `og:image` meta tags
2. **src/App.jsx** - Update the `DEPLOY_URL` constant:
   ```jsx
   const DEPLOY_URL = 'https://your-actual-url.vercel.app/';
   ```

## 📝 Customization

### Changing the Event Branding

- **Logo**: Replace the base64 string in `src/logoBase64.js`
- **Colors**: Edit CSS variables in `src/index.css`
- **Event Details**: Update dates and location in `src/IDCard.jsx`
- **Social Caption**: Modify `buildCaption()` in `src/App.jsx`

## 🎯 Task Requirements Met

| Requirement | Status |
|------------|--------|
| Photo upload (JPG, PNG, HEIC) | ✅ |
| Input fields (name, role, team) | ✅ |
| Fast generation | ✅ |
| Handles different photo sizes | ✅ |
| On-brand design | ✅ |
| Downloadable PNG output | ✅ |
| Share to X with #FrameInGoa | ✅ |
| OG image for link previews | ✅ |
| No login/signup wall | ✅ |
| Mobile-friendly | ✅ |

## 📄 License

MIT License - feel free to use this for your own events!
- [@247pmstudio](https://twitter.com/247pmstudio)

---

**#FrameInGoa** | **#HHGoa2026**
