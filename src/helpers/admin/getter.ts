import { prisma } from "@/lib/db"

export const getBlogBySlug = async (slug: string) => {
    try {
        if (!slug) return { success: false, message: "Slug is required" }
        const blog = await prisma.blog.findUnique({
            where: {
                slug
            }
        })

        return { success: true, blog }
    } catch (error) {
        console.error(error);
        return { success: false, message: "Internal server error" }
    }
}

export const getTutorialChapters = async (slug: string) => {
    if (!slug) {
        return {
            success: false,
            message: "Slug is Required!"
        }
    }
    try {
        const data = await prisma.tutorial.findUnique({
            where: {
                slug
            },
            select: {
                chapters: true
            }
        })

        if (!data) {
            return {
                success: false,
                message: "Chapters not found!"
            }
        }

        return {
            success: true,
            data
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Internal server error" }
    }

}