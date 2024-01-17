//********************#1 Predefined objects***********************
// a. Constants and variables & event listeners
// 1. elements
const closeModal = document.querySelector(".close-modal");
const timeWatch = document.querySelector(".stopwatch");

const modalTime = document.querySelector(".modalTime");
const modalHighScore = document.querySelector("#modalHighScore");
const modalCharacters = document.querySelector("#modalCharacters");
const modalAccuracy = document.querySelector("#modalAccuracy");
const modalwordsCounter = document.querySelector("#modalWordsPerMinute");

// const characterTyped = document.querySelector("#charactersTyped");
const wordsCounter = document.querySelector("#wordsPerMinute");

// const charactersHeading = document.querySelector(".characters");
const showWPM = document.querySelector(".showWpm");

const inpField = document.querySelector(".input-field");
const typingText = document.querySelector("#text-content");
const tryAgain = document.querySelector(".bx-reset");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const transparentOverlay = document.querySelector(".transparent-overlay");

const closeLeaderboard = document.querySelector(".close-leaderboard");
const LeaderboardModal = document.querySelector(".leader-board-menu");
const openLeaderboard = document.querySelector(".leaderboard-button");
const closeProfileButton = document.querySelector(".close-profile");
const userProfileMenu = document.querySelector(".userProfile");
const openProfileButton = document.querySelector(".profileToggleButton");
const leftHeaderContent = document.querySelector(".leftHeaderContent");
const header = document.querySelector(".header");
const kangarooType = document.querySelector(".myBrand");
const cursor = document.getElementById("cursor");
const contentDiv = document.querySelector(".text-content-div");
const letterContainer = document.querySelector(".container");
const CapsLock = document.querySelector(".caps-lock");
const bar = document.querySelector("#progress-you");
// const volume = document.querySelector("#volu");
// const soundsModal = document.getElementById("sound-system");
// const soundModalBtn = document.querySelector(".sound-btn");
let difficulty = document.getElementById("DifficultySelect");
let currentWord = document.querySelector(".word.current");
let currentLetter = document.querySelector(".letter.current");
let tryAgainModal = document.querySelector(".btn");
document.querySelector(".CopyrightDate").innerHTML = new Date().getFullYear(); // set copyright date
// 2. variables
let correctSpans = 0;
let timer = 0;
let timeInc = 0;
let i = 0;
let isTyping = false;
let words;
let countCorrectChar = 0;
let wpm = 0;
let HighScore = 0;
let UserRank;
let previousLength = 0;
let typedChar;
let LettersArr = [];
let quoteLength = 0;
let timeTaken;
let mistakes = 0;
let counter = 0;
let progress = 0;
//3. Adding event listener to input and check for keypresses
inpField.disabled = true;
cursor.style.display = "none";
inpField.addEventListener("keydown", function (event) {
  if (event.getModifierState("CapsLock")) {
    CapsLock.classList.remove("hidden");
  } else {
    if (!CapsLock.classList.contains("hidden")) {
      CapsLock.classList.add("hidden");
    }
  }
  if (event.key === "Backspace" || event.key === 8) {
    event.preventDefault();
    backspacePressed();
  }

  if (
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === "Home" ||
    event.key === "HomeLeft" ||
    event.key === "End" ||
    event.key === "EndRight"
  ) {
    event.preventDefault();
  }

  if (inpField.selectionStart !== inpField.selectionEnd) {
    inpField.selectionStart = inpField.selectionEnd;
  }
});

inpField.addEventListener("paste", function (event) {
  event.preventDefault();
});

// volume.addEventListener("input", function () {
//   if (volume.value == 0) {
//     soundModalBtn.innerText = "🔇";
//   } else if (volume.value <= 50) {
//     soundModalBtn.innerText = "🔉";
//   } else {
//     soundModalBtn.innerText = "🔊";
//   }
// });
//testing.
// header.addEventListener("click", function () {
//   const html = `      <div class="progress-bar">
//   <div class="player-name">YOU:</div>
//   <div class="bar-thumb"></div></div>`;
//   const weffs = document.querySelector(".progress-bar-container");
//   weffs.innerHTML += html;
// });
//focus
document.addEventListener("keydown", () => inpField.focus());
typingText.addEventListener("click", () => inpField.focus());

