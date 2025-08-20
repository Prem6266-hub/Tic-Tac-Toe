let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newgame = document.querySelector("#newgame");
let msgcntnr = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let clickSound = new Audio("mixkit-arcade-game-jump-coin-216.wav");
let resetSound = new Audio("mixkit-quick-win-video-game-notification-269.wav");


let turnO = true ;//playerx, player0

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const resetGame = () => {
    resetSound.play();
    turnO = true;
    count = 0;
    enableBox();
     msgcntnr.classList.add("hide");
}
let count = 0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play();
        if(turnO){
               box.innerText = "O";
               box.classList.add("o-mark");
               turnO = false;
        } else {
               box.innerText = "X";
               box.classList.add("x-mark");
               turnO = true;
        }
        box.disabled = true;

        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
                msg.innerText = "Game Draw!";
                msgcntnr.classList.remove("hide"); 
                disableBox();
                count = 0;
}
    });
});


const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-mark", "x-mark");
    }
}

const showWinner = (winner) => {
     msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcntnr.classList.remove("hide"); 
    disableBox();
}

const checkWinner = () => {
    for(let pattern of winPatterns){

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
    
};

newgame.addEventListener("click", resetGame );
resetBtn.addEventListener("click", resetGame);

