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
import { Jobs } from '@repo/db';
import { toast } from '@repo/ui/components/ui/sonner';
import { z } from '@repo/ui';
import { useRouter } from 'nextjs-toploader/app';
import StatusSelector from '../shared/StatusSelector';
import ManageJobsModal from './ManageJobsCategoryModal';
import { jobCategorySchema } from '@repo/shared/validations';
import { handleJobCategory } from '@/actions/jobs/category';
import { updateJobStatus } from '@/actions/jobs/publish';
import { deleteJob } from '@/actions/jobs/job';

export default function AllJobsClient() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const deleteModelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const {
    data: jobs = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await fetch('/api/admin/jobs');
      const { data } = await response.json();
      return data || [];
    },
  });

  const handleCloseModal = () => {
    setCategoryModalOpen(false);
  };

  const handleSaveCategory = async (values: z.infer<typeof jobCategorySchema>): Promise<void> => {
    try {
      // Add new category
      const { success, message } = await handleJobCategory(values);

      if (success) {
        toast.success('Category created successfully');
        refetch();
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
    const { message, success } = await updateJobStatus(id, status);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    router.refresh();
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job: Jobs) =>
      job.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, jobs]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [filteredJobs]);

  const handleDelete = async (id: string) => {
    const timeout = toast.loading('Deleting Job, please wait!');
    const { success, message } = await deleteJob(id);
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
          <h1 className="text-2xl font-bold tracking-tight">All Jobs</h1>
          <div className="flex items-center gap-x-2">
            <Button onClick={handleModal}>
              <Plus className="w-4 h-4 mr-1" /> New Category
            </Button>

            <Link href="/dashboard/jobs/create">
              <Button>
                <Plus className="w-4 h-4 mr-1" /> New Job
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search jobs title..."
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
                <TableHead>Level</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading Jobs...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-red-500">
                    Error loading Jobs
                  </TableCell>
                </TableRow>
              ) : sortedJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No Jobs found
                  </TableCell>
                </TableRow>
              ) : (
                sortedJobs.map((job, index) => {
                  return (
                    <TableRow key={job.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>
                        {job.jobCategories
                          .map(
                            (category: {
                              name: string;
                              slug: string;
                              description: string;
                              id: string;
                            }) => category.name,
                          )
                          .join(',')}
                      </TableCell>
                      <TableCell>
                        <StatusSelector
                          status={job.published}
                          handleStatusChange={(status) => handleStatusUpdate(job.id, status)}
                        />
                      </TableCell>
                      <TableCell>{job.experienceLevel.split('_').join(' ')}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link href={`/dashboard/jobs/edit/${job.slug}`}>
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

                            <p className="mb-4">Are you sure you want to delete this job?</p>
                            <div className="flex justify-end gap-2">
                              <DialogClose asChild ref={deleteModelRef}>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button variant="destructive" onClick={() => handleDelete(job.id)}>
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
      <ManageJobsModal
        open={categoryModalOpen}
        handleClose={handleCloseModal}
        onSave={handleSaveCategory}
      />
    </>
  );
}
