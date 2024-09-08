import { ReactElement } from 'react';
import styles from './advertisement-list.module.scss';
import { useAllAdvertisement } from './hooks/queries';
import map from 'lodash/map';
import { Card } from 'features/Card';
import { EMPTY, ERROR, LOADING } from './consts';
import { Pagination } from 'features/Pagination';
import cn from 'classnames';
import { useAppContext } from 'common/context/hooks';
import size from 'lodash/size';

type Props = {
    className?: string;
};

export const AdvertisementsList = ({ className }: Props): ReactElement => {
    const {
        state: { searchAdValue },
    } = useAppContext();

    const { data, isLoading, isError } = useAllAdvertisement({ searchQuery: searchAdValue });

    const onChange = () => {};

    if (isError) return <>{ERROR}</>;

    if (isLoading) return <>{LOADING}</>;

    if (size(data) === 0)
        return (
            <span>
                {EMPTY} <strong>{searchAdValue}</strong>
            </span>
        );

    return (
        <div className={cn(styles.wrapper, className)}>
            {map(data, item => (
                <Card key={item.id} {...item} />
            ))}

            <Pagination itemsPerPage={10} onChange={onChange} />
        </div>
    );
};
