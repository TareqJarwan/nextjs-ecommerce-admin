
import OrderClient from "./components/client";
import { OrderColumn } from "./components/columns";

import { getOrders } from "@/actions/get-orders";
import { priceFormatter } from '@/lib/utils';

interface OrdersPageProps {
    params: {
        storeId: string
    }
}

const OrdersPage: React.FC<OrdersPageProps> = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const orders = await getOrders(params.storeId);

    const formattedOrders: OrderColumn[] = orders.map(item => ({
        id: item.id,
        isPaid: item.isPaid,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map(orderItem => orderItem.product.name).join(', '),
        totalPrice: priceFormatter.format(item.orderItems.reduce((total, orderItem) => total + Number(orderItem.product.price), 0)),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pb-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
}

export default OrdersPage;