// b. functions:
//1. random Words
const randomWords =
  "in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also".split(
    " "
  );
function getRandomWords() {
  let arr = [];
  for (let i = 0; i < 30; i++) {
    let randomI = Math.floor(randomWords.length * Math.random());
    arr.push(randomWords[randomI]);
    if (i == 29) {
      randomI = Math.floor(randomWords.length * Math.random());
      arr.push(randomWords[randomI] + ".");
    }
  }
  return arr.join(" ");
}
let noOfWords = 0;

// 2. display text
function fetchQuote() {
  const quoteString =
    // difficulty.value === "easy"?
    getRandomWords();
  // : difficulty.value === "medium"
  // ? newQuotes[Math.floor(Math.random() * 361)]:
  // "What's not an excuse to do nothing.";
  let quoteArray = quoteString.split(" ");
  noOfWords = quoteArray.length;
  LettersArr = quoteArray.flatMap((each) => each.split(""));
  quoteLength = LettersArr.length;
  const letters = quoteArray
    .map((each) =>
      each
        .split("")
        .map((letter) => `<letter class="letter">${letter}</letter>`)
        .join("")
    )
    .map((each) => `<div class = "word">${each}</div>`);
  document.querySelector("#text-content").innerHTML = letters.join("");
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
}

function closeModalFunction() {
  if (!modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
  }
  if (!overlay.classList.contains("hidden")) {
    overlay.classList.add("hidden");
  }
  if (!LeaderboardModal?.classList.contains("hidden")) {
    LeaderboardModal?.classList.add("hidden");
  }
  if (!userProfileMenu.classList.contains("hidden")) {
    userProfileMenu.classList.add("hidden");
  }
  // if (!soundsModal.classList.contains("hidden")) {
  //   soundsModal.classList.add("hidden");
  // }
  if (!transparentOverlay.classList.contains("hidden")) {
    transparentOverlay.classList.add("hidden");
  }
}

function addClass(el, classname) {
  el.classList.add(classname);
}
function removeClass(el, name) {
  el.className = el.className.replace(name, "");
}

function showSummary() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  showWPM.classList.remove("hidden");
  let actualAccuracy = Math.floor(100 - (mistakes / quoteLength) * 100);
  modalwordsCounter.innerHTML = wpm;
  modalTime.innerHTML = `${120 - timeInc}s`;
  modalAccuracy.innerHTML = `${actualAccuracy > 0 ? actualAccuracy : "0"}%`;
  modalCharacters.innerHTML = `<span style="color: #d4d4d4;">${counter}</span>/${
    quoteLength + noOfWords - 1
  }`;
  modalHighScore.innerHTML = `${HighScore}`;
  wordsCounter.innerHTML = wpm;
}

function endGame() {
  clearInterval(timer);
  inpField.removeEventListener("input", initTyping);
  inpField.disabled = true;
  typingText.style.marginTop = "";
  cursor.style.display = "none";

  leftHeaderContent.classList.remove("hidden");
  header.style.justifyContent = null;
  contentDiv.style.overflow = "auto";
  sendProgress();
  getWPM();
  showSummary();
  sendUsernameAndHighScore();
  showOnGameEnd();
  const statuscircle = document.querySelectorAll(".status-circle");
  statuscircle.forEach(function (div) {
    if (div.classList.contains("hidden")) {
      div.classList.remove("hidden");
    }
  });
}

function newGame() {
  if (leftHeaderContent.classList.contains("hidden")) {
    leftHeaderContent.classList.remove("hidden");
    header.style.justifyContent = null;
  }
  progress = 0;
  bar.style.width = "0%";
  cursor.style.display = "";
  cursor.style.animation = "blink 1.2s infinite";
  cursor.style.top = "30.2504px";
  cursor.style.left = "23.2249px";
  cursor.style.display = "block";
  contentDiv.style.overflow = "hidden";
  fetchQuote();
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
  timeInc = 120;
  timer = 0;
  wpm = 0;
  timeWatch.innerText = `02:00`;
  i = 0;
  counter = 0;
  mistakes = 0;
  isTyping = false;
  inpField.value = "";
  inpField.addEventListener("input", initTyping);
  timeWatch.style.color = null;
  showWPM.classList.add("hidden");
  contentDiv.style.overflow = "hidden";
  previousLength = 0;
  typingText.style.marginTop = "";
}

