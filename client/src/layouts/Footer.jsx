import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-neutral-900 py-8 px-6 text-center text-gray-600 dark:text-gray-400">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                {/* Footer left side with company info */}
                <div className="flex flex-col items-center sm:items-start mb-6 sm:mb-0">
                    <p className="text-lg font-semibold mb-2">
                        DevTogether - A Branch of Udta Birdie Inc.
                    </p>
                    <p>&copy; {new Date().getFullYear()} DevTogether. All rights reserved.</p>
                </div>

                {/* Footer middle section with important links */}
                <div className="flex gap-4 flex-wrap mb-6 sm:mb-0">
                    <Link to="/about" className="hover:underline">About Us</Link>
                    <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    <Link to="/terms" className="hover:underline">Terms of Service</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>

                {/* Footer right side with social media links */}
                <div className="flex gap-4">
                    <a href="https://twitter.com/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                        <i className="fab fa-twitter"></i> {/* You can replace this with an actual Twitter logo */}
                    </a>
                    <a href="https://facebook.com/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        <i className="fab fa-facebook"></i> {/* You can replace this with an actual Facebook logo */}
                    </a>
                    <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                        <i className="fab fa-linkedin"></i> {/* You can replace this with an actual LinkedIn logo */}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
