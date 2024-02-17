import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/lib/db";

export const getTotalRevenue = async (storeId: string) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const paidOrders = await db.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, product) => {
            return orderSum + product.product.price.toNumber()
        }, 0);

        return total + orderTotal;
    }, 0);

    return totalRevenue;
};