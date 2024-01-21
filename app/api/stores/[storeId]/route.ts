import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId } = params;
        const { name } = await req.json();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }

        if (!storeId) {
            return new NextResponse('Store id is required', { status: 400 })
        }

        const store = await db.store.update({
            where: {
                id: storeId,
                userId
            },
            data: {
                name,
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log("[STORE_PATCH]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId } = params;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!storeId) {
            return new NextResponse('Store id is required', { status: 400 })
        }

        const store = await db.store.delete({
            where: {
                id: storeId,
                userId
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log("[STORE_DELETE]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}