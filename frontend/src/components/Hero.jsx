import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full flex-1 flex flex-col justify-center px-12 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
                {/* Left Column: Identity, Bio, and Buttons - Takes 7/12 (approx 60%) */}
                <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
                    <div>
                        <h2 className="text-purple-500 font-medium text-lg mb-2 tracking-widest uppercase">Junior Game Developer</h2>
                        <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight leading-none whitespace-nowrap">
                            Barkın Ali <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Lüküslü</span>
                        </h1>
                    </div>

                    <p className="text-gray-400 text-lg md:text-2xl w-full leading-relaxed">
                        Creating interactive worlds and engaging mechanics. Blending technical skills with creative vision to build immersive gaming experiences.
                    </p>

                    {/* Actions - Placed under bio to clear center space */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => navigate('/projects')}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-purple-900/50 cursor-pointer"
                        >
                            View Projects
                        </button>
                        <button className="border border-gray-600 hover:border-white text-gray-300 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 cursor-pointer">
                            Contact Me
                        </button>
                        <a
                            href="/assets/docs/Barkin_Ali_Lukuslu_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 backdrop-blur-sm cursor-pointer border border-white/5 inline-block text-center"
                        >
                            Download CV
                        </a>
                    </div>
                </div>

                {/* Right Column: Education - Takes 5/12 (approx 40%) */}
                <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-10">
                    <div className="border-l-4 border-purple-500 pl-6 space-y-8 text-left max-w-md">
                        <div>
                            <h3 className="font-bold text-2xl text-white">İstinye University</h3>
                            <p className="text-base text-gray-400">Digital Game Design (English)</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-2xl text-white">Anadolu University</h3>
                            <p className="text-base text-gray-400">Management Information Systems (AÖF)</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;