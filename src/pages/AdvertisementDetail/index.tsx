import { ReactElement, useEffect } from 'react';
import { useAdvertisement } from './hooks/queries';
import { useAppContext } from 'common/context/hooks';
import { Loader } from 'common/components/ui/Loader';
import { AdError, AdInfo } from './components';
import { useParams } from 'react-router-dom';

export const AdvertisementDetail = (): ReactElement => {
    const { id } = useParams();

    const { updateAppState } = useAppContext();

    const { data, isError, isLoading } = useAdvertisement(String(id));

    useEffect(() => {
        if (!data) return;
        updateAppState({ adData: data });

        return () => {
            updateAppState({ adData: null, currentPage: 0 });
        };
    }, [data]);

    if (isLoading) return <Loader />;

    if (isError) return <AdError />;

    return <AdInfo />;
};
