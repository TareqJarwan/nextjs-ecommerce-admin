'use client';

import Modal from "@/components/ui/modal";

import { useStoreModal } from "@/hooks/use-store-modal";

const StoreModal = () => {
    const { isOpen, onClose, onOpen } = useStoreModal();

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={isOpen}
            onClose={onClose}
        >
            Future Create Store Form
        </Modal>
    );
}

export default StoreModal;