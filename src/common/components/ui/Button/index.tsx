import { ButtonHTMLAttributes, ReactElement } from 'react';
import styles from './button.module.scss';
import cn from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string;
    variant?: 'empty' | 'filled';
};

export const Button = ({ label, variant = 'filled', className, ...props }: Props): ReactElement => {
    return (
        <button className={cn(styles.wrapper, styles[variant], className)} {...props}>
            {label}
        </button>
    );
};
