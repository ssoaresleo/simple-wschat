var io = io();

let chat = document.getElementById("chat");
let form = document.getElementById("form");
let messageTextarea = document.getElementById("message");
let sendButton = document.getElementById("sendButton");

let chatMessages = document.getElementById("chat-messages");

const user = { id: "", name: "" };

function sanitizeMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  return div.innerHTML;
}

function createMessageTemplate(name, message, isCurrentUser) {
  return `
    <div class="${
      isCurrentUser
        ? "flex items-start gap-3 justify-end"
        : "flex items-start gap-3"
    }">
      <div class="grid gap-1">
        <div class="${
          isCurrentUser ? "font-medium text-right" : "font-medium"
        }">${isCurrentUser ? "You" : name}</div>
        <div class="bg-${isCurrentUser ? "primary" : "muted"} text-${
    isCurrentUser ? "primary-foreground" : "muted-foreground"
  } px-3 py-2 rounded-lg max-w-[75%]">
          ${sanitizeMessage(message)}
        </div>
      </div>  
    </div>
  `;
}

function handleSendMessage() {
  const message = messageTextarea.value.trim();

  if (message) {
    io.emit("message", {
      userId: user.id,
      name: user.name,
      message: message,
    });

    messageTextarea.value = "";
  }
}

function processMessage(data) {
  const { name, message } = data;
  const isCurrentUser = user.id === data.userId;

  const messageDate = createMessageTemplate(name, message, isCurrentUser);

  chatMessages.innerHTML += messageDate;
}

function handleSubmit(event) {
  event.preventDefault();

  let name = document.getElementById("name");

  if (!name) {
    alert("Por favor digite seu nome");
    return;
  } else {
    form.style.display = "none";
    chat.style.display = "flex";

    const userId = crypto.randomUUID();

    user.id = userId;
    user.name = name.value;
  }
}

io.on("message", processMessage);
form.addEventListener("submit", handleSubmit);
sendButton.addEventListener("click", handleSendMessage);
