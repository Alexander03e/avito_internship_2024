import { MouseEvent, ReactElement, ReactNode } from 'react';
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

    const modalClose = (): void => {
        updateAppState({ activeModal: null });
    };

    const onInnerClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    useScrollblock(activeModal !== null);

    return (
        <div className={styles.wrapper} onClick={modalClose}>
            <div className={styles.inner} onClick={onInnerClick}>
                <button onClick={modalClose} className={styles.close}>Закрыть</button>
                {children}
            </div>
        </div>
    );
};
