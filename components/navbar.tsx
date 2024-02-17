import { UserButton } from "@clerk/nextjs";

import MainNav from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { ThemeToggler } from "@/components/theme-toggle";

import { getStores } from "@/actions/get-stores";

const Navbar = async () => {
    const stores = await getStores();

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />

                <MainNav className="mx-6" />

                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggler />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;