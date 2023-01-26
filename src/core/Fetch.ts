export interface RequestOptions {
    timeout?: number;
    data?: object;
    headers?: Record<string, string>;
}

function queryStringify(data = {}) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const arr = [...Object.entries(data)];
    return (data) ? arr.reduce((prev, item, index) => {
        return prev += `${item[0]}=${item[1]}${(index !== arr.length - 1) ? '&' : ''}`;
    }, '?') : '';
}

enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type Options = {
    method: string;
    timeout?: number;
    data?: object | string;
    headers?: { [key: string]: string };
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

class Fetch {
    get: HTTPMethod = (url, options = {}) => {
        return this.request(url + queryStringify(options.data), {...options, method: Methods.GET}, options.timeout);
    }

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: Methods.POST}, options.timeout);
    }

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: Methods.PUT}, options.timeout);
    }

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: Methods.DELETE}, options.timeout);
    }

    private request(url: string | URL, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
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
            xhr.withCredentials = true;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            if (method === Methods.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as Document);
            }
        });
    }
}

export default new Fetch();
