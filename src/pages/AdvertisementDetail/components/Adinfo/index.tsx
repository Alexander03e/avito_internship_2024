import { Image } from 'common/components/ui/Image';
import styles from './ad-info.module.scss';
import { Button, TextWithIcon } from 'common/components/ui';
import { useAppContext } from 'common/context/hooks';
import { useRemoveAdvertisement } from 'pages/AdvertisementDetail/hooks/queries';
import { formatDate } from 'common/utils/formateDate';
import HeartIcon from 'assets/icons/heart.svg?react';
import EyeIcon from 'assets/icons/eye.svg?react';
import cn from 'classnames';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const AdInfo = () => {
    const {
        updateAppState,
        state: { adData: data },
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
                        label='Редактировать'
                    />
                    <Button
                        disabled={isSuccess}
                        variant='warn'
                        label='Удалить объявление'
                        onClick={removeAdHandler}
                    />
                </div>
                <ReactQueryDevtools />
            </div>

            <div className={styles.info}>
                {isSuccess && <h2>Объявление удалено</h2>}
                <h2 className={styles.name}>{data?.name ?? 'Без названия'}</h2>
                <h2 className={styles.price}>
                    {!data?.price ? 'Цена не указана' : `${data?.price} ₽`}
                </h2>
                {data?.description && <p>{data?.description}</p>}
                {data?.createdAt && <p className={styles.createdAt}>Создано: {formattedDate}</p>}

                <div className={styles.details}>
                    <TextWithIcon icon={<EyeIcon />} text={`${data?.views ?? 0} просмотров`} />
                    <TextWithIcon icon={<HeartIcon />} text={`${data?.likes ?? 0} лайков`} />{' '}
                </div>
            </div>
        </div>
    );
};
