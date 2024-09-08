import { InputHTMLAttributes, ReactElement } from 'react';
import styles from './search-input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement>

export const SearchInput = (): ReactElement => {
    return <input className={styles.wrapper} />;
};
