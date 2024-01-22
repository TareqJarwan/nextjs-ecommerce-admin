'use client';

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Billboard } from "@prisma/client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface BillboardClientProps {
    data: Billboard[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboard (${data.length})`}
                    description='Manage billboard for your store'
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/billboards/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>

            <Separator />
        </>
    );
}

export default BillboardClient;