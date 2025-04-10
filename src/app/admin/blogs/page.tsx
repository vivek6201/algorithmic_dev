"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const dummyBlogs = [
  {
    id: "1",
    title: "Mastering React Hooks",
    category: "Frontend",
    publishedAt: "2025-04-01",
    status: "Published",
  },
  {
    id: "2",
    title: "Deploying with Docker",
    category: "DevOps",
    publishedAt: "2025-03-28",
    status: "Draft",
  },
  {
    id: "3",
    title: "Understanding Prisma ORM",
    category: "Backend",
    publishedAt: "2025-03-20",
    status: "Published",
  },
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(dummyBlogs);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, blogs]);

  const sortedBlogs = useMemo(() => {
    return [...filteredBlogs].sort((a, b) => {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
  }, [filteredBlogs]);

  const handleDelete = () => {
    if (deleteId) {
      setBlogs((prev) => prev.filter((b) => b.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">All Blogs</h1>
        <Link href="/admin/blogs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Blog
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search blog title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm"
        />
      </div>

      <div className="rounded-xl border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBlogs.map((blog, index) => (
              <TableRow key={blog.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>{blog.publishedAt}</TableCell>
                <TableCell>
                  <span
                    className={
                      blog.status === "Published"
                        ? "text-green-600 font-medium"
                        : "text-yellow-600 font-medium"
                    }
                  >
                    {blog.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/admin/blogs/edit/${blog.id}`}>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(blog.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm">
                      <h3 className="text-lg font-semibold mb-4">
                        Confirm Delete
                      </h3>
                      <p className="mb-4">
                        Are you sure you want to delete this blog?
                      </p>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setDeleteId(null)}
                        >
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          Delete
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
