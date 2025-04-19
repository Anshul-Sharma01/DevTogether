import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaEnvelope, FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import PrivacyPolicyModal from "../components/Misc/PrivacyPolicy.jsx";
import TermsOfServiceModal from "../components/Misc/TermsOfServiceModal.jsx";

const Footer = () => {
  const [userEmail, setUserEmail] = useState("");
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      toast.error("Please fill the email");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xeoanykj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">

        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">DevTogether</h2>
          <p className="text-justify mb-2">
            A Branch of Udta Birdie Inc. – empowering devs to build, collaborate, and grow through community-driven projects.
          </p>
          <p className="text-xs mt-4">&copy; {new Date().getFullYear()} DevTogether. All rights reserved.</p>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-md font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setPrivacyPolicyVisible(true)} className="hover:text-blue-500 flex items-center gap-2">
                <FaAngleRight /> Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => setTermsVisible(true)} className="hover:text-blue-500 flex items-center gap-2">
                <FaAngleRight /> Terms of Service
              </button>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500 flex items-center gap-2">
                <FaAngleRight /> Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-md font-semibold mb-3">Stay in the Loop</h3>
          <p className="text-xs mb-3">Subscribe to get our latest updates and dev news.</p>
          <form className="flex mb-4" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-l-md bg-white text-black text-sm border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 text-white rounded-r-md hover:bg-blue-600"
            >
              <FaEnvelope />
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-md font-semibold mb-3">Connect with Us</h3>
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

      {/* Modals */}
      {privacyPolicyVisible && (
        <PrivacyPolicyModal
          privacyPolicyVisible={privacyPolicyVisible}
          setPrivacyPolicyVisible={setPrivacyPolicyVisible}
        />
      )}
      {termsVisible && (
        <TermsOfServiceModal
          termsVisible={termsVisible}
          setTermsVisible={setTermsVisible}
        />
      )}
    </footer>
  );
};

export default Footer;
