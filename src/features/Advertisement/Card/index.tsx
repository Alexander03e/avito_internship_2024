import { ReactElement } from 'react';
import styles from './card.module.scss';
import { Advertisment } from 'common/types/advertisement';
import { Button, TextWithIcon } from 'common/components/ui';
import HeartIcon from 'assets/icons/heart.svg?react';
import EyeIcon from 'assets/icons/eye.svg?react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'common/consts/paths';
import { Image } from 'common/components/ui/Image';
import { useAppContext } from 'common/context/hooks';

type Props = Advertisment & {
    isShortened?: boolean;
};

export const Card = ({
    id,
    likes,
    name,
    price,
    views,
    imageUrl,
    isShortened = false,
}: Props): ReactElement => {
    const { updateAppState } = useAppContext();
    const priceLabel = price ? `${price + ' ₽'}` : 'Цена не указана';
    const navigate = useNavigate();

    const redirectToDetails = () => {
        navigate(`${PATHS.ADVERTISEMENTS}/${id}`);
        updateAppState({ activeModal: null });
    };

    return (
        <div className={cn(styles.card, { [styles.shortened]: isShortened })}>
            <Image className={styles.img} imageUrl={imageUrl} onClick={redirectToDetails} />

            <div className={styles.cardInfo}>
                <div className={styles.top}>
                    <Button
                        variant='empty'
                        isEmpty={!name}
                        onClick={redirectToDetails}
                        label={name}
                    />
                    <h4>{priceLabel}</h4>
                </div>
                <div className={styles.details}>
                    <TextWithIcon icon={<EyeIcon />} text={views ?? 0} />
                    <TextWithIcon icon={<HeartIcon />} text={likes ?? 0} />
                </div>
            </div>
        </div>
    );
};
