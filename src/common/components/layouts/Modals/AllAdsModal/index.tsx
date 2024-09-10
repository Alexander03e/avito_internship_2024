import { Modal } from 'common/components/ui/Modal';
import { useAppContext } from 'common/context/hooks';
import { Order } from 'common/types/orders';
import { ReactElement } from 'react';
import map from 'lodash/map';
import { Card } from 'features/Advertisement';
import styles from './all-ads-modal.module.scss';

export const AllAdsModal = (): ReactElement => {
    const {
        state: { modalData },
    } = useAppContext();

    const currentModalData = modalData as Order['items'];

    return (
        <Modal>
            <div className={styles.wrapper}>
                {map(currentModalData, item => (
                    <Card isShortened {...item} />
                ))}
            </div>
        </Modal>
    );
};
