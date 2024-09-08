import { SearchInput } from 'common/components/ui';
import { useAppContext } from 'common/context/hooks';
import { LocalStorage } from 'common/utils/storage';
import debounce from 'lodash/debounce';
import { ChangeEventHandler, RefObject, useCallback, useState } from 'react';
import { SEARCH_PLACEHOLDER } from 'widgets/AdvertisementList/consts';
import styles from './search.module.scss';
import { useFocused } from 'common/hooks/useFocused';
import map from 'lodash/map';
import slice from 'lodash/slice';
import size from 'lodash/size';

const storage = LocalStorage.getInstance();

export const Search = () => {
    const [isFocus, inputRef] = useFocused();

    const [value, setValue] = useState('');
    const { updateAppState } = useAppContext();

    const handleRequest = (value: string) => {
        updateAppState({ searchAdValue: value });
        storage.add('search', value);
    };

    const handleRequestHistory = (value: string) => {
        setValue(value);
        handleRequest(value);
    };

    const debounceFn = useCallback(debounce(handleRequest, 1000), []);

    const onChange: ChangeEventHandler<HTMLInputElement> = e => {
        const { value } = e.target;

        setValue(value);
        debounceFn(value);
    };

    const historySearch = storage.get('search');

    return (
        <div className={styles.wrapper}>
            <SearchInput
                ref={inputRef as RefObject<HTMLInputElement>}
                value={value}
                onChange={onChange}
                placeholder={SEARCH_PLACEHOLDER}
            />
            {isFocus && !Boolean(value) && size(historySearch) !== 0 && (
                <div className={styles.searchHistory}>
                    {map(slice(historySearch.reverse(), 0, 10), (item, index) => (
                        <div
                            key={index}
                            onMouseDown={handleRequestHistory.bind(this, item)}
                            className={styles.historyItem}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
