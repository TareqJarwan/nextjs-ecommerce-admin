import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getCategories = async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const categories = await db.category.findMany({
        where: {
            storeId,
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return categories || [];
};

export const getCategory = async (categoryId: string) => {
    const category = await db.category.findUnique({
        where: {
            id: categoryId
        }
    });

    return category;
}