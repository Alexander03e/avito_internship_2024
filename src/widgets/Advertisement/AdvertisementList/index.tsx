import { ReactElement } from 'react';
import styles from './advertisement-list.module.scss';
import { useAllAdvertisement } from './hooks/queries';
import map from 'lodash/map';
import { Card, Pagination } from 'features/index';
import { EMPTY, EMPTY_SEARCH, ERROR } from './consts';
import cn from 'classnames';
import size from 'lodash/size';
import { Loader } from 'common/components/ui/Loader';
import { useAdStateSelector } from 'common/context/selectors';

type Props = {
    className?: string;
};

export const AdvertisementsList = ({ className }: Props): ReactElement => {
    const { searchAdValue, currentLimit, currentPage } = useAdStateSelector();

    const { data, isLoading, isError, hasNextPage } = useAllAdvertisement({
        searchQuery: searchAdValue,
        limit: currentLimit,
        start: currentPage * currentLimit,
    });

    if (isError) return <>{ERROR}</>;

    if (isLoading) return <Loader />;

    if (size(data) === 0 && searchAdValue)
        return (
            <span>
                {EMPTY_SEARCH} <strong>{searchAdValue}</strong>
            </span>
        );

    if (size(data) === 0) return <span>{EMPTY}</span>;

    return (
        <div className={cn(styles.wrapper, className)}>
            {map(data, item => (
                <Card key={item.id} {...item} />
            ))}
            <Pagination hasNextPage={hasNextPage} />
        </div>
    );
};
