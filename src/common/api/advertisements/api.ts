import { HttpInstanceFactory } from "common/utils/HttpInstanceFactory"
import { AxiosInstance } from "axios"
import { ADVERTISEMENTS_URL } from './consts';
import { Advertisment, TAdvertismentData } from "common/types/advertisement";

export class AdvertisementsApi {
    private static _instance: AdvertisementsApi | null = null
    private _httpInstance: AxiosInstance

    constructor() {
        this._httpInstance = HttpInstanceFactory.getInstance()
    }

    public static getInstance(): AdvertisementsApi {
        if (this._instance) return this._instance;

        this._instance = new AdvertisementsApi();
        return this._instance;
    }

    public async getAll(params: string): Promise<Advertisment[]> {
        return (await this._httpInstance.get(`${ADVERTISEMENTS_URL}?${params}`)).data
    }

    public async create(data: TAdvertismentData): Promise<Advertisment> {
        return (await this._httpInstance.post(`${ADVERTISEMENTS_URL}`, {
            ...data
        })).data
    } 

    public async get(id: number): Promise<Advertisment> {
        return (await this._httpInstance.post(`${ADVERTISEMENTS_URL}${id}`)).data
    }

    public async update(id: number, data: Partial<TAdvertismentData>): Promise<Advertisment> {
        return (await this._httpInstance.patch(`${ADVERTISEMENTS_URL}${id}`, {
            ...data
        })).data
    }

    public async delete(id: number): Promise<Advertisment> {
        return (await this._httpInstance.delete(`${ADVERTISEMENTS_URL}${id}`)).data
    }
}