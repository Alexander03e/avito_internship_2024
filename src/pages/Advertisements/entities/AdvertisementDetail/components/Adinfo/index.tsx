import { Image } from 'common/components/ui/Image';
import styles from './ad-info.module.scss';
import { Button, TextWithIcon } from 'common/components/ui';
import { useAppContext } from 'common/context/hooks';
import { useRemoveAdvertisement } from '../../hooks/queries';
import { formatDate } from 'common/utils/formateDate';
import HeartIcon from 'assets/icons/heart.svg?react';
import EyeIcon from 'assets/icons/eye.svg?react';
import cn from 'classnames';
import { TEXTS } from './consts';

export const AdInfo = () => {
    const {
        updateAppState,
        state: {
            ad: { adData: data },
        },
    } = useAppContext();

    const { mutate, isSuccess } = useRemoveAdvertisement();

    const formattedDate = formatDate(data?.createdAt);

    const editButtonHandler = () => {
        updateAppState({ activeModal: '#edit_ad' });
    };

    const removeAdHandler = () => {
        mutate(String(data?.id));
    };

    return (
        <div className={cn(styles.wrapper, { [styles.deleted]: isSuccess })}>
            <div className={styles.image}>
                <Image imageUrl={data?.imageUrl} size='large' />
                <div className={styles.buttons}>
                    <Button
                        onClick={editButtonHandler}
                        disabled={isSuccess}
                        label={TEXTS.EDIT}
                    />
                    <Button
                        disabled={isSuccess}
                        variant='warn'
                        label={TEXTS.REMOVE}
                        onClick={removeAdHandler}
                    />
                </div>
            </div>

            <div className={styles.info}>
                {isSuccess && <h2>Объявление удалено</h2>}
                <h2 className={styles.name}>{data?.name ?? TEXTS.NO_NAME}</h2>
                <h2 className={styles.price}>
                    {!data?.price ? TEXTS.NO_PRICE : `${data?.price} ₽`}
                </h2>
                {data?.description && <p>{data?.description}</p>}
                {data?.createdAt && <p className={styles.createdAt}>{TEXTS.CREATED} {formattedDate}</p>}

                <div className={styles.details}>
                    <TextWithIcon icon={<EyeIcon />} text={`${data?.views ?? 0} ${TEXTS.VIEWS}`} />
                    <TextWithIcon icon={<HeartIcon />} text={`${data?.likes ?? 0} ${TEXTS.LIKES}`} />{' '}
                </div>
            </div>
        </div>
    );
};
