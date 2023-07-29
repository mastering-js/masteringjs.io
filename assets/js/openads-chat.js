(function() {
  'use strict';

  const endpoint = 'https://mj-chatbot-production.up.railway.app/api/chat';

  const widget = document.createElement('div');
  widget.innerText = 'Ask me anything about JavaScript';
  widget.classList.add('openads-widget');
  widget.onclick = function() {
    chatWindow.classList.add('show');
  };
  document.body.appendChild(widget);

  const chatWindow = document.querySelector('.openads-chat');

  const chatExit = document.querySelector('.openads-chat-exit');
  chatExit.onclick = function() {
    chatWindow.classList.remove('show');
  };

  const newMessageInput = document.querySelector('.openads-chat-input input');
  const newMessageButton = document.querySelector('.openads-chat-submit');
  const chatHistory = document.querySelector('.openads-chat-history');

  window.submitOpenAdsMessage = async function submitOpenAdsMessage() {
    const value = newMessageInput.value;
    if (!value) {
      return;
    }
    newMessageButton.disabled = true;
    newMessageInput.disabled = true;

    const newMessage = document.createElement('div');
    newMessage.classList.add('openads-chat-history-message');
    newMessage.innerHTML = `
    <div class="participant">
      <img src="/assets/images/guest.svg">
      Guest
    </div>
    <div class="openads-chat-message-body">
      ${value}
    </div>
    `;
    chatHistory.appendChild(newMessage);

    let response;
    let error = false;
    try {
      response = await fetch('https://mj-chatbot-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: value })
      }).then(res => res.json()).then(res => res.response);
    } catch (err) {

    }

    newMessageInput.value = '';
    newMessageInput.disabled = false;
    newMessageButton.disabled = false;

    const newResponse = document.createElement('div');
    newResponse.classList.add('openads-chat-history-message');
    newResponse.innerHTML = `
    <div class="participant">
      <img src="/assets/logo.svg">
      Mastering JS
    </div>
    <div class="openads-chat-message-body">
      ${response}
    </div>
    `;
    chatHistory.appendChild(newResponse);
  };
})();