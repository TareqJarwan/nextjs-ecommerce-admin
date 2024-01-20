'use client';

import * as z from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useStoreModal } from "@/hooks/use-store-modal";

const formSchema = z.object({
    name: z.string().min(1)
})

const StoreModal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { isOpen, onClose } = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            const res = await axios.post('/api/stores', values);

            toast.success("Store created.");

            form.reset();
        } catch (error) {
            console.log('Error', error);
            toast.error('Something went wrong.')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='eg. E-Commerce store'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button
                                    disabled={isLoading}
                                    variant='outline'
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    disabled={isLoading}
                                    type='submit'
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}

export default StoreModal;