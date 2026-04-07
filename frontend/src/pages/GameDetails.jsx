import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowLeft, Clock, Code, Gamepad, Layers, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === parseInt(id));
    const [showStatus, setShowStatus] = useState(false);

    if (!project) {
        return <div className="p-20 text-center">Project not found</div>;
    }


    // Use updates from the project data, or empty array if none
    const updates = project.updates || [];

    return (
        <div className="w-full h-full overflow-y-auto custom-scrollbar">
            <div className="min-h-screen pt-20 pb-20 px-6 max-w-5xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Home
                </Link>

                {/* Hero Header */}
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10 border border-gray-800">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-[#242424] to-transparent w-full">
                        <h1 className="text-4xl md:text-6xl font-bold mb-2">{project.title}</h1>
                        <span className="bg-purple-600 px-3 py-1 rounded text-sm font-medium">{project.genre}</span>
                    </div>
                </div>

                {/* General Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
                        <div className="flex items-center text-purple-400 mb-2"><Code size={20} className="mr-2" /> Engine</div>
                        <div className="font-semibold">{project.engine}</div>
                    </div>
                    <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
                        <div className="flex items-center text-purple-400 mb-2"><Gamepad size={20} className="mr-2" /> Platform</div>
                        <div className="font-semibold">PC / Windows</div>
                    </div>
                    <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
                        <div className="flex items-center text-purple-400 mb-2"><Layers size={20} className="mr-2" /> My Role</div>
                        <div className="font-semibold">{project.roles.join(', ')}</div>
                    </div>
                    <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
                        <div className="flex items-center text-purple-400 mb-2"><Clock size={20} className="mr-2" /> Duration</div>
                        <div className="font-semibold">{project.duration || "TBD"}</div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {project.summary} This project was developed as a demonstration of skills in {project.engine}.
                        It involves complex mechanics and custom shaders designed to enhance the visual fidelity while maintaining performance.
                    </p>
                </div>

                {/* Status Button */}
                <div className="flex justify-center mb-12">
                    <button
                        onClick={() => setShowStatus(!showStatus)}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105"
                    >
                        <RotateCcw className={`transition-transform duration-500 ${showStatus ? 'rotate-180' : ''}`} />
                        {showStatus ? 'Hide Development Log' : 'View Development Status'}
                    </button>
                </div>

                {/* Chronological Log (Zigzag) */}
                <AnimatePresence>
                    {showStatus && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative overflow-hidden"
                        >
                            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform -translate-x-1/2"></div>

                            <div className="space-y-12 py-8">
                                {updates.length === 0 && <div className="text-center text-gray-500">No logs available for this project yet.</div>}
                                {updates.map((update, index) => (
                                    <motion.div
                                        key={update.version}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                                    >
                                        <div className="w-1/2 px-8 text-right">
                                            {index % 2 === 0 && (
                                                <>
                                                    <div className="text-purple-400 font-mono mb-1">{update.date}</div>
                                                    <h3 className="text-xl font-bold flex items-center justify-end gap-2">
                                                        {update.title}
                                                        <span className="text-sm bg-gray-800 px-2 py-0.5 rounded">{update.version}</span>
                                                        {update.isLive && (
                                                            <span className="relative flex h-3 w-3">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <p className="text-gray-400 mt-2">{update.desc}</p>
                                                </>
                                            )}
                                        </div>

                                        <div className={`z-10 bg-[#242424] border-4 ${update.isLive ? 'border-green-500' : 'border-purple-600'} w-6 h-6 rounded-full shrink-0`}></div>

                                        <div className="w-1/2 px-8 text-left">
                                            {index % 2 !== 0 && (
                                                <>
                                                    <div className="text-purple-400 font-mono mb-1">{update.date}</div>
                                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                                        {update.title}
                                                        <span className="text-sm bg-gray-800 px-2 py-0.5 rounded">{update.version}</span>
                                                        {update.isLive && (
                                                            <span className="relative flex h-3 w-3">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <p className="text-gray-400 mt-2">{update.desc}</p>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GameDetails;
