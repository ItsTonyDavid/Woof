var token = sessionStorage.getItem('token'); //Guardar cookies
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
var items = []

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



window.onresize = function(event){
  if($(window).width() <= 768){
    $('#section2').css({position: 'static', top: '0px'});
    $('#sticky').css('display', 'none');
  }
}

window.onload = function(){
  var gender = getUrlParameter('gender');
  console.log(gender);
  if(gender){
    getItemsByGender(gender)
  }
  else{
    getItems();
  }
}

function createItemCards(req){
  items = req
  $("#card-items").empty()
  var count = 0
  var html = ""
  for (i in items){
    if(count == 0){
      html += '<div class="columns">'
    }
    html += '<div class="column is-3">'
      html += '<div class="card" style="margin-left: 19px; margin-right: 19px;">'
        html += '<div class="card-image">'
          html += '<figure class="image is-3by4">'
            html += '<img src="'
            html += 'https://bulma.io/images/placeholders/480x600.png'
            html+= '" alt="Placeholder image">'
          html += '</figure>'
        html += '</div>'
        html += '<div class="card-content">'
          html += '<div style="text-align:center;">'
            html += '<div class="">'
              html += items[i].name
            html += '</div>'
            html += '<br>'
            html += '<div class="">'
              html += items[i].price
            html += '</div>'
          html += '</div>'
        html += '</div>'
      html += '</div>'
    html += '</div>'
    count++
    if(count == 4){
      html += '</div>'
      count = 0
    }
  }
  $(html).appendTo("#card-items");
}

/* ------ Funciones para la DB ------ */
//https://woofshop.herokuapp.com/
function getItems(){
  var promise = $.ajax({
    url: 'https://woofshop.herokuapp.com/items',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    dataType: 'json',
    //data: json_to_send,
    success: function(data){
      console.log("OK getItems");
    },
    error: function(error_msg) {
      console.log(error_msg);
      var err = (error_msg.responseText)
    }
  });
  $.when(promise).done(function(data){createItemCards(data)})
}

function getItemsByGender(gender){

  json_to_send = {
    "gender": gender
  };

  json_to_send = JSON.stringify(json_to_send);

  var promise = $.ajax({
    url: 'https://woofshop.herokuapp.com/itemsbygender',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      console.log(data);
    },
    error: function(error_msg) {
      console.log(error_msg);
      var err = (error_msg.responseText)
    }
  });
  $.when(promise).done(function(data){createItemCards(data)})
}

/* ------ Otras funciones que ayudan al funcionamiento ------ */

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
