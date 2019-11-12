var token = sessionStorage.getItem('token'); //Guardar cookies
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
var numItems = 0;
var precioTotal = 0.00;

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

window.onload = function(){
  createItemTable()
}

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

function getNumItems(){
  $("#subtotal").html(numItems + " ITEMS \t")
  $("#subtotal-price").html("$" + precioTotal)

  $("#total").html(numItems + " ITEMS \t" + "$" + precioTotal)
}

function removeItem(key){
  console.log(key);
  localStorage.removeItem(key);
  precioTotal = 0.00;
  createItemTable()
  numItems = numItems - 1
}

function createItemTable(){
  items = getCarritoItems()
  $("#carritoItems").empty()
  html = ""
   for(i in items){
     precioTotal = precioTotal + items[i].price
    html += '<div id="'+ (i) +'" class="columns is-multiline is-mobile is-vcentered">'
      html += '<div class="column is-2">'
        html += '<figure class="image is-48x48">'
          html += '<img src="https://bulma.io/images/placeholders/96x96.png">'
        html += '</figure>'
      html += '</div>'
      html += '<div class="column is-4">'
        html += '<div class="">'
          html += items[i].name
        html += '</div>'
        html += '<div class="">'
          html += 'Talla:' + items[i].sizeOrder.toUpperCase()
        html += '</div>'
      html += '</div>'
      html += '<div class="column is-2 is-text-align">'
        html += '<a class="button"> 1</a>'
      html += '</div>'
      html += '<div class="column is-2">'
        html += '$ '+ items[i].price +' MXN'
      html += '</div>'
      html += '<div class="column is-2">'
        html += '<a id="itemsbutton" class="button" onclick="removeItem(\''+ i +'\')"> Remover </a>'
      html += '</div>'
      html += '<hr>'
    html += '</div>'
  }
  $(html).appendTo("#carritoItems");
  getNumItems()
}

function getCarritoItems(){
  items = {}
  for (var key in localStorage){
    if(key == "key"){
      return items
    }
    if(key != "count"){
      numItems = numItems + 1;
      items[key]= JSON.parse(localStorage.getItem(key));
    }
  }
}
