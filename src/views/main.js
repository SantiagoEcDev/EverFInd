// Conecta con el servidor Socket.IO
const socket = io();

// Elementos del DOM
const clientsTotal = document.getElementById('client-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Sonido para nuevos mensajes
const messageTone = new Audio('./assets/message-tone.mp3');

// Escucha el evento 'clients-total' para actualizar el número de clientes conectados

// Maneja el envío de mensajes cuando se envía el formulario
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

// Función para enviar un mensaje al servidor
function sendMessage() {
  if (messageInput.value === '') return;

  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };

  socket.emit('message', data);
  addMessageToUI(true, data);
  messageInput.value = '';
}

// Escucha el evento 'chat-message' para mostrar los mensajes en el chat
socket.on('chat-message', (data) => {
  messageTone.play();
  addMessageToUI(false, data);
});

// Agrega un mensaje al chat en el lado del cliente
function addMessageToUI(isOwnMessage, data) {
  clearFeedback();

  const element = `
    <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
      <p class="message">
        ${data.message}
        <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
      </p>
    </li>
  `;

  messageContainer.innerHTML += element;
  scrollToBottom();
}

// Hace scroll hacia abajo para mostrar el mensaje más reciente
function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

// Escucha eventos relacionados con la escritura de mensajes
messageInput.addEventListener('focus', (e) => {
  socket.emit('feedback', {
    feedback: `${nameInput.value} está escribiendo un mensaje ✍🏻`,
  });
});

messageInput.addEventListener('keypress', (e) => {
  socket.emit('feedback', {
    feedback: `${nameInput.value} está escribiendo un mensaje ✍🏻`,
  });
});

messageInput.addEventListener('blur', (e) => {
  socket.emit('feedback', {
    feedback: '',
  });
});

// Maneja el evento 'feedback' para mostrar la información de escritura
socket.on('feedback', (data) => {
  clearFeedback();
  const element = `
    <li class="message-feedback">
      <p class="feedback" id="feedback">${data.feedback}</p>
    </li>
  `;
  messageContainer.innerHTML += element;
});

// Limpia la información de escritura cuando es necesario
function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
