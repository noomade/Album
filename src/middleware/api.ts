/* eslint-disable class-methods-use-this */

class Api {
  //   login(args) {
  //     return;
  //   }

  //   logout() {
  //     return;
  //   }

  async fetchAlbums() {
    const res = await fetch('https://jsonplaceholder.typicode.com/albums');
    return res.json();
  }

  async fetchPhotos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos');
    return res.json();
  }
}

export default new Api();
