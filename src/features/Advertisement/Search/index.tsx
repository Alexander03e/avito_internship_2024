import { Button, SearchInput } from 'common/components/ui';
import { useAppContext } from 'common/context/hooks';
import { LocalStorage } from 'common/utils/storage';
import debounce from 'lodash/debounce';
import { ChangeEventHandler, RefObject, useCallback, useRef, useState } from 'react';
import { SEARCH_PLACEHOLDER } from 'widgets/Advertisement/AdvertisementList/consts';
import styles from './search.module.scss';
import { useFocused } from 'common/hooks/useFocused';
import map from 'lodash/map';
import slice from 'lodash/slice';
import size from 'lodash/size';
import { CLEAR_HISTORY, HISTORY } from './consts';

const storage = LocalStorage.getInstance();

export const Search = () => {
    const [isFocus, inputRef] = useFocused();
    const historyRef = useRef(null);

    const [value, setValue] = useState('');
    const { updateAdState } = useAppContext();

    const handleRequest = (value: string) => {
        const clearedValue = value.trim();

        updateAdState({ searchAdValue: clearedValue });
        storage.add('search', clearedValue);
    };

    const handleRequestHistory = (value: string) => {
        setValue(value);
        handleRequest(value);
    };

    const debounceFn = useCallback(debounce(handleRequest, 500), []);

    const onChange: ChangeEventHandler<HTMLInputElement> = e => {
        const { value } = e.target;
        setValue(value);
        debounceFn(value);
    };

    const historySearch = storage.get('search');

    const deleteElementHandler = (value: string) => {
        storage.removeCurrent('search', value);
    };

    const deleteAll = () => {
        storage.remove('search');
    };

    return (
        <div className={styles.wrapper}>
            <SearchInput
                ref={inputRef as RefObject<HTMLInputElement>}
                value={value}
                onChange={onChange}
                placeholder={SEARCH_PLACEHOLDER}
            />
            {isFocus && !Boolean(value) && size(historySearch) !== 0 && (
                <div ref={historyRef} className={styles.searchHistory}>
                    <div className={styles.historyHeading}>
                        <h5>{HISTORY}</h5>
                        <Button
                            onMouseDown={deleteAll}
                            className={styles.removeAll}
                            label={CLEAR_HISTORY}
                            variant='empty'
                        />
                    </div>
                    {map(slice(historySearch.reverse(), 0, 10), (item, index) => (
                        <div key={index} className={styles.historyItem}>
                            <span onMouseDown={handleRequestHistory.bind(this, item)}>{item}</span>
                            <Button
                                variant='empty'
                                className={styles.removeBtn}
                                onMouseDown={deleteElementHandler.bind(this, item)}
                                label='Удалить'
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
