import React from 'react';
import { projects } from '../data/projects';
import GameCard from './GameCard';

const PortfolioGallery = () => {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto z-20 relative bg-[#242424]">
            <h2 className="text-4xl font-bold mb-12 border-b border-gray-700 pb-4 inline-block">
                All Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.map(project => (
                    <GameCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};

export default PortfolioGallery;
