import React, {Component} from 'react';
import Chatlist from './chatlist'
import './chat.css';
import io from 'socket.io-client';

const socket=io('http://:4000'); 




// var FADE_TIME = 150; // ms
//     var TYPING_TIMER_LENGTH = 400; // ms
//     var COLORS = [
//       '#e21400', '#91580f', '#f8a700', '#f78b00',
//       '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
//       '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
//     ];
  
//     // Initialize variables
//     var $window = $(window);
//     var $usernameInput = $('.usernameInput'); // Input for username
//     var $messages = $('.messages'); // Messages area
//     var $inputMessage = $('.inputMessage'); // Input message input box
  
//     var $loginPage = $('.login.page'); // The login page
//     var $chatPage = $('.chat.page'); // The chatroom page
  
//     // Prompt for setting a username
//     var username;
//     var connected = false;
//     var typing = false;
//     var lastTypingTime;
//     var $currentInput = $usernameInput.focus();
  
//     var socket = io();
  
//     function addParticipantsMessage (data) {
//       var message = '';
//       if (data.numUsers === 1) {
//         message += "there's 1 participant";
//       } else {
//         message += "there are " + data.numUsers + " participants";
//       }
//       log(message);
//     }
  
//    
  

  
//     // Log a message
//     function log (message, options) {
//       var $el = $('<li>').addClass('log').text(message);
//       addMessageElement($el, options);
//     }
  
//     // Adds the visual chat message to the message list
//     function addChatMessage (data, options) {
//       // Don't fade the message in if there is an 'X was typing'
//       var $typingMessages = getTypingMessages(data);
//       options = options || {};
//       if ($typingMessages.length !== 0) {
//         options.fade = false;
//         $typingMessages.remove();
//       }
  
//       var $usernameDiv = $('<span class="username"/>')
//         .text(data.username)
//         .css('color', getUsernameColor(data.username));
//       var $messageBodyDiv = $('<span class="messageBody">')
//         .text(data.message);
  
//       var typingClass = data.typing ? 'typing' : '';
//       var $messageDiv = $('<li class="message"/>')
//         .data('username', data.username)
//         .addClass(typingClass)
//         .append($usernameDiv, $messageBodyDiv);
  
//       addMessageElement($messageDiv, options);
//     }
  
//     // Adds the visual chat typing message
//     function addChatTyping (data) {
//       data.typing = true;
//       data.message = 'is typing';
//       addChatMessage(data);
//     }
  
//     // Removes the visual chat typing message
//     function removeChatTyping (data) {
//       getTypingMessages(data).fadeOut(function () {
//         $(this).remove();
//       });
//     }
  
//     // Adds a message element to the messages and scrolls to the bottom
//     // el - The element to add as a message
//     // options.fade - If the element should fade-in (default = true)
//     // options.prepend - If the element should prepend
//     //   all other messages (default = false)
//     function addMessageElement (el, options) {
//       var $el = $(el);
  
//       // Setup default options
//       if (!options) {
//         options = {};
//       }
//       if (typeof options.fade === 'undefined') {
//         options.fade = true;
//       }
//       if (typeof options.prepend === 'undefined') {
//         options.prepend = false;
//       }
  
//       // Apply options
//       if (options.fade) {
//         $el.hide().fadeIn(FADE_TIME);
//       }
//       if (options.prepend) {
//         $messages.prepend($el);
//       } else {
//         $messages.append($el);
//       }
//       $messages[0].scrollTop = $messages[0].scrollHeight;
//     }
  
//     // Prevents input from having injected markup
//     function cleanInput (input) {
//       return $('<div/>').text(input).html();
//     }
  
//     // Updates the typing event
//     function updateTyping () {
//       if (connected) {
//         if (!typing) {
//           typing = true;
//           socket.emit('typing');
//         }
//         lastTypingTime = (new Date()).getTime();
  
//         setTimeout(function () {
//           var typingTimer = (new Date()).getTime();
//           var timeDiff = typingTimer - lastTypingTime;
//           if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
//             socket.emit('stop typing');
//             typing = false;
//           }
//         }, TYPING_TIMER_LENGTH);
//       }
//     }
  
//     // Gets the 'X is typing' messages of a user
//     function getTypingMessages (data) {
//       return $('.typing.message').filter(function (i) {
//         return $(this).data('username') === data.username;
//       });
//     }
  
//     // Gets the color of a username through our hash function
//     function getUsernameColor (username) {
//       // Compute hash code
//       var hash = 7;
//       for (var i = 0; i < username.length; i++) {
//          hash = username.charCodeAt(i) + (hash << 5) - hash;
//       }
//       // Calculate color
//       var index = Math.abs(hash % COLORS.length);
//       return COLORS[index];
//     }
  
