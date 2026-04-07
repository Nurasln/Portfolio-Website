import React from 'react';
import Hero from '../components/Hero';
import LegoSandbox from '../components/LegoSandbox';

const Home = () => {
    return (
        /* w-full ve h-full ile tüm alanı kaplıyoruz */
        <div className="w-full h-full flex flex-col relative overflow-hidden">

            {/* Üst Kısım: Hero İçeriği - Tam Genişlik ve Esnek */}
            <div className="flex-1 flex items-center justify-center w-full z-40 relative">
                {/* Buradaki w-full ve max-w-none sınırlamaları kaldırarak yayılmayı sağlar */}
                <div className="w-full h-full flex justify-center items-center">
                    <Hero />
                </div>
            </div>

            {/* Alt Kısım: Lego Sandbox - Ekranın en altına tam yaslı */}
            {/* px-6 gibi boşlukları sildik ki legolar ekranın en dışına kadar gidebilsin */}
            <div className="h-[45%] w-full z-0 relative border-t border-white/5">
                <LegoSandbox />
            </div>
        </div>
    );
};

export default Home;