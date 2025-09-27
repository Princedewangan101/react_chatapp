import React, { useEffect, useState } from 'react'
import logo from '../assets/logo_icon.svg'




const Brand = () => {
    
    return (
        <section className='h-full bg-slate-700/25 flex flex-col justify-center pb-15 items-center gap-5'>
            <img src={logo} alt="" className='aspect-square w-30 ' />
            

            <div className="App font-bold text-2xl">
                Chatters
            </div>


        </section>

    )
}

export default Brand
