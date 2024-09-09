import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AdvertisementsApi } from 'common/api/advertisements/api';
import { KEYS } from 'common/consts/queries';
import { Advertisment } from 'common/types/advertisement';
import { useEffect, useState } from 'react';

type Props = {
    searchQuery?: string | null;
    start?: number;
    limit?: number;
};

const api = AdvertisementsApi.getInstance();

export const useAllAdvertisement = ({ searchQuery, start = 0, limit = 10 }: Props) => {
    const [hasNextPage, setHasNextPage] = useState(false);
    const queryClient = useQueryClient();
    const nextStart = start + limit;
    const params = new URLSearchParams({
        _limit: limit.toString(),
    });

    const [prefetched, setPrefetched] = useState(false);

    if (searchQuery) params.append('name_like', searchQuery);

    const query = useQuery({
        queryKey: [KEYS.ADS, searchQuery, start, limit],
        queryFn: () => {
            params.append('_start', start.toString());
            return api.getAll(params.toString());
        },
    });

    useEffect(() => {
        queryClient
            .prefetchQuery({
                queryKey: [KEYS.ADS, searchQuery, nextStart, limit],
                queryFn: () => {
                    params.set('_start', nextStart.toString());
                    return api.getAll(params.toString());
                },
            })
            .then(() => setPrefetched(true));
    }, [searchQuery, queryClient, limit, start]);

    useEffect(() => {
        if (prefetched) {
            const nextPageData: Advertisment[] | undefined = queryClient.getQueryData([
                KEYS.ADS,
                searchQuery,
                nextStart,
                limit,
            ]);
            setHasNextPage(nextPageData ? nextPageData.length > 0 : false);
            setPrefetched(false);
        }
    }, [prefetched]);

    return { ...query, hasNextPage };
};
