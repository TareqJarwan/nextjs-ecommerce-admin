import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
) {
    try {
        const { storeId, colorId } = params;

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!colorId) {
            return new NextResponse("Color id is required", { status: 400 });
        }

        const store = await db.store.findUnique({
            where: {
                id: storeId,
            }
        });

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const colors = await db.color.findFirst({
            where: {
                id: colorId,
                storeId
            }
        });

        return NextResponse.json(colors);

    } catch (error) {
        console.log("[COLOR_GET]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, colorId } = params;
        const { name, value } = await req.json();


        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse('Color name is required', { status: 400 })
        }

        if (!value) {
            return new NextResponse('Color value is required', { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!colorId) {
            return new NextResponse("Color id is required", { status: 400 });
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

        const billboard = await db.color.update({
            where: {
                id: colorId,
                storeId
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("[COLOR_PATCH]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
) {
    try {
        const { userId } = auth();
        const { storeId, colorId } = params;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!colorId) {
            return new NextResponse("Color id is required", { status: 400 });
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

        const color = await db.color.delete({
            where: {
                id: colorId,
                storeId
            },
        })

        return NextResponse.json(color);

    } catch (error) {
        console.log("[COLOR_DELETE]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}