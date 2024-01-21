import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getStore = async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const store = await db.store.findUnique({
        where: {
            id: storeId,
            userId
        },
    });

    if (!store) redirect('/');

    return store;
};