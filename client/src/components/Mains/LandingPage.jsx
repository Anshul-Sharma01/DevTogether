import { Link, useNavigate } from "react-router-dom";
import NavigationLayout from "../../layouts/NavigationLayout.jsx";
import { motion } from "framer-motion";
import "./LandingPage.css"; 
import useIntersectionObserver from "../hooks/useIntersectionObserver.jsx";
import SeeItInAction from "./SetItInAction.jsx";
import { useRef, useState, useEffect } from "react";


const LandingPage = () => {
    const navigate = useNavigate();
    useIntersectionObserver(".reveal");

    const logos = [
        {
            name: "Mircrosoft",
            url: "https://res.cloudinary.com/dqnzstk72/image/upload/v1745433361/DevTogether/ms-logo_fwtnhq.png",
        },
        {
            name: "Netflix",
            url: "https://res.cloudinary.com/dqnzstk72/image/upload/v1745433361/DevTogether/ntflx-logo_qvdigx.png",
        },
        {
            name: "AWS",
            url: "https://res.cloudinary.com/dqnzstk72/image/upload/v1745433361/DevTogether/aws-logo_ug2vz8.png",
        },
        {
            name: "GitHub",
            url: "https://res.cloudinary.com/dqnzstk72/image/upload/v1745433361/DevTogether/github-logo_uvqvdu.png",
        },
        {
            name: "Sandbox",
            url: "https://res.cloudinary.com/dqnzstk72/image/upload/v1745433362/DevTogether/sandbox-logo_adbpan.png",
        },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    
    const seeItRef = useRef(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    



    useEffect(() => {
        let hasScrolledOnce = false;
    
        const handleUserScroll = () => {
            if (!hasScrolledOnce && seeItRef.current) {
                hasScrolledOnce = true;
    
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        console.log("📦 Scrolling to SeeItInAction (on first interaction)");
                        seeItRef.current.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    });
                }, 100);
            }
        };
    
        // Attach all listeners
        window.addEventListener("wheel", handleUserScroll);
        window.addEventListener("touchstart", handleUserScroll);
        window.addEventListener("keydown", handleUserScroll);
    
        // Cleanup
        return () => {
            window.removeEventListener("wheel", handleUserScroll);
            window.removeEventListener("touchstart", handleUserScroll);
            window.removeEventListener("keydown", handleUserScroll);
        };
    }, []);
    
    

    return (
        <NavigationLayout>
            <section className="dark:bg-black bg-white min-h-screen text-gray-900 dark:text-white overflow-hidden">

                {/* Hero Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8 }}
                    variants={fadeUp}
                    className="flex reveal flex-col items-center justify-center text-center px-6 py-20 h-screen"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text mb-4">
                        Build, Collaborate, Code — Instantly
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mt-2 mb-4 dark:text-gray-300 max-w-2xl">
                        The all-in-one collaborative coding platform with live preview, real-time teamwork, and zero setup.
                    </p>
                    <div className="flex space-x-4 mt-8">
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/auth/sign-up")}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-lg hover:shadow-xl transition duration-300">
                            Get Started Free
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/contact")}
                            className="px-6 py-3 border border-gray-400 text-gray-900 dark:text-white dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-900 transition">
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>

                <div ref={seeItRef}>
                    <SeeItInAction/>
                </div>

                {/* Stats Section */}
                <section className="bg-gray-100 reveal dark:bg-black py-14 px-6 text-center">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { value: "10K+", label: "Developers Joined" },
                            { value: "2M+", label: "Lines of Code Executed" },
                            { value: "99.9%", label: "Uptime Guaranteed" },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-3xl font-bold">
                                <div className="text-blue-500">{stat.value}</div>
                                <div className="text-lg text-gray-600 dark:text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section className="py-20 px-6 reveal bg-white dark:bg-black">
                    <h2 className="text-center text-4xl font-bold mb-12">Why Use Our Platform?</h2>
                    <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
                        {[
                            ["⚡", "Instant Code Execution", "Execute code with zero setup and see results instantly."],
                            ["👨‍💻", "Live Team Collaboration", "Work in real-time with your teammates. Changes are synced live."],
                            ["📡", "Integrated Communication", "Chat, call, or video meet with your team without leaving the workspace."],
                            ["🔒", "Secure Environment", "Your code is encrypted and safely stored with role-based access control."],
                            ["📂", "Version Control", "Manage, rollback, and restore projects easily with built-in versioning."],
                            ["🧩", "Plug & Play", "Works across all devices. No install needed — just open and code."],
                        ].map(([icon, title, desc], idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.03 }}
                                className="p-6 bg-gray-100 dark:bg-neutral-900 rounded-lg shadow-md"
                            >
                                <div className="text-4xl mb-3">{icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 bg-gradient-to-br reveal from-purple-100 to-blue-100 dark:from-black dark:to-neutral-900 text-center">
                    <h2 className="text-4xl font-bold mb-12">How It Works</h2>
                    <div className="max-w-4xl mx-auto space-y-10 text-left">
                        {[
                            ["1. Register", "Create an account in seconds — no credit card required."],
                            ["2. Create a Project", "Start a new coding environment and invite your team."],
                            ["3. Collaborate & Ship", "Write, run, debug, and communicate all in one place."],
                        ].map(([step, desc], idx) => (
                            <motion.div key={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: idx * 0.2 }}>
                                <h3 className="text-2xl font-semibold">{step}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Testimonial */}
                <section className="bg-white reveal dark:bg-black py-20 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <blockquote className="italic text-2xl text-gray-800 dark:text-gray-200">
                            “This platform is a game-changer for remote developers. It’s like Google Docs, but for code!”
                        </blockquote>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">— Abhinav Sharma</p>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 px-6 text-center reveal dark:bg-black">
                    <h2 className="text-4xl font-bold mb-4">Start Collaborating Today</h2>
                    <p className="text-lg mb-6">Join thousands of developers and teams who trust our platform.</p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => navigate("/auth/sign-up")}
                        className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-md shadow-md hover:bg-gray-100"
                    >
                        Create Your Free Account
                    </motion.button>
                </section>

                {/* Demo Preview */}


                {/* Trusted Logos */}
                <section className="py-24 bg-white dark:bg-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Trusted by Engineering Teams Worldwide
                            </h2>
                        </div>

                        <div className="flex flex-wrap justify-center gap-y-12 gap-x-16 hover:cursor-pointer">
                            {logos.map((brand, idx) => (
                                <div key={idx} className="flex items-center justify-center w-40">
                                <img
                                    src={brand.url}
                                    alt={`${brand.name} logo`}
                                    className="max-h-40 w-auto  mix-blend-multiply dark:mix-blend-normal grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                />
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </section>

                {/* Roadmap */}
                <section className="bg-white reveal dark:bg-black py-20 px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">What's Coming Next</h2>
                    <div className="max-w-4xl mx-auto space-y-10">
                        {[
                            { date: "Q2 2025", feature: "Mobile Editor App", desc: "Edit and run code on the go with our mobile-first experience." },
                            { date: "Q3 2025", feature: "AI-Powered Pair Programming", desc: "Smart assistants to help you debug and code faster." },
                            { date: "Q4 2025", feature: "Marketplace for Extensions", desc: "Extend your workspace with plugins from the community." },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="flex items-start gap-6"
                            >
                                <div className="text-purple-600 font-semibold min-w-[80px]">{item.date}</div>
                                <div>
                                    <h4 className="text-xl font-bold">{item.feature}</h4>
                                    <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Use Cases */}
                <section className="bg-white dark:bg-black py-20 reveal px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Made for All Kinds of Teams</h2>
                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {[
                            ["🚀", "Startups", "Quickly prototype and ship MVPs with real-time feedback and deployments."],
                            ["🏢", "Enterprises", "Collaborate across departments with centralized control and security."],
                            ["🎓", "Educators & Students", "Conduct live classes, share code, and evaluate in real time."],
                        ].map(([icon, title, desc], idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.03 }}
                                className="p-6 bg-gray-100 dark:bg-neutral-900 rounded-lg shadow-md"
                            >
                                <div className="text-4xl mb-3">{icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Community Section */}
                <section className="py-20 px-6 bg-black reveal text-white text-center">
                    <h2 className="text-4xl font-bold mb-6">Join Our Global Community</h2>
                    <p className="text-lg max-w-2xl mx-auto mb-8">
                        From open-source contributors to indie hackers — we’re all building together. Get involved on Discord, follow us on X, or check out what folks are building.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://discord.gg" target="_blank" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">Join Discord</a>
                        <a href="https://twitter.com" target="_blank" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">Follow on X</a>
                    </div>
                </section>

            </section>
            {/* Contact Section */}
            <section className="bg-white dark:bg-black reveal py-20 px-6 text-center">
                <h2 className="text-4xl font-bold mb-6 dark:text-white">Get in Touch</h2>
                <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-8">
                    Questions? Feedback? We'd love to hear from you. Reach out to us anytime!
                </p>

                <div className="flex justify-center mb-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                    >
                        <Link to="/contact">Contact Us</Link>
                    </motion.button>
                </div>

            </section>



        </NavigationLayout>
    );
};

export default LandingPage;
