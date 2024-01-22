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

        const categories = await db.category.findMany({
            where: {
                storeId
            }
        });

        return NextResponse.json(categories);

    } catch (error) {
        console.log("[CATEGORIES_GET]", error);
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

        const store = await db.store.findUnique({
            where: {
                id: storeId,
                userId
            }
        })

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const category = await db.category.create({
            data: {
                storeId,
                name,
                billboardId
            }
        })

        return NextResponse.json(category);

    } catch (error) {
        console.log("[CATEGORIES_POST]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}