import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getStockCount = async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const stockCount = await db.product.count({
        where: {
            storeId,
            isArchived: false
        }
    });

    return stockCount;
};