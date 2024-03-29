const socket = io();
const usersArr = [];
const urlParams = new URLSearchParams(window.location.search);
const gameUsers = document.querySelector(".all-users");
const readybutton = document.querySelector(".ready-btn");
// Get value for a specific parameter
const username = urlParams.get("username");
socket.emit("join", { username });
function sendUsernameAndHighScore() {
  socket.emit("typing score", HighScore);
}

function sendProgress() {
  minutes = String(Math.trunc(timeInc / 60));
  secs = String(timeInc % 60);
  timeWatch.innerHTML = `${minutes.padStart(2, "0")}:${secs.padStart(2, "0")}`;
  const totalChar = quoteLength + noOfWords - 1;
  const the_value = Math.trunc((progress / totalChar) * 100);
  setWPM();
  socket.emit("progress", the_value, wpm);
}

function initTimer() {
  timeInc--;
  sendProgress();
  if (timeInc === 0) {
    endGame();
  }
}

socket.on("add user progress", (users) => {
  const progressContainer = document.querySelector(".progress-bar-container");
  progressContainer.innerHTML = "";
  users.forEach((user) => {
    let progressHtml = `<div id="progress-bar" class="progress-bar">
    <div class="status-circle" id ="${user.id}status"></div>
    <div class = "user-curr-wpm" id ="${user.id}wpm">0 wpm</div>
    <div id="${user.id}nameid"  class="player-name">
    <p> ${user.username}</p> 
    <div class="player-progress-arrow"></div>
    </div>
    <div id ="${user.id}" class="bar-thumb">
            </div></div>`;
    progressContainer.innerHTML += progressHtml;
  });
});

socket.on("user progress", (users) => {
  users.forEach((user) => {
    const gotProgress = user.progress;
    const Userbar = document.getElementById(`${user.id}`);
    const userProfileName = document.getElementById(`${user.id}nameid`);
    const userCurrWpm = document.getElementById(`${user.id}wpm`);
    userCurrWpm.innerHTML = `${user.currWpm} wpm`;
    Userbar.style.width = gotProgress + "%";
    userProfileName.style.left = gotProgress + "%";
  });
});

const joinList = document.querySelector(".join-left-message");
function removeLastChildWithFade() {
  const lastChild = joinList.lastChild;
  if (lastChild) {
    lastChild.classList.add("fade-out");
    setTimeout(() => {
      lastChild.remove();
    }, 5000);
  }
}

// get status update
function onReadyBtnClick() {
  if (readybutton.innerHTML == "Get Ready") {
    playerReady();
  } else if (readybutton.innerHTML == "Ready") {
    notReady();
  }
}
function playerReady() {
  readybutton.innerHTML = "Ready";
  readybutton.style.background = "#72b01d";
  readybutton.style.color = "white";
  socket.emit("ready status");
}

socket.on("sendStatusReady", (msg) => {
  const playerStatus = document.getElementById(`${msg}status`);
  playerStatus.style.backgroundColor = "green";
});
socket.on("sendStatusNotReady", (msg) => {
  const playerStatus = document.getElementById(`${msg}status`);
  playerStatus.style.backgroundColor = "red";
});

function notReady() {
  readybutton.innerHTML = "Get Ready";
  readybutton.style.background = "white";
  readybutton.style.color = "#36395a";
  socket.emit("not ready");
}

// start match algorithm
const countering = document.querySelector(".countdown-number");
const counterdiv = document.querySelector(".countdown");
function showOnGameEnd() {
  readybutton.classList.remove("hidden");
}
counterValue = 4;
let counting;
function countCounter() {
  countering.innerHTML = counterValue;
  counterValue--;
  if (counterValue == 0) {
    clearInterval(counting);
    counterValue = 4;
  }
}
socket.on("start game", function () {
  counting = setInterval(countCounter, 1000);
  setTimeout(startMatchCountdown, 5000);
  newGame();
  notReady();
  const statuscircle = document.querySelectorAll(".status-circle");
  statuscircle.forEach(function (div) {
    if (!div.classList.contains("hidden")) {
      div.classList.add("hidden");
    }
  });
  counterdiv.classList.remove("hidden");
  readybutton.classList.add("hidden");
});
//11. start match
function startMatchCountdown() {
  inpField.disabled = false;
  timer = setInterval(initTimer, 1000);
  inpField.addEventListener("input", initTyping);
  isTyping = true;
  leftHeaderContent.classList.add("hidden");
  header.style.justifyContent = "center";
  timeWatch.style.color = "#e2b714";
  cursor.style.animation = "none";
  timeTaken = new Date();
  counterdiv.classList.add("hidden");
}

