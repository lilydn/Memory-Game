
/********** Page Variables **********/

const cards = [];

const gameState = {
  playerName: 'guest',
  level: 12,
  theme: 'food',
  wrongGuesses: 0,
}

const mainPage = document.querySelector('.main-page');
const settinsPage = document.querySelector(".settings-page");
const saveBtn = settinsPage.querySelector("[type=submit]");
const newGameBtn = document.querySelector(".new-game-btn");

const gameContainer = document.querySelector('.game-container');






/********** Page Functions **********/

const initGame = () => {
  openSettingsPage();
  clearCardsArray();
  
}

const openSettingsPage = () => {
  settinsPage.classList.remove("closed");
  settinsPage.addEventListener("click", handleClickOutside);
  window.addEventListener("keyup", handleKeyUp);
  saveBtn.addEventListener("click", handleSave);
}

const handleClickOutside = (e) => {
  if (e.target === e.currentTarget) return closeSettingsPage();
}

const handleKeyUp = (e) => {  
  if (e.key === "Escape") return closeSettingsPage();
}

const handleSave = (e) => {
  e.preventDefault();
  updateGameState();
  renderGameState();
  closeSettingsPage();
}

const closeSettingsPage = () => {
  settinsPage.classList.add("closed");
  saveBtn.removeEventListener("click", handleSave);
  settinsPage.removeEventListener("click", handleClickOutside);
  window.removeEventListener("keyup", handleKeyUp);
}

const updateGameState = () => {
  gameState.playerName = settinsPage.querySelector("#name-input").value || 'guest';
  gameState.level = settinsPage.querySelector("[name=level]:checked").value;
  gameState.theme = settinsPage.querySelector("[name=theme]:checked").value;
}

const renderGameState = () => {
  displayPlayerName();
  createCards();
  renderBoard();
}

const displayPlayerName = () => {
  mainPage.querySelector("#name-display").textContent = gameState.playerName;
}

const createCards = () => {
  let uniqePairId = randomGenerator(gameState.level/2, 20);
  uniqePairId.forEach(id => {
    createCard(id,'a');
    createCard(id,'b');
  });
}

const createCard = (id,suffix) => {
  const newCard = {
    id: `${id}${suffix}`,
    imgSrc: `./img/${gameState.theme}/img-${id}.png`,
    flipped: false,
  }
  cards.push(newCard);
}
    

const randomGenerator = (amount, total) => {
  let res = [];
  for (let i = 0; i < amount; i++) {
    let num = Math.floor(Math.random() * total + 1);
    res.indexOf(num)<0 ? res.push(num) : i--;
  }
  return res;
}


const renderBoard = () => {
  cards.forEach(card => {
    const newEl = document.createElement('div');
    newEl.classList.add('.card');
    newEl.style.backgroundImage = `url(${card.imgSrc})`;
    gameContainer.appendChild(newEl);
    newEl.addEventListener("click", flipCard);
  });
  setGridRatio();
}


const setGridRatio = () => {
  switch (gameState.level) {
    case "12":
      gameContainer.style.gridTemplateRows = `repeat(3,minmax(80px, 200px))`;
      gameContainer.style.gridTemplateColumns = `repeat(4, minmax(80px, 200px))`;
      break;
    case "18":
      gameContainer.style.gridTemplateRows = `repeat(3,minmax(60px, 200px))`;
      gameContainer.style.gridTemplateColumns = `repeat(6, minmax(60px, 200px))`;
      break;
    case "24":
      gameContainer.style.gridTemplateRows = `repeat(4,minmax(40px, 200px))`;
      gameContainer.style.gridTemplateColumns = `repeat(6, minmax(40px, 200px))`;
      break;
    case "30":
      gameContainer.style.gridTemplateRows = `repeat(5,minmax(30px, 200px))`;
      gameContainer.style.gridTemplateColumns = `repeat(6, minmax(30px, 200px))`;
      break;   
  }
}



const flipCard = () => {

}








function clearCardsArray() {
  while (cards.length) {
    cards.pop();
  }
}

/********** Page Function Calls **********/
initGame();
newGameBtn.addEventListener("click", initGame);


