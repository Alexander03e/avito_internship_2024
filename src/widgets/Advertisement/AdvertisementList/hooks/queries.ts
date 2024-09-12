import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AdvertisementsApi } from 'common/api/advertisements/api';
import { KEYS } from 'common/consts/queries';
import { Advertisment } from 'common/types/advertisement';
import { Filters } from 'common/types/filters';
import { useEffect, useState } from 'react';

type Props = {
    searchQuery?: string | null;
    start?: number;
    limit?: number;
    filters: Filters | null;
};

const api = AdvertisementsApi.getInstance();

export const useAllAdvertisement = ({
    searchQuery,
    start = 0,
    limit = 10,
    filters = null,
}: Props) => {
    const [hasNextPage, setHasNextPage] = useState(false);
    const queryClient = useQueryClient();
    const nextStart = start + limit;
    const params = new URLSearchParams({
        _limit: limit.toString(),
    });

    const [prefetched, setPrefetched] = useState(false);

    if (searchQuery) params.append('name_like', searchQuery);

    if (filters) {
        const { likes, price, views } = filters;
        params.appendIfExists('likes_gte', likes.from);
        params.appendIfExists('likes_lte', likes.to);
        params.appendIfExists('price_gte', price.from);
        params.appendIfExists('price_lte', price.to);
        params.appendIfExists('views_gte', views.from);
        params.appendIfExists('views_lte', views.to);
    }
    const query = useQuery({
        queryKey: [KEYS.ADS, searchQuery, start, limit, filters],
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
    }, [searchQuery, queryClient, limit, start, filters]);

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
