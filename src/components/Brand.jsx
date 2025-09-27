import React, { useEffect, useState } from 'react'
import logo from '../assets/logo_icon.svg'
import TypeIt from "typeit-react";



const Brand = () => {
    const [key, setKey] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {
            setKey(prev => prev + 1); 
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return (
        <section className='h-full bg-slate-700/25 flex flex-col justify-center pb-15 items-center gap-5'>
            <img src={logo} alt="" className='aspect-square w-30 ' />
            

            <div className="App font-bold text-xl">
                <TypeIt key={key} options={{ speed: 100 }}>
                    Chat with any one any time.
                </TypeIt>
            </div>


        </section>

    )
}

export default Brand
