const chatButton = document.getElementById('chat-button');
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendMessageButton = document.getElementById('send-message');
const chatHistory = document.getElementById('chat-history');
const closeIcon = document.getElementById('close-icon'); 
const WhatsApp = document.getElementsByClassName('message')

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const closeBtn = document.getElementById('close-btn');

  hamburger.addEventListener('click', () => {
      drawer.classList.toggle('show');
  });

  closeBtn.addEventListener('click', () => {
      drawer.classList.remove('show');
  });

  document.addEventListener('click', (event) => {
      if (!drawer.contains(event.target) && event.target !== hamburger) {
          drawer.classList.remove('show');
      }
  });
});


const botResponses = {
  "default": "Hello, thank you for reaching out. Your message has been sent to email and we will reach out shortly.",
 
};
// Show chat window when chat button is clicked
chatButton.addEventListener('click', () => {
  chatButton.style.display = 'none';
  chatWindow.style.display = 'block';
});

// Hide chat window and show chat button when close icon is clicked
closeIcon.addEventListener('click', () => {
  chatButton.style.display = 'block';
  chatWindow.style.display = 'none';
});

// Handle sending messages
sendMessageButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      sendMessage();
  }
});

// Function to display a message in the chat history
function displayMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);

  if (typeof message === 'string') {
      messageElement.innerHTML = message;
  } else {
      messageElement.appendChild(message);
  }

  chatHistory.appendChild(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Function to handle sending messages
function sendMessage() {
  const message = userInput.value.trim().toLowerCase();
  if (message !== '') {
      displayMessage(message, 'user');

      // Display default response
      setTimeout(() => {
          displayMessage(botResponses.default, 'bot');
      }, 500);

      // Display WhatsApp contact option
      setTimeout(() => {
          const phoneNumber = '0728409707';
          const whatsappLink = `https://wa.me/${phoneNumber}?text=Hi,%20I%20have%20a%20question.`;
          const combinedMessage = `You can also send a message through <a href="${whatsappLink}" target="_blank">Chat with me in WhatsApp</a>.`;
          displayMessage(combinedMessage, 'bot');
      }, 1000);

      userInput.value = '';
  }
}