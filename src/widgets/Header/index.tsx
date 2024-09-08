import { ReactElement } from 'react';
import styles from './header.module.scss';
import { Container } from 'common/components/ui/Container';
import { NavLink } from 'react-router-dom';
import { PATHS } from 'common/consts/paths';
import { HEADER_TEXTS } from './consts';

export const Header = (): ReactElement => {
    return (
        <header className={styles.wrapper}>
            <Container>
                <nav className={styles.nav}>
                    <NavLink to={PATHS.ADVERTISEMENTS}>{HEADER_TEXTS.ADVERTISEMENTS}</NavLink>
                    <NavLink to={PATHS.ORDERS}>{HEADER_TEXTS.ORDERS}</NavLink>
                </nav>
            </Container>
        </header>
    );
};
