import { Search } from 'features/Advertisement/Search';
import { ReactElement } from 'react';
import { AdvertisementsList } from 'widgets/Advertisement';
import styles from './advertisement-page.module.scss';
import { AdvertisementDetailPage } from 'pages/Advertisements/entities/AdvertisementDetail';
import { AdFilter } from 'features/Advertisement/Filter';

const AdvertisementsPage = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <Search />
            <AdFilter />
            <AdvertisementsList />
        </div>
    );
};

export {
    AdvertisementsPage,
    AdvertisementDetailPage
}