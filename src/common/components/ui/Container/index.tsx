import { HTMLAttributes, ReactElement } from 'react';
import styles from './container.module.scss';
import cn from 'classnames';

export const Container = ({
    children,
    className,
}: HTMLAttributes<HTMLDivElement>): ReactElement => {
    return <div className={cn(styles.container, className)}>{children}</div>;
};
