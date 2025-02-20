let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice=choices[randomIndex];
    const emojiMap = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    document.getElementById('computerChoice').innerText=emojiMap[computerChoice];
    return computerChoice;
}

function getHumanChoice(callback) {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    const newButtons = document.querySelectorAll('.btn');

    newButtons.forEach(button => {
        button.addEventListener('click', function handleClick() {
            const choice = button.id.replace('btn', '').toLowerCase();
            callback(choice);
        });
    });
}


function playRound(humanChoice, computerChoice) {
    let resultText = '';
    if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        resultText = 'You Win!';
        humanScore++;
    } else if (humanChoice === computerChoice) {
        resultText = "It's a tie!";
    } else {
        resultText = "You lose!";
        computerScore++;
    }
    document.getElementById('comments').innerText = `Computer's choice was: ${computerChoice}`;
    document.getElementById('choice').innerText = resultText;
    document.getElementById('humanScore').innerText = `Player: ${humanScore}`;
    document.getElementById('computerScore').innerText = `Computer: ${computerScore}`;
}

function game() {
    let roundsPlayed = 0;

    function playNextRound() {
        if (roundsPlayed < 5) {
            getHumanChoice(function (humanChoice) {
                const computerChoice = getComputerChoice();
                playRound(humanChoice, computerChoice);
                roundsPlayed++;

                if (roundsPlayed < 5) {
                    playNextRound();
                } else {
                    let finalMessage = humanScore === computerScore ? "It's a tie!"
                        : humanScore > computerScore ? "You win the game!"
                        : "You lose the game!";
                    console.log(finalMessage);
                    document.getElementById('choice').innerText = finalMessage;

                    const buttons = document.querySelectorAll('.btn');
                    buttons.forEach(button => {
                        button.disabled = true;
                    });
                }
                const emojiMap = {
                    rock: '✊',
                    paper: '✋',
                    scissors: '✌️'
                };
                document.getElementById('humanChoice').innerText=emojiMap[humanChoice];
            });
        }
    }

    playNextRound();
}

window.onload = game;