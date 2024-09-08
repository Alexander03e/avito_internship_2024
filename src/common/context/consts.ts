import { IAppState } from "./types";

export const initialState: IAppState = {
    activeModal: null,
    searchAdValue: null,
    currentAdPage: 0,
    currentAdLimit: 10
};