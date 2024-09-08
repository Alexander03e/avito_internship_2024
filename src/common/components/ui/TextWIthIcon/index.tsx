import { ReactElement, ReactNode } from 'react';
import styles from './text-with-icon.module.scss';
import cn from 'classnames';

type Props = {
    icon?: ReactNode;
    text?: string | number;
    className?: string;
};

export const TextWithIcon = ({ icon, text, className }: Props): ReactElement => {
    return (
        <div className={cn(styles.wrapper, className)}>
            {icon}
            {text && <p>{text}</p>}
        </div>
    );
};
