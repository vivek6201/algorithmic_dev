import React from 'react';

export default function page() {
  return (
    <div className="max-w-[1400px] mx-auto mt-24 p-10 min-h-[600px]">
      <div className="mb-10 flex gap-y-2 flex-col">
        <p className="font-bold md:text-2xl">Contact Us</p>
        <p className="text-lg opacity-70">
          We’re here to help! If you have any questions or need assistance, don’t hesitate to reach
          out. Whether it’s a question, a suggestion, or just a comment, we’d love to hear from you.
        </p>
      </div>
      <div className="mb-10 flex gap-y-2 flex-col">
        <p className="font-bold md:text-2xl">Reach out</p>
        <p className="text-lg opacity-70">
          You can contact us via email at{' '}
          <a href="mailto:algorithmicdev9@gmail.com" className="text-blue-500" target="_blank">
            algorithmicdev9@gmail.com
          </a>
          . We will do our best to respond to your inquiry as soon as possible.
        </p>
      </div>

      <div className="mb-10 flex gap-y-2 flex-col">
        <p className="font-bold md:text-2xl">Share Your Feedback</p>
        <p className="text-lg opacity-70">
          We welcome your feedback and suggestions. Help us improve by sharing your thoughts with us
          on{' '}
          <a target="_blank" href="https://x.com/_Vivek_930" className="text-blue-500">
            X (Formally Twitter)
          </a>
        </p>
      </div>
    </div>
  );
}
