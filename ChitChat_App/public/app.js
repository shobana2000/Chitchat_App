$(function () {
  var socket = io();
  var $chatWindow = $('#chat-window');
  var $userInput = $('#user-input');

  function sendMessage() {
    var userMessage = $userInput.val().trim();

    if (userMessage !== '') {
      appendMessage('You', userMessage, 'user');
      $userInput.val('');
      socket.emit('chat message', userMessage);
    }
  }

  function appendMessage(sender, message, type) {
    var messageElement = $('<div>').addClass('message').addClass(type + '-message');
    messageElement.text(sender + ': ' + message);
    $chatWindow.append(messageElement);

    // Scroll to the bottom of the chat window
    $chatWindow.scrollTop($chatWindow[0].scrollHeight);
  }

  // Binding the sendMessage function to the "Enter" key
  $userInput.keypress(function (e) {
    if (e.which === 13) {
      e.preventDefault(); // Prevents the default behavior (e.g., newline)
      sendMessage();
    }
  });

  // Binding the sendMessage function to the "Send" button click
  $('#send-button').click(function () {
    sendMessage();
  });

  socket.on('chat message', function (msg) {
    appendMessage('vino', msg, 'bot');
  });

});
