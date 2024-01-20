import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { userId } = auth();

    if (!userId) redirect('/sign-in');

    const store = await db.store.findFirst({
        where: {
            userId
        }
    });

    if (store) redirect(`/${store.id}`);
    else redirect(`/`);

    return (
        <>
            {children}
        </>
    )
}

export default SetupLayout;