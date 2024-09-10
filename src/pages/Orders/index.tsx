import { ReactElement } from 'react';
import { OrderDetailPage } from 'pages/Orders/entities/OrderDetail';
import { OrdersList } from 'widgets/Orders/OrdersList';
import styles from './orders-page.module.scss'

const OrdersPage = (): ReactElement => {
    return <div className={styles.wrapper}>
        <h2>Ваши заказы</h2>
        <OrdersList />
    </div>;
};

export {
    OrdersPage,
    OrderDetailPage
}