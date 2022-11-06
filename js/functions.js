let numSorted = 0

function selectLargest(value){
  let maxMoves = getNumberVisibleUnsorted() - 1
  let currentCounter = parseInt(document.getElementById("moveCounter").innerHTML) + 1
  document.getElementById("moveCounter").innerHTML = ""
  document.getElementById("moveCounter").innerHTML = currentCounter.toString()


  let selectedCardID = "card" + value
  let card1 =  document.getElementById("card1")
  let card2 = document.getElementById("card2")
  card1.innerHTML = document.getElementById(selectedCardID).innerHTML

  card2.innerHTML = ""

  setAllBordersDefault()
  setSelectedBorder(card1.innerHTML, card2.innerHTML)

  if(currentCounter === maxMoves){
    let x = 0
    document.getElementById("moveCounter").innerHTML = x.toString();
    setAllBordersDefault()
    insertCard1IntoSorted()
    hideCard1FromUnsorted()
    setCard1FromUnsorted()
    numSorted = numSorted+1
  }
}

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

function insertCard1IntoSorted(){
  let unsortedGridChildren = document.getElementById("sortedList").children
  let card1Value = document.getElementById("card1").innerHTML
  unsortedGridChildren[numSorted+1].style.display = "block"
  unsortedGridChildren[numSorted+1].innerHTML = card1Value
  return

}

function selectUnsortedItem(index){
  let id = "sortedItem_" + index;
  let selectedNumber = document.getElementById(id).getInnerHTML();
  let card2Value = document.getElementById("card2").innerHTML = selectedNumber
  let card1Value = document.getElementById("card1").innerHTML

  setAllBordersDefault()
  setSelectedBorder(card1Value, card2Value)
}

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

function setAllBordersDefault(){
  let unsortedGridChildren = document.getElementById("unsortedList").children

  for(let i = 1 ; i < unsortedGridChildren.length ; i++){
    unsortedGridChildren[i].style.border = ""
  }
}
