import React, { useRef } from "react";

const SeeItInAction = () => {
    const videoRef = useRef(null);

    const handleMouseMove = (e) => {
        const video = videoRef.current;
        const rect = video.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15; // max 15deg
        const rotateY = ((x - centerX) / centerX) * 15;

        video.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        const video = videoRef.current;
        video.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    return (
        <section className="bg-gradient-to-br from-gray-100 to-white dark:from-black dark:to-neutral-900 py-24 px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
                See It In Action
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
                Here's a sneak peek of how coding feels in our collaborative playground.
            </p>

            <div className="relative max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800">
                {/* Gradient border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-xl rounded-xl z-0"></div>

                {/* 🎯 Add perspective on the wrapper */}
                <div
                    className="relative z-10 flex justify-center items-center rounded-xl"
                    style={{ perspective: "1000px" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <video
                        ref={videoRef}
                        src="https://res.cloudinary.com/dqnzstk72/video/upload/v1744569259/DevTogether/LightModeide_-_Made_with_Clipchamp_2_l8aqgd.mp4"
                        className="w-full h-auto rounded-xl transition-transform duration-200 ease-out transform-style-preserve-3d pointer-events-none"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
            </div>
        </section>
    );
};

export default SeeItInAction;
