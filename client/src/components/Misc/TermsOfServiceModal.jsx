import React from 'react';

const TermsOfServiceModal = ({ termsVisible, setTermsVisible }) => {
  const closeModal = () => setTermsVisible(false);
  if (!termsVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[75vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-5 text-gray-500 hover:text-gray-800 text-xl transition"
        >
          &times;
        </button>

        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto p-8 pt-14 space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">Terms of Service</h1>
          <p className="text-sm text-center text-gray-500">Last Updated: April 2025</p>

          <p className="text-base text-gray-700">
            Welcome to <strong>DevTogether</strong>. These Terms of Service (“Terms”) govern your use of our platform. By accessing or using our services, you agree to comply with and be bound by these Terms.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">1. Eligibility</h2>
            <p className="text-sm text-gray-700">
              You must be at least 13 years old to use DevTogether. By using the platform, you represent that you meet this requirement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">2. Account Responsibility</h2>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
              <li>Provide accurate and complete information during registration.</li>
              <li>Keep your login credentials secure and confidential.</li>
              <li>You are responsible for any activity that occurs under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">3. Acceptable Use</h2>
            <p className="text-sm text-gray-700">
              You agree not to misuse the platform. Prohibited activities include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
              <li>Uploading malicious code or attempting unauthorized access.</li>
              <li>Harassing, threatening, or abusing other users.</li>
              <li>Violating intellectual property rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">4. Content Ownership</h2>
            <p className="text-sm text-gray-700">
              You retain ownership of any content you upload or create using DevTogether. However, by sharing content, you grant us a license to host and display it as needed to operate the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">5. Termination</h2>
            <p className="text-sm text-gray-700">
              We reserve the right to suspend or terminate your access at our discretion if you violate these Terms or use the platform in a harmful manner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">6. Disclaimer of Warranties</h2>
            <p className="text-sm text-gray-700">
              DevTogether is provided “as is” without warranties of any kind. We do not guarantee that the service will be error-free or continuously available.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">7. Limitation of Liability</h2>
            <p className="text-sm text-gray-700">
              We shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">8. Modifications</h2>
            <p className="text-sm text-gray-700">
              We may update these Terms from time to time. Continued use of the platform means you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">9. Contact Us</h2>
            <p className="text-sm text-gray-700">
              For questions regarding these Terms, reach out to{' '}
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

export default TermsOfServiceModal;
