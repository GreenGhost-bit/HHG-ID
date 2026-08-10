import React, { forwardRef } from 'react';
import { HHG_LOGO_B64 } from './logoBase64';

const ASCII_ART = `
      .
     / \\
    /   \\
   /_____\\
    |   |    .
   _|___|___/__\\_
  |  ~   ~   ~  |
  |_____________|
`;

// Helper to replace standard spaces with non-breaking spaces (\u00A0)
// This guarantees html2canvas and canvas text renderers NEVER collapse spaces between words.
const formatSpaces = (str) => {
  if (!str) return '';
  return str.replace(/ /g, '\u00A0');
};

const IDCard = forwardRef(({ name, role, team, photoUrl }, ref) => {
  return (
    <div className="id-card-wrapper" ref={ref}>

      {/* Top Header Section */}
      <div className="id-header-container">
        <div className="header-meta-left">
          <div>LAT: 15.4989&deg; N // LON: 73.8278&deg; E</div>
          <div>SYS_STATUS: ACTIVE_HH26</div>
          <div style={{ color: 'var(--accent-yellow)', fontSize: '0.75rem', marginTop: '4px', fontWeight: 'bold' }}>BUILDER DETECTED...</div>
        </div>

        <div className="id-header-center">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '8px' }}>
            <img src={HHG_LOGO_B64} alt="HH Goa Logo" style={{ width: '88px', height: '88px', objectFit: 'contain' }} />
            <h1 className="id-title" style={{ margin: 0 }}>HACKER HOUSE GOA</h1>
          </div>
          <div className="id-subtitle">HH26 &middot; BUILDER ACCESS &middot; GOA</div>
        </div>

        <div className="header-meta-right">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        </div>
      </div>

      <div className="header-divider"></div>

      {/* Main Terminal Window */}
      <div className="terminal-window">
        <div className="terminal-header">
          <span>HH26://ACCESS_TERMINAL</span>
          <div className="terminal-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        <div className="terminal-body scanline">
          <div className="terminal-content">

            <div className="terminal-text">
              <div className="terminal-line">
                <span className="text-bright">$</span> sudo ./enter_hacker_house
              </div>
              <div className="terminal-line">[sudo] password for builder:</div>
              <div className="terminal-line">***************</div>

              <div className="terminal-line mt-2">Authenticating...</div>

              <div className="terminal-line text-success">[+] Identity verified</div>
              <div className="terminal-line text-success">[+] Builder detected</div>
              <div className="terminal-line text-success">[+] Stack loaded</div>
              <div className="terminal-line text-success">[+] Ideas loaded</div>
              <div className="terminal-line text-success">[+] Goa coordinates locked</div>

              <div className="mt-2">
                <div className="text-yellow" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>ACCESS DENIED</div>
                <div className="terminal-line" style={{ fontSize: '0.85rem' }}>Reason: No invitation found.</div>
              </div>

              <div className="terminal-line mt-2">
                <span className="text-bright">$</span> ./bypass_invitation.sh
              </div>
              <div className="terminal-line" style={{ fontSize: '0.85rem' }}>Bypassing invitation requirement...</div>

              <div className="progress-container">
                <div className="progress-bar"></div>
                <span className="progress-text">100%</span>
              </div>

              <div className="access-granted">
                <div className="access-title animate-blink text-yellow">ACCESS GRANTED ✔</div>
                <div className="terminal-line" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>WELCOME, BUILDER.</div>
              </div>

              <div className="ascii-art">
                {ASCII_ART}
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-scan-title">BUILDER PROFILE SCAN</div>

              <div className="profile-image-container">
                <div className="corner corner-tl"></div>
                <div className="corner corner-tr"></div>
                <div className="corner corner-bl"></div>
                <div className="corner corner-br"></div>
                {photoUrl ? (
                  <img src={photoUrl} alt="Builder" className="profile-image" />
                ) : (
                  <div className="profile-image-placeholder">
                    <svg viewBox="0 0 100 125" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '60%', height: '60%', opacity: 0.4 }}>
                      <circle cx="50" cy="35" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M15 105 C15 75, 35 60, 50 60 C65 60, 85 75, 85 105" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                    <span style={{ color: 'var(--text-main)', fontSize: '0.8rem', marginTop: '8px' }}>UPLOAD PHOTO</span>
                  </div>
                )}
              </div>

              <div className="profile-details">
                <div className="profile-field">
                  <span className="profile-label">NAME:&nbsp;</span>
                  <span className="profile-value">{formatSpaces(name) || 'YOUR_NAME'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-label">ROLE:&nbsp;</span>
                  <span className="profile-value">{formatSpaces(role) || 'YOUR_ROLE'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-label">TEAM:&nbsp;</span>
                  <span className="profile-value">{formatSpaces(team) || 'SOLO_BUILDER'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-label">STATUS:&nbsp;</span>
                  <span className="profile-value text-yellow" style={{ fontWeight: 'bold' }}>VERIFIED&nbsp;✔</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="id-footer-block">
        <div className="footer-cols">
          <div className="footer-section">
            <span className="footer-label">DESTINATION</span>
            <span className="footer-value">GOA &middot; INDIA</span>
          </div>
          <div className="footer-section">
            <span className="footer-label">COORDINATES</span>
            <span className="footer-value">15&deg;29'N &middot; 73&deg;49'E</span>
          </div>
          <div className="footer-section">
            <span className="footer-label">BOARDING</span>
            <span className="footer-value">28-31 OCT 2026</span>
          </div>
        </div>

        <div className="footer-action-row">
          <div className="footer-button">
            BUILD &rarr; COLLAB &rarr; SHIP
          </div>
        </div>
      </div>

      <div className="bottom-brand-bar">
        <div className="footer-brand-left">
          <img src={HHG_LOGO_B64} alt="HH Goa Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          <span>HH26 // BUILDER ACCESS</span>
        </div>
      </div>

    </div>
  );
});

export default IDCard;
