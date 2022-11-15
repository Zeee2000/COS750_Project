let numSorted = 0
let queueToCompare = []

let round_scores = [];

// This function is called when initialising the app.
// Sets the values that need to be sorted.
function onInit(){

  // we can set this to a random set of 8 values.
  // We can also insert for example 12 boxes for sorted and unsorted then have a
  // 'dificulty level' which will determine how many numbers need to be sorted.
  // The algorithm will work for any number of boxes, so we just need to
  // insert the boxes and then hide those that are not being used.

  //get random numbers

  let array = [];

  let numNumbers = 8

  for (let i = 0 ; i< numNumbers ; i++){
    let randomNumber = Math.floor((Math.random() * 100) + 1);
    array.push(randomNumber)
  }

  for (let i = 0 ; i < array.length; i++ ){
    let currentIteration = i+1
    let currentItemID = "sortedItem_" + currentIteration.toString()
    document.getElementById(currentItemID).innerHTML = array[i].toString();
  }

  document.getElementById("card1").innerHTML = array[0].toString()

  getNumbersToCompare()
}

// This function handles the queue that determines the next number that needs to be compared to in the unsorted list.
// e.g unsorted: [5,6,7,8,9,10] Would have a queue being [6,7,8,9,10] Therefore the next number that needs to be compared to is 6.
function getNumbersToCompare(){
  queueToCompare = []
  let unsortedGridChildren = document.getElementById("unsortedList").children
  let foundCurrentSelected = false;
  for(let i = 1 ; i < unsortedGridChildren.length ; i++){
    if (window.getComputedStyle(unsortedGridChildren[i]).getPropertyValue("border") == "3px solid rgb(250, 128, 114)"){
      foundCurrentSelected = true
      continue
    }
    if (foundCurrentSelected == false)
      continue

    if (unsortedGridChildren[i].innerHTML != ""){
      queueToCompare.push(unsortedGridChildren[i].innerHTML);
    }
  }
}

// Helper function to get the last number in the list.
// This is used to determine when the round is done.
// If any number is compared to the last number then the chosen card will be inserted into the sorted list.
function getLastNumberToCompare(){
  let unsortedGridChildren = document.getElementById("unsortedList").children

  for(let i = unsortedGridChildren.length-1  ; i >= 0 ; i--){
    if (unsortedGridChildren[i].innerHTML != ""){
      return unsortedGridChildren[i].innerHTML
    }
  }
}

// Heavy lifting function.
// This function has all the logic for when a number is selected from the 2 different options from the card list.
// This function does all logic checks such as when to insert into the sorted list and when the game is done.
// The function is also responsible for the scoring system.
function selectLargest(value){

  let lastNumber = getLastNumberToCompare()

  let bEndOfRound = false;

  let maxMoves = getNumberVisibleUnsorted() - 1
  let currentCounter = parseInt(document.getElementById("moveCounter").innerHTML) + 1
  document.getElementById("moveCounter").innerHTML = ""
  document.getElementById("moveCounter").innerHTML = currentCounter.toString()


  let selectedCardID = "card" + value
  let card1 =  document.getElementById("card1")
  let card2 = document.getElementById("card2")
  let selectedCard = document.getElementById(selectedCardID)

  if (card1.innerHTML === lastNumber || card2.innerHTML === lastNumber){
    bEndOfRound = true
  }


  if(card2.innerHTML != queueToCompare[0]){
    let current_score = document.getElementById("score").innerHTML

    current_score = current_score - 5

    document.getElementById("score").innerHTML = current_score;
    getNumbersToCompare()
    if(current_score <= 0 ){
      alert("Bro what are you even doing?")
    }
  }

  if(parseInt(card1.innerHTML) > parseInt(selectedCard.innerHTML) || parseInt(card2.innerHTML) > parseInt(selectedCard.innerHTML)){
    let current_score = document.getElementById("score").innerHTML

    current_score = current_score - 10
    if(current_score <= 0 ){
      alert("Bro what are you even doing?")
    }

    document.getElementById("score").innerHTML = current_score;
    getNumbersToCompare()
  }

  else
  {
    let newArray=[]
    for (let i = 1 ; i<queueToCompare.length ; i++)
    {
      newArray.push(queueToCompare[i])
    }

    queueToCompare = newArray
  }

  card1.innerHTML = document.getElementById(selectedCardID).innerHTML
  card2.innerHTML = ""

  setAllBordersDefault()
  setSelectedBorder(card1.innerHTML, card2.innerHTML)

  if(bEndOfRound === true){

    let penaltyNumber = parseInt(maxMoves) - parseInt(currentCounter);

    let penaltyMultiplier = 5;

    let finalPenalty = 5*penaltyNumber;

    round_scores.push(parseInt(document.getElementById("score").innerHTML)-finalPenalty)
    document.getElementById("score").innerHTML = "100";

    let x = 0
    document.getElementById("moveCounter").innerHTML = x.toString();

    let correctSelected = compareCard1toUnsortedLargest()

    if (correctSelected == false){
        // We cut the player off because the ordering is completely incorrect now.
      alert("gg ez bro you're done")
    }

    setAllBordersDefault()
    insertCard1IntoSorted()
    hideCard1FromUnsorted()
    setCard1FromUnsorted()
    getNumbersToCompare()

    if(queueToCompare.length === 0)
    {
      // THIS WOULD BE THE END OF THE GAME.
      // We now need to get the average of the round scores to determine the final score of the player for the round that they have just played .

      let total = 0 ;

      for(const i in round_scores){
        total = total + round_scores[i];
      }

      let averageScore = total / round_scores.length

      // This average score can be rendered somewhere as a final conclusion to the game.

      insertCard1IntoSorted()
      hideCard1FromUnsorted()
      setCard1FromUnsorted()

      // We can render a small dialogue box that will basically allow the user to view their score of the run and there shuld be a retry button that they can click on to refresh the page.
      // alert("You're a bot but your result is as follows :" + averageScore )
    }
    numSorted = numSorted+1
  }
}

