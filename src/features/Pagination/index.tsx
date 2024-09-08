import React, { useState, useEffect, ChangeEventHandler } from 'react';
import styles from './pagination.module.scss';
import { Button } from 'common/components/ui';
import { PAGINATION_OPTIONS } from './consts';
import map from 'lodash/map';

type Props = {
    itemsPerPage: number;
    onChange: (page: number) => void;
};

export const Pagination = ({ itemsPerPage, onChange }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentOption, setCurrentOption] = useState(10);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onChange(page);
    };

    const handleItemsPerPageChange: ChangeEventHandler<HTMLSelectElement> = event => {
        setCurrentOption(+event.target.value);
        setCurrentPage(1);
        onChange(1);
    };

    return (
        <div className={styles.pagination}>
            <div className={styles.navigation}>
                <Button label='Назад' variant='empty' />
                <span>{currentPage}</span>
                <Button label='Вперед' variant='empty' />
            </div>
            <div className={styles.items}>
                <label htmlFor='pagination'>Количество элементов:</label>
                <select id='pagination' value={currentOption} onChange={handleItemsPerPageChange}>
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
