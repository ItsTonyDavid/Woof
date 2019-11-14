var token = sessionStorage.getItem('token'); //Guardar cookies
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

window.onload = function() {
  if(token){
    window.location = './tienda.html';
  }
};

$( "#login" ).click(function() {
  var email = $('#email').val()
  var pass = $('#pass').val()

  json_to_send = {
    "email": email,
    "password": pass
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://woofshop.herokuapp.com/login',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      sessionStorage.setItem('token', data.token);
      window.location = './tienda.html';
    },
    error: function(error_msg) {
      console.log(error_msg);
      var err = (error_msg.responseText)
    }
  });

});
