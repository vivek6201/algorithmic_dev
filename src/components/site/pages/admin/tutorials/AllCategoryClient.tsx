"use client";

import { useState, useMemo } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { blogCategorySchema } from "@/validations/blogValidations";
import { z } from "zod";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { BlogCategory } from "@/generated/prisma";
import CategoryModal from "../blogs/ManageCategoryModal";
import createCategory from "@/actions/admin/tutorials/category";
import StatusSelector from "../shared/StatusSelector";
import { updateTutorialCategoryStatus } from "@/actions/admin/tutorials/publish";
import { useRouter } from "nextjs-toploader/app";

export default function AllCategoriesClient() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<BlogCategory | null>(null);
  const router = useRouter();
  const {
    data: categories = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tutorial-categories"],
    queryFn: async () => {
      const response = await fetch("/api/admin/tutorials/category");
      const data = await response.json();
      return data.categories || [];
    },
  });

  const filteredCategories = useMemo(() => {
    // Ensure categories is an array before filtering
    return Array.isArray(categories)
      ? categories.filter((category) =>
          category.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : [];
  }, [debouncedSearch, categories]);

  const sortedCategories = useMemo(() => {
    // Make sure we're working with an array
    if (!Array.isArray(filteredCategories) || filteredCategories.length === 0) {
      return [];
    }

    return [...filteredCategories].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredCategories]);

  const handleDelete = async (id: string) => {
    console.log(id);
  };

  const handleAddCategory = () => {
    setEditCategory(null);
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (category: BlogCategory) => {
    setEditCategory(category);
    setCategoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setCategoryModalOpen(false);
    setEditCategory(null);
  };

  const handleSaveCategory = async (
    data: z.infer<typeof blogCategorySchema>
  ): Promise<void> => {
    try {
      if (editCategory) {
      } else {
        // Add new category
        const { success, message, newCategory } = await createCategory(data);

        if (success && newCategory) {
          toast.success("Category created successfully");
          refetch(); // Refresh the data after creation
        } else {
          toast.error(message || "Failed to create category");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }

    handleCloseModal();
  };

  const handleStatusUpdate = async (id: string, status: boolean) => {
    const { message, success } = await updateTutorialCategoryStatus(id, status);
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
          <h1 className="text-2xl font-bold tracking-tight">All Categories</h1>
          <div className="flex items-center gap-x-2">
            <Button onClick={handleAddCategory}>
              <Plus className="w-4 h-4 mr-1" /> New Category
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search category name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm"
          />
        </div>

        <div className="rounded-xl border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">S.No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading categories...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-red-500"
                  >
                    Error loading categories
                  </TableCell>
                </TableRow>
              ) : sortedCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                sortedCategories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <StatusSelector
                        status={category.published}
                        handleStatusChange={(status) =>
                          handleStatusUpdate(category.id, status)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(category.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <p className="mb-4">
                            Are you sure you want to delete this category?
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(category.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <CategoryModal
        open={categoryModalOpen}
        handleClose={handleCloseModal}
        onSave={handleSaveCategory}
        editData={editCategory}
      />
    </>
  );
}
