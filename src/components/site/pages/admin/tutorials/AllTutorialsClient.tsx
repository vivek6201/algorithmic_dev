'use client';
import React, { useMemo, useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Tutorial } from '@/generated/prisma';
import { CreateTutorialModal } from './CreateTutorialModal';
import { createTutorial } from '@/actions/admin/tutorials/tutorial';
import { toast } from 'sonner';
import { tutorialSchema } from '@/validations/tutorialValidation';
import { z } from 'zod';
import StatusSelector from '../shared/StatusSelector';
import { updateTutorialStatus } from '@/actions/admin/tutorials/publish';
import { useRouter } from 'nextjs-toploader/app';

export default function AllTutorialsClient() {
  const [search, setSearch] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);
  const deleteModelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const {
    data: tutorials = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['tutorials'],
    queryFn: async () => {
      const response = await fetch('/api/admin/tutorials');
      const data = await response.json();
      return data.tutorials || [];
    },
  });

  const handleDelete = async (id: string) => {
    console.log(id);
  };

  const handleCreateModel = () => setOpenCreateModal(!openCreateModal);

  const handleSaveTutorial = async (values: z.infer<typeof tutorialSchema>) => {
    const { success, message } = await createTutorial(values);

    if (!success) {
      toast.error(message);
      return;
    }

    toast.success(message);
    refetch();
    (document.querySelector('#close-btn') as HTMLButtonElement)?.click();
  };

  const filteredTutorials = useMemo(() => {
    return tutorials.filter((tutorial: Tutorial) =>
      tutorial.title?.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, tutorials]);

  const sortedTutorials = useMemo(() => {
    return [...filteredTutorials].sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [filteredTutorials]);

  const handleStatusUpdate = async (id: string, status: boolean) => {
    const { message, success } = await updateTutorialStatus(id, status);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    router.refresh();
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">All Tutorials</h1>
          <div className="flex items-center gap-x-2">
            <Button onClick={handleCreateModel}>
              <Plus className="w-4 h-4 mr-1" /> New Tutorial
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search tutorial title..."
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
                <TableHead>Total Chapters</TableHead>
                <TableHead>Date Published</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading tutorials...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-red-500">
                    Error loading Tutorials
                  </TableCell>
                </TableRow>
              ) : sortedTutorials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No Tutorials found
                  </TableCell>
                </TableRow>
              ) : (
                sortedTutorials.map((tutorial, index) => {
                  return (
                    <TableRow key={tutorial.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{tutorial.title}</TableCell>
                      <TableCell>{tutorial._count.chapters}</TableCell>
                      <TableCell>{tutorial.createdAt}</TableCell>
                      <TableCell>
                        <StatusSelector
                          status={tutorial.published}
                          handleStatusChange={(status) => handleStatusUpdate(tutorial.id, status)}
                        />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link href={`/admin/tutorials/build/${tutorial.slug}`}>
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

                            <p className="mb-4">Are you sure you want to delete this tutorial?</p>
                            <div className="flex justify-end gap-2">
                              <DialogClose asChild ref={deleteModelRef}>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(tutorial.id)}
                              >
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
      <CreateTutorialModal
        open={openCreateModal}
        handleClose={handleCreateModel}
        onSave={handleSaveTutorial}
      />
    </>
  );
}
