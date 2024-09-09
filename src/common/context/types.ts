import { Advertisment } from "common/types/advertisement";

/** Интерфейс стейта приложения */
export interface IAppState {
    activeModal: TAppModals | null
    searchAdValue: string | null;
    currentPage: number
    currentLimit: number
    adData: Partial<Advertisment> | null
    currentAdSort: string | null
    currentAdOrder: string | null
}

/** Интерфейс контекста */
export interface IAppContext {
    state: IAppState
    updateAppState: (data: Partial<IAppState>) => void
}

/** Модальные окна */
export type TAppModals = '#create_ad' | '#all_products' | '#edit_ad'