import { ChangeEventHandler, ReactElement } from 'react';
import styles from './select.module.scss';
import map from 'lodash/map';

type Props = {
    items: {
        value: string | number | null;
        name: string;
    }[];
    title: string;
    currentValue: string | number | null;
    onChange: ChangeEventHandler<HTMLSelectElement>
};

export const Select = ({ items, title, currentValue, onChange }: Props): ReactElement => {
    const data = [
        {
            name: "Не выбрано", 
            value: null
        },
        ...items
    ]
    return (
        <div className={styles.wrapper}>
            <p>{title}</p>
            <select value={currentValue ?? ''} onChange={onChange}>
                {map(data, item => (
                    <option key={item.value} value={item.value ?? ''}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};