import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaEnvelope, FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {

    const [ userEmail, setUserEmail ] = useState("");


    const handleClick = async (e) => {
        e.preventDefault();
        if(!userEmail){
            toast.error("Please fill the email");
            return;
        }

        try {
            const response = await fetch("https://formspree.io/f/xeoanykj", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email : userEmail
                }), 
            });
            console.log("Response : ", response);
            toast.success("Email registered successfully for newsletter");
            
        } catch (error) {
            console.error("Error:", error);
            toast.error("Please try again");
        }
        setUserEmail("");
    };

    return (
        <footer className="bg-gray-100 dark:bg-neutral-900 py-12 px-6 text-gray-700 dark:text-gray-300 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-bold mb-2">DevTogether</h2>
                    <p className="mb-2 text-justify">
                        A Branch of Udta Birdie Inc. – empowering devs to build, collaborate, and grow through community-driven projects.
                    </p>
                    <p className="text-xs">&copy; {new Date().getFullYear()} DevTogether. All rights reserved.</p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-md font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/about" className="hover:text-blue-500 flex items-center gap-2"><FaAngleRight /> About Us</Link></li>
                        <li><Link to="/blog" className="hover:text-blue-500 flex items-center gap-2"><FaAngleRight /> Blog</Link></li>
                        <li><Link to="/faqs" className="hover:text-blue-500 flex items-center gap-2"><FaAngleRight /> FAQs</Link></li>
                        <li><Link to="/careers" className="hover:text-blue-500 flex items-center gap-2"><FaAngleRight /> Careers</Link></li>
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h3 className="text-md font-semibold mb-3">Legal</h3>
                    <ul className="space-y-2">
                        <li><Link to="/privacy-policy" className="hover:text-blue-500 flex items-center gap-2"><FaAngleRight /> Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-blue-500 flex items-center gap-2"><FaAngleRight /> Terms of Service</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-500 flex items-center gap-2"><FaAngleRight /> Contact</Link></li>
                    </ul>
                </div>

                {/* Newsletter & Social Media */}
                <div>
                    <h3 className="text-md font-semibold mb-3">Stay in the Loop</h3>
                    <p className="text-xs mb-3">Subscribe to get our latest updates and dev news.</p>
                    <form className="flex mb-4" onSubmit={handleClick}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full px-3 pyx-2 rounded-l-md bg-white text-black text-sm border border-gray-300 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 px-4 py-2 text-white rounded-r-md hover:bg-blue-600"
                        >
                            <FaEnvelope />
                        </button>
                    </form>
                    <div className="flex gap-4 text-xl mt-2">
                        <a href="https://twitter.com/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                            <FaTwitter />
                        </a>
                        <a href="https://facebook.com/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                            <FaFacebookF />
                        </a>
                        <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-4 text-center text-xs">
                Made with ❤️ by the DevTogether Team
            </div>
        </footer>
    );
};

export default Footer;
