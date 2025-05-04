export default class Loader {
    static loadJSON(url) {
      return fetch(url).then(res => res.json());
    }
    
    static loadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    }
    
    static loadShader(url) {
      return fetch(url).then(res => res.text());
    }
  }