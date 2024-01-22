import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { storeId, categoryId } = params;

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const store = await db.store.findUnique({
            where: {
                id: storeId,
            }
        });

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const category = await db.category.findFirst({
            where: {
                id: categoryId,
                storeId
            }
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log("[CATEGORY_GET]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, categoryId } = params;
        const { name, billboardId } = await req.json();


        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse('Billboard is required', { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
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

        const category = await db.category.update({
            where: {
                id: categoryId,
                storeId
            },
            data: {
                name,
                billboardId
            }
        })

        return NextResponse.json(category);

    } catch (error) {
        console.log("[CATEGORY_PATCH]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, categoryId } = params;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
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

        const category = await db.category.delete({
            where: {
                id: categoryId,
                storeId
            },
        })

        return NextResponse.json(category);

    } catch (error) {
        console.log("[CATEGORY_DELETE]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}