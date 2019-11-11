var token = sessionStorage.getItem('token'); //Guardar cookies
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

/* ------ Funciones HTML ------ */
$(function(){
  var stickyHeaderTop = $('#section2').offset().top;
    $(window).scroll(function(){
      if($(window).width() > 768){
        if( $(window).scrollTop() > stickyHeaderTop ) {
                $('#section2').css({position: 'fixed', top: '0px', width: '100%'});
                $('#sticky').css('display', 'block');
        } else {
                $('#section2').css({position: 'static', top: '0px'});
                $('#sticky').css('display', 'none');
        }
      }
      else {
        $('#section2').css({position: 'static', top: '0px'});
        $('#sticky').css('display', 'none');
      }
    });
});

window.onload = function(){
  getItems();
}

window.onresize = function(event){
  if($(window).width() <= 768){
    $('#section2').css({position: 'static', top: '0px'});
    $('#sticky').css('display', 'none');
  }
}

/* ------ Funciones para la DB ------ */
//https://woofshop.herokuapp.com/
function getItems(){
  $.ajax({
    url: 'https://woofshop.herokuapp.com/items',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    dataType: 'json',
    //data: json_to_send,
    success: function(data){
      console.log(data);
    },
    error: function(error_msg) {
      console.log(error_msg);
      var err = (error_msg.responseText)
    }
  });
}
