import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { storeId } = params;

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

        const sizes = await db.size.findMany({
            where: {
                storeId
            }
        });

        return NextResponse.json(sizes);

    } catch (error) {
        console.log("[SIZES_GET]", error);
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

        const store = await db.store.findUnique({
            where: {
                id: storeId,
                userId
            }
        })

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const size = await db.size.create({
            data: {
                storeId,
                name,
                value
            }
        })

        return NextResponse.json(size);

    } catch (error) {
        console.log("[SIZES_POST]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}