let settings = {};
let actionHandlers = {};
let allHandlers = [];

let chat = [];

fetch('/settings').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function(data) {

    settings = data;
    const opts = {
        channels: [
            settings.channel
        ]
    };
    
    // Create a client with our options defined at the top of the file
    let client = new tmi.client(opts);
    
    
    // Register our event handlers (defined below)
    client.on('message', onMessageHandler);
    client.on('connected', onConnectedHandler);
    
    // Connect to Twitch:
    client.connect();
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});




// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    // If we have a chat that is too long, just remove the first one.
    if(chat.length >= settings.backlog_count) {
     chat.shift();
    }

    chat.push({context, msg, color: getRandomColor() });
    createListWithTemplate(chat);
}

function createListWithTemplate(chats) {
    const placeholder = document.getElementById('chat');
    const ul = document.createElement('ul');
    ul.classList.add('chat-logs');
    const template = document.getElementById('chat-template');
    chats.forEach((chat) => {
      const chatCard = document.importNode(template.content, true);
      chatCard.querySelector('.description').textContent = chat.msg;
      var name = chatCard.querySelector('.name');
      name.textContent = chat.context.username;
      name.style.color = chat.color;
      ul.appendChild(chatCard);
    });
    placeholder.replaceChildren(ul);
}

function randomVal(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

function getRandomColor() {
    return 'hsl(' + randomVal(0, 360) + ', ' + randomVal(30, 95) + '%,  ' + randomVal(40, 90) + '%)';
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}