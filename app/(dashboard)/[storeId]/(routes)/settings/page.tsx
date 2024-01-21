import SettingsForm from "./components/settings-form";

import { getStore } from "@/actions/get-store";

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}: SettingsPageProps) => {
    const store = await getStore(params.storeId);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pb-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
}

export default SettingsPage;