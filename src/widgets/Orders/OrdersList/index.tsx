import map from 'lodash/map';
import { ReactElement } from 'react';
import { useOrders } from './hooks/queries';
import styles from './order-list.module.scss';
import { OrderCard } from 'features/Order/Card';
import { Loader } from 'common/components/ui/Loader';
import { OrderFilter } from 'features/Order/Filter';
import { useOrderStateSelector } from 'common/context/selectors';

export const OrdersList = (): ReactElement => {
    const { currentFilter  } = useOrderStateSelector()
    
    const { data, isError, isLoading } = useOrders(currentFilter);

    if (isError) return <>Ошибка при загрузке данных</>

    if (isLoading) return <Loader />

    return (
        <div className={styles.wrapper}>
            <OrderFilter />
            {map(data, item => (
                <OrderCard key={item.id} {...item} />
            ))}
        </div>
    );
};
