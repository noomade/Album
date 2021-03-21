export enum SupportedStorageKeys {
  AlbumEmail = 'AlbumEmail',
  AlbumToken = 'AlbumToken',
}

export const save = <T>(key: SupportedStorageKeys, value: T): void => {
  try {
    const parsedValue = JSON.stringify(value);
    window.localStorage.setItem(key, parsedValue);
  } catch (e) {
    //console.log('ERROR save', e);
  }
};

export const retrieve = <T>(key: SupportedStorageKeys): T => {
  try {
    const response = window.localStorage.getItem(key);
    return response ? JSON.parse(response) : null;
  } catch (e) {
    //console.log('ERROR retrieve', e);
  }
};

export const removeEntry = (key: SupportedStorageKeys): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    //console.log('ERROR removeEntry', e);
  }
};
