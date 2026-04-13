const cards = document.querySelectorAll(".card");
const outputs = document.querySelectorAll(".output");
const startButton = document.getElementsByClassName("start-button")[0];

let draggedCard = null; 
let counter = 0;
const word_Pieces = [

 {
  question:"What fruit is this ",
  answer: "kiwi", 
  piecesarray: ["w", "i", "i", "k"],

 },
];

cards.forEach((card, index) => {
    card.textContent = word_Pieces[counter].piecesarray[index];
    
    
})

cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
        draggedCard = card; 
        console.log("Dragging:", card);
        
        
        e.dataTransfer.setData("text/plain", "moving");
    });
});

outputs.forEach(output => {
    output.addEventListener("dragover", (e) => {
        e.preventDefault(); 
        console.log("Dragging over output");
    });
    
   
    output.addEventListener("drop", (e) => {
        e.preventDefault();
        
        if (draggedCard) {


            draggedCard.style.width = "";
            draggedCard.style.height = "";

            draggedCard.classList.add("dropped-card");
            
            output.appendChild(draggedCard);
            console.log("Card dropped!");
            

            
        }
            
    });
});



 