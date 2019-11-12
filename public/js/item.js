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
};

$(document).ready(function() {

  $('.navbar-burger').on('click', function(e) {
    e.preventDefault();

    // Get the target from the "data-target" attribute
    var target = $(this).data('target');
    var $target = $('#' + target);

    // Toggle the class on both the "navbar-burger" and the "navbar-menu"
    $(this).toggleClass('is-active');
    $target.toggleClass('is-active');
  });
});

$( "#signup" ).hover(
  function() {
    $("#usericon").css('color', 'hsl(0, 0%, 50%)');
    $("#textsignin").css('color', 'hsl(0, 0%, 50%)');
  }, function() {
    $("#usericon").css('color', 'white');
    $("#textsignin").css('color', 'white');
  }
);

$( "#searchbar" ).hover(
  function() {
    $("#searchIcon").css('color', 'hsl(0, 0%, 50%)');
    $("#searchbarInput").addClass('searchInput2')
    $("#searchbarInput").removeClass('searchInput')
  }, function() {
    $("#searchIcon").css('color', 'white');
    $("#searchbarInput").removeClass('searchInput2')
    $("#searchbarInput").addClass('searchInput')
  }
);

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function removeOtherSizes(){
  $( ".button-actived" ).each(function( index ) {
    $( this ).removeClass("button-actived")
  });
}

$(document).on("click","#size", function () {
  removeOtherSizes();
  $(this).toggleClass("button-actived");
});

window.onload = function(){
  var id = getUrlParameter('id');
  getItemById(id);
}

function getItemById(id){

  $.ajax({
    url: 'https://woofshop.herokuapp.com/itemById/' + id,
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    data: json_to_send,
    dataType: 'json',
    success: function(data){
      console.log(data);
    },
    error: function(error_msg) {
      console.log(error_msg);
      console.log("Error:" + error_msg.status);
    }
  })
}

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
