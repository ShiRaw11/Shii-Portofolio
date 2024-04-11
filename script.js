const chatButton = document.getElementById('chat-button');
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendMessageButton = document.getElementById('send-message');
const chatHistory = document.getElementById('chat-history');
const closeIcon = document.getElementById('close-icon'); //
const WhatsApp = document.getElementsByClassName('message')

const botResponses = {
    "hello": "Hi there! How can I help you today?",
    "how are you": "I'm doing well, thanks for asking! How are you?",
    "projects": "I have done several projects! Check out the projects on the website for more details.",
    "open to work": "Yes! I am currently open to wotk, both remote and onsite? If you have a project offer please reach me through my email.",

    "how can I get you?":"please reach me through my email, whatsapp or linked in!! For faster responses, please reach me through my email. Look forward to hearing from you!!😌",
    "okay, thank you":"You are welcome, feel free to contact me for futher details"
    // Add more questions and responses here
  };

chatButton.addEventListener('click', () => {
    chatButton.style.display = 'none';
    chatWindow.style.display = 'block';
   
});

// Hide chat window and show chat button when close icon is clicked
closeIcon.addEventListener('click', () => {
    chatButton.style.display = 'block';
    chatWindow.style.display = 'none';
});
// Function to add a message to the chat history

sendMessageButton.addEventListener('click', sendMessage);

// Handle enter key press in chat input
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
function displayMessage(message, sender) {
  
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
      

        if (typeof message === 'string') {
          messageElement.innerText = message;
        } else {
          messageElement.appendChild(message); 
        }
      
        chatHistory.appendChild(messageElement);
     
        chatHistory.scrollTop = chatHistory.scrollHeight;  
    
}
function sendMessage() {
    
    const message = userInput.value.trim().toLowerCase();
    if (message !== '') {
     
      displayMessage(message, 'user');
  
      const keywords = message.split(/\s+/); 

      let responseFound = false;
      for (const keyword of keywords) {
        if (botResponses.hasOwnProperty(keyword)) {
          response = botResponses[keyword];
         
          responseFound = true;
          break; 
        }
      }
      if (!responseFound) {
        const phoneNumber = '0728409707';
                const whatsappLink = `https://wa.me/${phoneNumber}?text=Hi,%20I%20have%20a%20question.`;
            
                const message = document.createElement('a'); 
                message.href = whatsappLink;
                message.target = '_blank';
                message.textContent = 'Chat on Whatsapp';
            
                displayMessage("Please reach me via Whatsapp for such questions", 'bot');
                displayMessage(message);

                userInput.value = '';
      }
  
      else{
     
        setTimeout(() => {
            displayMessage(response, 'bot');
        }, 1000);
   
      userInput.value = '';
    }
}
}