function selectSmallest(value){

  let lastNumber = getLastNumberToCompare()

  let bEndOfRound = false;

  let maxMoves = getNumberVisibleUnsorted() - 1
  let currentCounter = parseInt(document.getElementById("moveCounter").innerHTML) + 1
  document.getElementById("moveCounter").innerHTML = ""
  document.getElementById("moveCounter").innerHTML = currentCounter.toString()


  let selectedCardID = "card" + value
  let card1 =  document.getElementById("card1")
  let card2 = document.getElementById("card2")
  let selectedCard = document.getElementById(selectedCardID)

  if (card1.innerHTML === lastNumber || card2.innerHTML === lastNumber){
    bEndOfRound = true
  }


  if(card2.innerHTML != queueToCompare[0]){
    let current_score = document.getElementById("score").innerHTML

    current_score = current_score - 5

    document.getElementById("score").innerHTML = current_score;
    getNumbersToCompare()
    if(current_score <= 0 ){
      alert("Bro what are you even doing?")
    }
  }

  if(parseInt(card1.innerHTML) < parseInt(selectedCard.innerHTML) || parseInt(card2.innerHTML) < parseInt(selectedCard.innerHTML)){
    let current_score = document.getElementById("score").innerHTML

    current_score = current_score - 10
    if(current_score <= 0 ){
      alert("Bro what are you even doing?")
    }

    document.getElementById("score").innerHTML = current_score;
    getNumbersToCompare()
  }

  else
  {
    let newArray=[]
    for (let i = 1 ; i<queueToCompare.length ; i++)
    {
      newArray.push(queueToCompare[i])
    }

    queueToCompare = newArray
  }

  card1.innerHTML = document.getElementById(selectedCardID).innerHTML
  card2.innerHTML = ""

  setAllBordersDefault()
  setSelectedBorder(card1.innerHTML, card2.innerHTML)

  if(bEndOfRound === true){

    let penaltyNumber = parseInt(maxMoves) - parseInt(currentCounter);

    let penaltyMultiplier = 5;

    let finalPenalty = 5*penaltyNumber;

    round_scores.push(parseInt(document.getElementById("score").innerHTML)-finalPenalty)
    document.getElementById("score").innerHTML = "100";

    let x = 0
    document.getElementById("moveCounter").innerHTML = x.toString();

    let correctSelected = compareCard1toUnsortedSmallest()

    if (correctSelected == false){
      // We cut the player off because the ordering is completely incorrect now.
      alert("gg ez bro you're done")
    }

    setAllBordersDefault()
    insertCard1IntoSorted()
    hideCard1FromUnsorted()
    setCard1FromUnsorted()
    getNumbersToCompare()

    if(queueToCompare.length === 0)
    {
      // THIS WOULD BE THE END OF THE GAME.
      // We now need to get the average of the round scores to determine the final score of the player for the round that they have just played .

      let total = 0 ;

      for(const i in round_scores){
        total = total + round_scores[i];
      }

      let averageScore = total / round_scores.length

      // This average score can be rendered somewhere as a final conclusion to the game.

      insertCard1IntoSorted()
      hideCard1FromUnsorted()
      setCard1FromUnsorted()

      // We can render a small dialogue box that will basically allow the user to view their score of the run and there shuld be a retry button that they can click on to refresh the page.
      // alert("You're a bot but your result is as follows :" + averageScore )
    }
    numSorted = numSorted+1
  }
}

