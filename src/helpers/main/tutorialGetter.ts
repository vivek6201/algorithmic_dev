import { prisma } from "@/lib/db"

export const getClientTutorialsCategories = async () => {
    try {
        const data = await prisma.tutorialCategory.findMany({ where: { published: true } });
        return { success: true, data }
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error getting data" }
    }
} 