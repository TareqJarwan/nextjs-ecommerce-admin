
import { format } from 'date-fns';

import BillboardClient from "./components/clinet";
import { BillboardColumn } from "./components/columns";

import { getBillboards } from "@/actions/get-billboards";

interface BillboardsPageProps {
    params: {
        storeId: string
    }
}

const BillboardsPage: React.FC<BillboardsPageProps> = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const billboards = await getBillboards(params.storeId);

    const formattedBillboard: BillboardColumn[] = billboards.map(item => ({
        id: item.id,
        label: item.label,
        createdAt: format(item?.createdAt, 'MMMM do, yyyy')
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pb-6">
                <BillboardClient data={formattedBillboard} />
            </div>
        </div>
    );
}

export default BillboardsPage;