import { IAppState } from './types';

export const initialState: IAppState = {
    activeModal: null,
    modalData: null,
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
        currentFilter: null,
        currentPriceSort: null,
    },
};
