import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import styles from './advertisement-detail.module.scss'

export const AdvertisementDetail = (): ReactElement => {
    const { id } = useParams();
    return <div className={styles.wrapper}>
        
        <div ></div>
    </div>;
};
