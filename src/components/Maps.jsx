import React from 'react'
import Country from './Country'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

const Maps = () => {
    return (
        <section className='bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] w-full h-[2000px]'>
            <Country />
            <YMaps>
                <div className='w-full'>
                    <Map className='w-[100%] h-[70vh]' defaultState={{
                        center: [38.841605, 65.789979],
                        zoom: 10,
                    }} >
                        <Placemark geometry={[38.841605, 65.789979]} />
                    </Map>
                </div>
            </YMaps>
        </section>
    )
}

export default Maps