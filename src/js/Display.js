export class Display {
  constructor(imgIndex, baseUrl='http://www.depts.ttu.edu/biology/graduation'){
    this.imgIndex = imgIndex;
    this.imgPath = "src/img";
    this.baseUrl = baseUrl;
  }

  get load() {
    window.addEventListener('DOMContentLoaded', (e) => {
      this.getImgList;
    });
  }

  buildImgTag(filename) {
    const imgTag = document.createElement('img');
    imgTag.src = `${this.imgPath}/${filename}`;

    return imgTag;
  }
  
  collectImgTags(json) {
    const [portraitImg, landscapeImg] = [Display.shuffle(json.portrait), Display.shuffle(json.landscape)];
    const portraitImgTags = portraitImg.map((filename) => this.buildImgTag(filename));
    const landscapeImgTags = landscapeImg.map((filename) => this.buildImgTag(filename));

    return [portraitImgTags, landscapeImgTags];
  }

  buildImgGrid(json) {
    const [portraitImgTags, landscapeImgTags] = this.collectImgTags(json);
    console.table(portraitImgTags.map((tag) => tag.src));
    console.table(landscapeImgTags.map((tag) => tag.src));
  }

  get getImgList(){
    return fetch(`${this.baseUrl}/src/img/${this.imgIndex}`)
            .then(response => response.json())
            .then(json => {
              this.buildImgGrid(json);
            });
  }

  // randomly shuffles an array in n time
  static shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--){
        const j = Math.floor(Math.random() * i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
