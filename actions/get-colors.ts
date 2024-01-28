import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getColors = async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const colors = await db.color.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return colors || [];
};