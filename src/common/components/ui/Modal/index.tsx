import { PropsWithChildren, ReactElement } from 'react';
import styles from './modal.module.scss';

export const Modal = ({ children }: PropsWithChildren): ReactElement => {
    return <div className={styles.wrapper}>{children}</div>;
};
