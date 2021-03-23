export enum SupportedStorageKeys {
  AlbumEmail = 'AlbumEmail',
  AlbumToken = 'AlbumToken',
}

export const save = <T>(key: SupportedStorageKeys, value: T): void => {
  if (typeof window !== 'undefined') {
    const parsedValue = JSON.stringify(value);
    window.localStorage.setItem(key, parsedValue);
  }
};

export const retrieve = (key: SupportedStorageKeys): any => {
  if (typeof window !== 'undefined') {
    const response = window.localStorage.getItem(key);
    return response ? JSON.parse(response) : null;
  }
};

export const removeEntry = (key: SupportedStorageKeys): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
};
