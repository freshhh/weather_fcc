/*
Name: Weather api app
Author: freshh
version: 1.2 alpha
*/

/* NB: always remember to put http:// in api url, becauase it require it. due to the transfer of data using hypertext transfer protocols */

/*var url,;
wurl = "http://api.openweathermap.org/data/2.5/weather?id=3488981&APPID"+apinumber;
*/

/*$("#weatherbtn").on("click", function(){
  $.getJSON(wurl, function(data){
    console.log(data.name);
    }).fail(function(xhr,statusText,error){
    console.log(statusText);
    console.log(error);
    console.log(xhr.status);
    console.log(wurl);
   });
});*/

var cityname, country, todayWeather;
var aURL, bURL, location;
var apinumber = "23b04de5111601f87f8cb4dfeb1bb2d9";
var c;
var f, k;
var cityQ;

//to get temp(kelvin)
function getK(apidata) {
  k = Math.floor(apidata.main["temp"]);
  return k;
}
//to get and calculate Celsius
function getC(apidata) {
  c = Math.floor(apidata.main["temp"] - 273.15);
  return c;
}

//To get and calculate In fahrenheit
function getF(apidata) {
  f = (((apidata.main["temp"] - 273.15) + 32) * 5) / 9;

  return Math.floor(f);
}
var Changed = false;
var temp;

//Changes K to C and vice versa.
function toggle1() {
	//Update Nov, 6 2017 
	//put "temp" definition outside as to cut delay when conversion is needed.
	temp = getC(apiInfo);
  if (Changed) {
     //temp = getC(apiInfo);
    $("#win").html("<p id='win'>Current Temp: " + temp + " °C </p>");
    Changed = false;
  } else if (!Changed) {
   var temp2 = Math.floor((((temp*9)/5)+32));
    $("#win").html("<p id='win'>Current Temp: " + temp2 + " °F </p>");
    Changed = true;
  }
}

var countryname;
var apiInfo;

//Gets API info.
$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: "http://ip-api.com/json",
    async: false,
    dataType: "json",
    success: function(dt) {
      cityQ = dt.city;
      countryname = dt.country;
    },
    error: function(e) {
      console.log(statusText);
    }
  });
  var iconnum;

  aURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityQ + "&APPID=" + apinumber;

  $.ajax({
    type: "GET",
    url: aURL,
    async: false,
    dataType: "json",
    success: function(data) {
      apiInfo = data;
      iconnum = data.weather[0].icon;
      var iconlink = "http://openweathermap.org/img/w/" + iconnum + ".png";
      $("#apidiv").html(" ");
      $("#apidiv").prepend("<p id='givecolor' >FRESHH WEATHEROMETER V1.2</p><p><h2>" + data.name + ", " + countryname + " is experiencing " + data.weather[0].description + " at the momment.</h2></p><br><div id ='innerdiv'><marquee scrollamount='6'><img    id=\"wImage\" src=\" " + iconlink + "\" ></img></marquee></div><br>" + "<p id='win' onclick='toggle1()'>Current Temp: " + getC(apiInfo) + " °C </p><p id='win2'></p><br><h6>*Click on Temperature to change unit*");

      console.log(countryname);
      console.log(apiInfo.wind['speed']);
      console.log(iconlink);
      console.log(data.name);
      console.log(aURL);
      console.log(getC(apiInfo), getF(apiInfo), getK(apiInfo));
    },
    error: function(error) {
      console.log(error.status);
      console.log("Unsuccesful");
      console.log(aURL);
    }
  });
  //Prints Windspeed
  $("#win2").prepend("<h2>Wind Speed: " + apiInfo.wind['speed'] + " m/s");

  /*var k = apiInfo.main.temp;
  var c = k - 273.15;
  var f1, f2, f3
  f1 = c + 32;
  f2 = f1 * 5;
  f3 = f2 / 9;
  console.log(k,"K", c,"C", f3,"F");*/

});