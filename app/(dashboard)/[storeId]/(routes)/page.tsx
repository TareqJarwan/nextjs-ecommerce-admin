import db from "@/lib/db";

interface DashboardPageProps {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}: DashboardPageProps) => {
    const { storeId } = params;

    const store = await db.store.findUnique({
        where: {
            id: storeId
        }
    });

    return (
        <div>
            Active Store ${store?.name}
        </div>
    );
}

export default DashboardPage;