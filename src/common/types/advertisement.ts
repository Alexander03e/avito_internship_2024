import { PartialBy } from "./common";

export type Advertisment = {
    /* Уникальный идентификатор. */
    id: string;
    /* Название. */
    name: string;
    /* Описание. */
    description?: string;
    /* Цена. */
    price: number;
    /* Дата и время создания. */
    createdAt: string;
    /* Количество просмотров. */
    views: number;
    /* Количество лайков. */
    likes: number;
    /* Ссылка на изображение. */
    imageUrl?: string;
}

export type TAdvertismentData = PartialBy<Omit<Advertisment, 'id'>, 'views' | 'likes' | 'createdAt'>
