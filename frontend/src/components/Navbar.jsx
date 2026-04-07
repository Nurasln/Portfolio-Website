import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
    return (
        /* px-12 ile genişlettik */
        <nav className="w-full relative z-50 pt-8 pb-4 px-12 flex-none">
            {/* max-w-6xl sildik, w-full yaptık */}
            <div className="w-full mx-auto flex justify-between items-center">
                <div className="text-xl font-bold tracking-tighter hover:text-purple-400 transition-colors cursor-pointer">
                    <Link to="/">BARKIN.<span className="text-purple-500">DEV</span></Link>
                </div>
                <div className="flex gap-6 items-center">
                    <Link to="/projects" className="font-medium hover:text-purple-400 transition-colors mr-4">Projects</Link>
                    <a href="https://www.linkedin.com/in/barkinalilukuslu/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-transform hover:scale-110">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://github.com/barkinlukuslu0" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-transform hover:scale-110">
                        <Github size={24} />
                    </a>
                    <a href="mailto:barkinlukuslumain@gmail.com" className="hover:text-purple-400 transition-transform hover:scale-110">
                        <Mail size={24} />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;