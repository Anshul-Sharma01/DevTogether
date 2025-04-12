import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-neutral-900 py-8 px-6 text-center text-gray-600 dark:text-gray-400">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} DevTogether a branch of Udta Birdie Inc.. All rights reserved.</p>
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    <Link to="/terms" className="hover:underline">Terms of Service</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
