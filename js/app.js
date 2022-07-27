'use strict';

//  GLOBAL VARIABLES
let totalVotes = 25;
let myProduct = [];

//  DOM REFERENCES
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let canvasElem = document.getElementById('my-chart');

// GETTING DATA OUT OF LOCAL STORAGE

let retrProducts = localStorage.getItem('products');
let parsedProducts = JSON.parse(retrProducts);

// CONSTRUCTOR FUNCTION FOR PRODUCTS

function Product(name, photoExtension = 'jpg') {
  this.name = name;
  this.photo = `img/${name}.${photoExtension}`;
  this.views = 0;
  this.votes = 0;

  myProduct.push(this);
}


//  OBJECT CREATION
if (retrProducts) {
  myProduct = parsedProducts;
} else {

  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
}


// HELPER FUNCTIONS

function randomIndexGenerator() {
  return Math.floor(Math.random() * myProduct.length);
}

let productIndexArr = [];

function renderImgs() {
  while (productIndexArr.length < 6) {
    let randomNum = randomIndexGenerator();
    if (!productIndexArr.includes(randomNum)) {
      productIndexArr.push(randomNum);
    }
  }

  let imgOneIndex = productIndexArr.shift();
  let imgTwoIndex = productIndexArr.shift();
  let imgThreeIndex = productIndexArr.shift();

  imgOne.src = myProduct[imgOneIndex].photo;
  imgOne.alt = myProduct[imgOneIndex].name;
  imgOne.name = myProduct[imgOneIndex].name;
  myProduct[imgOneIndex].views++;
  imgTwo.src = myProduct[imgTwoIndex].photo;
  imgTwo.alt = myProduct[imgTwoIndex].name;
  imgTwo.name = myProduct[imgTwoIndex].name;
  myProduct[imgTwoIndex].views++;
  imgThree.src = myProduct[imgThreeIndex].photo;
  imgThree.alt = myProduct[imgThreeIndex].name;
  imgThree.name = myProduct[imgThreeIndex].name;
  myProduct[imgThreeIndex].views++;
}

renderImgs();

// EVENT HANDLERS

function handleClick(event) {
  let imgClicked = event.target.name;
  console.dir(imgClicked);

  for (let i = 0; i < myProduct.length; i++) {
    if (imgClicked === myProduct[i].name) {
      myProduct[i].votes++;
    }
  }
  totalVotes--;

  renderImgs();

  if (totalVotes === 0) {
    // STARTING LOCAL STORAGE/ STRINGIFY THE DATA
    let stringifiedProducts = JSON.stringify(myProduct);

    // ADDING TO LOCAL STORAGE
    localStorage.setItem('products', stringifiedProducts);
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults() {
  if (totalVotes === 0) {
    renderChart();
    resultBtn.removeEventListener('click', handleShowResults);
  }
}

function renderChart() {

  // CREATING EMPTY ARRAYS TO POPULATE WITH THE INFO FOR the CHART

  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  // THIS FOR LOOP TAKES ALL THE DATA AFTER THE VOTING ROUNDS ARE COMPLETED AND POPULATES THE ARRAYS
  for (let i = 0; i < myProduct.length; i++) {
    prodNames.push(myProduct[i].name);
    prodViews.push(myProduct[i].views);
    prodVotes.push(myProduct[i].votes);
  }

  // CHART.JS Config
  let theChart = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# of Votes',
        data: prodVotes,
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: prodViews,
        backgroundColor: [
          'white'
        ],
        borderColor: [
          '#ff0000',
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // CONSTRUCTOR CALL TO RENDER THE CHART
  new Chart(canvasElem, theChart);

}

// EVENT LISTENERS
imgContainer.addEventListener('click', handleClick);
resultBtn.addEventListener('click', handleShowResults);
