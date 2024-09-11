import { ReactElement } from 'react';
import { OrdersList } from 'widgets/Orders';
import styles from './orders-page.module.scss'

const OrdersPage = (): ReactElement => {
    return <div className={styles.wrapper}>
        <h2>Ваши заказы</h2>
        <OrdersList />
    </div>;
};

export {
    OrdersPage,
}