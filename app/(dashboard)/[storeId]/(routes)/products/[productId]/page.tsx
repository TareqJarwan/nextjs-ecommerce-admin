import { getCategories } from "@/actions/get-categories";
import ProductForm from "./components/product-form";

import db from "@/lib/db";
import { getSizes } from "@/actions/get-sizes";
import { getColors } from "@/actions/get-colors";

const ProductPage = async ({
    params
}: {
    params: { productId: string, storeId: string }
}) => {
    const product = await db.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    });

    const categories = await getCategories(params.storeId);
    const sizes = await getSizes(params.storeId);
    const colors = await getColors(params.storeId);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    initialData={product}
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                />
            </div>
        </div>
    );
}

export default ProductPage;