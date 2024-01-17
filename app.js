"use strict";
const express = require("express");
const path = require("path");
const { createServer } = require("node:http");
const { join } = require("node:path");
const app = express();
const server = createServer(app);
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;
const { get } = require("http");
const io = new Server(server);
// import { users, userJoin } from "./utils/functions";
// const {users, userJoin} =require("./utils/functions");
app.use(express.static(path.join(__dirname, "public")));

const users = [];
function userJoin(id, username, wpm) {
  const user = { id, username, wpm, status: false, progress: 0, currWpm: 0 };
  users.push(user);
  return user;
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}
function getUserIndex(id) {
  return users.findIndex((user) => user.id === id);
}
function setWordspermin(id, score) {
  const index = getUserIndex(id);
  users[index].wpm = score;
}
function getRoomUsers() {
  return users.map((user) => user.username);
}
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}
let checkIfunique = [];
function getUniqueUsername(username) {
  const randomId = Math.floor(100 + Math.random() * 900);
  if (checkIfunique.every((id) => id !== randomId)) {
    checkIfunique.push(randomId);
    return username + randomId;
  } else {
    return getUniqueRoomId();
  }
}
io.on("connection", (socket) => {
  socket.on("join", ({ username, wpm }) => {
    let formatUsername = username;
    let user;
    if (users.every((user) => user.username !== username)) {
      user = userJoin(socket.id, username, 0);
    } else {
      formatUsername = getUniqueUsername(username);
      user = userJoin(socket.id, formatUsername, 0);
    }
    const usersArr = getRoomUsers();
    io.emit("add user progress", users);
    io.emit("display board", users);
    io.emit("user joined", `${username} joined the game.`);
    console.log("user-joined, " + users.length + " users on server");
  });

  socket.on("typing score", (wordspermin) => {
    setWordspermin(socket.id, wordspermin);
    io.emit("display board", users);
  });

  socket.on("ready status", function () {
    const i = getUserIndex(socket.id);
    users[i].status = true;
    io.emit("sendStatusReady", socket.id);
    if (users.every((user) => user.status === true)) {
      io.emit("start game");
    }
  });

  socket.on("not ready", function () {
    const i = getUserIndex(socket.id);
    io.emit("sendStatusNotReady", socket.id);
    users[i].status = false;
  });

  socket.on("progress", (value, wpm) => {
    const index = getUserIndex(socket.id);
    users[index].progress = Number(value);
    users[index].currWpm = Number(wpm);
    io.emit("user progress", users);
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    const usersArr = getRoomUsers();
    if (user) {
      io.emit("user left", `${user.username} left the game`);
      io.emit("game users", usersArr);
      // console.log("user left");

      console.log("user-left" + " no. of users on server: " + users.length);
    }
  });
});

server.listen(PORT, () => {
  console.log("server running at http://localhost:3000");
});
