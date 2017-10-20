
//******************************************************************************
var dialog = document.getElementById('dlgAdd');
var btnAdd = document.getElementById('btnAdd');
var btnRefresh = document.getElementById('btnRefresh');
var btnModalOk = document.getElementById('btnModalOk');
var btnModalCancel = document.getElementById('btnModalCancel');
var selCity = document.getElementById('selCity');

btnAdd.addEventListener('click', function() {
   dialog.showModal();
});

btnRefresh.addEventListener('click', function() {
   console.log("btnRefresh");
});

btnModalOk.addEventListener('click', function() {
   var city = selCity.value;
   getWeatherData(city);
   dialog.close();
});

btnModalCancel.addEventListener('click', function() {
   dialog.close();
});
//******************************************************************************

var cardMap = new Map();

var testData = {
   city : "Bandeirantes-PR",
   temperature: "99",
   image : "images/sunny1.png",
   lastUpdate: new Date(),
   text : "Informações de Teste"
}

var getCard = function(city){
   if (cardMap.has(city)){
      return cardMap.get(city);
   } else {
      var cards = document.getElementById('cards');
      var baseCard = document.getElementById('base-card');
      var card = baseCard.cloneNode(true);
      card.removeAttribute('hidden');
      cards.appendChild(card);
      cardMap.set(city, card);
      return card;
   }
}

var updateCard = function(card, data){
   var weatherCity = card.querySelector(".weather-city");
   var weatherImage = card.querySelector(".weather-image");
   var weatherTemp = card.querySelector(".weather-temp");
   var weatherUpdate = card.querySelector(".weather-update");
   var weatherText = card.querySelector(".weather-text");
   weatherCity.textContent = data.city;
   weatherImage.src = data.image;
   weatherTemp.textContent = data.temperature;
   weatherUpdate.textContent = "Atualizado em "+ data.lastUpdate.toLocaleString();
   weatherText.textContent = data.text;
}

//******************************************************************************
//** COMUNICACAO COM A API *****************************************************

var getWeatherData = function(city){
   var card = getCard(city);
   var status = card.querySelector(".weather-update");
   status.textContent = "atualizando...";

   fetch(weather.getQuery(city))
      .then(function(response){
         response.json().then(function (json) {
           updateWeather(json, card);
         });
      })
      .catch(function(error){
         Console.log(error);
      });
}

var updateWeather = function(json, card){
   var info = json.query.results.channel;
   var data = {
      city : info.location.city + ", " + info.location.region + ", " + info.location.country,
      temperature: info.item.condition.temp,
      image : "images/"+ weather.getImageFromCode(info.item.condition.code) + ".png",
      lastUpdate:  new Date(json.query.created),
      text : weather.getTextFromCode(info.item.condition.code)
   };
   updateCard(card, data);
}

//******************************************************************************

//** REGISTRO DO SW ************************************************************
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}
//******************************************************************************

