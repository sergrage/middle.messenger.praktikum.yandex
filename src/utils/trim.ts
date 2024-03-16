function trim(str: string, symbols: string = '') {
    let result = '';

    const trimed = str.trim().replace(/[^\w\s]/gi, '');

    const charSet = new Set(...symbols);
    for(const char of trimed) {
        if(!charSet.has(char)){
            result += char;
        }
    }
    return result;
}

export default trim;