var itemInPage = {}

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

$(document).on("click",".button-sizes", function () {
  $(".button-actived").toggleClass("button-actived")
  $(this).toggleClass("button-actived");
});

window.onload = function(){
  var id = getUrlParameter('id');
  getItemById(id);
}

$("#confirmAddToCart").click(function(){
  hideModal()
  addToCarrito2()
})

$("#cancelAddToCart").click(function(){
  hideModal()
})

$("#carrito").click(function(){
  var sizeId = $(".button-actived").attr('id')
  if(sizeId != undefined){
    itemInPage.sizeOrder = sizeId
    if(localStorage.getItem("item1") == null){
      localStorage.setItem("count", 1);
      localStorage.setItem("item1", JSON.stringify(itemInPage));
    }
    else {
      exists = false
      count = localStorage.getItem("count");
      count = parseInt(count);
      var item
      for (var i = 1; i <= count ; i++) {
        item = JSON.parse(localStorage.getItem("item" + i))
        if(item._id == itemInPage._id && item.sizeOrder == sizeId){
          addToCartModal();
          return ;
        }
      }
      localStorage.setItem("count", count+1);
      localStorage.setItem("item" + (count+1), JSON.stringify(itemInPage));
    }
  }
})

function addToCarrito2(){
  count = localStorage.getItem("count");
  count = parseInt(count) + 1;
  localStorage.setItem("count", count);
  localStorage.setItem("item" + count, JSON.stringify(itemInPage));
}

function blockSizes(sizes){
  available = {
    xs: false,
    m: false,
    s: false,
    l: false
  }
  for (i in sizes){
    if(sizes[i].quantity > 0){
      available[sizes[i].size] = true
    }
  }
  for(size in available){
    if(available[size] == false){
      $("#" + size).addClass("is-static")
    }
  }
}

function getItem(item){
  $("#name").html(item.name)
  $("#price").html("$" + item.price + " MXN")
  blockSizes(item.sizes)
}

/* ------ Funciones para la DB ------ */

function getItemById(id){
  $.ajax({
    url: 'https://woofshop.herokuapp.com/itemById/' + id,
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    success: function(data){
      itemInPage = data
      getItem(data)
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

/* ------ Funciones para los modales ------ */
//Quita los modales
function hideModal(){
  var modal = document.querySelector('.is-active');
  modal.classList.toggle('is-active');
}

//Activa logout modal
function addToCartModal(){
  $( "#carritoModal" ).addClass("is-active");
}
