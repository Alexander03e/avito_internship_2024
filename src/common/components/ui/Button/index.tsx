import { ButtonHTMLAttributes, ReactElement } from 'react';
import styles from './button.module.scss';
import cn from 'classnames';
import { EMPTY_BUTTON } from './consts';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string;
    variant?: 'empty' | 'filled' | 'warn' | 'warn-empty';
    isEmpty?: boolean;
};

export const Button = ({
    label,
    variant = 'filled',
    className,
    isEmpty,
    ...props
}: Props): ReactElement => {
    return (
        <button className={cn(styles.wrapper, styles[variant], className)} {...props}>
            {!isEmpty ? label : EMPTY_BUTTON}
        </button>
    );
};
