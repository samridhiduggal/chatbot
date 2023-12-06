document.addEventListener("DOMContentLoaded", function() {
    var chatContainer = document.getElementById("chat-container");
    var sendBtn = document.getElementById("send-btn");
    var inputField = document.getElementById("data");
  
    sendBtn.addEventListener("click", function() {
      var value = inputField.value.trim();
      if (value !== "") {
        var userMessage = createUserMessage(value);
        chatContainer.appendChild(userMessage);
        inputField.value = "";
  
        sendMessage(value);
      }
    });
  
    function createUserMessage(text) {
      var userInbox = createMessageContainer("user-inbox");
      var msgHeader = createMessageHeader(text);
      userInbox.appendChild(msgHeader);
      return userInbox;
    }
  
    function createBotMessage(text) {
      var botInbox = createMessageContainer("bot-inbox");
      var icon = createIcon();
      var msgHeader = createMessageHeader(text);
      botInbox.appendChild(icon);
      botInbox.appendChild(msgHeader);
      return botInbox;
    }
  
    function createMessageContainer(className) {
      var messageContainer = document.createElement("div");
      messageContainer.classList.add(className);
      return messageContainer;
    }
  
    function createIcon() {
      var icon = document.createElement("div");
      icon.classList.add("icon");
      icon.innerHTML = '<i class="fa fa-user" aria-hidden="true"></i>';
      return icon;
    }
  
    function createMessageHeader(text) {
      var msgHeader = document.createElement("div");
      msgHeader.classList.add("msg-header");
      msgHeader.innerHTML = '<p>' + text + '</p>';
      return msgHeader;
    }
  
    function sendMessage(text) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "message.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var reply = xhr.responseText.trim();
          var botMessage = createBotMessage(reply);
          chatContainer.appendChild(botMessage);
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      };
      xhr.send("text=" + encodeURIComponent(text));
    }
  });
  