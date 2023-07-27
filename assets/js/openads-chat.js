(function() {
  'use strict';

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

  window.submitOpenAdsMessage = function submitOpenAdsMessage() {
    const value = newMessageInput.value;
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

    setTimeout(() => {
      newMessageInput.value = '';
      newMessageInput.disabled = false;
      newMessageButton.disabled = false;
    }, 2000);
  };
})();