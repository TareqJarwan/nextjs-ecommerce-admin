import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const { storeId, sizeId } = params;

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
        }

        const store = await db.store.findUnique({
            where: {
                id: storeId,
            }
        });

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const sizes = await db.size.findFirst({
            where: {
                id: sizeId,
                storeId
            }
        });

        return NextResponse.json(sizes);

    } catch (error) {
        console.log("[SIZE_GET]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, sizeId } = params;
        const { name, value } = await req.json();


        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse('Size name is required', { status: 400 })
        }

        if (!value) {
            return new NextResponse('Size value is required', { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
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

        const billboard = await db.size.update({
            where: {
                id: sizeId,
                storeId
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("[SIZE_PATCH]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, sizeId } = params;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
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

        const size = await db.size.delete({
            where: {
                id: sizeId,
                storeId
            },
        })

        return NextResponse.json(size);

    } catch (error) {
        console.log("[SIZE_DELETE]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}