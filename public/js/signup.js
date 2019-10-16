$( "#signup" ).click(function() {
  var name = $('#name').val()
  var email = $('#email').val()
  var pass = $('#pass1').val()

  if($("#pass1").val() == $("#pass2").val()){

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
        json_to_send2 = {
          "email": data.email,
          "password": pass
        }
        json_to_send2 = JSON.stringify(json_to_send2);
        console.log(json_to_send2);
        $.ajax({
          //url: 'http://trackr-tec.herokuapp.com/users/login', // url: 'https://tuapp.herokuapp.com/users/login'
          url: 'http://localhost:3000/login',
          headers: {
              'Content-Type':'application/json',
              "Access-Control-Allow-Origin": "*"
          },
          method: 'POST',
          dataType: 'json',
          data: json_to_send2,
          success: function(data){
            // guardar token en localstorage o cookie
            localStorage.setItem('token', data.token);
            window.location = './index.html';
          },
          error: function(error_msg) {
            console.log(error_msg);
            var err = (error_msg.responseText)
          }

        });
      },
      error: function(error_msg) {
        console.log(error_msg);
        var err = (error_msg.responseText)
        console.log(err);
      }
    });
  }
});
