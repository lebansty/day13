 
 allData=[];
 data=[];


let countryData= async () =>{
    const res = await fetch('https://restcountries.com/v3.1/all')
     data = await res.json()
    countryPush(data)
    // weatherData(data)
}
document.addEventListener('DOMContentLoaded',countryData)


// creating cards with country details

let countryPush=()=>{
let index='';
    
    data.forEach((val,ind) => {
        index += `<div class="col">
        <div class="card  d-flex " id="${val.flags.png}">
          <img src="${val.flags.png}" class="card-img-top" alt="${val.name.common}">
          <div class="card-body">
          <div id="test1"><h5 class="card-title" id="contName${ind}">${val.name.common}</h5></div>
            
            <p class="card-text" ><h6>Region: ${val.region}</h6></p>
            <p class="card-text">Capital: ${val.capital}</p>
            <p class="card-text">Latitude: ${val.latlng[0]}</p>
            <p class="card-text">Longitude: ${val.latlng[1]}</p>
            <p class="card-text">Country Code: ${val.cca3}</p>
      
            <button type="button" id="cardbtn" onclick="foo(${ind})" class="align-self-end btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalShow">
 Click for weather
</button>
      
          </div>
        </div>
      </div>`


      });

 let cards=document.getElementById('dynaCard')
           cards.innerHTML=`${[index]}`


}


 async function foo(ind){
  
  let countryName= document.getElementById(`contName${ind}`).innerText
 

 allData=data.filter(ele=>ele.name.common===countryName)


allData.forEach( async (val)=>{
  let wethRes= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${val.latlng[0]}&lon=${val.latlng[1]}&APPID=20bf4bd158e253e914576847478e37ed`)

 let wethData= await wethRes.json();
document.getElementById('title').innerHTML=`<h6>${val.name.common}'s weather condition</h6>`;
document.getElementById('temp').innerText=`Temperature pressure: ${wethData.main.temp}°F`
document.getElementById('atmPre').innerText=`Atmospheric: ${wethData.main.pressure}`
document.getElementById('windSp').innerText=`Wind speed: ${wethData.wind.speed} km/hr`
document.getElementById('hum').innerText=`Humidity: ${wethData.main.humidity} g/kg`
document.getElementById('clco').innerText=`Cloud cover: ${wethData.weather[0].description}`

})

  
 }






