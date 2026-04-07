import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlitchOverlay from '../components/GlitchOverlay';

const AnomalyContext = createContext();

export const useAnomaly = () => useContext(AnomalyContext);

export const AnomalyProvider = ({ children }) => {
    const [isGlitching, setIsGlitching] = useState(false);
    const navigate = useNavigate();

    const triggerSequence = (targetPath) => {
        if (isGlitching) return; // Prevent double trigger

        // 1. Start Glitch Visuals
        setIsGlitching(true);

        // 2. Play Sound
        const audio = new Audio('/assets/sounds/glitch_sound_effect.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed (user interaction needed first?)", e));

        // 3. Cinematic Wait (1.5s)
        setTimeout(() => {
            // 4. Navigate while Glitch is covering screen
            navigate(targetPath);

            // 5. Fade out glitch after arrival
            setTimeout(() => {
                setIsGlitching(false);
            }, 500); // Keep glitch for 0.5s on new page for smooth entry

        }, 1500);
    };

    return (
        <AnomalyContext.Provider value={{ isGlitching, triggerSequence }}>
            {children}
            {isGlitching && <GlitchOverlay />}
        </AnomalyContext.Provider>
    );
};
