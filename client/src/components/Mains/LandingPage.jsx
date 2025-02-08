import NavigationLayout from "../../layouts/NavigationLayout.jsx";

const LandingPage = () => {
    return (
        <NavigationLayout>
            <section className="dark:bg-gray-900 w-full bg-white min-h-screen flex flex-col items-center justify-center">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mt-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-cyan-400 mb-4">
                        Real-Time Collaborative Web Development Compiler
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                        Seamless real-time collaboration for students and teams. Code, preview, and communicate—all in one place.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-800 transition">
                            Get Started
                        </button>
                        <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <section className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
                    {[
                        {
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
                            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition transform hover:-translate-y-2 hover:shadow-lg"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-cyan-400 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </section>

                {/* How It Works Section */}
                <section className="mt-20 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-cyan-400 mb-6">
                        How It Works
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                step: "1",
                                title: "Create an Account",
                                description: "Sign up for free to get started with your projects."
                            },
                            {
                                step: "2",
                                title: "Form a Team",
                                description: "Invite your friends or teammates to collaborate in real-time."
                            },
                            {
                                step: "3",
                                title: "Start Coding",
                                description: "Code together with live previews, chat, and integrated tools."
                            }
                        ].map((item, index) => (
                            <div key={index} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                                <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full mx-auto mb-4 text-xl font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-cyan-400 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="mt-20 max-w-5xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-cyan-400 mb-6">
                        What Our Users Say
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {[
                            {
                                name: "Jane Doe",
                                feedback: "This platform made group projects a breeze! We could code and discuss changes in real-time without switching apps."
                            },
                            {
                                name: "John Smith",
                                feedback: "I love the live preview feature. It helped me debug faster and collaborate effectively with my team."
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                                <p className="italic text-gray-700 dark:text-gray-300 mb-4">“{testimonial.feedback}”</p>
                                <h4 className="font-semibold text-gray-900 dark:text-cyan-400">- {testimonial.name}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call-to-Action Footer */}
                <footer className="mt-20 w-full bg-blue-200  dark:bg-cyan-600 text-black py-8 text-center">
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">Ready to Collaborate?</h3>
                    <button className="px-8 py-3 bg-white text-blue-600 rounded-md shadow-md hover:bg-gray-100 transition">
                        Join Now for Free
                    </button>
                </footer>
            </section>
        </NavigationLayout>
    );
};

export default LandingPage;
