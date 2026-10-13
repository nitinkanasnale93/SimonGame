
const colors = ["red", "yellow", "green", "purple"];

let gameSequence = [];
let playerSequence = [];
let level = 0;

let isPlaying = false;
let acceptingInput = false;
let roundToken = 0;

const statusHeading = document.getElementById("status");
const startButton = document.getElementById("startButton");
const buttons = document.querySelectorAll(".btn");

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start or restart the game.
startButton.addEventListener("click", startGame);

async function startGame() {
    roundToken++;
    const token = roundToken;

    gameSequence = [];
    playerSequence = [];
    level = 0;

    isPlaying = true;
    acceptingInput = false;

    buttons.forEach(button => {
        button.classList.remove("flash", "userflash");
    });

    statusHeading.classList.remove("game-over");
    statusHeading.textContent = "Get ready...";
    startButton.textContent = "Restart Game";

    await wait(350);

    if (token !== roundToken) return;

    nextRound(token);
}

// Add one colour and play the complete sequence.
async function nextRound(token) {
    if (!isPlaying || token !== roundToken) return;

    level++;
    playerSequence = [];

    const randomIndex = Math.floor(Math.random() * colors.length);
    gameSequence.push(colors[randomIndex]);

    acceptingInput = false;
    statusHeading.textContent = `Level ${level}: Watch the sequence`;

    await wait(450);

    for (const color of gameSequence) {
        if (!isPlaying || token !== roundToken) return;

        const button = document.getElementById(color);

        button.classList.add("flash");
        await wait(320);
        button.classList.remove("flash");

        await wait(180);
    }

    if (!isPlaying || token !== roundToken) return;

    acceptingInput = true;
    statusHeading.textContent = `Level ${level}: Your turn!`;
}

// Handle player input.
buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (!isPlaying || !acceptingInput) return;

        const selectedColor = button.id;

        button.classList.add("userflash");

        setTimeout(() => {
            button.classList.remove("userflash");
        }, 180);

        playerSequence.push(selectedColor);

        const currentIndex = playerSequence.length - 1;

        if (playerSequence[currentIndex] !== gameSequence[currentIndex]) {
            gameOver();
            return;
        }

        if (playerSequence.length === gameSequence.length) {
            acceptingInput = false;
            statusHeading.textContent = "Correct! Next round...";

            const token = roundToken;

            setTimeout(() => {
                if (isPlaying && token === roundToken) {
                    nextRound(token);
                }
            }, 700);
        } else {
            statusHeading.textContent = `Level ${level}: Keep going!`;
        }
    });
});

// Stop the game after an incorrect answer.
function gameOver() {
    isPlaying = false;
    acceptingInput = false;
    roundToken++;

    statusHeading.classList.add("game-over");
    statusHeading.textContent =
        `Game Over! You reached Level ${level}. Play again?`;

    startButton.textContent = "Play Again";
}
