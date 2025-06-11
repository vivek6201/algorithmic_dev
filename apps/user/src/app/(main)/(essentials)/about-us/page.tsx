import React from 'react';

export default function page() {
  return (
    <div className="mt-24 md:mt-16">
      <div className="w-full flex ">
        <div className="w-[22%] hidden lg:block"></div>
        <div className="dark:bg-black-50 pt-4 sm:pt-6 pb-12 w-full mx-4 lg:mx-auto lg:my-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">About Us</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Welcome to <strong>AlgorithmicDev</strong>, your one-stop platform to{' '}
              <strong>Learn, Build, and Get Hired</strong>. We bring you expert‑led tutorials,
              insightful blogs, curated job listings, and productivity tools—all designed to
              accelerate your tech career journey.
            </p>

            <h2 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-2">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              At <strong>AlgorithmicDev</strong>, we envision a tech ecosystem where learners,
              builders, and employers connect seamlessly. Our goal is to simplify learning and job
              search, making quality tech content and meaningful opportunities accessible to
              everyone.
            </p>

            <h2 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-2">
              What We Offer
            </h2>

            <div className="ml-4 mt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Expert Tutorials
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Structured learning paths in Web, Backend, Data & Cloud—curated by industry
                professionals to help you build real-world skills efficiently.
              </p>
            </div>

            <div className="ml-4 mt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">In-Depth Blogs</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Articles on algorithms, system design, best practices, and career guidance—designed
                to prepare you for technical interviews and beyond.
              </p>
            </div>

            <div className="ml-4 mt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Job Listings</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Hand-picked job and internship opportunities and updated regularly to match freshers
                and experienced professionals.
              </p>
            </div>

            <div className="ml-4 mt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Helper Mini‑Apps
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Small tools designed to boost your productivity—like quizzes, cheat sheets, code
                formatters, and more—so you can spend less time searching and more time building.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Join Our Community
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Be part of a growing community of engineers and learners—stay updated, connect,
                collaborate, and grow together.
              </p>
              <a
                href="https://x.com/_Vivek_930"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:underline transition-colors"
              >
                Follow us on X (formerly Twitter)
              </a>
              .
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We'd love to hear from you—whether it's feedback, suggestions, or partnership ideas.
                Reach out to us at{' '}
              </p>
              <a
                href="mailto:algorithmicdev9@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:underline transition-colors"
              >
                algorithmicdev9@gmail.com
              </a>
              .
            </section>
          </section>
        </div>
        <div className="w-[22%] hidden lg:block"></div>
      </div>
    </div>
  );
}
