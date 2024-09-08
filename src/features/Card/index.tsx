import { ReactElement } from 'react';
import styles from './card.module.scss';
import { Advertisment } from 'common/types/advertisement';
import { Button } from 'common/components/ui';
import HeartIcon from 'assets/icons/heart.svg?react';
import EyeIcon from 'assets/icons/eye.svg?react';
import { TextWithIcon } from 'common/components/ui/TextWIthIcon';
import cn from 'classnames';

type Props = Advertisment;

export const Card = ({
    createdAt,
    id,
    likes,
    name,
    price,
    views,
    description,
    imageUrl,
}: Props): ReactElement => {
    const image = Boolean(imageUrl) ? imageUrl : 'src/assets/images/fake_img.png';

    return (
        <div className={styles.card}>
            <div className={cn(styles.imgWrapper, { [styles.fakeImg]: !Boolean(imageUrl) })}>
                <img src={image} />
            </div>

            <div className={styles.cardInfo}>
                <Button variant='empty' label={name} />
                <h4>{price} ₽</h4>
                <div className={styles.details}>
                    <TextWithIcon icon={<EyeIcon />} text={views} />
                    <TextWithIcon icon={<HeartIcon />} text={likes} />
                </div>
            </div>
        </div>
    );
};
