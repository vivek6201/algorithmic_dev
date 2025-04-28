import BlogForm from '@/components/site/pages/admin/blogs/BlogForm';
import React from 'react';

export default function page() {
  return (
    <div className="flex flex-col gap-y-5">
      <p className="font-bold text-2xl">Create Blog</p>
      <BlogForm isEdit={false} />
    </div>
  );
}
