'use client';

import * as z from 'zod';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from "lucide-react";
import { Store } from "@prisma/client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from '@/components/ui/input';
import AlertModal from '@/components/modals/alert-modal';
import ApiAlert from '@/components/ui/api-alert';

import useOrigin from '@/hooks/use-orgin';

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1)
});

type SettingsFormValue = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}: SettingsFormProps) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const form = useForm<SettingsFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValue) => {
        try {
            setIsLoading(true);

            await axios.patch(`/api/stores/${params.storeId}`, data);

            router.refresh();

            toast.success('Store updated.');
        } catch (error) {
            console.log('Error', error);
            toast.error('Something went wrong.')
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/stores/${params.storeId}`);

            router.push('/');
            router.refresh();

            toast.success('Store deleted.');
        } catch (error) {
            console.log('Error', error);
            toast.error('Make sure you removed all products and categories first.')
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                loading={isLoading}
                onConfirm={onDelete}
            />

            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description='Manage store preferences'
                />
                <Button
                    disabled={isLoading}
                    variant='destructive'
                    size='sm'
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>

            <Separator />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8 w-full'
                >
                    <div className='grid grid-cols-3 gap-8'>
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
                                            disabled={isLoading}
                                            placeholder='eg. E-Commerce store'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        disabled={isLoading}
                        type='submit'
                        className='ml-auto'
                    >
                        Save Changes
                    </Button>
                </form>
            </Form>

            <Separator />

            <ApiAlert
                title='NEXT_PUBLIC_API_URL'
                description={`${origin}/api/${params.storeId}`}
                variant='public'
            />
        </>

    );
}

export default SettingsForm;