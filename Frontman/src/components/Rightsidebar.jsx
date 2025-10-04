import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const Rightsidebar = ({ user }) => {


  const { message } = useContext(Chatcontext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [msgImage, setmsgImage] = useState([])

  useEffect(() => {
    setmsgImage.filter(msg => msg.image).map(msg => msg.image)
  }, [message])

  return user && (
    <section className="relative h-full">

      <div className="flex flex-col justify-center items-center h-[200px] bg-slate-700/25 border-b border-purple-600/40">
        <img
          src={user?.profilePic || assets.profile_martin}
          alt="profile"
          className="aspect-square w-20 rounded-full"
        />
        <p className="font-semibold mt-5">{user.fullName}</p>
        <p className="font-light text-xs">{user.bio}</p>
      </div>

      {/* Media Section */}

      {/* <div className="bg-slate-600/15 h-full">
        <p className="font-semibold text-lg mx-5 mt-3">Media</p>
        <div className="flex flex-wrap gap-2 p-3 overflow-y-auto min-h-[500px]">
          {mesImage.map((url, index) => (
            <div key={index} className="cursor-pointer">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <img
                  src={url}
                  alt={`media-${index}`}
                  className="w-24 h-auto object-cover rounded-md"
                />
              </a>
            </div>
          ))}
        </div>
      </div> */}

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full text-center backdrop-blur-xs bg-transparent">
        <button onClick={ () => {
          logout()
        }
        } className="border border-violet-800 py-1 px-[52px] my-2 rounded-full text-sm font-semibold hover:bg-violet-800">
          Logout
        </button>
      </div>
    </section>
  )
}

export default Rightsidebar
