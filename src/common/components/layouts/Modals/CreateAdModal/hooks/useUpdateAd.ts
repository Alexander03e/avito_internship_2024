import { AdvertisementsApi } from 'common/api/advertisements/api';
import { TAdvertismentData } from 'common/types/advertisement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KEYS } from 'common/consts/queries';

const api = AdvertisementsApi.getInstance()

export const useUpdateAd = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {   
        mutationFn: ({data, id}: {data: TAdvertismentData, id: string}) => api.update(id, data),
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [KEYS.AD_DETAIL]
        })
      },
    }
  );
};

