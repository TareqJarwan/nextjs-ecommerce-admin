import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getOrders = async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const orders = await db.order.findMany({
        where: {
            storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return orders || [];
};