import { ChangeEventHandler } from 'react';
import styles from './pagination.module.scss';
import { Button } from 'common/components/ui';
import { ELEMENTS_COUNT, PAGINATION_OPTIONS } from './consts';
import map from 'lodash/map';
import { useAppContext } from 'common/context/hooks';

type Props = {
    hasNextPage?: boolean;
};

export const Pagination = ({ hasNextPage }: Props) => {
    const {
        updateAppState,
        state: { currentLimit, currentPage },
    } = useAppContext();

    const prevBlock = currentPage === 0;

    const nextBlock = !hasNextPage;

    const nextPage = () => {
        if (nextBlock) return;

        updateAppState({ currentPage: currentPage + 1 });
    };

    const prevPage = () => {
        if (prevBlock) return;
        updateAppState({ currentPage: currentPage - 1 });
    };

    const handleItemsPerPageChange: ChangeEventHandler<HTMLSelectElement> = event => {
        const { value } = event.target;

        updateAppState({ currentLimit: +value, currentPage: 0 });
    };

    return (
        <div className={styles.pagination}>
            <div className={styles.navigation}>
                <Button disabled={prevBlock} label='Назад' variant='empty' onClick={prevPage} />
                <span>{currentPage + 1}</span>
                <Button disabled={nextBlock} label='Вперед' variant='empty' onClick={nextPage} />
            </div>
            <div className={styles.items}>
                <label htmlFor='pagination'>{ELEMENTS_COUNT}</label>
                <select id='pagination' value={currentLimit} onChange={handleItemsPerPageChange}>
                    {map(PAGINATION_OPTIONS, option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
