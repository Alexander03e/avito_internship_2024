import { HttpInstanceFactory } from "common/utils/HttpInstanceFactory"
import { AxiosInstance } from "axios"
import { ORDERS_URL } from './consts';
import { Order, TOrderData } from "common/types/orders";

export class OrderApi {
    private static _instance: OrderApi | null = null
    private _httpInstance: AxiosInstance

    constructor() {
        this._httpInstance = HttpInstanceFactory.getInstance()
    }

    public static getInstance(): OrderApi {
        if (this._instance) return this._instance;

        this._instance = new OrderApi();
        return this._instance;
    }

    public async getAll(params: string): Promise<Order[]> {
        return (await this._httpInstance.get(`${ORDERS_URL}?${params}`)).data
    }

    public async get(id: number): Promise<Order> {
        return (await this._httpInstance.post(`${ORDERS_URL}${id}`)).data
    }

    public async update(id: number, data: Partial<TOrderData>): Promise<Order> {
        return (await this._httpInstance.put(`${ORDERS_URL}${id}`, {
            ...data
        })).data
    }

    public async delete(id: number): Promise<Order> {
        return (await this._httpInstance.delete(`${ORDERS_URL}${id}`)).data
    }
}