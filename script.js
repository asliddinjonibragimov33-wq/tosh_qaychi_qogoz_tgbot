
const computerButton = document.getElementById("computer-mode");
const onlineButton = document.getElementById("online-mode");

const menu = document.querySelector(".menu");
const profile = document.querySelector(".profile");
const gameSection = document.getElementById("game-section");

const backButton = document.getElementById("back-button");
const gameTitle = document.getElementById("game-title");
const result = document.getElementById("result");
const challenge = document.getElementById("challenge");

let playerScore = 0;
let computerScore = 0;

const choices = {
    rock: "✊ Tosh",
    paper: "✋ Qog‘oz",
    scissors: "✌️ Qaychi"
};

const challenges = [
    "Biror hayvonning ovoziga taqlid qiling 🐱",
    "10 soniyada uchta meva nomini ayting 🍎",
    "O‘zingiz yoqtirgan o‘yin haqida gapiring 🎮",
    "Biror filmni imo-ishora bilan tushuntiring 🎬",
    "Qiziqarli bir fakt ayting 🧠"
];

computerButton.addEventListener("click", () => {
    openGame("computer");
});

onlineButton.addEventListener("click", () => {
    alert("Onlayn rejimni keyingi bosqichda backend orqali ulaymiz!");
});

function openGame(mode) {
    menu.classList.add("hidden");
    profile.classList.add("hidden");
    gameSection.classList.remove("hidden");

    gameTitle.textContent = "Kompyuterga qarshi";
    playerScore = 0;
    computerScore = 0;

    updateScore();

    result.textContent = "Tanlovingizni amalga oshiring!";
    challenge.classList.add("hidden");
}

backButton.addEventListener("click", () => {
    gameSection.classList.add("hidden");
    menu.classList.remove("hidden");
    profile.classList.remove("hidden");
});

document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
        playRound(button.dataset.choice);
    });
});

function playRound(playerChoice) {
    const options = ["rock", "paper", "scissors"];

    const computerChoice =
        options[Math.floor(Math.random() * options.length)];

    let message = "";

    if (playerChoice === computerChoice) {
        message = "Durrang! 🤝";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        playerScore++;
        message = "Siz g‘alaba qozondingiz! 🎉";
    } else {
        computerScore++;
        message = "Siz yutqazdingiz! 😅";
    }

    result.textContent =
        `Siz: ${choices[playerChoice]} | ` +
        `Kompyuter: ${choices[computerChoice]} — ${message}`;

    updateScore();

    if (playerChoice !== computerChoice) {
        showChallenge(playerChoice, computerChoice);
    } else {
        challenge.classList.add("hidden");
    }
}

function updateScore() {
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
}

function showChallenge(playerChoice, computerChoice) {
    if (playerScore > computerScore) {
        challenge.classList.add("hidden");
        return;
    }

    const randomIndex = Math.floor(Math.random() * challenges.length);
    challenge.textContent = "🎯 Shart: " + challenges[randomIndex];
    challenge.classList.remove("hidden");
}