import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const socket = io(); //const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
const user = document.getElementById("user__name").innerHTML;
const chatbox = document.getElementById("user__input");
const messagesContainer = document.getElementById("messages__container");

socket.emit("auth", user);

chatbox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      saveMessage(user, chatbox.value);
      chatbox.value = "";
    }
  }
});

const loadMessages = (callback) => {
  socket.on("server:messages", callback);
};

const saveMessage = (user, message) => {
  socket.emit("client:newMessage", {
    user,
    message,
  });
};

const loadNewMessage = (callback) => {
  socket.on("server:newMessage", callback);
};

const oneMessage = (message) => {
  const container = document.createElement("div");

  container.innerHTML = `
    <h3>${message.user}:</h3>
    <p>${message.message}</p>
  `;

  return container;
};

const renderMessages = (messages) => {
  messagesContainer.innerHTML = "";
  messages.forEach((message) => messagesContainer.append(oneMessage(message)));
};

const appendNewMessage = (message) => {
  messagesContainer.append(oneMessage(message));
};

window.addEventListener("DOMContentLoaded", () => {
  loadMessages(renderMessages);
  loadNewMessage(appendNewMessage);
});
