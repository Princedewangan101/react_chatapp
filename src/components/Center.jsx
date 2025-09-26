import React, { useEffect } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { useRef } from 'react'
import { formateMessageTime } from '../lib/utils';




const Center = () => {

  const scrollEnd = useRef()

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({})
    }
  }, []);

  return (
    <section>
      {/* ------------Header--------------- */}
      <div className='flex justify-between items-center '>
        <div className=' flex items-center rounded-lg gap-3 px-2 py-2 ml-4  '>
          <img
            src={assets.profile_martin}
            alt="profile"
            className='w-9 h-9 rounded-full '
          />
          <div className=' flex flex-col '>
            <p className='text-sm'>Martin</p>
          </div>
        </div>
        <div className=' p-2 mr-2 rounded-full hover:bg-slate-900/40 '>
          <img
            src={assets.help_icon}
            alt=""
            className='w-4'
          />
        </div>

      </div>
      <hr className='w-[95%] m-auto border-purple-500/50 ' />

      {/* -----------Chat section  ---------------------*/}
      <div className=' px-5  h-[67vh] flex flex-col overflow-y-scroll custom-scrollbar'>
        {messagesDummyData.map((msg, index) => (

          <div key={index} className={`flex justify-end w-[75%] h-screen gap-1.5 mt-.5 ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'ml-auto ' : 'flex-row-reverse'}`}>

            {msg.image ? (
              <img className='w-50 mt-[3px]' src={msg.image} alt="" />
            ) : (
              <p className={` text-[10px] p-3 mt-[3px] rounded-lg bg-slate-600/15 ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-tr-none text-end ' : 'rounded-tl-none text-start'}`}>{msg.text}</p>
            )}

            <div className={` flex  flex-col w-[20%] ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? ' ' : 'items-end'} `}>
              <img src={msg.senderId == '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin}
                alt="img"
                className=' w-5 rounded-full'
              />
              <p className={`text-[9px] ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? ' ' : 'text-end'}`}>{formateMessageTime(msg.createdAt)}</p>
            </div>

          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/*--------------- input chat, Bottom-section ----------------- */}
      <div className="flex justify-between items-center mx-3 my-1 px-4 py-2  bg-purple-700/25 rounded-full  shadow-purple-500/50 shadow-md text-xs gap-3 ">

        <input type="text" placeholder="Search..." className="  outline-none " />
        <div className='flex justify-center items-center gap-4'>
          <input type="file" id='image' accept='image/png, image/jpeg' hidden />
          <label htmlFor="image"><img src={assets.gallery_icon} alt="logo" /></label>
          <img src={assets.send_button} alt="search" className='w-7 ' />
        </div>
      </div>

    </section>
  )
}

export default Center
