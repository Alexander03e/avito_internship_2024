import { IAppState } from './types';

export const initialState: IAppState = {
    activeModal: null,
    modalData: null,
    openFilters: false,

    ad: {
        searchAdValue: null,
        currentPage: 0,
        currentLimit: 10,
        adData: null,
        currentFilter: {
            price: {
                from: null,
                to: null,
            },
            likes: {
                from: null,
                to: null,
            },
            views: {
                from: null,
                to: null,
            },
        },
    },

    order: {
        adId: null,
        currentFilter: null,
        currentPriceSort: null,
    },
};
