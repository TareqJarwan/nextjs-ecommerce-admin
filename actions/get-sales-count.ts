import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getSalesCount= async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const salesCount = await db.order.count({
        where: {
            storeId,
            isPaid: true
        }
    });

    return salesCount;
};