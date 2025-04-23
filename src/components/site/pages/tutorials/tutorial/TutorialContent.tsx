import React from "react";

const TutorialContent = () => {
  return (
    <main className="flex-1 p-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-100">
      {/* Big Bold Title */}
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Introduction to JavaScript
      </h1>

      {/* Optional subtitle or meta */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Published on March 30, 2025 · 10 min read
      </p>

      {/* Body Content */}
      <article className="prose dark:prose-invert max-w-none">
        <p>
          JavaScript is a versatile programming language primarily used for web
          development. It enables interactive web pages and is a key component
          of the modern web alongside HTML and CSS.
        </p>

        <h2>Why JavaScript?</h2>
        <p>
          JavaScript allows developers to create dynamic user interfaces,
          manipulate the DOM, and communicate with servers in real-time using
          APIs. It&apos;s supported by all modern browsers and has a massive
          ecosystem.
        </p>

        <h3>Real-World Usage</h3>
        <ul>
          <li>Frontend frameworks like React, Vue, and Angular</li>
          <li>Backend development with Node.js</li>
          <li>Game development, mobile apps, and even AI integrations</li>
        </ul>

        <blockquote>
          “Any application that can be written in JavaScript, will eventually be
          written in JavaScript.” – Jeff Atwood
        </blockquote>

        <p>
          In the upcoming chapters, we’ll go through all the foundational and
          advanced JavaScript concepts in detail.
        </p>
      </article>
    </main>
  );
};

export default TutorialContent;
