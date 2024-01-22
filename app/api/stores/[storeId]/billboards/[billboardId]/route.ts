import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, billboardId } = params;
        const { label, imageUrl } = await req.json();


        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!label) {
            return new NextResponse('Label is required', { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse('Image URL is required', { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
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

        const billboard = await db.billboard.update({
            where: {
                id: billboardId,
                storeId
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("[BILLBOARD_PATCH]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, billboardId } = params;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
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

        const billboard = await db.billboard.delete({
            where: {
                id: billboardId,
                storeId
            },
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("[BILLBOARD_DELETE]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}