//     
  
//     $inputMessage.on('input', function() {
//       updateTyping();
//     });
  
//     // Click events
  
//     // Focus input when clicking anywhere on login page
//     $loginPage.click(function () {
//       $currentInput.focus();
//     });
  
//     // Focus input when clicking on the message input's border
//     $inputMessage.click(function () {
//       $inputMessage.focus();
//     });
  
//     // Socket events
  
//     // Whenever the server emits 'login', log the login message
//     socket.on('login', function (data) {
//       connected = true;
//       // Display the welcome message
//       var message = "Welcome to Socket.IO Chat – ";
//       log(message, {
//         prepend: true
//       });
//       addParticipantsMessage(data);
//     });
  
//     // Whenever the server emits 'new message', update the chat body
//     socket.on('new message', function (data) {
//       console.log(data)
//       addChatMessage(data);
//     });
  
//     // Whenever the server emits 'user joined', log it in the chat body
//     socket.on('user joined', function (data) {
//       log(data.username + ' joined');
//       addParticipantsMessage(data);
//     });
  
//     // Whenever the server emits 'user left', log it in the chat body
//     socket.on('user left', function (data) {
//       log(data.username + ' left');
//       addParticipantsMessage(data);
//       removeChatTyping(data);
//     });
  
//     // Whenever the server emits 'typing', show the typing message
//     socket.on('typing', function (data) {
//       addChatTyping(data);
//     });
  
//     // Whenever the server emits 'stop typing', kill the typing message
//     socket.on('stop typing', function (data) {
//       removeChatTyping(data);
//     });
  
//     socket.on('disconnect', function () {
//       log('you have been disconnected');
//     });
  
//     socket.on('reconnect', function () {
//       log('you have been reconnected');
//       if (username) {
//         socket.emit('add user', username);
//       }
//     });
  
//     socket.on('reconnect_error', function () {
//       log('attempt to reconnect has failed');
//     });

class Chat extends Component {//左侧组件
    constructor(props) {
        super();
        this.state = {
          nameinput:'',
          chatinput:'',          
          page:2,
          chatlist:[]
        }
        // this.setUsername=this.setUsername.bind(this)
        this.nameinput=this.nameinput.bind(this)
        this.chatinput=this.chatinput.bind(this)
        this.chatKeyDown=this.chatKeyDown.bind(this)        
        this.handleKeyDown=this.handleKeyDown.bind(this)
       
    }


     // Sets the client's username
    // setUsername () {
    //   let username = this.state.nameinput
  
    //   // If the username is valid
    //   if (username) {
    //     $loginPage.fadeOut();
    //     $chatPage.show();
    //     $loginPage.off('click');
    //     $currentInput = $inputMessage.focus();
  
    //     // Tell the server your username
    //     socket.emit('add user', username);
    //   }
    // }



    handleKeyDown(event){
        if (event.which === 13) {
          console.log(this.state.nameinput)
          this.setState({
            page:1
          })
         
        }
    }


    chatKeyDown(event){
      if (event.which === 13) {
        console.log(this.state.chatinput)
          // sendMessage();
          //     socket.emit('stop typing');
          //     typing = false;
          
          socket.emit('new message', {name:this.state.nameinput,message:this.state.chatinput})
          this.setState({
            chatinput:''
          })
      }
  }

    chatinput(i){
      if(i!==null){
        this.setState({
          chatinput:i.target.value
        })
      }
    }


    nameinput(i){
      if(i!==''){
        this.setState({
          nameinput:i.target.value
        })
      }
    }

    componentDidMount(){ 
      // socket.on('login', (data) => {
      //       console.log(data)
      // });
      // socket.on('add user', (data) => {
      //       console.log(data)
      // });
      socket.on('new message', (data) => {
        console.log(data)
        let chatlist=this.state.chatlist
        chatlist.push(data)
        this.setState({
          chatlist:chatlist,
        })
      });
   }


    render() {
      // console.log(this.state);
      let dom=this.state.page==1?

      <li className="chat page">
      <div className="chatArea">
        <ul className="messages">
        {this.state.chatlist!==''?<Chatlist data={this.state.chatlist}/>:null}
        </ul>
      </div>
      <input className="inputMessage" placeholder="Type here..." onKeyDown={this.chatKeyDown} value={this.state.chatinput} onChange={this.chatinput}/>
      </li>:

      <li className="login page">
              <div className="form">
                <h3 className="title">What's your nickname?</h3>
                <input className="usernameInput" onKeyDown={this.handleKeyDown} type="text" maxLength="14" value={this.state.nameinput} onChange={this.nameinput}/>
              </div>
      </li>
        return (
            
            <ul className="pages">
            {dom}
          </ul>
        )
    }
}
export default Chat;


