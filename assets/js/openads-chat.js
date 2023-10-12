(function() {
  'use strict';

  const queryString = new URLSearchParams(window.location.search);

  const isLocalhost = window.location.hostname === 'localhost';
  const endpoint = isLocalhost ?
    'http://localhost:3000/chatbot' :
    'https://masteringjs-backend-production.up.railway.app/chatbot';

  const widget = document.createElement('div');
  widget.innerHTML = '<div class="openads-widget-text">Ask me anything about JavaScript</div>';
  widget.classList.add('openads-widget');
  widget.onclick = function() {
    document.querySelector('.allwrapper').classList.add('openads-chat-fixed');
    chatWindow.classList.add('show');
  };
  document.body.appendChild(widget);

  const chatWindow = document.querySelector('.openads-chat');

  const chatExit = document.querySelector('.openads-chat-exit');
  chatExit.onclick = function() {
    document.querySelector('.allwrapper').classList.remove('openads-chat-fixed');
    chatWindow.classList.remove('show');
  };

  const newMessageInput = document.querySelector('.openads-chat-input textarea');
  const newMessageButton = document.querySelector('.openads-chat-submit');
  const chatHistory = document.querySelector('.openads-chat-history');

  setTimeout(() => {
    if (queryString.has('show-chatbot')) {
      document.querySelector('.allwrapper').classList.add('openads-chat-fixed');
      chatWindow.classList.add('show');
    }
  }, 0);

  window.submitOpenAdsMessage = async function submitOpenAdsMessage() {
    const value = newMessageInput.value;
    if (!value) {
      return;
    }
    newMessageButton.disabled = true;
    newMessageButton.innerHTML = '<img src="https://terravera.com/images/loader.gif">';
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
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: value })
      }).then(res => res.json());
    } catch (err) {

    }

    newMessageInput.value = '';
    newMessageInput.disabled = false;
    newMessageButton.disabled = false;
    newMessageButton.innerHTML = '&raquo;';

    const newResponse = document.createElement('div');
    newResponse.classList.add('openads-chat-history-message');
    let sources;
    if (response.sources) {
      sources = response.sources.map(source => `
        <div class="openads-chat-message-source-body">
          <a href="${source.link}" target="_blank">${source.title}</a>
        </div>
      `).join('\n');
    } else {
      sources = `
        <div class="openads-chat-message-source-body">
          <a href="${response.link}" target="_blank">${response.title}</a>
        </div>
      `;
    }
    newResponse.innerHTML = `
    <div class="participant">
      <img src="/assets/logo.svg">
      Mastering JS
    </div>
    <div class="openads-chat-message-body">
      ${marked.parse(response.content)}
    </div>
    <div class="openads-chat-message-source">
      <div class="openads-chat-message-source-header">
        <div class="openads-chat-message-source-header-line">&nbsp;</div>
        <div style="background-color: white; display: inline-block; padding-right: 0.5em;">
          Source
        </div>
      </div>
      ${sources}
    </div>
    `;
    chatHistory.appendChild(newResponse);
  };

  document.querySelector('.openads-chat-input textarea').addEventListener('keypress', ev => {
    if (ev.code === 'Enter') {
      window.submitOpenAdsMessage();
    }
  });
})();