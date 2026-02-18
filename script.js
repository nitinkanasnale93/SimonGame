let gameseq = [];
let userseq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let colors = ["red", "yellow", "green", "purple"];

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("key pressed");
        started = true;
        levelup();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 400);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 400);
}

function levelup(){
    userseq = [];
    level++;
    h2.innerText = "Level " + level;

    let randIdx = Math.floor(Math.random() * 4);
    let randcolor = colors[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn);
}

function checkans(idx){
    console.log("current level: " + level);

    if(userseq[idx] === gameseq[idx]){

        if(userseq.length === gameseq.length){
            setTimeout(levelup, 1000);
        }

    } else {
        h2.innerText = "Game Over! Press any key to restart.";
        reset();
    }
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}



function btnpress() {
    console.log(this);
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    console.log(userseq);

    checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnpress);
}

