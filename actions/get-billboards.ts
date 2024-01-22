import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getBillboards = async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const billboards = await db.billboard.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return billboards || [];
};