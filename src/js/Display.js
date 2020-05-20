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
}
