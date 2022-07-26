'use strict';

// ******** GLOBAL VARIABLES **************
let totalVotes = 25;
let myProduct = [];

// ********* DOM REFERENCES ****************
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');

// ********* CONSTRUCTOR FUNCTION *************

function Product(name, photoExtension = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${photoExtension}`;
  this.views = 0;
  this.votes = 0;

  myProduct.push(this);
}


// ********* OBJECT CREATION ******************
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


// *********** HELPER FUNCTIONS ***************

function randomIndexGenerator(){
  return Math.floor(Math.random() * myProduct.length);
}

function renderImgs(){
  let imgOneIndex = randomIndexGenerator();
  let imgTwoIndex = randomIndexGenerator();
  let imgThreeIndex = randomIndexGenerator();

  // random generator
  while(imgOneIndex === imgTwoIndex || imgTwoIndex === imgThreeIndex || imgOneIndex === imgThreeIndex){
    imgTwoIndex = randomIndexGenerator();
    imgThreeIndex = randomIndexGenerator();
  }

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

// *********** EVENT HANDLERS  *****************

function handleClick(event){
  // - click - on the imgs - rerender new images(increase the views on the Products that are rendered) - count the vote of the Product that was clicked/ lower our total number of votes
  let imgClicked = event.target.name;
  console.dir(imgClicked);

  for(let i=0; i < myProduct.length; i++){
    if(imgClicked === myProduct[i].name){
      myProduct[i].votes++;
    }
  }
  totalVotes--;

  renderImgs();

  if(totalVotes === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  if(totalVotes === 0){
    for(let i = 0; i < myProduct.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${myProduct[i].name}: views: ${myProduct[i].views}, votes: ${myProduct[i].votes}`;
      resultsList.appendChild(liElem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
  }
}

// ********* EVENT LISTENERS *******************
imgContainer.addEventListener('click', handleClick);
resultBtn.addEventListener('click', handleShowResults);
