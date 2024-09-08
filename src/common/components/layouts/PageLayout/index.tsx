import { Outlet } from 'react-router-dom';
import styles from './page-layout.module.scss';
import { Header } from 'widgets/Header';
import { useAppContext } from 'common/context/hooks';
import { AllAdsModal, CreateOrderModal } from '../Modals';
import { Container } from 'common/components/ui/Container';

export const PageLayout = () => {
    const {
        state: { activeModal },
    } = useAppContext();
    return (
        <>
            <Header />
            <main className={styles.wrapper}>
                <Container className={styles.page}>
                    <Outlet />
                </Container>
            </main>
            {activeModal === '#all_products' && <AllAdsModal />}
            {activeModal === '#create_order' && <CreateOrderModal />}
        </>
    );
};
