var token = sessionStorage.getItem('token'); //Guardar cookies
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
var itemsFromData = []

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
  getCheckFilters()

  var gender = getUrlParameter('gender');
  if(!gender){getItems();}
  else{getItemsbyGender(gender)}

  if(!gender){ gender = "TODO"}
  if(gender == "female"){ gender = "MUJER"}
  if(gender == "male"){ gender = "HOMBRE"}

  $("#gender").html(gender)
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
      html += '<div id="' + items[i]._id + '" class="card is-transparent" style="margin-left: 19px; margin-right: 19px;" onclick="openItemPage(\''+ items[i]._id +'\')">'
        html += '<div class="card-image">'
          html += '<figure class="image is-3by4">'
            html += '<img src="'
            html += items[i].img
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

function openItemPage(id){
  window.location.href = "./item.html?id=" + id;
}

function getCheckFilters(){

  if( $('#shirt').prop('checked') ) {
    typeFilters['shirt'] = true
  }
  else{
    typeFilters['shirt'] = false
  }

  if( $('#longsleeves').prop('checked') ) {
    typeFilters['longsleeves'] = true
  }
  else{
    typeFilters['longsleeves'] = false
  }

  if( $('#hoodie').prop('checked') ) {
    typeFilters['hoodie'] = true
  }
  else{
    typeFilters['hoodie'] = false
  }

  if( $('#accessorie').prop('checked') ) {
    typeFilters['accessorie'] = true
  }
  else{
    typeFilters['accessorie'] = false
  }

  if( $('#xs').prop('checked') ) {
    sizeFilters['xs'] = true
  }
  else{
    sizeFilters['xs'] = false
  }

  if( $('#s').prop('checked') ) {
    sizeFilters['s'] = true
  }
  else{
    sizeFilters['s'] = false
  }

  if( $('#m').prop('checked') ) {
    sizeFilters['m'] = true
  }
  else{
    sizeFilters['m'] = false
  }

  if( $('#l').prop('checked') ) {
    sizeFilters['l'] = true
  }
  else{
    sizeFilters['l'] = false
  }
}

function getItemType(item){
  if (item.itemType.shirt == true){ return "shirt"}
  if (item.itemType.longsleeves == true){ return "longsleeves"}
  if (item.itemType.hoodie == true){ return "hoodie"}
  if (item.itemType.accessorie == true){ return "accessorie"}
}

function getItemSize(item){
  sizes = []
  for(i in item.sizes){
    if(item.sizes[i].quantity > 0){
      sizes.push(item.sizes[i].size)
    }
  }
  return sizes
}

function getItemsbyType(items){
  filterItems = []
  noOneCheked = true;
  for (i in items){
    itemtype = getItemType(items[i])
    for (type in typeFilters){
      if(typeFilters[type] == true){
        noOneCheked = false
        if (type == itemtype){
          filterItems.push(items[i])
        }
      }
    }
  }
  if(noOneCheked){
    return items
  }
  return filterItems
}

function getItemsbySize(items){
  filterItems = []
  noOneCheked = true;
  ids = {}
  for (size in sizeFilters){
    if (sizeFilters[size] == true){
      noOneCheked = false
      for (count in items){
        itemSize = getItemSize(items[count])
        id = items[count]._id
        for (j in itemSize){
          if(size == itemSize[j] && ids[id] != id){
            ids[id] = id
            filterItems.push(items[count])
          }
        }
      }
    }
  }
  if(noOneCheked){
    return items
  }
  return filterItems
}

function getItemsWithFilter(items){
  filterItems = getItemsbyType(items)
  filterItems = getItemsbySize(filterItems)

  return filterItems
}

/* ------ Filtros ------ */

var typeFilters = {
  shirt: true,
  longsleeves: true,
  hoodie: true,
  accessorie: true
}

var sizeFilters = {
  xs: true,
  s: true,
  m: true,
  l: true
}

