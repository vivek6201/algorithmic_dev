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