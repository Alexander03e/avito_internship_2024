import { ReactElement, useEffect } from 'react';
import { useAdvertisement } from './hooks/queries';
import { useAppContext } from 'common/context/hooks';
import { Loader } from 'common/components/ui/Loader';
import { AdError, AdInfo } from './components';
import { useParams } from 'react-router-dom';

export const AdvertisementDetailPage = (): ReactElement => {
    const { id } = useParams();

    const { updateAdState } = useAppContext();

    const { data, isError, isLoading } = useAdvertisement(String(id));

    useEffect(() => {
        if (!data) return;
        updateAdState({ adData: data });

        return () => {
            updateAdState({ adData: null, currentPage: 0 });
        };
    }, [data]);

    if (isLoading) return <Loader />;

    if (isError) return <AdError />;

    return <AdInfo />;
};
