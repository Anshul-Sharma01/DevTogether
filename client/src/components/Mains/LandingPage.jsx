import { useNavigate } from "react-router-dom";
import NavigationLayout from "../../layouts/NavigationLayout.jsx";
import { motion } from "framer-motion";

const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <NavigationLayout>
            <section className="dark:bg-black w-full bg-gradient-to-b bg-white min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden text-gray-900 dark:text-white">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br bg-white dark:border-l-gray-800 opacity-10 dark:opacity-30 blur-3xl"></div>
                
                {/* Hero Section */}
                <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mt-12 z-10 relative">
                    <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600 mb-4 drop-shadow-lg">
                        Real-Time Collaborative Web Development Compiler
                    </h1>
                    <p className="text-lg text-gray-800 dark:text-white mb-8">
                        Seamless real-time collaboration for developers and teams. Code, preview, and communicate—all in one place.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <motion.button whileHover={{ scale: 1.1 }} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-lg hover:shadow-xl transition duration-300">
                            Get Started
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-md shadow-md hover:shadow-xl transition duration-300">
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>

                {/* Features Section */}
                <section className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl px-4 z-10 relative">
                    {[{
                            title: "Real-Time Collaboration",
                            description: "Code with your team simultaneously. Changes are reflected instantly for everyone."
                        },
                        {
                            title: "Live Preview",
                            description: "Real-time rendering of HTML, CSS, and JavaScript. Debug and test collaboratively."
                        },
                        {
                            title: "Group Management",
                            description: "Create accounts, form groups, and manage projects with ease."
                        },
                        {
                            title: "Integrated Communication",
                            description: "Built-in chat, audio, and video calls for seamless collaboration."
                        },
                        {
                            title: "Free & Accessible",
                            description: "Optimized for low-resource devices and hosted on free services to ensure zero cost."
                        },
                        {
                            title: "All-in-One Platform",
                            description: "No need to switch between tools. Everything you need is here."
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition transform hover:-translate-y-2 hover:shadow-lg duration-300 ease-in-out"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </section>

                {/* New Sections */}
                {/* Code Execution Section */}
                <section className="mt-20 max-w-5xl text-center px-4 z-10 relative">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-6">
                        Instant Code Execution
                    </h2>
                    <p className="text-gray-800 dark:text-white mb-8">
                        Run your code in real-time with instant feedback. No setup required—just write, execute, and debug.
                    </p>
                </section>

                {/* Security and Privacy Section */}
                <section className="mt-20 max-w-5xl text-center px-4 z-10 relative">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent mb-6">
                        Security & Privacy
                    </h2>
                    <p className="text-gray-800 dark:text-white mb-8">
                        Your data is secure with end-to-end encryption, private repositories, and controlled access to your projects.
                    </p>
                </section>

                {/* Contact Redirect Section */}
                <section className="mt-20 max-w-4xl text-center px-4 z-10 relative">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-6">
                        Need Help?
                    </h2>
                    <p className="text-gray-800 dark:text-white mb-8">
                        Visit our contact page for FAQs and to get in touch with our team.
                    </p>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/contact")} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md shadow-lg hover:shadow-xl transition duration-300">
                        Go to Contact Page
                    </motion.button>
                </section>
            </section>
        </NavigationLayout>
    );
};

export default LandingPage;
