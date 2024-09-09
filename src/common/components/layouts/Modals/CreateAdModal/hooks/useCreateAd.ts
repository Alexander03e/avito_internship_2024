import { AdvertisementsApi } from 'common/api/advertisements/api';
import { TAdvertismentData } from 'common/types/advertisement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KEYS } from 'common/consts/queries';

const api = AdvertisementsApi.getInstance()

export const useCreateAd = () => {
  const queryClient = useQueryClient();

  return useMutation(
    {   
        mutationFn: (data: TAdvertismentData) => api.create(data),
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [KEYS.ADS]
        })
      },
    }
  );
};

