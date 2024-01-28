import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getProducts = async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const products = await db.product.findMany({
        where: {
            storeId,
        },
        include: {
            category: true,
            color: true,
            size: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return products || [];
};