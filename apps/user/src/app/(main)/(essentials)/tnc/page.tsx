import React from 'react';

export default function page() {
  return (
    <div className="mt-24 md:mt-16">
      <div className="w-full flex">
        <div className="w-[22%] hidden lg:block"></div>
        <div className="dark:bg-black-50 pt-4 sm:pt-6 pb-12 w-full mx-4 lg:mx-auto lg:my-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
              Terms &amp; Conditions
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to <strong>AlgorithmicDev</strong>. By accessing or using our website, you
              agree to be bound by these Terms &amp; Conditions. Please read them carefully before
              using the platform. If you disagree with any part, please discontinue use immediately.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              1. Use of the Platform
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You may use our tutorials, blogs, job listings, and mini-apps only for personal,
              non-commercial purposes. You agree not to copy, distribute, or misuse content without
              our explicit permission. Any unauthorized use may result in legal action.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              2. Account Responsibility
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you register for an account, you are responsible for keeping credentials secure and
              accountable for all activity under your login. Notify us immediately of any
              unauthorized access.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              3. Content Disclaimer
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Content on AlgorithmicDev is provided for educational and informational purposes only.
              While we aim for accuracy, we don’t guarantee that tutorials, blog posts, or job
              listings are complete, up-to-date, or error-free. Always verify external information
              yourself.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              4. Third-party Links
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our site may include links or embedded job listings from third-party providers.
              AlgorithmicDev is not responsible for third-party practices, content, or availability.
              Use those services at your own discretion and review their separate terms.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              5. Limitation of Liability
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To the fullest extent permitted by law, AlgorithmicDev and our team will not be liable
              for any indirect, incidental, or consequential damages arising from your use of the
              site. Your access and use are at your own risk.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">6. Indemnification</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You agree to indemnify and hold harmless AlgorithmicDev, our officers, and employees
              from any claims, liabilities, damages, or expenses arising from your use of the site
              or violation of these Terms.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              7. Intellectual Property
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All content, branding, and software on AlgorithmicDev are our proprietary property or
              licensed to us. You may not modify, reproduce, or distribute any material without
              express written permission.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">8. Changes</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update these Terms at any time. Changes take effect when published on this
              page. Continued use after updates constitutes acceptance.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">9. Governing Law</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms are governed by the laws of India. Any disputes arising shall be subject
              to the exclusive jurisdiction of courts in Patna, Bihar.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">10. Contact Us</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For questions or concerns about these Terms, email us at{' '}
              <a
                href="mailto:algorithmicdev9@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                algorithmicdev9@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
        <div className="w-[22%] hidden lg:block"></div>
      </div>
    </div>
  );
}
