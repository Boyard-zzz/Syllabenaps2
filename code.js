const cards = document.querySelectorAll(".card");
const outputs = document.querySelectorAll(".output");
const startButton = document.querySelector(".start-button");
const againButton = document.querySelector(".again-button");
const nextButton = document.querySelector(".next-button");
const moveCountSpan = document.getElementById("moveCount");
const levelNumSpan = document.getElementById("levelNum");
const questionEl = document.getElementById("question");

let draggedCard = null;
let currentLevel = 0;
let moves = 0;
let userAnswer = [];

const wordPieces = [
    {
        question: "What fruit is this?",
        answer: ["k", "i", "w", "i"],
        pieces: ["w", "i", "i", "k"]
    },
    {
        question: "What animal says meow?",
        answer: ["c", "a", "t"],
        pieces: ["t", "c", "a"]
    },
    {
        question: "What animal says moeeehhhh?",
        answer: ["c", "o", "w"],
        pieces: ["o", "w", "c"]
    },
    {
        question: "where do you play on",
        answer: ["x","b","o","x"],
        pieces: ["o", "b", "x","x"],
    },
];

function loadGame() {
    // Reset user answer
    userAnswer = [];
    for(let i = 0; i < wordPieces[currentLevel].answer.length; i++) {
        userAnswer.push("");
    }
    
    // Clear outputs
    for(let i = 0; i < outputs.length; i++) {
        outputs[i].innerHTML = "";
        outputs[i].classList.remove("filled");
        outputs[i].style.display = i < wordPieces[currentLevel].answer.length ? "flex" : "none";
    }
    
    // Reset cards to container
    const cardContainer = document.querySelector(".card_container");
    for(let i = 0; i < cards.length; i++) {
        cardContainer.appendChild(cards[i]);
        cards[i].style.display = i < wordPieces[currentLevel].pieces.length ? "flex" : "none";
        cards[i].classList.remove("dropped-card");
        cards[i].setAttribute("draggable", "true");
        
        // Set the letter text
        if(i < wordPieces[currentLevel].pieces.length) {
            cards[i].textContent = wordPieces[currentLevel].pieces[i];
        }
    }
    
    // Update UI
    moveCountSpan.textContent = moves;
    levelNumSpan.textContent = currentLevel + 1;
    questionEl.textContent = wordPieces[currentLevel].question;
    
    console.log("Level loaded:", wordPieces[currentLevel].question);
    console.log("Cards text:", Array.from(cards).map(c => c.textContent));
}

function checkWin() {
    const wordLength = wordPieces[currentLevel].answer.length;
    let guessed = "";
    for(let i = 0; i < wordLength; i++) {
        guessed += userAnswer[i];
    }
    let correct = "";
    for(let i = 0; i < wordLength; i++) {
        correct += wordPieces[currentLevel].answer[i];
    }
    
    let allFilled = true;
    for(let i = 0; i < wordLength; i++) {
        if(userAnswer[i] === "") {
            allFilled = false;
            break;
        }
    }
    
    if(allFilled) {
        if(guessed === correct) {
            alert("Correct! 🎉");
            if(currentLevel < wordPieces.length - 1) {
                currentLevel++;
                moves = 0;
                loadGame();
            } else {
                alert("You completed all levels!");
            }
        } else {
            alert("Wrong! The correct word was: " + correct);
            moves = 0;
            loadGame();
        }
    }
}

// Drag start
for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("dragstart", function(e) {
        if(cards[i].parentElement.classList.contains("card_container")) {
            draggedCard = cards[i];
            e.dataTransfer.setData("text/plain", cards[i].textContent);
        }
    });
}

// Drop events
for(let i = 0; i < outputs.length; i++) {
    outputs[i].addEventListener("dragover", function(e) {
        e.preventDefault();
    });
    
    outputs[i].addEventListener("drop", function(e) {
        e.preventDefault();
        
        const wordLength = wordPieces[currentLevel].answer.length;
        
        if(i >= wordLength) return;
        if(outputs[i].innerHTML !== "") return;
        if(!draggedCard) return;
        
        // Place the card
        const letter = draggedCard.textContent;
        userAnswer[i] = letter;
        outputs[i].innerHTML = letter;
        outputs[i].classList.add("filled");
        
        // Remove the dragged card
        draggedCard.style.display = "none";
        draggedCard.setAttribute("draggable", "false");
        
        moves++;
        moveCountSpan.textContent = moves;
        
        console.log("Placed:", letter, "at position", i);
        console.log("User answer:", userAnswer);
        
        draggedCard = null;
        
        // Check win
        let allFilled = true;
        for(let j = 0; j < wordLength; j++) {
            if(userAnswer[j] === "") {
                allFilled = false;
                break;
            }
        }
        
        if(allFilled) {
            setTimeout(checkWin, 200);
        }
    });
}

// Buttons
againButton.addEventListener("click", function() {
    moves = 0;
    loadGame();
});

nextButton.addEventListener("click", function() {
    if(currentLevel < wordPieces.length - 1) {
        currentLevel++;
        moves = 0;
        loadGame();
    } else {
        alert("You're already at the last level!");
    }
});

startButton.addEventListener("click", function() {
    currentLevel = 0;
    moves = 0;
    loadGame();
});

// Start the game
loadGame();