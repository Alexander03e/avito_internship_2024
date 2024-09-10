import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

export const OrderDetailPage = (): ReactElement => {
    const { id } = useParams();

    return <div>order {id}</div>;
};
