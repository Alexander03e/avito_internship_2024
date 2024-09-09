import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { AdvertisementsApi } from 'common/api/advertisements/api';
import { KEYS } from 'common/consts/queries';
import { Advertisment } from 'common/types/advertisement';

const api = AdvertisementsApi.getInstance();

export const useAdvertisement = (id: string): UseQueryResult<Advertisment> => {
    return useQuery({
        queryKey: [KEYS.AD_DETAIL, id],
        queryFn: () => {
            return api.get(id);
        },
        retry: false,
    });
};

export const useRemoveAdvertisement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => api.delete(id),
        onSuccess: deletedId => {
            queryClient.invalidateQueries({ queryKey: [KEYS.ADS] });
            queryClient.invalidateQueries({ queryKey: [KEYS.AD_DETAIL, deletedId] });
        },
    });
};
