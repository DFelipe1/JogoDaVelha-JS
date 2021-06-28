var start = true;
let image = false;


// Object Player
const PlayerX = {
    score: 0,
    victory: () =>{
        PlayerX.score = PlayerX.score  +1;
    }
}
const PlayerO = {
    score: 0,
    victory: () =>{
        PlayerO.score++;

    }
}



// Check jogada do Player X or O
const imageMark = document.getElementsByClassName('image')

function checkPlayer() {
    if(start) {
        imageMark[0].style.backgroundImage = "url(assets/x.svg)"
    } else {
        imageMark[0].style.backgroundImage = "url(assets/O.svg)"
    }
}
checkPlayer()




// Motor do Jogo
const block = document.getElementsByClassName('block')

// Adiciona um evento para cada bloco do tabuleiro
for(let i =0; i < block.length; i++ ){
    
        block[i].addEventListener('click', () => {
            
        
            let clicked = block[i].attributes.clicked.value

            block[i].classList.add('fail')

            

            if (clicked == 'false') {
                
                if(start == true){
                    block[i].style.backgroundImage = "url(assets/x.svg)"
                    block[i].setAttribute('jogada', 'x')

                } else {
                    block[i].style.backgroundImage = "url(assets/O.svg)"
                    block[i].setAttribute('jogada', 'O')
                }

                block[i].setAttribute('clicked', true)
                start = !start
                checkPlayer()
                checkVictory()   
               
                
            } 
           
          
        
        })
    
}






//ckecka qual jogador ganhou ou se o jogo empatou
function checkVictory() {
    const a1 = document.getElementById('a1').getAttribute('jogada');
    const a2 = document.getElementById('a2').getAttribute('jogada');
    const a3 = document.getElementById('a3').getAttribute('jogada');

    const b1 = document.getElementById('b1').getAttribute('jogada');
    const b2 = document.getElementById('b2').getAttribute('jogada');
    const b3 = document.getElementById('b3').getAttribute('jogada');

    const c1 = document.getElementById('c1').getAttribute('jogada');
    const c2 = document.getElementById('c2').getAttribute('jogada');
    const c3 = document.getElementById('c3').getAttribute('jogada');

    let winner = "";
    
        // verificação do eixo A1
        if((a1 == b1 && a1 == c1 && a1 != "") || ( a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "")){
            winner = a1;

        
            gameOver(winner)
        }

        // verificação do eixo B2
        if((b2 == a2 && b2 == c2 && b2 != "") || (b2 == b1 && b2 == b3 && b2 != "")  || (b2 == a3 && b2 == c1 && b2 != "")) {
            winner = b2;

            
            gameOver(winner)
        }

        // verificação do eixo C3
        if((c3 == c2 && c3 == c1 && c3 != "") || (c3 == b3 && c3 == a3 && c3 != "")){
            winner = c3;

            
            gameOver(winner)
            
        } 

        const arrayBlock = []

        for(let i =0; i < block.length; i++){
            jogadaValue = block[i].attributes.jogada.value
            arrayBlock.push(...jogadaValue)
            
        }

        

        if(arrayBlock.length >= 9 && winner == ""){
            winner = "velha"
            gameOver(winner)
        }

       
    
}




// Game Over
function gameOver(winner) {
    const winnerGame = document.getElementById("winnerText");
    const reset = document.querySelector('.image-reset')
    
    winnerGame.style.visibility = "visible"
    reset.style.visibility = "visible"

    imageMark[1].style.backgroundImage = `url(../assets/${winner}.svg)`

    for(let i =0; i < block.length; i++ ){
        block[i].setAttribute('clicked', true)
    }

    reset.addEventListener('click', reseter)


    // efetua a conta da pontuaçao de cada jogador
    if(winner == "x"){
        const pScoreX = document.getElementById('PlayerX-score')
        PlayerX.victory();
        pScoreX.textContent = PlayerX.score
    } else if(winner == "O"){
        const pScoreO = document.getElementById('PlayerO-score')
        PlayerO.victory();
        pScoreO.textContent = PlayerO.score
    }

    UpScore(PlayerX.score, PlayerO.score)
    
}

// restart game
function reseter() {
    for(let i =0; i < block.length; i++ ){
        block[i].style.backgroundImage = "";
        block[i].setAttribute('clicked', false)
        block[i].setAttribute('jogada', "")
        block[i].classList.remove('fail')

    }

    let winnerGame = document.getElementById("winnerText");
    const reset = document.querySelector('.image-reset')
    
    winnerGame.style.visibility = "hidden"
    reset.style.visibility = "hidden"

    imageMark[1].style.backgroundImage = ""


    start = true;
    checkPlayer()

    
}


function UpScore(scoreX, scoreO){
    const playerScoreX = document.getElementById("PlayerX")
    const playerScoreO = document.getElementById("PlayerO")

    if(scoreX > scoreO){
        playerScoreX.style.transform = 'translate(20px,-9.4rem)'
        playerScoreO.style.transform = 'translateY(9.4rem)'
    } if(scoreX == scoreO){
        playerScoreX.style.transform = ''
        playerScoreO.style.transform = ''
    } if(scoreX < scoreO){
        playerScoreX.style.transform = 'translate(20px,9.4rem)'
        playerScoreO.style.transform = 'translateY(-9.4rem)'
    }
}





/*
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');

const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');

const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');

function clickedBlock() {
   

    start = !start

    checkPlayer()
    console.log(a1.style.backgroundImage)
}


a1.addEventListener('click', clickedBlock);
a2.addEventListener('click', clickedBlock);
a3.addEventListener('click', clickedBlock);

b1.addEventListener('click', clickedBlock);
b2.addEventListener('click', clickedBlock);
b3.addEventListener('click', clickedBlock);

c1.addEventListener('click', clickedBlock);
c2.addEventListener('click', clickedBlock);
c3.addEventListener('click', clickedBlock);


*/
