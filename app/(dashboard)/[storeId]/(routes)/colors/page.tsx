
import { format } from 'date-fns';

import SizeClient from "./components/client";
import { ColorColumn } from "./components/columns";

import { getColors } from '@/actions/get-colors';

interface ColorsPageProps {
    params: {
        storeId: string
    }
}

const ColorsPage: React.FC<ColorsPageProps> = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const colors = await getColors(params.storeId);

    const formattedColors: ColorColumn[] = colors.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item?.createdAt, 'MMMM do, yyyy')
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pb-6">
                <SizeClient data={formattedColors} />
            </div>
        </div>
    );
}

export default ColorsPage;