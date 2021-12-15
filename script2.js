console.log("Welcome to TicTacToe");
let bgMusic = new Audio("music.mp3");
let turnAudio = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let gameOverFlag = false;
let turn = "X";
let flag = true;

// Functio to change the turn
const changeTurn = () => {
    return turn === "X"?"O":"X";
}

// Function to check for a win
const checkWin = () => {
    let boxTexts = document.getElementsByClassName('boxText');
    let wins = [];
    if(window.matchMedia("(min-width: 600px)").matches){
        wins = [
            [0, 1, 2, 0, 0, 0],[3, 4, 5, 0, 10, 0],[6, 7, 8, 0, 20, 0],
            [0, 3, 6, -10, 10, 90],[1, 4, 7, 0, 10, 90],[2, 5, 8, 10, 10, 90],
            [0, 4, 8, 0, 10, 45],[2, 4, 6, 0, 10, 135]
        ];
    } else{
        wins = [
            [0, 1, 2, 0, 0, 0],[3, 4, 5, 0, 20, 0],[6, 7, 8, 0, 40, 0],
            [0, 3, 6, -20, 20, 90],[1, 4, 7, 0, 20, 90],[2, 5, 8, 20, 20, 90],
            [0, 4, 8, 0, 20, 45],[2, 4, 6, 0, 20, 135]
        ];
    }
    wins.forEach(e => {
        if((boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[1]].innerText === boxTexts[e[2]].innerText) && (boxTexts[e[0]].innerText !== '')){
            if(boxTexts[e[0]].innerText == "X"){
                document.querySelector('.info').innerText = "You Won";
            } else{
                document.querySelector('.info').innerText = "You Lost";
            }
            gameOverFlag = true;
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            if(window.matchMedia("(min-width: 600px)").matches){
                document.querySelector(".line").style.width = "30vw";
                document.querySelector(".imgBox").getElementsByTagName('img')[0].style.width = "20vw";
            } else{
                document.querySelector(".line").style.width = "60vw";
                document.querySelector(".imgBox").getElementsByTagName('img')[0].style.width = "30vw";
            }
        } else if(gameOverFlag == false && (boxTexts[0].innerText != '') && (boxTexts[1].innerText != '') && (boxTexts[2].innerText != '') && (boxTexts[3].innerText != '') && (boxTexts[4].innerText != '') && (boxTexts[5].innerText != '') && (boxTexts[6].innerText != '') && (boxTexts[7].innerText != '') && (boxTexts[8].innerText != '')){
            document.querySelector('.info').innerText = "It's a Draw";
        }
    })
}


// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxText');
    let boxTexts = document.getElementsByClassName('boxText');
    element.addEventListener('click', (e)=>{
        if(boxText.innerText === '' && gameOverFlag == false){
            boxText.innerText = turn;
            turn = changeTurn();
            turnAudio.play();
            
            // Checking Win 
            checkWin();

            // Computer Plays
            let arr = [];
            for (let i = 0; i < 9; i++) {
                if(boxTexts[i].innerText == "X" || boxTexts[i].innerText == "O"){
                    arr.push(i);
                }
            }
            
            function generateRandom(min, max) {
                var num = Math.floor(Math.random() * (max - min + 1)) + min;
                return (arr.includes(num)) ? generateRandom(min, max) : num;
            }
            
            // Generating a random number for computer to play
            var test = generateRandom(0, 8);
            if(gameOverFlag == false){
                boxTexts[test].innerText = turn;
                turn = changeTurn();
                checkWin();
            }

            // console.log(test);

            if(gameOverFlag == false){
                document.getElementsByClassName("info")[0].innerText = "Your Turn";
            }
        }
    })
})

// Reset Button
reset.addEventListener('click', () => {
    let boxTexts = document.querySelectorAll('.boxText');
    Array.from(boxTexts).forEach(element => {
        element.innerText = "";
    })
    document.querySelector(".imgBox").getElementsByTagName('img')[0].style.width = "0";
    turn = "X";
    document.querySelector('.line').style.width = '0';
    gameOverFlag = false;
})