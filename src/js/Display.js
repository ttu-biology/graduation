export class Display {
  /****************************************************************************
   *  This class fetches a json file of arrays for  of all portrait (500x889) 
   *  and landscape (889x500) images which are to be displayed on the graduation
   *  page. On DOMContentLoaded, this list is fetched and through a callback
   *  the buildImgGrid method is called which orchestrates building the DOM
   *  for all of the images. It also randomizes the images selected so that on
   *  each reload of the page, a different set of images appear in different
   *  locations across the grid.
   *
   *  IMPORTANT: To have a completely retangular display without missing or
   *  uneven elements at the end, you must specify the filename of a minimum
   *  ratio of FOUR PORTRAIT images to TEN LANDSCAPE images in the imgIndex.
   * *************************************************************************/
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

  get buildRow() {
    const row = document.createElement('div');
    row.classList.add('grid-row');
    return row;
  }

  get buildGridColumn() {
    const gridColumn = document.createElement('div');
    gridColumn.classList.add('grid-column');
    return gridColumn;
  }

  buildRow2(gC2ImgArr) {
    // gC2ImgArr = [["l-img1", "l-img2", "p-img3"], ["p-img4", "l-img5", "l-img6"]] 
    const row2 = document.createElement('div');
    row2.classList.add('grid-row-2');

    for(const imageArr of gC2ImgArr){
      const gridColumn2 = this.buildGridColumn2(imageArr);
      row2.appendChild(gridColumn2);
    }
    return row2;
  }

  buildGridColumn2(images) {
    // image = ["l-img1", "l-img2", "p-img3"]
    const gridColumn2 = document.createElement('div');
    gridColumn2.classList.add('grid-column-2');
    
    for(const image of images){
      gridColumn2.appendChild(image);
    }

    return gridColumn2;
  }


  buildImgGrid(json) {
    const main = document.getElementById('main-content');
    const row = this.buildRow;
    const gridColumn = this.buildGridColumn;


    const [portraitImgTags, landscapeImgTags] = this.collectImgTags(json);

    console.table(portraitImgTags.map((tag) => tag.src));
    console.table(landscapeImgTags.map((tag) => tag.src));
    console.log(main);
    console.log(row);
    console.log(gridColumn);

    const row2 = this.buildRow2([portraitImgTags.slice(0,3), portraitImgTags.slice(3,6)]);
    console.log(row2);
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
