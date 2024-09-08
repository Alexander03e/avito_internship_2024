import { ReactElement } from 'react';
import styles from './advertisement-list.module.scss';
import { useAllAdvertisement } from './hooks/queries';
import map from 'lodash/map';
import { Card } from 'features/Card';
export const AdvertisementsList = (): ReactElement => {
    const { data, error } = useAllAdvertisement();
    console.log(data);
    return (
        <div className={styles.wrapper}>
            {map(data, item => (
                <Card {...item} />
            ))}
        </div>
    );
};
