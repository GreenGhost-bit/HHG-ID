import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, X, Check, Loader2, Copy, CheckCircle } from 'lucide-react';
import Cropper from 'react-easy-crop';
import html2canvas from 'html2canvas';
import { getCroppedImg } from './cropImage';
import IDCard from './IDCard';

const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Update this URL after deployment
const DEPLOY_URL = 'https://hhgoa2026-id.vercel.app/';

function App() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [team, setTeam] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [captionCopied, setCaptionCopied] = useState(false);
  
  // Crop state
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const cardRef = useRef(null);
  const fileInputRef = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
        setIsCropping(true);
      });
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      setPhotoUrl(croppedImage);
      setIsCropping(false);
    } catch (e) {
      console.error(e);
      alert('Failed to crop image.');
    }
  }, [imgSrc, croppedAreaPixels]);

  const generateImage = useCallback(async () => {
    if (!cardRef.current) return null;
    
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0b1a13',
        logging: false,
        onclone: (clonedDoc) => {
          // Reset transform on cloned node so it captures at full fixed resolution
          const clonedCard = clonedDoc.querySelector('.id-card-wrapper');
          if (clonedCard) {
            clonedCard.style.transform = 'none';
          }
        }
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      return dataUrl;
    } catch (err) {
      console.error('Error generating image', err);
      alert('Failed to generate image: ' + (err?.message || 'Please try again.'));
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [cardRef]);

  const downloadDataUrl = (dataUrl) => {
    const link = document.createElement('a');
    link.download = `HH-Goa-2026-ID-${(name || 'builder').replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = async () => {
    const dataUrl = await generateImage();
    if (dataUrl) downloadDataUrl(dataUrl);
  };

  const dataUrlToFile = async (dataUrl, filename) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: 'image/png' });
  };

  // Drops repeated #hashtags / @mentions from a line, keeping the first occurrence.
  const dedupeTags = (line) => {
    const seen = new Set();
    return line
      .split(/\s+/)
      .filter((token) => {
        if (!/^[#@]/.test(token)) return true;
        const key = token.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .join(' ');
  };

  const buildCaption = () => {
    return [
      "Wasn't invited?\nBuild your own way in.",
      'sudo ./enter_hacker_house\nACCESS GRANTED ✓',
      'See you at Hacker House Goa 2026.',
      dedupeTags('#FrameInGoa @247pmstudio #HHGoa2026')
    ].join('\n\n');
  };

  const copyCaption = async (caption) => {
    try {
      await navigator.clipboard.writeText(caption);
      setCaptionCopied(true);
      setTimeout(() => setCaptionCopied(false), 2000);
      return true;
    } catch (error) {
      console.log('Clipboard copy failed:', error);
      return false;
    }
  };

  const handleCopyCaption = async () => {
    const caption = buildCaption();
    await copyCaption(caption);
  };

  // Only phones/tablets have an OS share sheet that reliably lists installed
  // social apps (X/LinkedIn/Instagram). On desktop, navigator.share() instead
  // opens the OS-level share panel (e.g. Windows' native flyout), which rarely
  // has those platforms registered — so it looks like the button does nothing.
  const isMobileDevice = () => {
    if (navigator.userAgentData?.mobile !== undefined) return navigator.userAgentData.mobile;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // Opens a tab synchronously, in direct response to the click, and severs
  // window.opener (equivalent security to `noopener`) while keeping a handle
  // we can navigate later. This is the actual fix for "share button does
  // nothing on the first click after a fresh deploy": the previous code only
  // called window.open() after awaiting image generation, and a browser's
  // user-activation window can expire during that async gap — especially on
  // the very first html2canvas render post-deploy, which is slower because
  // fonts/layout aren't warmed up yet. Once activation expires, window.open()
  // is silently blocked as a popup with no visible error. Opening the tab
  // immediately (before any await) means it's never subject to that block;
  // we fill in its real destination once we know it.
  const openPlatformTab = (url) => {
    try {
      const tab = window.open(url, '_blank');
      if (tab) tab.opener = null;
      return tab;
    } catch (error) {
      console.log('Could not open platform tab:', error);
      return null;
    }
  };

  // Mobile: hand the image + caption to the native OS share sheet — the user
  // picks the app there and still taps Post themselves inside it.
  // Desktop: browsers cannot programmatically submit a post on X/LinkedIn/
  // Instagram, so instead we download the image, copy the caption to the
  // clipboard, and rely on the already-open platform tab (see openPlatformTab)
  // for the user to paste into and post from.
  const shareWithFallback = async (caption, tab, fallbackUrl, instructions) => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    if (isMobileDevice()) {
      try {
        if (navigator.canShare) {
          const file = await dataUrlToFile(dataUrl, 'hh-goa-id.png');
          if (navigator.canShare({ files: [file] })) {
            tab?.close(); // mobile hands off via the native share sheet instead
            await navigator.share({
              title: 'HH Goa 2026 ID',
              text: caption,
              files: [file]
            });
            return;
          }
        }
      } catch (error) {
        console.log('Error sharing directly:', error);
        if (error?.name === 'AbortError') { tab?.close(); return; } // user cancelled the share sheet
      }
    }

    downloadDataUrl(dataUrl);
    const copied = await copyCaption(caption);
    if (instructions) alert(`${instructions}${copied ? '\n\nCaption copied to clipboard — just paste it (Ctrl/Cmd+V) into the post.' : ''}`);
    // openPlatformTab already navigated `tab` to fallbackUrl synchronously on click.
    // Only if that was blocked (tab is null) do we attempt a (possibly also
    // blocked, but worth trying) late open here.
    if (!tab && fallbackUrl) {
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShareToX = async () => {
    const caption = buildCaption();
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
    const tab = isMobileDevice() ? null : openPlatformTab(tweetUrl);
    await shareWithFallback(
      caption,
      tab,
      tweetUrl,
      'Image downloaded and X compose window opened with your caption pre-filled. Attach the downloaded image, then hit Post whenever you\'re ready.'
    );
  };

  const handleShareToLinkedIn = async () => {
    const caption = buildCaption();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(DEPLOY_URL)}`;
    const tab = isMobileDevice() ? null : openPlatformTab(linkedInUrl);
    await shareWithFallback(
      caption,
      tab,
      linkedInUrl,
      'Image downloaded and LinkedIn share window opened. LinkedIn no longer lets sites pre-fill post text, so paste your caption into the text box and attach the downloaded image, then hit Post whenever you\'re ready.'
    );
  };

  const handleShareToInstagram = async () => {
    const caption = buildCaption();
    const instagramUrl = 'https://www.instagram.com/';
    const tab = isMobileDevice() ? null : openPlatformTab(instagramUrl);
    await shareWithFallback(
      caption,
      tab,
      instagramUrl,
      'Instagram doesn\'t allow websites to pre-fill posts at all, even on mobile web, so this is the closest possible: your ID image has been downloaded and your caption copied. Open Instagram, start a new post with the downloaded image, paste the caption, then hit Share whenever you\'re ready.'
    );
  };

  return (
    <div className="app-container">
      {isCropping && (
        <div className="crop-modal-overlay">
          <div className="crop-modal">
            <div className="crop-container">
              <Cropper
                image={imgSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 5}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="crop-controls">
              <label style={{color: 'var(--text-bright)'}}>Zoom & Adjust Photo</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(e.target.value)}
                style={{width: '100%'}}
              />
              <div className="crop-actions">
                <button className="btn btn-secondary" onClick={() => setIsCropping(false)} style={{width: 'auto'}}>
                  <X size={18} /> Cancel
                </button>
                <button className="btn btn-primary" onClick={showCroppedImage} style={{width: 'auto'}}>
                  <Check size={18} /> Apply Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="editor-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <h2 style={{color: 'var(--accent-yellow)', margin: 0 }}>BUILDER_TERMINAL.sh</h2>
        </div>
        
        <div className="form-group">
          <label className="form-label">Profile Photo (4:5 Aspect Ratio)</label>
          <div 
            className="photo-upload" 
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={32} color="var(--accent-yellow)" />
            <span style={{color: 'var(--text-bright)', marginTop: '0.5rem'}}>
              {photoUrl ? 'Click to change / re-crop photo' : 'Upload photo (JPG, PNG, HEIC)'}
            </span>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*,.heic"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Builder Name</label>
          <input 
            type="text" 
            className="form-input" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g. Satoshi Nakamoto"
            maxLength={30}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role / Stack</label>
          <input 
            type="text" 
            className="form-input" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            placeholder="e.g. Rust Developer, Full Stack..."
            maxLength={40}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Team Name</label>
          <input
            type="text"
            className="form-input"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder="e.g. Byte Force"
            maxLength={30}
          />
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={handleDownload} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
            {isGenerating ? 'GENERATING...' : 'DOWNLOAD ID CARD'}
          </button>
          
          <button className="btn btn-secondary btn-copy" onClick={handleCopyCaption} disabled={isGenerating}>
            {captionCopied ? <CheckCircle size={18} /> : <Copy size={18} />}
            {captionCopied ? 'COPIED!' : 'COPY CAPTION'}
          </button>
          
          <button className="btn btn-secondary btn-x" onClick={handleShareToX} disabled={isGenerating}>
            <TwitterIcon size={18} />
            SHARE TO X
          </button>
          
          <button className="btn btn-secondary btn-linkedin" onClick={handleShareToLinkedIn} disabled={isGenerating}>
            <LinkedinIcon size={18} />
            LINKEDIN
          </button>

          <button className="btn btn-secondary btn-instagram" onClick={handleShareToInstagram} disabled={isGenerating}>
            <InstagramIcon size={18} />
            INSTAGRAM
          </button>
        </div>
      </div>

      <div className="card-preview-panel">
        <div className="id-card-scale-wrapper">
          <IDCard
            ref={cardRef}
            name={name}
            role={role}
            team={team}
            photoUrl={photoUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
