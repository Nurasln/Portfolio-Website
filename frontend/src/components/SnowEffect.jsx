import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SnowEffect = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Run for 15 seconds then fade out
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    // Create random snowflakes
    const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // random start horizontal position %
        delay: Math.random() * 5, // random delay
        duration: 5 + Math.random() * 5, // random duration between 5-10s
        size: 2 + Math.random() * 3 // random size 2-6px
    }));

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="fixed inset-0 pointer-events-none z-[60] overflow-hidden"
                >
                    {snowflakes.map(flake => (
                        <motion.div
                            key={flake.id}
                            initial={{ y: -20, x: `${flake.x}vw`, opacity: 0 }}
                            animate={{
                                y: '120vh',
                                x: [`${flake.x}vw`, `${flake.x + (Math.random() * 5 - 2.5)}vw`], // slight horizontal drift
                                opacity: [0, 0.8, 0.4, 0]
                            }}
                            transition={{
                                duration: flake.duration,
                                repeat: Infinity,
                                delay: flake.delay,
                                ease: "linear"
                            }}
                            className="absolute rounded-full bg-white"
                            style={{
                                width: flake.size,
                                height: flake.size,
                                filter: 'blur(1px)'
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SnowEffect;
