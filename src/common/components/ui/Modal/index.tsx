import { MouseEvent, ReactElement, ReactNode, useRef } from 'react';
import styles from './modal.module.scss';
import { useScrollblock } from 'common/hooks';
import { useAppContext } from 'common/context/hooks';

type Props = {
    children?: ReactNode;
};

export const Modal = ({ children }: Props): ReactElement => {
    const {
        updateAppState,
        state: { activeModal },
    } = useAppContext();

    useScrollblock(activeModal !== null);

    const ref = useRef<HTMLDivElement>(null);

    const modalClick = (e: MouseEvent): void => {
        if (e.target !== ref.current) {
            updateAppState({ activeModal: null });
        }
    };

    return (
        <div className={styles.wrapper} onClick={modalClick}>
            <div className={styles.inner} ref={ref}>
                {children}
            </div>
        </div>
    );
};
