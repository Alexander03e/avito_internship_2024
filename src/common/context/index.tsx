import { PropsWithChildren, ReactElement, useCallback, useMemo, useState } from 'react';
import { IAppContext, IAppState } from './types';
import { initialState } from './consts';
import { AppContext } from './hooks';

export const AppContextProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [appState, setAppState] = useState<IAppState>(initialState);

    /** Обновление стейта приложения */
    const updateAppState = useCallback((newAppData: Partial<IAppState>): void => {
        setAppState({ ...appState, ...newAppData });
    }, [appState])

    /** Обновление стейта объявлений */
    const updateAdState = useCallback((newAdState: Partial<IAppState['ad']>): void => {
        setAppState({...appState, ad: {...appState.ad, ...newAdState}})
    }, [appState])

    const updateOrderState = useCallback((newAdState: Partial<IAppState['order']>): void => {
        setAppState({...appState, order: {...appState.order, ...newAdState}})
    },[appState])

    /** Мемоизированное состояние */
    const memorizedData = useMemo(
        (): IAppContext => ({
            state: appState,
            updateOrderState,
            updateAdState,
            updateAppState,
        }),
        [appState, updateOrderState, updateAdState, updateAppState],
    );

    return <AppContext.Provider value={memorizedData}>{children}</AppContext.Provider>;
};
