import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getStores = async () => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const stores = await db.store.findMany({
        where: {
            userId
        }
    })

    return stores;
};