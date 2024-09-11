import map from 'lodash/map';
import { ReactElement } from 'react';
import { useOrders } from './hooks/queries';
import styles from './order-list.module.scss';
import { OrderCard } from 'features/Order/Card';
import { Loader } from 'common/components/ui/Loader';
import { OrderFilter } from 'features/Order/Filter';
import { useOrderStateSelector } from 'common/context/selectors';
import { OrderSort } from 'features/Order/Sort';
import size from 'lodash/size';

export const OrdersList = (): ReactElement => {
    const { currentFilter, currentPriceSort } = useOrderStateSelector();

    const { data, isError, isLoading } = useOrders(currentFilter, currentPriceSort);

    if (isError) return <>Ошибка при загрузке данных</>;

    if (isLoading) return <Loader />;

    return (
        <div className={styles.wrapper}>
            <div className={styles.filters}>
                <OrderSort.Price />
                <OrderFilter />
            </div>
            {size(data) === 0 ? (
                <>Заказы не найдены.</>
            ) : (
                map(data, item => <OrderCard key={item.id} {...item} />)
            )}
        </div>
    );
};
