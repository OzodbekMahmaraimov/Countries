import axios from 'axios'
import React, { useState } from 'react'
import { byIdValue } from './byId';
import { IoSearch, IoFlagSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { YMaps, Map, Placemark } from 'react-yandex-maps'

import './country.css'

const Country = () => {

    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [found, setFound] = useState(true);
    const [height, setHeight] = useState(true);

    function serachCountry() {
        setHeight(false);
        setLoading(true);
        axios.get(`https://restcountries.com/v3.1/name/${byIdValue("searchInput")}`).then(res => {
            console.log(res.data);
            setCountry(res.data);
            setLoading(false);
            setFound(true)
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setFound(false);
            setHeight(true)
        })
    }

    return (
        <>
            <section className={`w-full ${loading ? "h-[100vh]" : ""} ${height ? "h-[100vh]" : "h-auto"}`}>
                <h1 className='text-center text-3xl md:text-5xl text-[#ad2e24]'>Davlatlar haqida</h1>
                <div className='max-w-[1300px] mx-auto pt-10 flex flex-col gap-10'>
                    <div className='w-full flex justify-center lg:justify-start gap-5'>
                        <input id='searchInput' className='py-2 w-[70%] md:w-[50%] bg-transparent outline-none border-b-2 text-[#f1a638] font-semibold text-2xl placeholder:text-white placeholder:text-lg focus:border-[#deaaff]' type="text" placeholder='ENTER COUNTRY NAME' />
                        <button onClick={serachCountry} className='bg-[#bb0a21] px-5 rounded-md'><IoSearch color='white' /></button>
                    </div>
                    <div className={`${loading ? "flex justify-center items-center" : "grid grid-cols-1 lg:grid-cols-2 gap-2"} w-[90%] mx-auto md:w-full`}>
                        {loading ? (
                            <img className='w-[40%]' src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="Loading..." />
                        ) : found ? (
                            country &&
                            <>
                                <div className='flex flex-col gap-10'>
                                    <h2 className='text-2xl md:text-3xl flex justify-between items-center flex-wrap gap-8'><span className='text-[#01161e]'>State:</span> <span className='text-[#ff6700]'>{country[0].altSpellings[2]}</span></h2>
                                    {country[0].borders && (
                                        <h2 className='text-2xl md:text-3xl flex justify-between items-center flex-wrap gap-8'>
                                            <span className='text-[#01161e]'>Borders:</span>
                                            <span className='text-[#ff6700]'>
                                                {country[0].borders.map((item, idx) => (
                                                    <span key={idx} className='text-[#ff6700]'>
                                                        {idx > 0 && ", "}
                                                        {item}
                                                    </span>
                                                ))}
                                            </span>
                                        </h2>
                                    )}
                                    <h2 className='text-2xl md:text-3xl flex justify-between items-center flex-wrap gap-8'><span className='text-[#01161e]'>Capital:</span> <span className='text-[#ff6700]'>{country[0].capital}</span></h2>
                                    <h2 className='text-2xl md:text-3xl flex justify-between items-center flex-wrap gap-8'><span className='text-[#01161e]'>FIFA:</span> <span className='text-[#ff6700]'>{country[0].fifa}</span></h2>
                                    <h2 className='text-2xl md:text-3xl flex justify-between items-center flex-wrap gap-8'><span className='text-[#01161e]'>First day of the week:</span> <span className='text-[#ff6700]' >{country[0].startOfWeek}</span></h2>
                                    <h2 className='text-2xl md:text-3xl flex justify-between items-center flex-wrap gap-8'><span className='text-[#01161e]'>Timezones:</span> <span className='text-[#ff6700]'>{country[0].timezones[0]}</span></h2>
                                    <h2 className='text-2xl md:text-3xl flex justify-between items-center flex-wrap gap-8'><span className='text-[#01161e]'>Continent:</span> <span className='text-[#ff6700]' >{country[0].continents}</span></h2>
                                </div>
                                <div className='flex flex-col items-center justify-between gap-16 md:gap-5 mt-10 md:mt-0'>
                                    {country[0].coatOfArms.png ?
                                        <>
                                            <LazyLoadImage placeholderSrc='Loading' effect='blur' className='mx-auto w-[15rem]' alt='Coat of arms' src={country[0].coatOfArms.png} />
                                        </> :
                                        <div> <IoFlagSharp className='mx-auto' fontSize={50} color='#03045e' />
                                            <h1 className='text-3xl'>coat Of Arms not found</h1>
                                        </div>
                                    }
                                    {country[0].flags.png ?
                                        <LazyLoadImage placeholderSrc='Loading' effect='blur' className='mx-auto w-[15rem]' alt={country[0].flags.alt} src={country[0].flags.png} /> :
                                        <div> <IoFlagSharp className='mx-auto' fontSize={50} color='#03045e' />
                                            <h1 className='text-3xl'>Flag not found</h1>
                                        </div>
                                    }
                                </div>
                                {/* Map */}
                                <YMaps>
                                    <div className='col-span-1 lg:col-span-2 mt-10 '>
                                        <Map className='w-[100%] h-[65vh] rounded-xl' defaultState={{
                                            center: [country[0].capitalInfo.latlng[0], country[0].capitalInfo.latlng[1]],
                                            zoom: 10,
                                        }} >
                                            <Placemark geometry={[country[0].capitalInfo.latlng[0], country[0].capitalInfo.latlng[1]]} />
                                        </Map>
                                    </div>
                                </YMaps>
                            </>
                        ) : (
                            <div>
                                <MdError fontSize={40} color='#023047' className='mx-auto' />
                                <h1 className='text-4xl text-[#003566] text-center py-2'>Davlat topilmadi</h1>
                            </div>
                        )}
                    </div>
                </div>

            </section>
        </>
    )
}

export default Country