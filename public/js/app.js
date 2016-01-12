var socket = io();
var name = getQueryVariable('name') || 'anonymous';
var room = getQueryVariable('room');

socket.on('connect', function(){
    console.log('Connected to socket.io server!')
});

//jQuery('.messages').append('<br>'+ name+' joined '+room+' room');

socket.on('message', function(message){
    console.log('New message:');
    console.log(message.text);
    
    var timeStamp = moment.utc(message.timestamp);
    var $message = jQuery('.messages');
   
    $message.append('<p><strong>' + message.name + '  ' + timeStamp.local().format('h:mma ')+'</strong>' + '</p>');
    $message.append('<p>' + message.text + '</p>');
       
});

//handles submitting of new message
var $form = jQuery('#message-form');


$form.on('submit',function(event){
   event.preventDefault();
   var $message = $form.find("input[name='message']");
  
   socket.emit('message',{
       text: $message.val() ,
       name: name
   });
   $message.val('');
   
});
