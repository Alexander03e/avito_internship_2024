import { LabeledInput } from 'common/components/ui/LabeledInput';
import { Modal } from 'common/components/ui/Modal';
import { ReactElement, useState } from 'react';
import styles from './create-ad.module.scss';
import { INPUT_ERROR, TITLE } from './const';
import { Button } from 'common/components/ui';
import { useCreateAd } from './hooks/useCreateAd';
import { useForm } from 'react-hook-form';
import { IFormState } from './types';
import { useAppContext } from 'common/context/hooks';
import { useUpdateAd } from './hooks/useUpdateAd';

export const CreateAdModal = (): ReactElement => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const {
        updateAppState,
        state: { adData, activeModal },
    } = useAppContext();

    const { mutateAsync: createAd } = useCreateAd();
    const { mutateAsync: editAd } = useUpdateAd();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm<IFormState>({
        mode: 'onChange',
        defaultValues: {
            description: adData?.description,
            imageUrl: adData?.imageUrl,
            name: adData?.name,
            price: adData?.price,
        },
    });

    const title = adData ? TITLE.UPDATE : TITLE.CREATE;

    const onSubmit = async () => {
        const { price, ...values } = getValues();
        setIsLoading(true);
        try {
            if (activeModal === '#create_ad') {
                await createAd({ price: Number(price), ...values });
            }
            if (activeModal === '#edit_ad' && adData) {
                await editAd({ id: Number(adData?.id), data: { price: Number(price), ...values } });
            }

            updateAppState({ activeModal: null });
            reset();
        } catch (e) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.wrapper}>
                    <h3>{title}</h3>
                    {isError && <span className={styles.error}>Ошибка при запросе</span>}
                    <LabeledInput
                        placeholder='http://example.com'
                        label='Ссылка на картинку'
                        registerInput={{ ...register('imageUrl') }}
                        error={errors.imageUrl?.message}
                    />
                    <LabeledInput
                        placeholder='Введите название'
                        label='Название'
                        registerInput={{ ...register('name', { required: INPUT_ERROR }) }}
                        error={errors.name?.message}
                    />
                    <LabeledInput
                        variant='textarea'
                        placeholder='Введите описание'
                        label='Описание'
                        registerInput={{ ...register('description') }}
                        error={errors.description?.message}
                    />
                    <LabeledInput
                        placeholder='Введите стоимость'
                        label='Стоимость'
                        registerInput={{ ...register('price') }}
                        error={errors.price?.message}
                        type='number'
                    />
                </div>
                <Button disabled={isLoading} className={styles.btn} label='Сохранить' />
            </form>
        </Modal>
    );
};
