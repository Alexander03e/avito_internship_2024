type TStorageKeys = 'search'

export class LocalStorage {
    private static _instance: LocalStorage | null

    public static getInstance(): LocalStorage {
        if (this._instance) return this._instance;

        this._instance = new LocalStorage();
        return this._instance;
    }

    add(key: TStorageKeys, value: string): void {
        if (!value) return;
    
        const prevValues = localStorage.getItem(key);
    
        let arrValues = [];
    
        if (prevValues) {
            arrValues = JSON.parse(prevValues);
        }
    
        const index = arrValues.indexOf(value);
        if (index !== -1) {
            arrValues.splice(index, 1); 
        }
    
        arrValues.push(value);
    
        localStorage.setItem(key, JSON.stringify(arrValues));
    }

    remove(key: TStorageKeys) {
        localStorage.removeItem(key)
    }

    get(key: TStorageKeys): string[] {
        const values = localStorage.getItem(key);
    
        if (values) {
            return JSON.parse(values);
        }
    
        return []
    }
}