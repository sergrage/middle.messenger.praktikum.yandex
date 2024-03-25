function cloneDeep<T extends object = object>(obj: T) {
  // Код здесь
  return JSON.parse(JSON.stringify(obj));
}

export default cloneDeep;
