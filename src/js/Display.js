export class Display {
  constructor(imageIndex, baseUrl='http://www.depts.ttu.edu/biology/graduation'){
    this.imageIndex = imageIndex;
    this.baseUrl = baseUrl;
  }

  get load() {
    window.addEventListener('DOMContentLoaded', (e) => {
      this.imageList;
    });
  }

  buildImageGrid(json) {

  }

  get imageList(){
    return fetch(`${this.baseUrl}/src/img/${this.imageIndex}`)
            .then(response => response.json())
            .then(json => {
              // this.buildImageGrid(json);
              console.log(json);
            });
  }

  // randomly shuffles an array in n time
  static shuffle(arr) => {
    for (let i = arr.length - 1; i >= 0; i--){
        const j = Math.floor(Math.random() * i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
