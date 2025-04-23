import React from "react";

export default function BlogDetailPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-24 mb-16 text-gray-800 dark:text-gray-100 ">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="hover:underline cursor-pointer">Home</span> /{" "}
        <span className="hover:underline cursor-pointer">Blogs</span> /{" "}
        <span>How to Scale Kubernetes Clusters</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">
        How to Scale Kubernetes Clusters Like a Pro
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center text-sm gap-4 mb-6">
        <span>
          By <strong className="text-blue-500">John Doe</strong>
        </span>
        <span>•</span>
        <span>April 8, 2025</span>
        <span>•</span>
        <span>7 min read</span>
        <span>•</span>
        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
          DevOps
        </span>
      </div>

      {/* Cover Image */}
      <img
        src="https://images.unsplash.com/photo-1667372459510-55b5e2087cd0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Kubernetes Cluster"
        className="w-full rounded-2xl mb-8 shadow-md"
      />

      {/* Blog Content */}
      <article className="prose lg:prose-lg dark:prose-invert max-w-none">
        <p>
          Scaling Kubernetes clusters is one of the most crucial parts of
          managing cloud-native infrastructure...
        </p>

        <h2>Why Scaling Matters</h2>
        <p>
          Whether youre running a small startup or a massive enterprise,
          scalability ensures reliability, performance, and cost-efficiency...
        </p>

        <h2>Best Practices</h2>
        <ul>
          <li>Use Horizontal Pod Autoscalers</li>
          <li>Monitor with Prometheus + Grafana</li>
          <li>Use node pools and taints effectively</li>
        </ul>

        <h2>Final Thoughts</h2>
        <p>
          If you want a deeper dive into auto-scaling strategies and best
          practices, subscribe to our newsletter.
        </p>
      </article>

      {/* Author Box */}
      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl flex gap-4 items-center">
        <img
          src="https://i.pravatar.cc/100"
          alt="Author"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            DevOps Engineer at CloudCorp. Loves writing about infrastructure and
            open-source tools.
          </p>
        </div>
      </div>

      {/* Related Posts */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Example related post card */}
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h4 className="font-semibold mb-2">
              Top 5 Kubernetes Tools in 2025
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Discover the most useful tools for managing K8s this year.
            </p>
          </div>
          {/* More related post cards... */}
        </div>
      </div>
    </div>
  );
}
