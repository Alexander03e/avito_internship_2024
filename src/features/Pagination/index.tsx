import React, { useState, useEffect, ChangeEventHandler } from 'react';
import styles from './pagination.module.scss';
import { Button } from 'common/components/ui';
import { ELEMENTS_COUNT, PAGINATION_OPTIONS } from './consts';
import map from 'lodash/map';
import { useAppContext } from 'common/context/hooks';

type Props = {
    itemsPerPage: number;
    onChange: (page: number) => void;
    currentItemsLength: number;
};

export const Pagination = ({ itemsPerPage, onChange, currentItemsLength }: Props) => {
    const {
        updateAppState,
        state: { currentAdLimit, currentAdPage },
    } = useAppContext();

    const prevBlock = currentAdPage === 0;
    const nextBlock = currentItemsLength < currentAdLimit;

    const nextPage = () => {
        if (nextBlock) return;

        updateAppState({ currentAdPage: currentAdPage + 1 });
    };

    const prevPage = () => {
        if (prevBlock) return;
        updateAppState({ currentAdPage: currentAdPage - 1 });
    };

    const handleItemsPerPageChange: ChangeEventHandler<HTMLSelectElement> = event => {
        const { value } = event.target;

        updateAppState({ currentAdLimit: +value, currentAdPage: 0 });
    };

    return (
        <div className={styles.pagination}>
            <div className={styles.navigation}>
                <Button disabled={prevBlock} label='Назад' variant='empty' onClick={prevPage} />
                <span>{currentAdPage + 1}</span>
                <Button disabled={nextBlock} label='Вперед' variant='empty' onClick={nextPage} />
            </div>
            <div className={styles.items}>
                <label htmlFor='pagination'>{ELEMENTS_COUNT}</label>
                <select id='pagination' value={currentAdLimit} onChange={handleItemsPerPageChange}>
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
