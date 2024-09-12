import { ReactElement } from 'react';
import styles from './ad-filter.module.scss';
import { useForm } from 'react-hook-form';
import { IFilterState } from './ad-filter.types';
import { Button } from 'common/components/ui';
import { LabeledInput } from 'common/components/ui/LabeledInput';
import { useAppContext } from 'common/context/hooks';
import { inputConfigFrom, inputConfigTo } from './consts';
import { useAdStateSelector } from 'common/context/selectors';

export const AdFilter = (): ReactElement => {
    const {
        updateAdState,
        updateAppState,
        state: { openFilters },
    } = useAppContext();
    const { currentFilter } = useAdStateSelector();
    const { register, handleSubmit, watch, reset } = useForm<IFilterState>({
        defaultValues: {
            likesGte: currentFilter?.likes.from ?? undefined,
            likesLte: currentFilter?.likes.to ?? undefined,
            viewsGte: currentFilter?.views.from ?? undefined,
            viewsLte: currentFilter?.views.to ?? undefined,
            priceGte: currentFilter?.price.from ?? undefined,
            priceLte: currentFilter?.price.to ?? undefined,
        },
    });

    const likesGte = watch('likesGte');
    const priceGte = watch('priceGte');
    const viewsGte = watch('viewsGte');

    const handleSubmitForm = (data: IFilterState) => {
        const { likesGte, likesLte, priceGte, priceLte, viewsGte, viewsLte } = data;

        const likes = {
            from: likesGte,
            to: likesLte,
        };
        const price = {
            from: priceGte,
            to: priceLte,
        };
        const views = {
            from: viewsGte,
            to: viewsLte,
        };

        updateAdState({ currentFilter: { likes, price, views } });
    };

    const visibleFiltersHandler = () => {
        updateAppState({ openFilters: !openFilters });
    };

    const resetFilters = () => {
        updateAdState({ currentFilter: null })
        reset()
    }

    if (!openFilters)
        return (
            <Button
                className={styles.toggleBtn}
                variant='empty'
                onClick={visibleFiltersHandler}
                label='Показать фильтры'
            />
        );

    return (
        <>
            <div className={styles.headingBtns}>
                <Button
                    className={styles.toggleBtn}
                    variant='empty'
                    onClick={visibleFiltersHandler}
                    label='Скрыть фильтры'
                />
                <Button
                    className={styles.toggleBtn}
                    variant='warn-empty'
                    onClick={resetFilters}
                    label='Сбросить фильтры'
                />
            </div>
            <form className={styles.wrapper} onSubmit={handleSubmit(handleSubmitForm)}>
                <label>
                    <span>Количество лайков</span>
                    <fieldset>
                        <LabeledInput
                            {...inputConfigFrom}
                            registerInput={{ ...register('likesGte') }}
                        />
                        <LabeledInput
                            min={likesGte}
                            {...inputConfigTo}
                            registerInput={{ ...register('likesLte') }}
                        />
                    </fieldset>
                </label>
                <label>
                    <span>Цена</span>
                    <fieldset>
                        <LabeledInput
                            {...inputConfigFrom}
                            registerInput={{ ...register('priceGte') }}
                        />
                        <LabeledInput
                            min={priceGte}
                            {...inputConfigTo}
                            registerInput={{ ...register('priceLte') }}
                        />
                    </fieldset>
                </label>
                <label>
                    <span>Просмотры</span>
                    <fieldset>
                        <LabeledInput
                            {...inputConfigFrom}
                            registerInput={{ ...register('viewsGte') }}
                        />
                        <LabeledInput
                            min={viewsGte}
                            {...inputConfigTo}
                            registerInput={{ ...register('viewsLte') }}
                        />
                    </fieldset>
                </label>
                <Button type='submit' label='Применить фильтры' />
            </form>
        </>
    );
};
