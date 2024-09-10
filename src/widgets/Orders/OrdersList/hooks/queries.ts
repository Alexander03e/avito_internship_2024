import { useQuery } from "@tanstack/react-query";
import { OrderApi } from "common/api/orders/api";
import { KEYS } from "common/consts/queries";

const api = OrderApi.getInstance()

export const useOrders = (status: string | number | null) => {

    return useQuery({
        queryKey: [KEYS.ORDERS, status],
        queryFn: () => {
            const params = new URLSearchParams();

            if (status) params.append('status', status.toString())
        
            return api.getAll(params.toString())
        }
    });
}