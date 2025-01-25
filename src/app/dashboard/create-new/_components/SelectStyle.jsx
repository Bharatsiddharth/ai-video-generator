"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const SelectStyle = ({onUserSelect}) => {
    const styleOptions = [
        {
            name:"Comic",
            image:"/Comic.jpg"
        },
        {
            name:"Anime",
            image:"/anime.jpg"
        },
        {
            name:"Watercolor",
            image:"/watercolor.jpg"
        },
        {
            name:"Historic",
            image:"/historic.jpg"
        },
        {
            name:"GTA",
            image:"/gta.jpg"
        },
    ]

    const [selectedOption, setSelectedOption] = useState();

  return (
    <div className='mt-7'>
         <h2 className='font-bold text-xl text-primary'>
                Style
            </h2>
            <p className='text-gray-500'>
                Select Your video style
            </p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
                {styleOptions.map((items,index) => (
                    <div key={index} className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl
                    ${selectedOption==items.name&&"border-4 border-primary"}
                    `} >
                        <Image alt='style' src={items.image} width={100} height={100}
                        className='h-48 object-cover rounded-lg w-full'
                        onClick={() => {
                            setSelectedOption(items.name)
                            onUserSelect("imageStyle", items.name)
                        }}
                        />
                        <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>{items.name}</h2>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default SelectStyle