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
  }
})();