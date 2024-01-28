import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const { storeId, productId } = params;

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const store = await db.store.findUnique({
            where: {
                id: storeId,
            }
        });

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const product = await db.product.findFirst({
            where: {
                id: productId,
                storeId
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true
            }
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log("[PRODUCT_GET]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, productId } = params;
        const {
            name,
            price,
            categoryId,
            sizeId,
            colorId,
            images,
            isArchived,
            isFeatured
        } = await req.json();


        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse('Product name is required', { status: 400 })
        }

        if (!price) {
            return new NextResponse('Product price is required', { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse('Category is required', { status: 400 })
        }

        if (!sizeId) {
            return new NextResponse('Size is required', { status: 400 })
        }

        if (!colorId) {
            return new NextResponse('Color is required', { status: 400 })
        }

        if (!images || !images.length) {
            return new NextResponse('Product images are required', { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await db.store.findUnique({
            where: {
                id: storeId,
                userId
            }
        })

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const product = await db.product.update({
            where: {
                id: productId,
                storeId
            },
            data: {
                storeId,
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                isArchived,
                isFeatured,
                images: {
                    deleteMany: {},
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product);

    } catch (error) {
        console.log("[PRODUCT_PATCH]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, productId } = params;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const store = await db.store.findUnique({
            where: {
                id: storeId,
                userId
            }
        })

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const product = await db.product.delete({
            where: {
                id: productId,
                storeId
            },
        })

        return NextResponse.json(product);

    } catch (error) {
        console.log("[PRODUCT_DELETE]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}