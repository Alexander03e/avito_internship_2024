/** Интерфейс стейта приложения */
export interface IAppState {
    activeModal: TAppModals | null
    searchAdValue: string | null;
}

/** Интерфейс контекста */
export interface IAppContext {
    state: IAppState
    updateAppState: (data: Partial<IAppState>) => void
}

/** Модальные окна */
export type TAppModals = '#create_ad' | '#all_products'