/*Переменные и константы*/
const screens = document.querySelectorAll(".screen");
const board = document.querySelector(".board");
const platform = document.querySelector(".platform");
const userScore = document.querySelector(".score");
const startBTN = document.querySelector("#start");
const colors = [
  "#dd2a80",
  "#963df4",
  "#29559c",
  "#d3d758",
  "#2fdbe6",
  "#69d444",
  "#bdf116",
  "#873750",
];
let platPos = 175;
let score = 0;
userScore.innerHTML = score;

/*Начало игры*/
startBTN.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
  createRandomFigur();
});

function stopGame() {
  userScore.innerHTML = score;
  userScore.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Игра окончена! <br/ >Ваш счёт: <span class = "primary">${score}<span></h1>`;
}

/*Поведение платформы*/
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
    case "d":
    case "D":
      platMove("right");
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      platMove("left");
      break;
  }
});

function platMove(direction) {
  if (direction === "right") {
    platform.style.left = `${(platPos += 10)}px`;
    if (platPos === 345) {
      platPos -= 10;
    }
  } else if (direction === "left") {
    platform.style.left = `${(platPos -= 10)}px`;
    if (platPos === 5) {
      platPos += 10;
    }
  }
}

/*Создание и логика поведения фигур*/
function createRandomFigur() {
  const figure = document.createElement("div");
  const color = getRandomColor();
  const figureWidth = getRandomeNumber(30, 90);
  const figureHeight = getRandomeNumber(30, 90);
  const { width } = board.getBoundingClientRect();
  const x = getRandomeNumber(0, width - figureWidth);
  const y = getRandomeNumber(0, 20);
  let positionY = y;

  figure.classList.add("figure");
  figure.style.width = `${figureWidth}px`;
  figure.style.height = `${figureHeight}px`;
  figure.style.top = `${y}px`;
  figure.style.left = `${x}px`;
  figure.style.background = color;
  board.append(figure);

  let id = setInterval(() => {
    if (
      positionY === 570 - figureHeight &&
      !(platPos - 15 >= x || platPos == x || platPos + 155 <= x)
    ) {
      clearInterval(id);
      figure.remove();
      score++;
      userScore.innerHTML = score;
      createRandomFigur();
    } else {
      positionY++;
      figure.style.top = `${positionY}px`;
      if (positionY === 600 - figureHeight) {
        clearInterval(id);
        figure.remove();
        platform.remove();
        stopGame();
      }
    }
  }, 5);
}

function getRandomeNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
