<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
   <link rel="icon" href="./img/cloud.png">
   <link rel="stylesheet" href="./css/styles.css">
   <title>Powder Day</title>
</head>
<body>
   <div class="main-content">
       {{>header}}
       <h2>Check for Powder at your favorite ski resort!</h2>
       <form action="" id='form'>
           <input type="text" name="location" placeholder="Search location" class="input"/>
           <button>Search</button>
       </form>
       <canvas id="icon1" width="128" height="128"></canvas>
       <p id="msg1"></p>
       <p id="msg2"></p>


   </div>



   {{>footer}}

   <script src="https://rawgithub.com/darkskyapp/skycons/master/skycons.js"></script>
   <script src="./js/app.js"></script>
</body>
</html>

public app.js  console.log('client side js is loaded!')

//fetch forecast information
//fetch is fn
const weatherForm = document.querySelector('#form');
const input = document.querySelector('.input')

const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')
let skycons = new Skycons({"color": "#eeeee"});


weatherForm.addEventListener('submit', (event) => {
   event.preventDefault()

   const location = input.value
   messageOne.textContent = 'Loading...'
   messageTwo.textContent = ''

   fetch('/weather?address=' + location).then((response) => {
   response.json().then((data) =>{

           if (data.error) {
               console.log(data.error)
               messageOne.textContent = data.error
               messageTwo.textContent = ''
           } else {
               messageOne.textContent = 'Location: ' + data.location;
               messageTwo.textContent = 'Forecast: ' + data.forecast + 'Temperature outside is ' + data.temperature + ' with ' + data.chanceOfRain + ' chance of rain.'
               let weatherIcons = data.icon
               switch(weatherIcons) {
                   case "clear-day":
                       skycons.set(document.getElementById("icon1"), Skycons.CLEAR_DAY);
                       break;
                   case "clear-night":
                       skycons.set(document.getElementById("icon1"), Skycons.CLEAR_NIGHT);
                       break;
                   case "partly-cloudy-day":
                       skycons.set(document.getElementById("icon1"), Skycons.PARTLY_CLOUDY_DAY);
                       break;
                   case "partly-cloudy-night":
                       skycons.set(document.getElementById("icon1"), Skycons.PARTLY_CLOUDY_NIGHT);
                       break;
                   case "cloudy":
                       skycons.set(document.getElementById("icon1"), Skycons.CLOUDY);
                       break;
                   case "rain":
                       skycons.set(document.getElementById("icon1"), Skycons.RAIN);
                       break;
                   case "sleet":
                       skycons.set(document.getElementById("icon1"), Skycons.SLEET);
                       break;
                   case "snow":
                       skycons.set(document.getElementById("icon1"), Skycons.SNOW);
                       break;
                   case "wind":
                       skycons.set(document.getElementById("icon1"), Skycons.WIND);
                       break;
                   case "fog":
                       skycons.set(document.getElementById("icon1"), Skycons.FOG);
                       break;
               }
               console.log(data.location)
               console.log(data.forecast)
               console.log(data.temperature)
               console.log(data.chanceOfRain)
               console.log(data.icon)
               skycons.play();
           }
       })
   })
})