import { createContext, useContext } from "react";
import { IAppContext } from "./types";

export const AppContext = createContext<IAppContext | undefined>(undefined);

/** Хук для использования контекста. */
export const useAppContext = (): IAppContext => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext должен быть в AppContextProvider!");
    }

    return context;
};