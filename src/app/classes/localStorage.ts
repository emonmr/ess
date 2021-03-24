class LocalStorage {
  static get(key: string | null) {
    /**
     * Try to parse the item If fails Return the item itself
     * In case of plain string parse will fail.
     */
    try {
      return JSON.parse(localStorage.getItem(key as string) as string);
    } catch (e) {
      return localStorage.getItem(key as string);
    }
  }

  /**
   * Other types need to be stringed except string
   *
   */
  static set(key: string, item: any): void {
    (typeof item === 'string') ? localStorage.setItem(key, item) : localStorage.setItem(key, JSON.stringify(item));
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export class LocalStorageService {
  static removeItem(key: string): any {
    return LocalStorage.removeItem(key);
  }

  static setItem(key: string, item: any): void {
    LocalStorage.set(key, item);
  }

  static getItem(key: string): any {
    return LocalStorage.get(key);
  }

  static clear() {
    LocalStorage.clear();
  }
}

