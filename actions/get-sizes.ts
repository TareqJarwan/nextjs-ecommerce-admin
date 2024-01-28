import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getSizes = async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const sizes = await db.size.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return sizes || [];
};