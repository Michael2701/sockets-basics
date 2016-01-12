var socket = io();


socket.on('connect', function(){
    console.log('Connected to socket.io server!')
});

socket.on('message', function(message){
    console.log('New message:');
    console.log(message.text);
    var timeStamp = moment.utc(message.timestamp);
    jQuery('.messages').append('<p><strong>'+ timeStamp.local().format('h:mma ')+'</strong>' + message.text + '</p>');
});

//handles submitting of new message
var $form = jQuery('#message-form');


$form.on('submit',function(event){
   event.preventDefault();
   var $message = $form.find("input[name='message']");
  
   socket.emit('message',{
       text: $message.val() 
   });
   $message.val('');
   
});
