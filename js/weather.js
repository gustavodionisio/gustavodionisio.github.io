var UNIT_CELSIUS = 'c';
var UNIT_FARENHEIT = 'f';

var weather = {
   serviceUrl : "https://query.yahooapis.com/v1/public/yql",
   unit : UNIT_CELSIUS
}

weather.getImageFromCode = function(weatherCode) {
    // Weather codes: https://developer.yahoo.com/weather/documentation.html#codes
    weatherCode = parseInt(weatherCode);
    switch (weatherCode) {
      case 25: // cold
      case 32: // sunny
      case 33: // fair (night)
      case 34: // fair (day)
      case 36: // hot
      case 3200: // not available
        return 'sunny1';
      case 0: // tornado
      case 1: // tropical storm
      case 2: // hurricane
      case 6: // mixed rain and sleet
      case 8: // freezing drizzle
      case 9: // drizzle
      case 10: // freezing rain
      case 11: // showers
      case 12: // showers
      case 17: // hail
      case 35: // mixed rain and hail
      case 40: // scattered showers
        return 'rain';
      case 3: // severe thunderstorms
      case 4: // thunderstorms
      case 37: // isolated thunderstorms
      case 38: // scattered thunderstorms
      case 39: // scattered thunderstorms (not a typo)
      case 45: // thundershowers
      case 47: // isolated thundershowers
        return 'thunderstorm';
      case 5: // mixed rain and snow
      case 7: // mixed snow and sleet
      case 13: // snow flurries
      case 14: // light snow showers
      case 16: // snow
      case 18: // sleet
      case 41: // heavy snow
      case 42: // scattered snow showers
      case 43: // heavy snow
      case 46: // snow showers
        return 'snowy';
      case 15: // blowing snow
      case 19: // dust
      case 20: // foggy
      case 21: // haze
      case 22: // smoky
        return 'fog';
      case 24: // windy
      case 23: // blustery
        return 'windy';
      case 26: // cloudy
      case 27: // mostly cloudy (night)
      case 28: // mostly cloudy (day)
      case 31: // clear (night)
        return 'sunny2';
      case 29: // partly cloudy (night)
      case 30: // partly cloudy (day)
      case 44: // partly cloudy
        return 'cloudy1';
    }
};

weather.getTextFromCode = function(weatherCode) {
    weatherCode = parseInt(weatherCode);
    switch (weatherCode) {
      case 25: return "Frio";
      case 32:
      case 33:
      case 34:
      case 36:
         return "Ensolarado";// sunny
      case 3200:
         return "Indisponível";
      case 0: return "Tornado";
      case 1: return "Tempestade Tropical";
      case 2: return "Furacão";
      case 6: return "Chuva Mista e Aguaceiro";
      case 8: return "Chuvisco Gelado";
      case 9:  return "Chuvisco";
      case 10: return "Chuva Congelante";
      case 11: return " Aguaceiro";
      case 12: return "Pé d'agua";
      case 17:  return "Granizo";
      case 35:  return "Chuva e Granizo";
      case 40:  return "Chuva dispersa";
      case 3:
      case 4:
      case 37:
      case 38:
      case 39:
      case 45:
      case 47:
        return "Trovoadas";
      case 5: // mixed rain and snow
      case 7: // mixed snow and sleet
      case 13: // snow flurries
      case 14: // light snow showers
      case 16: // snow
      case 18: // sleet
      case 41: // heavy snow
      case 42: // scattered snow showers
      case 43: // heavy snow
      case 46: // snow showers
        return "Nevando";
      case 15: // blowing snow
      case 19: // dust
      case 20: // foggy
      case 21: // haze
      case 22: // smoky
        return "Neblina";
      case 24: // windy
      case 23: // blustery
        return "Ventania";
      case 26: // cloudy
      case 27: // mostly cloudy (night)
      case 28: // mostly cloudy (day)
      case 31: // clear (night)
        return "Nublado";
      case 29: // partly cloudy (night)
      case 30: // partly cloudy (day)
      case 44: // partly cloudy
        return "Parcialmente Nublado";
    }
};

weather.getQuery = function(city){
   var query = "select item.condition, location from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+"') and u='c'";
   var str = weather.serviceUrl+"?q="+query+"&format=json";
   return str;
}
