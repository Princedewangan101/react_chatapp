import React, { useContext } from 'react'
import srh from '../assets/search_icon.png'
import logo from '../assets/logo_icon.svg'
import menu from '../assets/menu_icon.png'
import martin from '../assets/profile_martin.png'
import assets from '../assets/assets'
import { AuthContext } from '../../context/Authcontext'
import { Chatcontext } from '../../context/Chatcontext'

const Leftsidebar = ({ selectedUser, setSelectedUser, selected_user_context }) => {

  const { message, users, selected_user_context, unseenMessage, setunseenMessage, getUsers, getMessages, sendMessages, subscribeMessage, unsubscribeMessage } = useContext(Chatcontext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [input, setinput] = useState(false)

  const filteredUser = input ? users.filter((user) => user.fullname.toLowerCase().includes(input.toLowerCase())) : users

  useEffect(() => {
    getUsers();
  }, [onlineUsers])

  return (
    <section className='h-full '>
      {/* -----------quict chat section section and logo -------------       */}
      <div className='pt-4 pb-4 mx-3 flex justify-between items-center '>
        <img
          src={logo}
          alt="logo"
          className='w-5'
        />

        <p className='font-medium'>Chatters</p>

        <img
          src={menu}
          alt="menu"
          className='w-7 p-1 rounded-full hover:bg-purple-700/30'
        />
      </div>

      {/* -----------search box -------------       */}

      <div className="flex items-center mx-3  pl-4 py-2  bg-purple-700/25 rounded-full  shadow-purple-500/50 shadow-md text-xs gap-3 ">
        <img
          src={srh}
          alt="search"
          className='w-4 '
        />
        <input
          onChange={(e) => setinput(e.target.value)}
          type="text"
          placeholder="Search..."
          className="  outline-none"
        />
      </div>
      {/* -----------friends profile -------------*/}

      <div className='mx-2 my-5 '>
        {filteredUser.map((user, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedUser(user);
              setunseenMessage(prev =>({...prev, [user._id]:0}))
            }}
            className={`c flex rounded-lg gap-3 px-2 py-2 hover:bg-slate-700/30 ${selectedUser?._id === user._id ? 'bg-slate-700/30' : ''} `}>

            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="profile"
              className='w-9 h-9 rounded-full '
            />
            <div className=' flex flex-col '>
              <p className='text-sm'>{user.fullName}</p>
              {
                onlineUsers.includes(user._id) ? <span className='text-xs'>online</span> : <span className='text-xs'>offline</span>
              }
            </div>
            {unseenMessage[user._id] > 0 && <p>{unseenMessage[user._id]}</p>}
          </div>
        ))}
        {/* --------------------------------- */}

      </div>

    </section>
  )
}

export default Leftsidebar
