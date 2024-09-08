import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { AdvertisementsApi } from "common/api/advertisements/api"
import { Advertisment } from "common/types/advertisement"

const api = AdvertisementsApi.getInstance()

export const useAllAdvertisement = (): UseQueryResult<Advertisment[]> => {

    return useQuery({
        queryKey: ['ads'],
        queryFn: () => api.getAll()
    })
}