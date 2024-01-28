"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
    id: string
    isPaid: boolean
    phone: string
    address: string
    products: string
    totalPrice: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },

    {
        accessorKey: "totalPrice",
        header: "Total Price",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
    }
]