$("#shirt").click(function() {
  if( $('#shirt').prop('checked') ) {
    typeFilters['shirt'] = true
  }
  else{
    typeFilters['shirt'] = false
  }
  createItemCards(getItemsWithFilter(itemsFromData));
});

$("#longsleeves").click(function() {
  if( $('#longsleeves').prop('checked') ) {
    typeFilters['longsleeves'] = true
  }
  else{
    typeFilters['longsleeves'] = false
  }
  createItemCards(getItemsWithFilter(itemsFromData));
});

$("#hoodie").click(function() {
  if( $('#hoodie').prop('checked') ) {
    typeFilters['hoodie'] = true
  }
  else{
    typeFilters['hoodie'] = false
  }
  createItemCards(getItemsWithFilter(itemsFromData));
});

$("#accessorie").click(function() {
  if( $('#accessorie').prop('checked') ) {
    typeFilters['accessorie'] = true
  }
  else{
    typeFilters['accessorie'] = false
  }
  createItemCards(getItemsWithFilter(itemsFromData));
});

$("#xs").click(function() {
  if( $('#xs').prop('checked') ) {
    sizeFilters['xs'] = true
  }
  else{
    sizeFilters['xs'] = false
  }
  createItemCards(getItemsWithFilter(itemsFromData));
});

$("#s").click(function() {
  if( $('#s').prop('checked') ) {
    sizeFilters['s'] = true
  }
  else{
    sizeFilters['s'] = false
  }
  createItemCards(getItemsWithFilter(itemsFromData));
});

$("#m").click(function() {
  if( $('#m').prop('checked') ) {
    sizeFilters['m'] = true
  }
  else{
    sizeFilters['m'] = false
  }
  createItemCards(getItemsWithFilter(itemsFromData));
});

$("#l").click(function() {
  if( $('#l').prop('checked') ) {
    sizeFilters['l'] = true
  }
  else{
    sizeFilters['l'] = false
  }
  createItemCards(getItemsWithFilter(itemsFromData));
});

/* ------ Funciones para la DB ------ */
//https://woofshop.herokuapp.com/
function getItems(){
    $.ajax({
      url: 'https://woofshop.herokuapp.com/items',
      headers: {
          'Content-Type':'application/json'
      },
      method: 'GET',
      success: function(data){
        itemsFromData = data
        createItemCards(getItemsWithFilter(data));
      },
      error: function(error_msg) {
        var err = (error_msg.responseText)
        console.log(err);
      }
    });
}

function getItemsbyGender(gender){
  $.ajax({
    url: 'https://woofshop.herokuapp.com/itemsbygender/' + gender,
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    success: function(data){
      itemsFromData = data
      createItemCards(getItemsWithFilter(data));
    },
    error: function(error_msg) {
      console.log(error_msg);
      console.log("Error:" + error_msg.status);
    }
  })
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

function styler(element) {
    function getElements() {
        if (element instanceof HTMLElement) {
            return [element];
        } else if (typeof element === 'string') {
            return document.querySelectorAll(element)
        }
        return [];
    }
    return {
        get(styles) {
            if (!Array.isArray(styles)) {
                throw new Error('Second parameter of this function should be an array');
            }
            let elems = getElements();
            if (elems.length === 0) {
                return false;
            }
            let elem = elems[0];
            let obj = {};
            if (elem instanceof HTMLElement && styles) {
                styles.map((style) => obj[style] = window.getComputedStyle(elem, null).getPropertyValue(style));
                return obj;
            }
        },
        set(styles) {
            if (typeof styles !== 'object') {
                throw new Error('Second parameter of this function should be an object');
            }
            let elems = getElements();
            if (elems.length === 0) {
                return false;
            }
            elems.forEach(function(elem) {
                for (let i in styles) {
                    if (styles.hasOwnProperty(i)) {
                        elem.style[i] = styles[i];
                    }
                }
            });
        }
    }
}