function getWPM() {
  // timeTaken = new Date() - timeTaken;
  // wpm = Math.round((counter / 5) * (60000 / timeTaken));

  setWPM();
  if (wpm > HighScore) {
    HighScore = wpm;
  }
}
function setWPM() {
  const timepassed = 120 - timeInc;
  wpm = Math.round((counter / 5) * (60 / timepassed));
}
function spacePressed() {
  const isFirstLetter = currentLetter === currentWord.firstChild;
  inpField.value = "";
  i = 0;
  if (!isFirstLetter) {
    // playSound();
    let expectedEl = currentLetter?.innerHTML ?? " ";
    if (expectedEl !== " ") {
      const lettersMissed = [
        ...document.querySelectorAll(
          ".word.current .letter:not(.correctText):not(.incorrectText)"
        ),
      ];
      lettersMissed.forEach((letter) => {
        addClass(letter, "missed");
        progress++;
      });
    }
    if (currentWord.nextSibling) {
      removeClass(currentWord, "current");
      addClass(currentWord.nextSibling, "current");
      progress++;
      if (currentLetter) {
        removeClass(currentLetter, "current");
      } else {
        counter++;
      }
      addClass(currentWord.nextSibling.firstChild, "current");
    } else {
      endGame();
    }
    cursor.style.transition = "top 0.08s linear, left 0.08s linear";
    getLineAndCursor();
    checkIfInspected();
  } else {
    // playWrong();
  }
}

function backspacePressed() {
  currentWord = document.querySelector(".word.current");
  currentLetter = document.querySelector(".letter.current");
  inpField.value = "";
  i = 0;
  const previousWord = currentWord.previousSibling;
  const isFirstLetter = currentLetter === currentWord.firstChild;
  if (previousWord || !isFirstLetter) {
    // playSound();
  }
  if (currentLetter && isFirstLetter) {
    if (previousWord) {
      removeClass(currentWord, "current");
      removeClass(currentLetter, "current");
      addClass(previousWord, "current");
      currentWord = document.querySelector(".current");
      progress--;
      if (!previousWord.lastChild.classList.contains("missed")) {
        counter--;
      }
    }
  }
  if (currentLetter && !isFirstLetter) {
    if (currentLetter.previousSibling.classList.contains("correctText")) {
      counter--;
    }
    removeClass(currentLetter, "current");
    addClass(currentLetter.previousSibling, "current");
    removeClass(currentLetter.previousSibling, "incorrectText");
    removeClass(currentLetter.previousSibling, "correctText");
    removeClass(currentLetter.previousSibling, "missed");
    progress--;
  }

  if (!currentLetter) {
    addClass(currentWord.lastChild, "current");
    if (currentWord.lastChild.classList.contains("correctText")) {
      counter--;
    }
    removeClass(currentWord.lastChild, "incorrectText");
    removeClass(currentWord.lastChild, "correctText");
    removeClass(currentWord.lastChild, "missed");
    if (currentWord.lastChild.classList.contains("extra")) {
      currentWord.lastChild.remove();
    } else {
      progress--;
    }
  }
  cursor.style.transition = "";
  getLineAndCursor();
}

