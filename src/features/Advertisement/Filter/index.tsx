import { ReactElement } from 'react';
import styles from './ad-filter.module.scss';
import { useForm } from 'react-hook-form';
import { IFilterState } from './ad-filter.types';
import { Button } from 'common/components/ui';
import { LabeledInput } from 'common/components/ui/LabeledInput';
import { useAppContext } from 'common/context/hooks';

export const AdFilter = (): ReactElement => {
    const { register, handleSubmit, watch } = useForm<IFilterState>();
    
    const { updateAdState } = useAppContext()

    const inputConfigFrom = {
        placeholder: 'от',
        type: 'number',
        label: 'от',
    };

    const inputConfigTo = {
        placeholder: 'до',
        type: 'number',
        label: 'до',
    };

    const likesGte = watch('likesGte')
    const priceGte = watch('priceGte')
    const viewsGte = watch('viewsGte')

    const handleSubmitForm = (data: IFilterState) => {
        const { likesGte, likesLte, priceGte, priceLte, viewsGte, viewsLte} = data

        const likes = {
            from: likesGte,
            to: likesLte
        }
        const price = {
            from: priceGte,
            to: priceLte
        }
        const views = {
            from: viewsGte,
            to: viewsLte
        }
        
        updateAdState({currentFilter: { likes, price, views }})
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit(handleSubmitForm)}>
            <label>
                <span>Количество лайков</span>
                <fieldset>
                    <LabeledInput
                        {...inputConfigFrom}
                        registerInput={{ ...register('likesGte') }}
                    />
                    <LabeledInput min={likesGte} {...inputConfigTo} registerInput={{ ...register('likesLte') }} />
                </fieldset>
            </label>
            <label>
                <span>Цена</span>
                <fieldset>
                    <LabeledInput
                        {...inputConfigFrom}
                        registerInput={{ ...register('priceGte') }}
                    />
                    <LabeledInput min={priceGte} {...inputConfigTo} registerInput={{ ...register('priceLte') }} />
                </fieldset>
            </label>
            <label>
                <span>Просмотры</span>
                <fieldset>
                    <LabeledInput
                        {...inputConfigFrom}
                        registerInput={{ ...register('viewsGte') }}
                    />
                    <LabeledInput min={viewsGte} {...inputConfigTo} registerInput={{ ...register('viewsLte') }} />
                </fieldset>
            </label>
            <Button type='submit' label='Применить фильтры' />
        </form>
    );
};
