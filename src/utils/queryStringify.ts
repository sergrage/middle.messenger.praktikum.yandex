type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed): string | never {
    let result = '';

    if(!isPlainObject(data)) {
        throw new Error('input must be an object');
    }

    recursion(data, false);

    function recursion(data: StringIndexed, inner: boolean) {
        const keysArr = Object.keys(data);

        keysArr.forEach(key => {
            const dataValue = data[key];

            if(!Array.isArray(dataValue) && !isPlainObject(dataValue)) {
                result += `${key}=${dataValue}&`;
            }

            if(Array.isArray(dataValue)) {
                for(let index = 0; index < dataValue.length; index++) {
                    result += `${key}[${index}]=${dataValue[index]}&`;
                }
            }

            if(isPlainObject(dataValue)) {
                for(const innerKey of Object.keys(dataValue)) {
                    const innerValue = dataValue[innerKey];
                    if(!isPlainObject(innerValue)) {
                        if(inner) {
                            result += `[${key}][${innerKey}]=${innerValue}&`;
                        } else {
                            result += `${key}[${innerKey}]=${innerValue}&`;
                        }

                    } else {
                        result += `${key}`
                        recursion(dataValue, true)
                    }
                }
            }
        })
    }

    return result.slice(0,-1);
}

function isPlainObject(value: unknown): boolean {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

export default queryStringify