
import axios from "axios"
import { useState } from 'react'
import React from 'react'

const Weather = () => {

    const[city, setCity]= useState("")
    const[temp, setTemp] = useState ("")
    const[desc, SetDesc]= useState ("")
    const[weather,SetWeather] = useState ("")
    const[cname, setCname] = useState ("")

    const handleCity = (e) =>
    {
        setCity(e.target.value)
        
    }
    const getWeather = () =>
    {
        var weatherData= axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9e2f483b43a855cabbdf6c768ba639dd`)
        weatherData.then(function(sucess){
            console.log(sucess);
            
            SetWeather(sucess.data.weather[0].main)
            setTemp(sucess.data.main.temp)
            SetDesc(sucess.data.weather[0].description)
            setCname(sucess.data.name)         
        })
    }
  return (
    
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-2">
  <div className="bg-blue-400 bg-opacity-60 backdrop-blur-md p-6 rounded-xl shadow-2xl max-w-lg w-full text-center mt-10">
    <h1 className="text-2xl font-bold mb-2 text-slate-700">Weather</h1>
    <input
      type="text"
      placeholder="Enter city"
      onChange={handleCity}
      className="w-full p-2 rounded-lg shadow-md mb-5 text-blue-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
    <button
      className="w-full bg-slate-600 text-white py-3 rounded-lg shadow-md transform transition hover:scale-105"
      onClick={getWeather}
    >
      Get Weather
    </button>
  </div>

<div className="mt-3 p-8 bg-black rounded-1xl shadow-2xl text-white ">
         <h2 className="text-4xl font-bold mb-2 text-center">{cname}</h2>
         <div className="text-1xl space-y-2">
         <p className="font-medium">Temperature: {temp}°C</p>
                 <p className="font-medium">Weather: {weather}</p>
                 <p className="font-medium">Description: {desc}</p>
         </div>      
            </div>
            </div>
        
        
  )
}

export default Weather
