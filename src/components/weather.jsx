import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState("");

  const searchCity = () => {
    axios.get(`https://open-weather13.p.rapidapi.com/city/${cityName}`, {
      headers: {
        'X-RapidAPI-Key': 'b4d13464f3msh7c0c748045fc97fp16e7c5jsn02b28c6d1468',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    }).then(res => {
      console.log(res);
      setWeather(res.data)

    }).catch(err => {
      console.log(err.data.message);
      setWeather(err)
    });
  };

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  return (
    <>
      <section className='w-full h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500'>
        <div className='max-w-[1200px] mx-auto'>
          <nav className='max-w-[600px] mx-auto'>
            <ul className='flex w-full justify-between py-5'>
              <li className='text-white cursor-pointer scale-110 text-3xl'>Search</li>
              <li className='text-2xl text-white cursor-pointer'>Map</li>
              <li className='text-2xl text-white cursor-pointer'>5 days weather</li>
            </ul>
          </nav>
          <div className='w-full flex justify-center items-center flex-col my-5 gap-4'>
            <input onChange={handleInputChange} id='searchInput' className='w-[50%] bg-transparent outline-none border-b-2 py-4 text-white placeholder-white' placeholder='Enter city name' type="text" />
            <button onClick={searchCity} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 w-[25%] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Green to Blue</button>
          </div>
          <div className='max-w-[700px] mx-auto flex flex-col gap-5'>
            {weather ?  (
              <>
                <h2 className='text-3xl flex justify-between items-center'><span className='text-[#e9ff70]'>Davlat:</span> <hr className='text-white w-[60%] ' /> <span className='text-white'>{weather.sys.country}</span></h2>
                <h2 className='text-3xl flex justify-between items-center'><span className='text-[#e9ff70]'>Shahar:</span> <hr className='text-white w-[60%] ' /> <span className='text-white'>{weather.name}</span></h2>
                <h2 className='text-3xl flex justify-between items-center'><span className='text-[#e9ff70]'>Temperature:</span> <hr className='text-white w-[60%] ' /> <span className='text-white'>{weather.main.temp} <sup>°C</sup></span></h2>
                <h2 className='text-3xl flex justify-between items-center'><span className='text-[#e9ff70]'>his qilish:</span> <hr className='text-white w-[60%] ' /> <span className='text-white'>{weather.main.feels_like} °C</span></h2>
                <h2 className='text-3xl flex justify-between items-center'><span className='text-[#e9ff70]'>Namlik:</span> <hr className='text-white w-[60%] ' /> <span className='text-white'>{weather.main.humidity} %</span></h2>
                <h2 className='text-3xl flex justify-between items-center'><span className='text-[#e9ff70]'>Bosim:</span> <hr className='text-white w-[60%] ' /> <span className='text-white'>{weather.main.pressure} </span></h2>
              </>
            ) : <h1>{weather.message}</h1>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Weather; 