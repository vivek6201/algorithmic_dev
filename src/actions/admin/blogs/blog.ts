"use server"

import { prisma } from "@/lib/db";
import { blogFormSchema } from "@/validations/blogValidations";
import { z } from "zod";

const createBlog = async (values: z.infer<typeof blogFormSchema>) => {
    const { success, data, error } = await blogFormSchema.safeParseAsync(
        values
    );

    if (!success) {
        return {
            success,
            error: error.issues.map((issue) => {
                return {
                    path: issue.path[0],
                    message: issue.message,
                };
            }),
        };
    }

    try {
        const slugExists = await prisma.blog.findUnique({ where: { slug: data.slug } })

        if (slugExists) {
            return {
                success: false,
                message: "Slug Already exists"
            }
        }

        const newBlog = await prisma.blog.create({
            data: {
                title: data.title,
                slug: data.slug,
                authorName: data.author,
                content: data.content,
                categoryId: data.categoryId,
                coverImage: data.coverImage ?? "",
                description: data.description
            },
        });

        return { success, newBlog };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to create blog!",
        };
    }
};

export default createBlog

export const updateBlog = async (slug: string, values: Partial<z.infer<typeof blogFormSchema>>) => {
    try {
        if (!slug) {
            return {
                success: false,
                message: "Blog Slug is required for updating.",
            };
        }

        const existingBlog = await prisma.blog.findUnique({ where: { slug } });

        if (!existingBlog) {
            return {
                success: false,
                message: "Blog not found.",
            };
        }

        const updatedBlog = await prisma.blog.update({
            where: { slug },
            data: {
                authorName: values.author,
                categoryId: values.categoryId,
                content: values.content,
                coverImage: values.coverImage,
                description: values.description,
                slug: values.slug,
                title: values.title,
            },
        });

        return {
            success: true,
            updatedBlog,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to update blog!",
        };
    }
};

export const deleteBlog = async (id: string) => {
    try {
        await prisma.blog.delete({
            where: {
                id
            }
        })
        return {
            success: true,
            message: "Blog deleted Successfully!"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to delete blog"
        }
    }
}