// A helper function
// Determines if the correct number has been placed into the sorted list. Say for example in ascending order 2,3,1,5 and
function compareCard1toUnsortedLargest(){
  let unsortedGridChildren = document.getElementById("unsortedList").children
  let card1 =  document.getElementById("card1")
  let card1Value = parseInt(card1.innerHTML)

  let Largest = card1Value
  for(let i = 1 ; i < unsortedGridChildren.length ; i++){
    if(parseInt(unsortedGridChildren[i].innerHTML) > Largest){
      return false
    }
  }
  return true
}

function compareCard1toUnsortedSmallest(){
  let unsortedGridChildren = document.getElementById("unsortedList").children
  let card1 =  document.getElementById("card1")
  let card1Value = parseInt(card1.innerHTML)

  let smallest = card1Value
  for(let i = 1 ; i < unsortedGridChildren.length ; i++){
    if(parseInt(unsortedGridChildren[i].innerHTML) < smallest){
      return false
    }
  }
  return true
}

// This happens on a new iteration. Just sets the border of the first number to the salmon colour and inserts this number into the first comparrison card.
function setCard1FromUnsorted(){
  let unsortedGridChildren = document.getElementById("unsortedList").children
  let card1 =  document.getElementById("card1")

  for(let i = 1 ; i < unsortedGridChildren.length ; i++){
    if(unsortedGridChildren[i].innerHTML != "" && unsortedGridChildren[i].innerHTML != "Unsorted"){
      card1.innerHTML = unsortedGridChildren[i].innerHTML
      unsortedGridChildren[i].style.border = "3px solid salmon"
      return
    }
  }
}

// This function is called at the end of an iteration to hide the selected card from the unsorted list as it has now been included in the sorted list.
function hideCard1FromUnsorted(){
  let unsortedGridChildren = document.getElementById("unsortedList").children
  let card1Value = document.getElementById("card1").innerHTML

  for(let i = 0 ; i < unsortedGridChildren.length ; i++){
    if(unsortedGridChildren[i].innerHTML == card1Value){
      unsortedGridChildren[i].style.display = "none"
      unsortedGridChildren[i].innerHTML = ""
    }
  }
}

// this function is called at the end of the iteration to add the finally selected card into the sorted list.
function insertCard1IntoSorted(){
  let unsortedGridChildren = document.getElementById("sortedList").children
  let card1Value = document.getElementById("card1").innerHTML
  unsortedGridChildren[numSorted+1].style.display = "grid"
  unsortedGridChildren[numSorted+1].innerHTML = card1Value
  return

}

// Takes unsorted item from the list and places the selected value into the second card.
function selectUnsortedItem(index){
  let id = "sortedItem_" + index;
  let selectedNumber = document.getElementById(id).getInnerHTML();
  let card2Value = document.getElementById("card2").innerHTML = selectedNumber
  let card1Value = document.getElementById("card1").innerHTML

  setAllBordersDefault()
  setSelectedBorder(card1Value, card2Value)
}

// helper function.
// takes 2 value inputs and goes through the unsorted list to set the border of value1 to the salmon colour and value2 to the blue colour.
function setSelectedBorder(value1,value2){
  let unsortedGridChildren = document.getElementById("unsortedList").children

  for(let i = 0 ; i < unsortedGridChildren.length ; i++){
    if (unsortedGridChildren[i].innerHTML == value1){
      unsortedGridChildren[i].style.border = "3px solid salmon"
    }

    else if(unsortedGridChildren[i].innerHTML == value2){
      unsortedGridChildren[i].style.border = "3px solid lightskyblue"
    }
  }
}

// Function to get the number of unsorted items that have not been moved to the sorted list.
function getNumberVisibleUnsorted(){
  let unsortedGridChildren = document.getElementById("unsortedList").children
  let numVisibleUnsorted = 0
  for(let i = 0 ; i < unsortedGridChildren.length ; i++){
    if (unsortedGridChildren[i].innerHTML != ""){
      numVisibleUnsorted +=1
    }
  }
  return numVisibleUnsorted-1
}

// simple function to set all the borders colours back to the default before setting the next one to red for the next iteration
// HELPER FUNCTION.
function setAllBordersDefault(){
  let unsortedGridChildren = document.getElementById("unsortedList").children
  for(let i = 1 ; i < unsortedGridChildren.length ; i++){
    unsortedGridChildren[i].style.border = ""
  }
}
