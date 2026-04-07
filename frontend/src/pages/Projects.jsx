import React from 'react';
import PortfolioGallery from '../components/PortfolioGallery';
import { motion } from 'framer-motion';

const Projects = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full bg-[#242424] overflow-y-auto custom-scrollbar"
        >
            <div className="w-full max-w-6xl mx-auto px-6 py-20">
                <h1 className="text-5xl font-bold mb-4 text-center">My Projects</h1>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                    A collection of games and interactive experiences I've built. PROTIP: Hover over cards to see details.
                </p>
                <PortfolioGallery />
            </div>
        </motion.div>
    );
};

export default Projects;
