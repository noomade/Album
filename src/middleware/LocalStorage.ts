export enum SupportedStorageKeys {
  AlbumEmail = 'AlbumEmail',
  AlbumToken = 'AlbumToken',
}

export const save = <T>(key: SupportedStorageKeys, value: T): void => {
  const parsedValue = JSON.stringify(value);
  window.localStorage.setItem(key, parsedValue);
};

export const retrieve = <T>(key: SupportedStorageKeys): T => {
  const response = window.localStorage.getItem(key);
  return response ? JSON.parse(response) : null;
};

export const removeEntry = (key: SupportedStorageKeys): void => {
  window.localStorage.removeItem(key);
};
