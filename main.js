let gridContainer=document.querySelector(".grid");
let choiseUser;

document.querySelector('button').addEventListener('click', function(){
  choiseUser=document.querySelector("select").value;
  // reset when you click another level
  reset(gridContainer);

  let squares;
  let numberSquare=0;
  gridContainer.innerHTML="";
  if(choiseUser === "easy"){
    numberSquare=100;
  }
  else if(choiseUser === "middle"){
      numberSquare=81;
    }
  else {
    numberSquare=49;
  }
  const bomb=generateBombs(numberSquare);
  console.log(bomb);
  let score=0;
  let totalSquare=document.getElementsByClassName("square");
  for (let i = 0; i < numberSquare; i++) {
    squares= createSquare(i);
    squares.classList.add(`${choiseUser}`); 
    gridContainer.appendChild(squares);
    gridContainer.classList.remove("d-none");
    // added click to square
    
    squares.addEventListener('click', function oneClick(){
      if(!bomb.includes(i)){
        this.classList.add("active");
        score++;
        document.getElementById("score").innerHTML=score;
        this.removeEventListener('click', oneClick);
      }
      else{
        this.classList.add("lose");
        document.getElementById("score").innerHTML=`${score}. Hai perso!`;
        for (let i = 0; i < bomb.length; i++) {
          totalSquare[bomb[i]].classList.add("lose");
        }
      }
    })
  }

})


function createSquare(number) {
  let square=document.createElement('div');
  square.classList.add("square");
  square.innerHTML = `<span>${number}</span>`;
  return square;
}

  
function reset(gridTemp){
  gridTemp.classList.add("d-none");
  return gridTemp;
}


function generateBombs(numSquares){
  const bombs=[];
  for (let i = 0; i < 16; i++) {
    bombs.push(random(bombs,0,numSquares))
  } 
  return bombs;
}


function random(numbBlack,min ,max){
  let numberTemp;
  let check=false;
  while (!check) {
    numberTemp=Math.floor(Math.random() * ((max + 1) - min) + min);
    if(!numbBlack.includes(numberTemp)){
      check=true;
    }
  }
  return numberTemp;
}