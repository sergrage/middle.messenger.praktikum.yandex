const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

interface OptionsI {
    method?: string,
    headers? : Record<string, unknown>
    timeout? : number | null,
    data?: Record<string, string>
}

function queryStringify(urlPart: Record<string, string>) {
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
  get = (url: string, options: OptionsI = {
    timeout: null,
  }) => {
    const query = options.data ? queryStringify(options.data) : '';
    return this.request(url + query, {
      ...options,
      method: METHODS.GET,
    }, options.timeout);
  };

  // PUT, POST, DELETE
  POST = (url: string, options: OptionsI = {
    timeout: null,
  }) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  PUT = (url: string, options: OptionsI = {
    timeout: null,
  }) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  DELETE = (url: string, options: OptionsI = {
    timeout: null,
  }) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url: string, options: OptionsI, timeout?: number | null) => {
    const { method, data, headers } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

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

      xhr.onload = () => {
        resolve(xhr);
      };
      xhr.ontimeout = () => {
        reject();
      };
      xhr.onerror = reject;

      if (method === METHODS.GET && data) {
        xhr.send(queryStringify(data));
      } else if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
