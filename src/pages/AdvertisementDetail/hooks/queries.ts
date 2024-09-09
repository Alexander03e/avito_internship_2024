import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { AdvertisementsApi } from "common/api/advertisements/api"
import { KEYS } from "common/consts/queries"
import { Advertisment } from "common/types/advertisement"

type Props = {
    id: number
}

const api = AdvertisementsApi.getInstance()

export const useAdvertisement = ({id}: Props): UseQueryResult<Advertisment> => {
    
    return useQuery({
        queryKey: [KEYS.AD_DETAIL, id],
        queryFn: () => {
            return api.get(id)
        }
    })
}