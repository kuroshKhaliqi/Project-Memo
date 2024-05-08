//Add the grid buttons based on the size selected
//in    the size of the grid
//
//cal   get the size from the btn which was clicked
//      find the number of the buttons -> nrOfBtns = size * size
//      create all the btns (doc.createElement('button'))
//      reapeat for the number of buttons needed
//
//out   for each button that you create add it to the btn-container
let mainPopUp = document.querySelector(".main-popup");
let detailsElement = document.querySelector(".main-details");
let btnContainerElement = document.querySelector(".btn-container");

let btnGridSize3 = document.querySelector("#size-3");
let btnGridSize4 = document.querySelector("#size-4");
let btnGridSize5 = document.querySelector("#size-5");
let btnGridSize6 = document.querySelector("#size-6");
let btnGridSize7 = document.querySelector("#size-7");
let btnGridSize8 = document.querySelector("#size-8");
btnGridSize3.addEventListener("click", addGridBtns);
btnGridSize4.addEventListener("click", addGridBtns);
btnGridSize5.addEventListener("click", addGridBtns);
btnGridSize6.addEventListener("click", addGridBtns);
btnGridSize7.addEventListener("click", addGridBtns);
btnGridSize8.addEventListener("click", addGridBtns);

let randomId1;
let randomId2;
let randomId3;
let correctAnswers;
let wrongAnswers;
let size;
let uniqueRandomNumbersArray;
let time;
let timeElement = document.querySelector(".time");
let timeIntervalId;
function addGridBtns(event) {
  let buttonClicked = event.target;
  let id = buttonClicked.id;
  if (id == "size-3") {
    size = 3;
  }
  if (id == "size-4") {
    size = 4;
  }
  if (id == "size-5") {
    size = 5;
  }
  if (id == "size-6") {
    size = 6;
  }
  if (id == "size-7") {
    size = 7;
  }
  if (id == "size-8") {
    size = 8;
  }
  startGame(size);
}

//startGame
function startGame(size) {
  correctAnswers = 0;
  wrongAnswers = 0;
  //clear the time
  clearInterval(timeIntervalId);
  //create and add the grid btns
  createAndAddBtns(btnContainerElement, size);
  //generate unique random ids
  uniqueRandomNumbersArray = generateUniqueRandomNumbers(size);

  //light up random btns
  lightBtnsUp(uniqueRandomNumbersArray);
  //light down the random btns
  setTimeout(() => lightBtnsDown(uniqueRandomNumbersArray), size * 1000);
  //start time
  time = 0;
  timeElement.innerText = "0:0";
}

//create and add btns to the grid
function createAndAddBtns(btnContainerElement, size) {
  btnContainerElement.innerHTML = "";
  for (let counter = 0; counter < size * size; counter++) {
    let newBtn = document.createElement("button");
    newBtn.id = "btn-" + (counter + 1);
    newBtn.classList.add("btn-" + size);
    newBtn.classList.add("btn");
    newBtn.addEventListener("click", checkBtn);
    newBtn.disabled = "true";
    btnContainerElement.append(newBtn);
  }
}
function enableBtns() {
  let btnsElementList = btnContainerElement.children;
  for (let index = 0; index < btnsElementList.length; index++) {
    const btn = btnsElementList[index];
    btn.removeAttribute("disabled");
  }
}

//Selecting 3 random btns
//in    N/A
//cal   give every btn an id
//      generate a random id in a range (1-9)
//
///out  select the btn using the random generated id
//      change the background color

function lightBtnsUp(uniqueRandomNumbersArray) {
  for (
    let counter = 0;
    counter < uniqueRandomNumbersArray.length;
    counter += 1
  ) {
    let randomId = uniqueRandomNumbersArray[counter];
    let randomBtn1 = document.querySelector("#btn-" + randomId);
    randomBtn1.style.backgroundColor = "black";
  }
}

//HW

//lightBtnsDown(id1,id2,id3)
//select the btns by the id, light them down by changing the bg color to red

