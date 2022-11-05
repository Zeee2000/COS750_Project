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

  setSelectedBorderDefault()
  setSelectedBorder(card1.innerHTML, card2.innerHTML)

  if(currentCounter === maxMoves){
    insertCard1IntoSorted()
    hideCard1FromUnsorted()
    setCard1FromUnsorted()
  }
}

function setCard1FromUnsorted(){
  let unsortedGridChildren = document.getElementById("unsortedList").children
  let card1 =  document.getElementById("card1")

  for(let i = 1 ; i < unsortedGridChildren.length ; i++){
    if(unsortedGridChildren[i].display != "none"){
      card1.innerHTML = unsortedGridChildren[i].innerHTML
      return
    }
  }
}
function hideCard1FromUnsorted(){
  let unsortedGrid = document.getElementById("unsortedList")
  let unsortedGridChildren = unsortedGrid.children

  for(let i = 0 ; i < unsortedGridChildren.length ; i++){
    if(unsortedGridChildren[i].innerHTML == 1){
      unsortedGridChildren[i].style.display = "none"
    }
  }
}

function insertCard1IntoSorted(){
  let unsortedGrid = document.getElementById("sortedList")
  let unsortedGridChildren = unsortedGrid.children
  let card1Value = document.getElementById("card1").innerHTML

  unsortedGridChildren[numSorted+1].style.display = "inline"
  unsortedGridChildren[numSorted+1].innerHTML = card1Value
  return

}

function selectUnsortedItem(index){
  let id = "sortedItem_" + index;
  let selectedNumber = document.getElementById(id).getInnerHTML();
  let fillSection = document.getElementById("card2").innerHTML = selectedNumber

  let card1Value = document.getElementById("card1").innerHTML

  setSelectedBorderDefault()
  setSelectedBorder(card1Value, fillSection)
}

function setSelectedBorderDefault(){
  let unsortedGrid = document.getElementById("unsortedList")
  let unsortedGridChildren = unsortedGrid.children

  for(let i = 0 ; i < unsortedGridChildren.length ; i++){
      unsortedGridChildren[i].style.border = ""
  }
}

function setSelectedBorder(value1,value2){
  let unsortedGrid = document.getElementById("unsortedList")
  let unsortedGridChildren = unsortedGrid.children

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
  let unsortedGrid = document.getElementById("unsortedList")
  let unsortedGridChildren = unsortedGrid.children

  let numVisibleSorted = 0
  for(let i = 0 ; i < unsortedGridChildren.length ; i++){
    if (unsortedGridChildren[i].style.display != "none"){
      numVisibleSorted +=1
    }
  }

  return numVisibleSorted-1
}
