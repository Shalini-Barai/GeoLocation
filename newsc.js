//1st Part Of Program

var timezone=document.getElementById("timezone");
var lat=document.getElementById("lat");
var long=document.getElementById("long");
var std=document.getElementById("std");
var stdsecond=document.getElementById("stdsecond");
var dst=document.getElementById("dst");
var dstsecond=document.getElementById("dstsecond");
var country=document.getElementById("country");
var post=document.getElementById("post");
var city=document.getElementById("city");

 function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);  
    } else { 
      lat.innerHTML = "Geolocation is not supported by this browser.";
      long.innerHTML = "Geolocation is not supported by this browser.";
    }
}
     async function showPosition(position) { 
    //const url="https://api.geoapify.com/v1/geocode/reverse?lat=24.263539624852875&lon=86.64242389362205&format=json&apiKey=25586aeebca8426c92e4a498631c72ac";
    const url=`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=25586aeebca8426c92e4a498631c72ac`;
    const response=await fetch(url);
    var data=await response.json();
    var a=data.results[0].timezone; 
     timezone.innerHTML=a.name;
     lat.innerHTML=data.results[0].bbox.lat1;
     long.innerHTML=data.results[0].bbox.lon1;
     std.innerHTML=a.offset_STD;
     stdsecond.innerHTML=a.offset_STD_seconds;
     dst.innerHTML=a.offset_DST;
     dstsecond.innerHTML=a.offset_DST_seconds;
     country.innerHTML=data.results[0].country;
     city.innerHTML=data.results[0].city;
      post.innerHTML=data.results[0].postcode;
}
getLocation();


//2nd Part of Program

let input=document.getElementById("input");
let submit=document.getElementById("submit");
var message=document.getElementById("message");
submit.addEventListener("click",soch);

  function soch(){
    if(input.value==""){
        document.getElementById("vanish").innerHTML=`<br><p style="color:red;font-size:19px;">Please enter an address</p>`;
        return;
    }
    else{
        fetchData();
    }
}
    async function fetchData(){
    const url=`https://api.geoapify.com/v1/geocode/search?text=${input.value}&apiKey=25586aeebca8426c92e4a498631c72ac`;
    const response=await fetch(url);
    const responseData=await response.json();
    console.log(responseData);
    //const responseData=await fetchData();
    if(responseData.features==""){
        document.getElementById("vanish").innerHTML=`<br><p style="color:red;font-size:19px;">TimeZone could not be found!</p>`;
    }
    let tableData='';
        tableData=`<h1>Your Result</h1><br><div style="font-size:18px;font-family: 'Montserrat', sans-serif;border:1px solid white;
        margin-left: 10px;
        margin-top: 10px;
        font-weight: 550;width:800px;height:400px;"><div>Name of Time Zone : ${responseData.features[0].properties.timezone.name}</div><br>  
        <div>Lat :&nbsp ${responseData.features[0].properties.lat}$&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbspLong :${responseData.features[0].properties.lon}</div><br>
        <div>Offset STD :&nbsp ${responseData.features[0].properties.timezone.offset_STD}</div><br>
         <div>Offset STD Seconds :&nbsp${responseData.features[0].properties.timezone.offset_STD_seconds} </div><br>
         <div>Offset DST :&nbsp ${responseData.features[0].properties.timezone.offset_DST}</div><br>
         <div>Offset DST Seconds :&nbsp ${responseData.features[0].properties.timezone.offset_DST_seconds}</div><br>
         <div>Country :&nbsp ${responseData.features[0].properties.country}</div><br>
         <div>Postcode :&nbsp ${responseData.features[0].properties.postcode}</div><br>
         <div>City :&nbsp ${responseData.features[0].properties.city}</div></div>`
        
    document.getElementById("vanish").innerHTML=tableData;
    
}

   
