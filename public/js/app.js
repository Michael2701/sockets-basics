var socket = io();
var name = getQueryVariable('name') || 'anonymous';
var room = getQueryVariable('room');

var $room = jQuery('.room-name');
$room.text('Room name: '+room);

socket.on('connect', function(){
    console.log('Connected to socket.io server!');
    socket.emit('joinRoom',{
        name: name,
        room: room
    });
});

socket.on('message', function(message){
    console.log('New message:');
    console.log(message.text);
    
    var timeStamp = moment.utc(message.timestamp);
    var $messages = jQuery('.messages');
   
    $messages.append('<li style="line-height: 24px;"><strong>' + message.name + '  ' + timeStamp.local().format('h:mma ')+'</strong>' + '</li>');
    $messages.append('<li class="list-group-item">' + message.text + '</li>');      
});

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit',function(event){
   event.preventDefault();
   var $message = $form.find("input[name='message']");
   
   socket.emit('message',{
       text: $message.val(),
       name: name
   });
  
   $message.val('');
});