function lightBtnsDown(uniqueRandomNumbersArray) {
  for (
    let counter = 0;
    counter < uniqueRandomNumbersArray.length;
    counter += 1
  ) {
    let randomId = uniqueRandomNumbersArray[counter];
    let randomBtn1 = document.querySelector("#btn-" + randomId);
    randomBtn1.style.backgroundColor = "#f85f73";
  }
  enableBtns();
  time = 0;
  timeIntervalId = setInterval(() => changeTime(), 1000);
}

//Check user choice

//in    the btn the user clicked
//      target:       clicked btn
//      event-type:   click
//      handler:      checkBtn
//cal   get the id of the clicked btn
//      if the clicked-btn id is equal to one of the randomIds
//
//
//out       if it is -> light it up
//          if not   -> give it a gray bg

function checkBtn(event) {
  let clickBtn = event.target;
  let clickBtnId = clickBtn.id.split("-")[1]; //btn-1
  clickBtn.disabled = true;
  let index = 0;
  let wasCorrectAnswer = false;
  for (
    let counter = 0;
    counter < uniqueRandomNumbersArray.length;
    counter += 1
  ) {
    let randomUniqueId = uniqueRandomNumbersArray[index];
    if (clickBtnId == randomUniqueId) {
      wasCorrectAnswer = true;
    }
    index += 1;
  }

  if (wasCorrectAnswer == true) {
    clickBtn.style.backgroundColor = "black";
    correctAnswers += 1;
  } else {
    wrongAnswers += 1;
    clickBtn.style.backgroundColor = "gray";
  }

  if (correctAnswers == size) {
    detailsElement.innerText = "Congrats you won in " + time + "s!";
    closePopUpBtn.style.backgroundColor = "green";
    let checkMarkElement = document.querySelector(".check-mark");
    checkMarkElement.style.backgroundColor = "green";
    mainPopUp.style.display = "flex";
    clearInterval(timeIntervalId);
  }
  if (wrongAnswers == 2) {
    detailsElement.innerText = "Better luck next time!!!";
    closePopUpBtn.style.backgroundColor = "#F85F73";
    let checkMarkElement = document.querySelector(".check-mark");
    checkMarkElement.style.backgroundColor = "#F85F73";
    mainPopUp.style.display = "flex";
    clearInterval(timeIntervalId);
  }
}
//  Close pop up
//inuse clicks the 'ok' btn
//    target the btn

//    type of event click

//    handler closePopUpBtn
//cal  select the pop up
//after selecting the pop up use style.css in javascript
//use the style closePopUp.style.display = 'none'

//out   display none

let closePopUpBtn = document.querySelector(".popUp-btn");
closePopUpBtn.addEventListener("click", closePopUp);

function closePopUp(event) {
  let popUp = document.querySelector(".main-popup");
  popUp.style.display = "none";
  startGame(size);
}

//you can make the server wright the same thing twice with one line of code
//it can keep the data even when you refresh
// local storage is like a memory

//4x4
// generate as many random squares as the size of the grid
// the game ends when the user gets as many correct answers as the size

//generate a array of unique random numbers

//in    size(4)
//cal   declare an array of uniqueRandomNumbers = []
//      Repeate as many times as the size
//      generate a random number
//      check if the random number is present at the array
//          if it is generate a new random number and start again
//          if not add the number to the array
//out   return the uniqueRandomNumbers

function generateUniqueRandomNumbers(size) {
  let uniqueRandomNumbers = [];
  for (let counter = 0; counter < size; counter++) {
    let randomNumber = Math.floor(Math.random() * size * size) + 1;
    let index = 0;
    let isUnique = true;
    for (
      let counter1 = 0;
      counter1 < uniqueRandomNumbers.length;
      counter1 += 1
    ) {
      let uniqueNumber = uniqueRandomNumbers[index];
      if (uniqueNumber === randomNumber) {
        isUnique = false;
      }
      index += 1;
    }
    if (isUnique) {
      uniqueRandomNumbers.push(randomNumber);
    } else {
      counter -= 1;
      continue;
    }
  }
  return uniqueRandomNumbers;
}

//Change time(this function will run every 1s)
//in      the time
//cal add on second to the time
//out change text of time element
function changeTime() {
  time += 1;
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timeElement.innerText = `${minutes}:${seconds}`;
}
