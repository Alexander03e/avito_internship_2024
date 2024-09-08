import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { AdvertisementsApi } from "common/api/advertisements/api"
import { Advertisment } from "common/types/advertisement"

type Props = {
    searchQuery?: string | null,
    start?: number;
    limit?: number
}

const api = AdvertisementsApi.getInstance()

export const useAllAdvertisement = ({searchQuery, start = 0, limit = 10}: Props): UseQueryResult<Advertisment[]> => {
    
    return useQuery({
        queryKey: ['adsList', searchQuery, start, limit],
        queryFn: () => {
            const params = new URLSearchParams({
                _start: start.toString(),
                _limit: limit.toString(),
            })

            if (searchQuery) params.append('name_like', searchQuery)

            return api.getAll(params.toString())
        }
    })
}