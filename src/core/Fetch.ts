export interface RequestOptions {
    timeout?: number;
    data?: object;
    headers?: Record<string, string>;
}

function queryStringify(data = {}) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    let arr = [...Object.entries(data)];
    return (data) ? arr.reduce((prev, item, index) => {
        return prev += `${item[0]}=${item[1]}${(index !== arr.length - 1) ? '&' : ''}`;
    }, '?') : '';
}

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type Options = {
    method: string;
    timeout?: number;
    data?: any;
    headers?: { [key: string]: string };
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class Fetch {
    get(url: string | URL, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url + queryStringify(options.data), {...options, method: METHODS.GET}, options.timeout);
    }

    post(url: string | URL, options: Options) {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    }

    put(url: string | URL, options: Options) {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    }

    delete(url: string | URL, options: Options) {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    }

    request(url: string | URL, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
        const {method, headers = {}, data} = options;
        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                resolve(xhr);
            };
            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as Document);
            }
        });
    }
}

