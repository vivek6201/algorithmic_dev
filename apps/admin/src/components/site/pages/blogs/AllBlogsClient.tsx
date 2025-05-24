'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Plus, Edit, Trash2 } from '@repo/ui';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { Blog } from '@repo/db';
import { toast } from '@repo/ui/components/ui/sonner';
import { deleteBlog } from '@/actions/blogs/blog';
import CategoryModal from './ManageCategoryModal';
import { z } from '@repo/ui';
import { blogCategorySchema } from '@repo/shared';
import createCategory from '@/actions/blogs/category';
import { updateBlogStatus } from '@/actions/blogs/publish';
import { useRouter } from 'nextjs-toploader/app';
import StatusSelector from '../shared/StatusSelector';

export default function AllBlogsClient() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const deleteModelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const {
    data: blogs = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch('/api/admin/blogs');
      const data = await response.json();
      return data.blogs || [];
    },
  });

  const handleCloseModal = () => {
    setCategoryModalOpen(false);
  };

  const handleSaveCategory = async (data: z.infer<typeof blogCategorySchema>): Promise<void> => {
    try {
      // Add new category
      const { success, message, newCategory } = await createCategory(data);

      if (success && newCategory) {
        toast.success('Category created successfully');
        refetch(); // Refresh the data after creation
      } else {
        toast.error(message || 'Failed to create category');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }

    handleCloseModal();
  };

  const handleStatusUpdate = async (id: string, status: boolean) => {
    const { message, success } = await updateBlogStatus(id, status);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    router.refresh();
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog: Blog) =>
      blog.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, blogs]);

  const sortedBlogs = useMemo(() => {
    return [...filteredBlogs].sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [filteredBlogs]);

  const handleDelete = async (id: string) => {
    const timeout = toast.loading('Deleting blog, please wait!');
    const { success, message } = await deleteBlog(id);
    toast.dismiss(timeout);
    if (success) toast.success(message);
    else toast.error(message);

    refetch();
    deleteModelRef.current?.click();
  };

  const handleModal = () => setCategoryModalOpen(!categoryModalOpen);

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">All Blogs</h1>
          <div className="flex items-center gap-x-2">
            <Button onClick={handleModal}>
              <Plus className="w-4 h-4 mr-1" /> New Category
            </Button>

            <Link href="/admin/blogs/create">
              <Button>
                <Plus className="w-4 h-4 mr-1" /> New Blog
              </Button>
            </Link>
          </div>
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
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading Blogs...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-red-500">
                    Error loading Blogs
                  </TableCell>
                </TableRow>
              ) : sortedBlogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No Blogs found
                  </TableCell>
                </TableRow>
              ) : (
                sortedBlogs.map((blog, index) => {
                  return (
                    <TableRow key={blog.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.category.name}</TableCell>
                      <TableCell>
                        <StatusSelector
                          status={blog.published}
                          handleStatusChange={(status) => handleStatusUpdate(blog.id, status)}
                        />
                      </TableCell>
                      <TableCell>{blog.authorName}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link href={`/admin/blogs/edit/${blog.slug}`}>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm">
                            <DialogHeader>
                              <DialogTitle>Confirm Delete</DialogTitle>
                              <DialogDescription>This action cannot be undone.</DialogDescription>
                            </DialogHeader>

                            <p className="mb-4">Are you sure you want to delete this blog?</p>
                            <div className="flex justify-end gap-2">
                              <DialogClose asChild ref={deleteModelRef}>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button variant="destructive" onClick={() => handleDelete(blog.id)}>
                                Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <CategoryModal
        open={categoryModalOpen}
        handleClose={handleCloseModal}
        onSave={handleSaveCategory}
      />
    </>
  );
}
