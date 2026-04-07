import React from 'react';

const GlitchOverlay = () => {
    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none glitch-active backdrop-blur-md bg-black/10">
            <div className="static-noise"></div>
            <div className="security-camera-overlay">
                <div className="rec-indicator">● REC</div>
                <div className="absolute top-10 left-10 text-white font-mono opacity-80">
                    CAM 04 <br />
                    {new Date().toLocaleTimeString()}
                </div>
            </div>
            {/* Optional: Add a static noise audio element here if we wanted to embed it directly, 
                but context handles logic better. */}
        </div>
    );
};

export default GlitchOverlay;
