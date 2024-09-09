import { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './advertisement-detail.module.scss';
import { useAdvertisement } from './hooks/queries';
import { Image } from 'common/components/ui/Image';
import { formatDate } from 'common/utils/formateDate';
import { Button, TextWithIcon } from 'common/components/ui';
import HeartIcon from 'assets/icons/heart.svg?react';
import EyeIcon from 'assets/icons/eye.svg?react';
import { useAppContext } from 'common/context/hooks';

export const AdvertisementDetail = (): ReactElement => {
    const { id } = useParams();
    const { updateAppState } = useAppContext();
    const { data } = useAdvertisement({ id: Number(id) });

    const formattedDate = formatDate(data?.createdAt);

    const editButtonHandler = () => {
        updateAppState({ activeModal: '#edit_ad' });
    };

    useEffect(() => {
        if (!data) return;
        updateAppState({ adData: data });

        return () => {
            updateAppState({ adData: null });
        };
    }, [data]);

    return (
        <div className={styles.wrapper}>
            <Image imageUrl={data?.imageUrl} size='large' />

            <div className={styles.info}>
                <h2>{data?.name ?? 'Без названия'}</h2>
                <h2 className={styles.price}>{data?.price ?? 'Цена не указаана'} ₽</h2>
                {data?.description && <p>{data?.description}</p>}
                {data?.createdAt && <p className={styles.createdAt}>Создано: {formattedDate}</p>}

                <div className={styles.details}>
                    <TextWithIcon icon={<EyeIcon />} text={`${data?.views ?? 0} просмотров`} />
                    <TextWithIcon icon={<HeartIcon />} text={`${data?.likes ?? 0} лайков`} />{' '}
                </div>
                <Button onClick={editButtonHandler} label='Редактировать' />
            </div>
        </div>
    );
};
