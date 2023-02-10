let game = {

    lockMode: false,
    fisrtCard: null,
    secondCard: null,
    cards: null,
    techs:[
        'bootstrap',
        'css',
        'html',
        'electron',
        'firebase',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    creatCard: function(){
        this.cards = [];
    
       this.techs.forEach(tech => {
           this.cards.push(this.createPair(tech));
       });
        this.cards = this.cards.flatMap(pair => pair);
        this.shuflleCards();
    },
    
    createPair: function(tech){
        return [{
            id: this.createId(tech),
            icon: tech,
            flipped: false,
        },
        {
            id: this.createId(tech),
            icon: tech,
            flipped: false,
        }]
    },
    
    createId: function(tech){
        return tech + parseInt(Math.random() * 1000);
    },

    shuflleCards: function(cards){
        let cardsIndex = this.cards.length;
        let randomIndex = 0;
    
        while(cardsIndex != 0){
            randomIndex = Math.floor(Math.random() * 9);
            cardsIndex--;
            //Troca os valores do index escolhido
            [this.cards[cardsIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[cardsIndex]];
        }
    },
    setCard: function(id){
        let card = this.cards.filter(card => card.id == id)[0];

        if(card.flipped || this.lockMode){
            return false;
        }
        if(!this.fisrtCard){
            this.fisrtCard = card;
            this.fisrtCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },
    checkMatch: function(){
        return this.fisrtCard.icon == this.secondCard.icon;
     },

     unflipCards(){
        this.fisrtCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCard();
     },

    clearCard: function(){
        this.fisrtCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    
    checkGamerOver(){
        return this.cards.filter(card => !card.flipped).length == 0;
    }

}