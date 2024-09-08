import { forwardRef, InputHTMLAttributes, ReactElement } from 'react';
import styles from './search-input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = forwardRef<HTMLInputElement, any>(
    ({ ...props }: Props, ref): ReactElement => {
        return <input className={styles.wrapper} ref={ref} {...props} />;
    },
);
