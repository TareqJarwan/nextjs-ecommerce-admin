
import { format } from 'date-fns';

import ProductClient from "./components/client";
import { ProductColumn } from "./components/columns";

import { getProducts } from '@/actions/get-products';
import { priceFormatter } from '@/lib/utils';

interface ProductsPageProps {
    params: {
        storeId: string
    }
}

const ProductsPage: React.FC<ProductsPageProps> = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const products = await getProducts(params.storeId);

    const formattedProducts: ProductColumn[] = products.map(item => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: priceFormatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item?.createdAt, 'MMMM do, yyyy')
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pb-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    );
}

export default ProductsPage;