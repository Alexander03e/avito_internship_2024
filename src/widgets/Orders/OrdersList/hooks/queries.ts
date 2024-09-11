import { useQuery } from '@tanstack/react-query';
import { OrderApi } from 'common/api/orders/api';
import { KEYS } from 'common/consts/queries';

const api = OrderApi.getInstance();

export const useOrders = (status: string | number | null, price: string | null) => {
    return useQuery({
        queryKey: [KEYS.ORDERS, status, price],
        queryFn: () => {
            const params = new URLSearchParams();

            if (status) params.append('status', status.toString());

            if (price) {
                params.append('_sort', 'total');
                params.append('_order', price);
            }

            return api.getAll(params.toString());
        },
    });
};
