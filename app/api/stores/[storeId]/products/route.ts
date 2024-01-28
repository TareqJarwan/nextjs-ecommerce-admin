import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { storeId } = params;
        const { searchParams } = new URL(req.url);

        const categoryId = searchParams.get('categoryId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const isFeatured = searchParams.get('isFeatured');

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await db.store.findUnique({
            where: {
                id: storeId,
            }
        });

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const products = await db.product.findMany({
            where: {
                storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured: isFeatured ? true : undefined
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(products);

    } catch (error) {
        console.log("[PRODUCTS_GET]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId } = params;
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

        const product = await db.product.create({
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
        console.log("[PRODUCTS_POST]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}