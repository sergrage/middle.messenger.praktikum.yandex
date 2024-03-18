const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

interface OptionsI {
    method?: string,
    headers?: Record<string, unknown>
    timeout?: number | null,
    data?: Record<string, unknown>
}

type httpMethodType = (url: string, options?: OptionsI) => Promise<unknown>;

function queryStringify(urlPart: { [key: string]: unknown; } = {}) {
  let result = '';
  let char = '?';
  if (Object.keys(urlPart).length === 0) {
    return result;
  }
  let isFirst = true;
  // Можно делать трансформацию GET-параметров в отдельной функции
  for (const [key, value] of Object.entries(urlPart)) {
    if (!isFirst) {
      char = '&';
    }
    result += `${char}${key}=${value}`;
    isFirst = false;
  }
  return result;
}

export default class HTTPTransport {
  get:httpMethodType = (url, options) => {
    const query = options?.data ? queryStringify(options.data) : '';
    return this.request(url + query, {
      ...options,
      method: METHODS.GET,
    }, options?.timeout);
  };

  // PUT, POST, DELETE
  POST: httpMethodType = (url, options) => this.request(url, { ...options, method: METHODS.POST }, options?.timeout);

  PUT: httpMethodType = (url, options) => this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);

  DELETE: httpMethodType = (url, options) => this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);

  request = (url: string, options: OptionsI, timeout?: number | null) => {
    const { method, data, headers } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          if (typeof value === 'string') {
            xhr.setRequestHeader(key, value);
          }
        }
      }

      if (typeof method === 'string') {
        xhr.open(method, url);
      }

      if (timeout) {
        xhr.timeout = timeout;
      }

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      xhr.onload = () => {
        try {
          resolve(JSON.parse(xhr.response));
        } catch {
          resolve(xhr.response);
        }
      };

      if (method === METHODS.GET && data) {
        xhr.send(queryStringify(data));
      } else if (!data) {
        xhr.send();
      } else if (data) {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        }
      }
    });
  };
}
