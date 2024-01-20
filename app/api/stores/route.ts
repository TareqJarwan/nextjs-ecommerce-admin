import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const { name } = await req.json();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }

        const store = await db.store.create({
            data: {
                userId,
                name,
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log("[STORES_POST]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}