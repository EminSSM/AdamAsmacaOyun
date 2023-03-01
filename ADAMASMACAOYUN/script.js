const word_e1 = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_e1 = document.getElementById("success-message");
const wrongletters_e1 = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.querySelector("#message");
const btn = document.getElementById('play-again');

function GetRandomwords() {
  const words = ["javascript", "java", "python","jquery","kotlin"];

  return words[Math.floor(Math.random() * words.length)];
}

const correctletters = [];
const wrongletters = [];
let selectedWord = GetRandomwords();

console.log(GetRandomwords());

function displayWord() {
  word_e1.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
    
    <div class = "letter">
    ${correctletters.includes(letter) ? letter : ""}
    </div>
    `
    )
    .join("")}`;
  const w = word_e1.innerText.replace(/\n/g, "");
  if (w === selectedWord) {
    popup.style.display = "flex";
    message_e1.innerText = "Tebrikler Kazandınız:)";
  }
}
function UpdateWrongLetters() {
  wrongletters_e1.innerHTML = `
${wrongletters.length > 0 ? "<h3>Hatalı Harfler</h3>" : ""}
${wrongletters.map((letter) => `<span>${letter}<span>`)}
`;

  items.forEach((item, index) => {
    const errorcount = wrongletters.length;
    if (index < errorcount) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  if(wrongletters.length === items.length){
    popup.style.display = 'flex';
    message_e1.innerText = 'Maalesef Kaybettiniz:('
    popup.style.backgroundColor='red';
  };
}
  function displayMessage(){
    message.classList.add("show");
    setTimeout(() => {
      message.classList.remove("show");
    }, 2000);
}
btn.addEventListener('click',function(e) {
  correctletters.splice(0);
  wrongletters.splice(0);
  selectedWord = GetRandomwords();

  displayWord();
  UpdateWrongLetters();

  popup.style.display = 'none';
}); 


window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 222) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctletters.includes(letter)) {
        correctletters.push(letter);
         displayWord();
      } else {
        displayMessage();
      }
    } 
    else {
      if (!wrongletters.includes(letter)) {
        wrongletters.push(letter);
        UpdateWrongLetters();
      }
      else{
        displayMessage();
      }
    }
  }
});
displayWord();
