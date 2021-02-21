'use strict';

// get img elements that will contain the products images
let leftImgElement = document.getElementById('left-img');
let middleImgElement = document.getElementById('middle-img');
let rightImgElement = document.getElementById('right-img');

// get the label element that shows the number of current attempts
let labelElement = document.getElementById('lbl');

// Store the maximum number of selections allowed
const MaxSelections = 25;

//Store the currently selections made by the user
let selectionCounter = 0;

// construct a product image object 
function ProductImg(name, imgPath) {
    this.name = name;
    this.imgPath = imgPath;
    this.votes = 0;
    this.appearedTimes = 0;
    ProductImg.allImgs.push(this);
}

// store all product images objects
ProductImg.allImgs = [];

// create 20 objects of ProductImg 
new ProductImg('bag', 'img/bag.jpg');
new ProductImg('banana', 'img/banana.jpg');
new ProductImg('bathroom', 'img/bathroom.jpg');
new ProductImg('boots', 'img/boots.jpg');
new ProductImg('breakfast', 'img/breakfast.jpg');
new ProductImg('bubblegum', 'img/bubblegum.jpg');
new ProductImg('chair', 'img/chair.jpg');
new ProductImg('cthulhu', 'img/cthulhu.jpg');
new ProductImg('dog-duck', 'img/dog-duck.jpg');
new ProductImg('dragon', 'img/dragon.jpg');
new ProductImg('pen', 'img/pen.jpg');
new ProductImg('pet-sweep', 'img/pet-sweep.jpg');
new ProductImg('scissors', 'img/scissors.jpg');
new ProductImg('shark', 'img/shark.jpg');
new ProductImg('sweep', 'img/sweep.png');
new ProductImg('tauntaun', 'img/tauntaun.jpg');
new ProductImg('unicorn', 'img/unicorn.jpg');
new ProductImg('usb', 'img/usb.gif');
new ProductImg('water-can', 'img/water-can.jpg');
new ProductImg('wine-glass', 'img/wine-glass.jpg');

// generate random Index between 0 and 19(inclusive)
function getRandomIndex() {
    return Math.floor(Math.random() * ProductImg.allImgs.length);
}

//store the generated random indices
let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

// render three product images
function renderThreeImgs() {
    leftImgIndex = getRandomIndex();

    // check if the generated images are same
    do {
        middleImgIndex = getRandomIndex();
        rightImgIndex = getRandomIndex();
    } while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex);

    // show the images 
    leftImgElement.src = ProductImg.allImgs[leftImgIndex].imgPath;
    middleImgElement.src = ProductImg.allImgs[middleImgIndex].imgPath;
    rightImgElement.src = ProductImg.allImgs[rightImgIndex].imgPath;

    // increase the number of times shown for the rendered images
    ProductImg.allImgs[leftImgIndex].appearedTimes += 1;
    ProductImg.allImgs[middleImgIndex].appearedTimes += 1;
    ProductImg.allImgs[rightImgIndex].appearedTimes += 1;
}

// call renderThreeImgs
renderThreeImgs();

// Add click event listener and render the results
leftImgElement.addEventListener('click', handleClick);
middleImgElement.addEventListener('click', handleClick);
rightImgElement.addEventListener('click', handleClick);

// handle clicking event on the images
function handleClick(event) {

    // check in selection does not exceed the max number allowed
    if (selectionCounter < MaxSelections) {
        // increase the votes for the selected image
        if (event.target.id == 'left-img') {
            ProductImg.allImgs[leftImgIndex].votes++;
        } else if (event.target.id == 'middle-img') {
            ProductImg.allImgs[middleImgIndex].votes++;
        } else if (event.target.id == 'right-img') {
            ProductImg.allImgs[rightImgIndex].votes++;
        }

        // increase the number of selections by one
        selectionCounter++;

        // update the number shown in the label element
        labelElement.textContent = selectionCounter;

        renderThreeImgs();
    } else {
        leftImgElement.removeEventListener('click', handleClick);
        middleImgElement.removeEventListener('click', handleClick);
        rightImgElement.removeEventListener('click', handleClick);
    }
}

// Add click event listener for the button to show results
let showBtn = document.getElementById('view');

showBtn.addEventListener('click', showResults);

function showResults() {
    if (selectionCounter < MaxSelections) {

    } else {
        let resultsList = document.getElementById('selec-results');
        let resultItem;
        for (let i = 0; i < ProductImg.allImgs.length; i++) {
            resultItem = document.createElement('li');
            resultsList.appendChild(resultItem);
            resultItem.textContent = ProductImg.allImgs[i].name + ' had '
                + ProductImg.allImgs[i].votes + ' votes, and was seen '
                + ProductImg.allImgs[i].appearedTimes + ' times';
        }
        showBtn.removeEventListener('click', showResults)
    }
}

