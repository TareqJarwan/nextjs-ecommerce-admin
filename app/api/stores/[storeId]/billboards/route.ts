import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId } = params;
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

        if (!params.storeId) {
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

        const billboard = await db.billboard.create({
            data: {
                storeId,
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("[BILLBOARDS_POST]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}