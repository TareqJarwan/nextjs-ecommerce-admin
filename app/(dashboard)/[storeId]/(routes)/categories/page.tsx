
import { format } from 'date-fns';

import BillboardClient from "./components/clinet";
import { CategoryColumn } from "./components/columns";

import { getCategories } from '@/actions/get-categories';

interface CategoriesPageProps {
    params: {
        storeId: string
    }
}

const CategoriesPage: React.FC<CategoriesPageProps> = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const categories = await getCategories(params.storeId);

    const formattedCategories: CategoryColumn[] = categories.map(item => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item?.createdAt, 'MMMM do, yyyy')
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pb-6">
                <BillboardClient data={formattedCategories} />
            </div>
        </div>
    );
}

export default CategoriesPage;