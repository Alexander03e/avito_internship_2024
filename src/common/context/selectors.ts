import { useAppContext } from './hooks';
import { IAppContext } from './types';

export const useAdStateSelector = (): IAppContext['state']['ad'] => {
    const {
        state: { ad },
    } = useAppContext();

    return ad;
};

export const useOrderStateSelector = (): IAppContext['state']['order'] => {
    const {
        state: { order },
    } = useAppContext();

    return order
};
