import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import NavigationLayout from "../layouts/NavigationLayout";
import DevelopersTeam from "./DevelopersTeam";

const Contact = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <NavigationLayout>
            <section className="dark:bg-gray-900 bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 py-12">
                
                {/* Hero Section */}
                <section className="max-w-4xl w-full text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-cyan-400 mb-4">Get in Touch</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300">We’d love to hear from you! Reach out with any questions or feedback.</p>
                </section>
                
                {/* Contact Form Section */}
                <section className="mt-12 max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-cyan-400 mb-6 text-center">Send Us a Message</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                        <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                        <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"></textarea>
                        <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105">Send Message</button>
                    </form>
                </section>
                
                {/* FAQ Section */}
                <section className="mt-12 max-w-4xl w-full">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-cyan-400 mb-6 text-center">FAQs</h2>
                    <div className="space-y-4">
                        {[{
                            question: "How do I create an account?",
                            answer: "Click on 'Sign Up' and follow the steps."
                        },
                        {
                            question: "Is this service free?",
                            answer: "Yes, it's completely free."
                        },
                        {
                            question: "Can I collaborate in real-time?",
                            answer: "Absolutely! Real-time collaboration is a key feature."
                        },
                        {
                            question: "How do I reset my password?",
                            answer: "Click on 'Forgot Password' and follow the instructions."
                        },
                        {
                            question: "Is my data secure?",
                            answer: "Yes, we use industry-standard encryption to protect your data."
                        },
                        {
                            question: "Can I delete my account?",
                            answer: "Yes, go to your account settings and select 'Delete Account'."
                        },
                        {
                            question: "Do you offer customer support?",
                            answer: "Yes, our support team is available 24/7 via email and chat."
                        }].map((faq, index) => (
                            <div key={index} className="border rounded-lg shadow-lg overflow-hidden">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between px-6 py-4 text-lg font-semibold text-gray-900 dark:text-cyan-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
                                >
                                    {faq.question}
                                    <span>{openIndex === index ? "▲" : "▼"}</span>
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 py-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Developers Team */}
                <section className="mt-12  w-full text-center">
                    <DevelopersTeam />
                </section>
                
                {/* Social Media Links */}
                <section className="mt-12 max-w-3xl w-full text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-cyan-400 mb-6">Follow Us</h2>
                    <div className="flex justify-center space-x-6">
                    <a href="#" className="text-[#1877F2] hover:text-[#145dbf] text-2xl"><FaFacebook /></a>
                        <a href="#" className="text-[#1DA1F2] hover:text-[#0d8ddf] text-2xl"><FaTwitter /></a>
                        <a href="#" className="text-[#E4405F] hover:text-[#d52d4a] text-2xl"><FaInstagram /></a>
                    </div>
                </section>
                
                {/* Newsletter Signup */}
                <section className="mt-12 max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-cyan-400 mb-6">Stay Updated</h2>
                    <form className="space-y-4 max-w-lg mx-auto">
                        <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                        <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105">Subscribe</button>
                    </form>
                </section>
            </section>
        </NavigationLayout>
    );
};

export default Contact;
