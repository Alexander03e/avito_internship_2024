export type Image = {
    /* Уникальный идентификатор. */
    id: number;
    /* Ссылка. */
    url: string;
    /* Название. */
    name: string;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>