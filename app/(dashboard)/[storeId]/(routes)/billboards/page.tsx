
import BillboardClient from "./components/billboard-clinet";

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

    console.log("first", billboards)

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pb-6">
                <BillboardClient data={billboards} />
            </div>
        </div>
    );
}

export default BillboardsPage;