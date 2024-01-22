'use client';

import { useParams } from "next/navigation";

import ApiAlert from "@/components/ui/api-alert";

import useOrigin from "@/hooks/use-orgin";

interface ApiListProps {
    entityName: string
    entityIdName: string
}

interface ApiAlert {
    title: string;
    description: string;
    variant: 'public' | 'admin';
};

const ApiList: React.FC<ApiListProps> = ({
    entityIdName,
    entityName
}) => {
    const params = useParams();
    const origin = useOrigin();

    const baseUrl = `${origin}/api/stores/${params.storeId}`;

    const apiAlerts: ApiAlert[] = [
        {
            title: 'GET',
            description: `${baseUrl}/${entityName}`,
            variant: 'public'
        },
        {
            title: 'GET',
            description: `${baseUrl}/${entityName}/{${entityIdName}}`,
            variant: 'public'
        },
        {
            title: 'POST',
            description: `${baseUrl}/${entityName}`,
            variant: 'admin'
        },
        {
            title: 'PATCH',
            description: `${baseUrl}/${entityName}/{${entityIdName}}`,
            variant: 'admin'
        },
        {
            title: 'DELETE',
            description: `${baseUrl}/${entityName}/{${entityIdName}}`,
            variant: 'admin'
        },
    ];

    return (
        <>
            {apiAlerts.map((alert, index) => (
                <ApiAlert
                    key={index}
                    title={alert.title}
                    description={alert.description}
                    variant={alert.variant}
                />
            ))}
        </>
    );
}

export default ApiList;