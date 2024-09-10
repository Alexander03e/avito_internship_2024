import { Search } from 'features/Advertisement/Search';
import { ReactElement } from 'react';
import { AdvertisementsList } from 'widgets/Advertisement';
import styles from './advertisement-page.module.scss';
import { AdvertisementDetailPage } from 'pages/Advertisements/entities/AdvertisementDetail';

const AdvertisementsPage = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <Search />
            <AdvertisementsList />
        </div>
    );
};

export {
    AdvertisementsPage,
    AdvertisementDetailPage
}