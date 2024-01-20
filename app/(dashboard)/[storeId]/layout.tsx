import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";

import db from "@/lib/db";

const DashboardLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const store = await db.store.findUnique({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) redirect('/');

    return (
        <>
            <Navbar />
            {children}
        </ >
    );
}

export default DashboardLayout;