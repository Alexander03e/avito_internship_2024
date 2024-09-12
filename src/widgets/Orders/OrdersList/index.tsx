import map from 'lodash/map';
import { ReactElement, useEffect } from 'react';
import { useOrders } from './hooks/queries';
import styles from './order-list.module.scss';
import { OrderCard } from 'features/Order/Card';
import { Loader } from 'common/components/ui/Loader';
import { OrderFilter } from 'features/Order/Filter';
import { useOrderStateSelector } from 'common/context/selectors';
import { OrderSort } from 'features/Order/Sort';
import size from 'lodash/size';
import { Button } from 'common/components/ui';
import { useAppContext } from 'common/context/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QUERY_PARAMS } from 'common/consts/paths';

export const OrdersList = (): ReactElement => {
    const { currentFilter, currentPriceSort } = useOrderStateSelector();
    const { updateOrderState } = useAppContext();
    const { data, isError, isLoading } = useOrders(currentFilter, currentPriceSort);
    
    const [params] = useSearchParams()

    const adId = params.get(QUERY_PARAMS.AD_ID) 

    const navigate = useNavigate()
    
    useEffect(() => {
        return () => {
            updateOrderState({ adId: null, currentFilter: null, currentPriceSort: null });
        };
    }, []);
    
    if (isError) return <>Ошибка при загрузке данных</>;

    if (isLoading) return <Loader />;
    

    if (adId && data) {
        const filteredData = data.filter(order => order.items.some(item => item.id === adId));
        
        const backNavigate = () => {
            navigate(-1)
        }
        
        return (
            <div className={styles.wrapper}>
                {size(filteredData) === 0 ? (
                    <>
                        <span>По данному товару заказы отсутствуют</span>{' '}
                        <Button onClick={backNavigate} label='Вернуться назад' variant='empty'/>
                    </>
                ) : (
                    map(filteredData, item => <OrderCard {...item} />)
                )}
            </div>
        );
    }
    
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
