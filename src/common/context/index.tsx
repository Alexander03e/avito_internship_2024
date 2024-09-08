import { PropsWithChildren, ReactElement, useMemo, useState } from 'react';
import { IAppContext, IAppState } from './types';
import { initialState } from './consts';
import { AppContext } from './hooks';

export const AppContextProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [appState, setAppState] = useState<IAppState>(initialState);

    /** Обновление стейта приложения */
    const updateAppState = (newAppData: Partial<IAppState>): void => {
        setAppState({ ...appState, ...newAppData });
    };

    /** Мемоизированное состояние */
    const memorizedData = useMemo(
        (): IAppContext => ({
            state: appState,
            updateAppState,
        }),
        [appState],
    );

    return <AppContext.Provider value={memorizedData}>{children}</AppContext.Provider>;
};
