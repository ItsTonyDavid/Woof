

$( "#signup" ).click(function() {
  var name = $('#name').val() + " " + $('#lastname').val()
  var email = $('#email').val()
  var pass = $('#password').val()

  json_to_send = {
    "name": name,
    "email": email,
    "password": pass
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    //url: 'http://trackr-tec.herokuapp.com/users/login', // url: 'https://tuapp.herokuapp.com/users/login'
    url: 'http://localhost:3000/createUser',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      console.log(data);
    },
    error: function(error_msg) {
      console.log(error_msg);
      var err = (error_msg.responseText)

      if(err == '{\"error\":\"User does not exist\"}'){
        username.classList.remove("is-success");
        username.classList.add("is-danger");
      }
      else{
        username.classList.remove("is-danger");
        username.classList.add("is-success");
      }
    }

  });

  /* $.ajax({
    //url: 'http://trackr-tec.herokuapp.com/users/login', // url: 'https://tuapp.herokuapp.com/users/login'
    url: 'http://localhost:3000/createUser',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      // guardar token en localstorage o cookie
      localStorage.setItem('token', data.token);
      window.location = './dashboard.html';
    },
    error: function(error_msg) {
      console.log(error_msg);
      var err = (error_msg.responseText)

      if(err == '{\"error\":\"User does not exist\"}'){
        username.classList.remove("is-success");
        username.classList.add("is-danger");
      }
      else{
        username.classList.remove("is-danger");
        username.classList.add("is-success");
      }

    }
  }); */

});
