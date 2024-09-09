import { IAppState } from "./types";

export const initialState: IAppState = {
    activeModal: null,
    searchAdValue: null,
    currentPage: 0,
    currentLimit: 10,
    currentAdOrder: null,
    currentAdSort: null,
    adData: null
};