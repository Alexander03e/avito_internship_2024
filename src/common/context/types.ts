import { Advertisment } from 'common/types/advertisement';
import { Filters } from 'common/types/filters';

/** Интерфейс стейта приложения */
export interface IAppState {
    activeModal: TAppModals | null;
    modalData: unknown | null;
    openFilters: boolean;

    ad: {
        adData: Partial<Advertisment> | null;
        currentPage: number;
        currentLimit: number;
        searchAdValue: string | null;
        currentFilter: Filters | null;
    };

    order: {
        adId: string | null;
        currentFilter: string | null;
        currentPriceSort: string | null;
    };
}

/** Интерфейс контекста */
export interface IAppContext {
    state: IAppState;
    updateAppState: (data: Partial<IAppState>) => void;
    updateAdState: (data: Partial<IAppState['ad']>) => void;
    updateOrderState: (data: Partial<IAppState['order']>) => void;
}

/** Модальные окна */
export type TAppModals = '#create_ad' | '#all_products' | '#edit_ad';
