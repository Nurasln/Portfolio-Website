import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GameCard = ({ project }) => {
    return (
        <Link to={`/game/${project.id}`}>
            <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-800 bg-gray-900"
            >
                {/* Background Image */}
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-40"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                    <h3 className="text-2xl font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {project.title}
                    </h3>

                    <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-300">
                        <div className="pt-2">
                            <span className="inline-block bg-purple-600 text-xs text-white px-2 py-1 rounded mb-2">
                                {project.engine}
                            </span>
                            <p className="text-gray-300 text-sm line-clamp-2">
                                {project.summary}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default GameCard;