function getLineAndCursor() {
  const containerDivRect = letterContainer.getBoundingClientRect();
  const nextLetter = document.querySelector(".letter.current");
  const nextWord = document.querySelector(".word.current");
  const nextWordRect = nextWord.getBoundingClientRect();
  const parentDivRect = contentDiv.getBoundingClientRect();
  const parentRelativeTop = nextWordRect.top - parentDivRect.top;
  const relativeTop = nextWordRect.top - containerDivRect.top;
  cursor.style.top =
    (nextLetter || nextWord).getBoundingClientRect().top -
    containerDivRect.top +
    2 +
    "px";
  cursor.style.left =
    (nextLetter || nextWord).getBoundingClientRect()[
      nextLetter ? "left" : "right"
    ] -
    containerDivRect.left -
    3 +
    "px";
  const hbythree = parentDivRect.height / 3;

  if (parentDivRect.width > 600) {
    if (parentRelativeTop > 90) {
      const margin = parseFloat(typingText.style.marginTop || "0px");
      typingText.style.marginTop = `${margin - 2 * hbythree}px`;
      cursor.style.top = `${relativeTop - 2 * hbythree}px`;
    }
  } else {
    if (parentRelativeTop > 60) {
      const margin = parseFloat(typingText.style.marginTop || "0px");
      typingText.style.marginTop = `${margin - hbythree}px`;
      cursor.style.top = `${relativeTop - hbythree}px`;
    }
  }

  if (parentRelativeTop < 0) {
    const margin = parseFloat(typingText.style.marginTop || "0px");
    typingText.style.marginTop = `${margin + 36.1}px`;
    cursor.style.top = `${relativeTop + 36.1}px`;
  }
}

function checkIfInspected() {
  const currentLetter = document.querySelector(".letter.current");
  if (currentLetter) {
    const allLetters = document.querySelectorAll(".word .letter");
    const position = Array.from(allLetters).indexOf(currentLetter) + 1;
    const extras = [...document.querySelectorAll(".word .extra")];

    const actualPositiontoCheck = position - extras.length;
    if (currentLetter.innerHTML !== LettersArr[actualPositiontoCheck - 1]) {
      currentLetter.innerHTML = LettersArr[actualPositiontoCheck - 1];
    }
  }
}

// function playSound() {
//   let audio = new Audio(`../audio/${correctSong.value}`);
//   audio.volume = volume.value / 100;
//   audio.play();
// }

// function playWrong() {
//   let audio = new Audio(`../audio/error/${errorSong.value}`);
//   audio.volume = volume.value / 100;
//   audio.play();
// }

function initTyping() {
  currentWord = document.querySelector(".word.current");
  currentLetter = document.querySelector(".letter.current");
  typedChar = inpField.value.split("")[i];
  i++;
  if (typedChar == " ") {
    spacePressed();
  } else if (typedChar == null) {
    backspacePressed();
  } else if (currentLetter) {
    if (currentLetter.innerText !== typedChar) {
      mistakes++;
      // playWrong();
    } else {
      counter++;
      // playSound();
    }
    progress++;
    addClass(
      currentLetter,
      currentLetter.innerText == typedChar ? "correctText" : "incorrectText"
    );
    removeClass(currentLetter, "current");
    if (!currentLetter.nextSibling && !currentWord.nextElementSibling) {
      endGame();
    }
    if (currentLetter.nextSibling) {
      addClass(currentLetter.nextSibling, "current");
    }
    checkIfInspected();
  } else {
    // playWrong();
    const incorrectLetter = document.createElement("letter");
    incorrectLetter.innerHTML = typedChar;
    incorrectLetter.className = "letter incorrectText extra";
    currentWord.appendChild(incorrectLetter);
    mistakes++;
  }
  cursor.style.transition = "top 0.08s linear, left 0.08s linear";
  getLineAndCursor();
}

//******************** MODALS***********************
function toggleLeaderboardFunction() {
  LeaderboardModal.classList.toggle("hidden");
}
closeModal.addEventListener("click", closeModalFunction);
overlay.addEventListener("click", closeModalFunction);
transparentOverlay.addEventListener("click", closeModalFunction);
closeLeaderboard?.addEventListener("click", function () {
  toggleLeaderboardFunction();
  closeModalFunction();
});
openLeaderboard?.addEventListener("click", function () {
  toggleLeaderboardFunction();
  overlay.classList.remove("hidden");
});

// soundModalBtn.addEventListener("click", function () {
//   soundsModal.classList.toggle("hidden");
//   transparentOverlay.classList.toggle("hidden");
// });
openProfileButton.addEventListener("click", function () {
  userProfileMenu.classList.toggle("hidden");
  transparentOverlay.classList.toggle("hidden");
});

closeProfileButton.addEventListener("click", function () {
  userProfileMenu.classList.add("hidden");
  transparentOverlay.classList.add("hidden");
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModalFunction();
  }
});
