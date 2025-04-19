import React from 'react';

const PrivacyPolicyModal = ({ privacyPolicyVisible, setPrivacyPolicyVisible }) => {
  const closeModal = () => setPrivacyPolicyVisible(false);
  if (!privacyPolicyVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[75vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-5 text-gray-500 hover:text-gray-800 text-xl transition"
        >
          &times;
        </button>

        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto p-8 pt-14 space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">Privacy Policy</h1>
          <p className="text-sm text-center text-gray-500">Effective Date: April 2025</p>

          <p className="text-base text-gray-700">
            At <strong>DevTogether</strong>, your privacy matters. This Privacy Policy explains how we handle your personal information when you use our platform. By accessing or using our services, you agree to the collection and use of your data in accordance with this policy.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">1. Information We Collect</h2>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
              <li><strong>Account Info:</strong> Your name, email, and profile data during registration.</li>
              <li><strong>Activity Logs:</strong> IP address, browser type, pages visited, and session time.</li>
              <li><strong>Collaboration Data:</strong> Any code, messages, or files shared during sessions.</li>
              <li><strong>Device Data:</strong> Information like device model, OS, screen resolution.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
              <li>To provide and maintain the DevTogether platform.</li>
              <li>To improve performance and personalize your experience.</li>
              <li>To send service announcements, security alerts, or support messages.</li>
              <li>To prevent abuse, fraud, or unauthorized access.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">3. Data Sharing & Disclosure</h2>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
              <li><strong>Service Providers:</strong> Trusted vendors like cloud hosting, analytics, etc.</li>
              <li><strong>Legal Obligations:</strong> When required by law or to protect our legal rights.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">4. Your Privacy Choices</h2>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
              <li>Access or update your account info anytime from your profile settings.</li>
              <li>Request data deletion by contacting us at the email below.</li>
              <li>Unsubscribe from non-essential communication.</li>
              <li>Request a copy of your stored data in a portable format.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">5. Data Security</h2>
            <p className="text-sm text-gray-700">
              We implement industry-standard measures like HTTPS, encryption, and secure storage practices. Still, no system is perfectly secure, and we advise users to avoid sharing sensitive personal data unnecessarily.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">6. Retention & Deletion</h2>
            <p className="text-sm text-gray-700">
              We retain your data only as long as necessary to provide our services. You may request deletion at any time, and we’ll ensure it's fully removed from our systems unless required for legal reasons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">7. Policy Updates</h2>
            <p className="text-sm text-gray-700">
              This Privacy Policy may be updated to reflect changes in our practices. We'll notify users via email or platform announcements whenever a significant update is made.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">8. Contact Us</h2>
            <p className="text-sm text-gray-700">
              Have questions or requests? Reach out anytime at{' '}
              <a href="mailto:support@devtogether.com" className="text-blue-600 hover:underline">
                support@devtogether.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
