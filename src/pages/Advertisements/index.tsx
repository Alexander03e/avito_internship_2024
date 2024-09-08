import { Search } from 'features/Search';
import { ReactElement } from 'react';
import { AdvertisementsList } from 'widgets/AdvertisementList';
import styles from './advertisement-page.module.scss';

export const AdvertisementsPage = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <Search />
            <AdvertisementsList />
        </div>
    );
};
