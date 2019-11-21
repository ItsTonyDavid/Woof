var token = sessionStorage.getItem('token'); //Guardar cookies
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var itemName = "";
var itemPrice = null;
var itemSizes = [
  {
    size: "xs",
    quantity: null
  },
  {
    size: "s",
    quantity: null
  },
  {
    size: "m",
    quantity: null
  },{
    size: "l",
    quantity: null
  }];
var itemType = {}
var itemGender = {}
var itempic  = null

function addProduct(){
  // itemName = $("#itemname").val()
  // itemGender = getGender();
  // itemPrice = $("#itemprice").val()
  // itemType = getType()
  // itemSizes = getItemSizes()


  itemToSend = {
    name: $("#itemname").val(),
    price: $("#itemprice").val(),
    img: $("#itempic").val(),
    sizes: getItemSizes(),
    itemType: getType(),
    gender: getGender(),
    active: true
  }

  //console.log(itemToSend);
  postItem(itemToSend);
}

function postItem(itemToPost){
  console.log(itemToPost);
  json_to_send = JSON.stringify(itemToPost);

  $.ajax({
    url: 'https://woofshop.herokuapp.com/postItem',
    headers: {
        'Content-Type':'application/json',
        'Authorization': token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      console.log("success");
    },
    error: function(error_msg) {
      console.log(error_msg);
      var err = (error_msg.responseText)
    }
  });
}

function getGender(){
  if($("#itemmale").prop("checked")){
    return {male: true}
  }
  if($("#itemfemale").prop("checked")){
    return {female: true}
  }
}

function getType(){
  if($("#itemcamisa").prop("checked")){
    return {shirt: true}
  }
  if($("#itemlongsleeve").prop("checked")){
    return {longsleeves: true}
  }
  if($("#itemhoodie").prop("checked")){
    return {hoodie: true}
  }
  if($("#itemaccesorio").prop("checked")){
    return {accessorie: true}
  }
}

function getItemSizes(){
  var xs = $("#itemxs").val()
  var s = $("#items").val()
  var m = $("#itemm").val()
  var l = $("#iteml").val()

  if(xs == ""){xs = 0 }else{ xs = parseInt(xs)}
  if(s == ""){s = 0 }else{ s = parseInt(s)}
  if(m == ""){m = 0 }else{ m = parseInt(m)}
  if(l == ""){l = 0 }else{ l = parseInt(l)}

  return [{
    size: "xs",
    quantity: xs
  },
  {
    size: "s",
    quantity: s
  },
  {
    size: "m",
    quantity: m
  },
  {
    size: "l",
    quantity: l
  }]
}
