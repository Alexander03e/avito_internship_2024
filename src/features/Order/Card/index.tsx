import { ReactElement } from 'react';
import styles from './order-card.module.scss';
import { Order } from 'common/types/orders';
import { formatDate } from 'common/utils/formateDate';
import { Button } from 'common/components/ui';
import size from 'lodash/size';
import { TEXTS } from './consts';
import { getOrderStatus } from './utils/getOrderStatus';
import { useAppContext } from 'common/context/hooks';
type Props = Order;

export const OrderCard = ({
    deliveryWay,
    createdAt,
    id,
    items,
    status,
    total,
    finishedAt,
}: Props): ReactElement => {
    const formattedDate = formatDate(createdAt);
    const formattedFinish = formatDate(finishedAt);

    const { updateAppState } = useAppContext();

    const openAllProducts = () => {
        updateAppState({ activeModal: '#all_products', modalData: items });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div className={styles.tags}>
                    <h4 className={styles.id}>Номер заказа: {id}</h4>
                    <h4 className={styles.status}>Статус: {getOrderStatus(status)}</h4>
                </div>
                <span>
                    {TEXTS.CREATED} <strong>{formattedDate}</strong>
                </span>
                <p>
                    {TEXTS.TOTAL}
                    <strong>{total}</strong> ₽
                </p>
                <p>
                    Способ доставки: <strong>{deliveryWay}</strong>
                </p>
                <p>
                    {TEXTS.PRODUCTS}
                    <strong>{size(items)}</strong>
                </p>
                {formattedFinish && (
                    <p>
                        Завершится: <strong>{formattedFinish}</strong>
                    </p>
                )}
                <Button variant='empty' onClick={openAllProducts} label='Показать все товары' />
            </div>
        </div>
    );
};
