'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void
    onRemove: (value: string) => void
    values: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled = false,
    onChange,
    onRemove,
    values
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (res: any) => {
        onChange(res.info.secure_url)
    }

    if (!isMounted) return null;

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {values.map(url =>
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="absolute z-10 top-2 right-2">
                            <Button
                                variant='destructive'
                                size='icon'
                                type="button"
                                onClick={() => onRemove(url)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>

                        <Image
                            fill
                            className="object-cover"
                            src={url}
                            alt="Image"
                        />
                    </div>
                )}
            </div>

            <CldUploadWidget onUpload={onUpload} uploadPreset="u3zq9nqt">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return (
                        <Button onClick={onClick}
                            type="button"
                            variant='secondary'
                            disabled={disabled}
                        >
                            <ImagePlus className="mr-2 w-4 h-4" />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;