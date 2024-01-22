'use client';

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

import { BillboardColumn, columns } from "./columns";

interface BillboardClientProps {
    data: BillboardColumn[]
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

            <DataTable
                columns={columns}
                data={data}
                searchKey="label"
            />

            <Heading
                title="API"
                description='API calls for Billboards'
            />

            <Separator />

            <ApiList
                entityName="billboards"
                entityIdName='billboardId'
            />
        </>
    );
}

export default BillboardClient;