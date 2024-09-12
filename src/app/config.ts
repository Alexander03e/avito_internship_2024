/** Расширение базового типа параметров */
URLSearchParams.prototype.appendIfExists = function (
    key: string,
    value: string | null | undefined,
) {
    if (value) {
        this.append(key, value);
    }
};

export {};
