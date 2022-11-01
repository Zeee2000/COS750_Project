function clicked(value){
    if(value==1)
    {
        let card1 = document.querySelector('#card1')
        alert("Hi, "+card1.innerHTML)
    }
    else{
        let card2 = document.querySelector('#card2')
        alert("Hi, "+card2.innerHTML)
    }
}