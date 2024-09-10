import { Advertisment } from "common/types/advertisement";

/** Интерфейс стейта приложения */
export interface IAppState {
    activeModal: TAppModals | null
    modalData: unknown | null
    
    ad: {
        adData: Partial<Advertisment> | null
        currentPage: number
        currentLimit: number
        searchAdValue: string | null;
        currentAdSort: string | null
        currentAdOrder: string | null
    }

    order: {
        currentFilter: string | null
        currentSort: string | null
    }
}

/** Интерфейс контекста */
export interface IAppContext {
    state: IAppState
    updateAppState: (data: Partial<IAppState>) => void
    updateAdState: (data: Partial<IAppState['ad']>) => void
    updateOrderState: (data: Partial<IAppState['order']>) => void
}

/** Модальные окна */
export type TAppModals = '#create_ad' | '#all_products' | '#edit_ad'