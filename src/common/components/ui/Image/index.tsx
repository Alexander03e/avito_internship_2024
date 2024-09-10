import { ReactElement } from 'react';
import styles from './image.module.scss';
import cn from 'classnames';

type Props = {
    imageUrl?: string;
    onClick?: () => void;
    size?: 'small' | 'large';
    className?: string;
};

export const Image = ({ imageUrl, onClick, className, size = 'small' }: Props): ReactElement => {
    const image = Boolean(imageUrl) ? imageUrl : '/src/assets/images/fake_img.png';

    const handleClick = () => {
        if (!onClick) return;

        onClick();
    };

    return (
        <div
            onClick={handleClick}
            className={cn(styles.imgWrapper, styles[size], className, {
                [styles.fakeImg]: !Boolean(imageUrl),
                [styles.clickable]: onClick,
            })}
        >
            <img src={image} />
        </div>
    );
};
