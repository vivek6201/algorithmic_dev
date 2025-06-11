import React from 'react';

export default function page() {
  return (
    <div className="mt-24 md:mt-16">
      <div className="w-full flex">
        <div className="w-[22%] hidden lg:block"></div>
        <div className="dark:bg-black-50 pt-4 sm:pt-6 pb-12 w-full mx-4 lg:mx-auto lg:my-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Privacy Policy</h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to <strong>AlgorithmicDev</strong>. We respect your privacy and are committed
              to protecting your personal information. This policy explains what data we collect,
              why we collect it, and how we use and safeguard it.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              1. Information We Collect
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We collect information when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Create an account or sign up for newsletters (e.g., name, email)</li>
              <li>Use our job listings or mini-apps (we may log your IP and browser info)</li>
              <li>Interact with our site (we use cookies to enhance your experience)</li>
            </ul>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              2. How We Use Your Data
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Provide you with tutorials, job updates, and newsletters</li>
              <li>Improve our site’s performance and content relevance</li>
              <li>Send you important updates, policy changes, or support messages</li>
            </ul>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              3. Cookies & Third-Party Tools
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use cookies and analytics tools (e.g., Google Analytics) to understand how visitors
              use our site and improve our service. These tools collect non-personal information
              like IP address, browser type, and page visits. You can disable cookies via your
              browser settings—though some features may be affected.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">4. Data Sharing</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We don’t sell or rent your personal data. We may share information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Trusted service providers (hosting, email, analytics)</li>
              <li>Legal authorities if required by law or to protect rights</li>
              <li>Acquirers if AlgorithmicDev is sold or merged</li>
            </ul>

            <h3 className="text-xl font-semibold text-black dark:text-white">5. Data Security</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use reasonable security measures to protect your data, including secure servers,
              encryption for sensitive data, and regular monitoring. However, no system is 100%
              secure, so we can’t guarantee complete protection.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">6. Your Rights</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">You can:</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Access, correct, or delete your account information</li>
              <li>Opt out of promotional emails via unsubscribe options or by contacting us</li>
              <li>Disable cookies in your browser settings</li>
            </ul>

            <h3 className="text-xl font-semibold text-black dark:text-white">7. Policy Updates</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this policy occasionally. Changes are effective upon posting. Continued
              use means acceptance. We encourage you to review this page periodically.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">8. Contact Us</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Have questions or concerns about your privacy? Reach out to us at{' '}
              <a
                href="mailto:algorithmicdev9@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                algorithmicdev9@gmail.com
              </a>
              . We're always happy to help!
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-600 italic">
              Last Updated: June 2025
            </p>
          </section>
        </div>
        <div className="w-[22%] hidden lg:block"></div>
      </div>
    </div>
  );
}
