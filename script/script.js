const FRONT = "cardFront";
const BACK = "cardBack";
const CARD = "card";
const ICON = "icon";

startGame();

function startGame(){
initializeCards(game.creatCard());
}

function initializeCards(cards){
    let gameBord = document.querySelector(".gameBord");
    gameBord.innerHTML = '';

    game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardElement(card, cardElement);   

        cardElement.addEventListener('click', flipCard);
        gameBord.appendChild(cardElement);

    });
}

function createCardElement(card, cardElement){
    createCardFace(FRONT, card , cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face ==  FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + ".png"; 
        iconElement.classList.add('iconStyle');
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    
    element.appendChild(cardElementFace);
}

function flipCard(){
    if(game.setCard(this.id)){  

        this.classList.add("flip");

        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCard();
                if(game.checkGamerOver()){
                    let gamaOverView = document.querySelector(".gamerOver");
                    gamaOverView.style.display = 'flex';
                }
            }else{
    
               setTimeout(()=>{
                    let firtsCardView = document.getElementById(game.fisrtCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
                    firtsCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
           }
        }
     }
};

function resert(){
    game.clearCard();
    startGame();
    let gamaOverView = document.querySelector(".gamerOver");
    gamaOverView.style.display = 'none';
}


