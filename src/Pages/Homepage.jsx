import React, { useState } from 'react'

import Leftsidebar from "../components/Leftsidebar";
import Center from "../components/Center"
import Rightsidebar from "../components/Rightsidebar"


import bg from "../assets/bg.jpg";
import Brand from '../components/Brand';


const Homepage = () => {

    const [selectedUser, setSelectedUser] = useState(false)

    return (


        <div className='w-full h-screen  bg-cover bg-center' style={{ backgroundImage: `url(${bg})` }}>
            <div className='w-full h-screen  bg-cover bg-center ' >
                <div
                    className='w-[80%] h-[var(--main_container-height)] border border-purple-800 rounded-md overflow-hidden  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent backdrop-blur-sm'>

                    <div className=" h-[var(--main_container-height)]  grid grid-cols-12 grid-rows-5 gap-0">

                        {selectedUser ?
                            (<>
                                <div className="col-span-3 row-span-5 ">
                                    <Leftsidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                                </div>
                                <div className="col-span-6 row-span-5 col-start-4 border-l border-r border-purple-700/25 ">
                                    <Center user={selectedUser} />
                                </div>
                                <div className="col-span-3 row-span-5 col-start-10 ">
                                    <Rightsidebar />
                                </div>
                            </>)
                            : (<>
                                <div className="col-span-6 row-span-5 ">
                                    <Leftsidebar setSelectedUser={setSelectedUser} />
                                </div>
                                <div className="col-span-6 row-span-5 ">
                                    <Brand />
                                </div>
                            </>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
