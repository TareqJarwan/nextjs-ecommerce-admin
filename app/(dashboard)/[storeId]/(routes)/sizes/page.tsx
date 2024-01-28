
import { format } from 'date-fns';

import SizeClient from "./components/client";
import { SizeColumn } from "./components/columns";

import { getSizes } from '@/actions/get-sizes';


interface SizesPageProps {
    params: {
        storeId: string
    }
}

const SizesPage: React.FC<SizesPageProps> = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const sizes = await getSizes(params.storeId);

    const formattedSizes: SizeColumn[] = sizes.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item?.createdAt, 'MMMM do, yyyy')
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pb-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    );
}

export default SizesPage;