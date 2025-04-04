import { useNavigate } from "react-router-dom";
import NavigationLayout from "../../layouts/NavigationLayout.jsx";
import { motion } from "framer-motion";

const LandingPage = () => {
    const navigate = useNavigate();

    const logos = [
        {
            name: "Vercel",
            url: "https://1000logos.net/wp-content/uploads/2024/08/Vercel-Logo-tumb.png",
        },
        {
            name: "Netlify",
            url: "https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png",
        },
        {
            name: "AWS",
            url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        },
        {
            name: "GitHub",
            url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
        {
            name: "GitLab",
            url: "https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png",
        },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <NavigationLayout>
            <section className="dark:bg-black bg-white min-h-screen text-gray-900 dark:text-white overflow-hidden">

                {/* Hero Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8 }}
                    variants={fadeUp}
                    className="flex flex-col items-center justify-center text-center px-6 py-20"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text mb-4">
                        Build, Collaborate, Deploy — Instantly
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
                        The all-in-one collaborative coding platform with live preview, real-time teamwork, and zero setup.
                    </p>
                    <div className="flex space-x-4 mt-8">
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/signup")}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-lg hover:shadow-xl transition duration-300">
                            Get Started Free
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/learn-more")}
                            className="px-6 py-3 border border-gray-400 text-gray-900 dark:text-white dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-900 transition">
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>

                {/* Stats Section */}
                <section className="bg-gray-100 dark:bg-black py-14 px-6 text-center">
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
                <section className="py-20 px-6 bg-white dark:bg-black">
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
                <section className="py-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-black dark:to-neutral-900 text-center">
                    <h2 className="text-4xl font-bold mb-12">How It Works</h2>
                    <div className="max-w-4xl mx-auto space-y-10 text-left">
                        {[
                            ["1. Sign Up", "Create an account in seconds — no credit card required."],
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
                <section className="bg-white dark:bg-black py-20 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <blockquote className="italic text-2xl text-gray-800 dark:text-gray-200">
                            “This platform is a game-changer for remote developers. It’s like Google Docs, but for code!”
                        </blockquote>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">— A Happy Developer</p>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 px-6 text-center dark:bg-black">
                    <h2 className="text-4xl font-bold mb-4">Start Collaborating Today</h2>
                    <p className="text-lg mb-6">Join thousands of developers and teams who trust our platform.</p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => navigate("/signup")}
                        className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-md shadow-md hover:bg-gray-100"
                    >
                        Create Your Free Account
                    </motion.button>
                </section>

                {/* Demo Preview */}
                <section className="bg-gray-100 dark:bg-black py-20 px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">See It In Action</h2>
                    <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Here's a sneak peek of how coding feels in our collaborative playground.
                    </p>
                    <div className="rounded-lg overflow-hidden max-w-5xl mx-auto shadow-2xl">
                        <img
                            src="/images/editor-preview.gif"
                            alt="Live Coding Demo"
                            className="w-full h-auto"
                        />
                    </div>
                </section>

                {/* Trusted Logos */}
                <section className="py-24 bg-gray-50 dark:bg-black text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12"
                    >
                        Trusted by Engineering Teams Worldwide
                    </motion.h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center items-center px-6 max-w-6xl mx-auto">
                        {logos.map((brand, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow hover:shadow-xl transition duration-300 transform hover:scale-105"
                            >
                                <img
                                    src={brand.url}
                                    alt={`${brand.name} logo`}
                                    title={brand.name}
                                    className="h-12 object-contain mx-auto"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Roadmap */}
                <section className="bg-white dark:bg-black py-20 px-6">
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
                <section className="bg-white dark:bg-black py-20 px-6">
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
                <section className="py-20 px-6 bg-black text-white text-center">
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
        </NavigationLayout>
    );
};

export default LandingPage;
