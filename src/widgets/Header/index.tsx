import { ReactElement } from 'react';
import styles from './header.module.scss';
import { Container } from 'common/components/ui/Container';
import { NavLink } from 'react-router-dom';
import { PATHS } from 'common/consts/paths';
import { HEADER_TEXTS } from './consts';
import { Button } from 'common/components/ui';
import { useAppContext } from 'common/context/hooks';

export const Header = (): ReactElement => {
    const { updateAppState } = useAppContext();

    const createAdHandler = () => {
        updateAppState({ activeModal: '#create_ad' });
    };

    return (
        <header className={styles.wrapper}>
            <Container>
                <nav className={styles.nav}>
                    <div className={styles.links}>
                        <NavLink to={PATHS.ADVERTISEMENTS}>{HEADER_TEXTS.ADVERTISEMENTS}</NavLink>
                        <NavLink to={PATHS.ORDERS}>{HEADER_TEXTS.ORDERS}</NavLink>
                    </div>
                    <Button label={HEADER_TEXTS.CREATE_AD} onClick={createAdHandler} />
                </nav>
            </Container>
        </header>
    );
};