socket.on("user joined", (msg) => {
  const li = document.createElement("li");
  li.innerText = msg;
  joinList.appendChild(li);
  removeLastChildWithFade();
});
socket.on("user left", (msg) => {
  const li = document.createElement("li");
  li.classList.add("user-left-message");
  li.innerText = msg;
  joinList.appendChild(li);
  removeLastChildWithFade();
});
function outputUsers(users, id) {
  gameUsers.innerHTML = "";
  users.forEach((user) => {
    if (user.id === id) {
      const li1 = document.createElement("li");
      const li = document.createElement("li");
      li1.innerText = "Your name: ";
      gameUsers.appendChild(li1);
      li.classList.add("owner-name");
      li.innerText = user.username;
      gameUsers.appendChild(li);
    }
  });
}

socket.on("display board", (arr) => {
  const data = arr.sort((a, b) => b.wpm - a.wpm);
  const myContent = document.querySelector(".player-rankings");
  let i = 1;
  myContent.innerHTML = "";
  outputUsers(data, socket.id);
  data.forEach((player) => {
    if (player.id === socket.id) {
      if (i === 1) {
        const showinHtml = `
          <div class="playerCard activePlayerCard">
          <img src="images/1st.png" alt="First" class="top3Icons">
          <h3>${player.username}</h3>
          <p class="playerScore">${player.wpm} wpm</p>
        </div>`;
        i++;
        myContent.innerHTML += showinHtml;
      } else if (i === 2) {
        const showinHtml = `
          <div class="playerCard activePlayerCard">
          <img src="images/2nd.png" alt="First" class="top3Icons">
          <h3>${player.username}</h3>
          <p class="playerScore">${player.wpm} wpm</p>
        </div>`;
        i++;
        myContent.innerHTML += showinHtml;
      } else if (i === 3) {
        const showinHtml = `
          <div class="playerCard activePlayerCard">
          <img src="images/3rd.png" alt="First" class="top3Icons">
          <h3>${player.username}</h3>
          <p class="playerScore">${player.wpm} wpm</p>
        </div>`;
        i++;
        myContent.innerHTML += showinHtml;
      } else {
        const showinHtml = `
          <div class="playerCard activePlayerCard">
          <span class="PlayersRANK">${i})</span>
          <h3>${player.username}</h3>
          <p class="playerScore">${player.wpm} wpm</p>
        </div>`;
        i++;
        myContent.innerHTML += showinHtml;
      }
    } else {
      if (i === 1) {
        const showinHtml = `
          <div class="playerCard">
          <img src="images/1st.png" alt="First" class="top3Icons">
          <h3>${player.username}</h3>
          <p class="playerScore">${player.wpm} wpm</p>
        </div>`;
        i++;
        myContent.innerHTML += showinHtml;
      } else if (i === 2) {
        const showinHtml = `
          <div class="playerCard">
          <img src="images/2nd.png" alt="First" class="top3Icons">
          <h3>${player.username}</h3>
          <p class="playerScore">${player.wpm} wpm</p>
        </div>`;
        i++;
        myContent.innerHTML += showinHtml;
      } else if (i === 3) {
        const showinHtml = `
          <div class="playerCard">
          <img src="images/3rd.png" alt="First" class="top3Icons">
          <h3>${player.username}</h3>
          <p class="playerScore">${player.wpm} wpm</p>
        </div>`;
        i++;
        myContent.innerHTML += showinHtml;
      } else {
        const showinHtml = `
          <div class="playerCard">
          <span class="PlayersRANK">${i})</span>
          <h3>${player.username}</h3>
          <p class="playerScore">${player.wpm} wpm</p>
        </div>`;
        i++;
        myContent.innerHTML += showinHtml;
      }
    }
  });
});
