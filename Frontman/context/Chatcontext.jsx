import { createContext, useContext } from 'react'
import { AuthContext } from './Authcontext';

export const Chatcontext = createContext();

export const chatProvider = ({ children }) => {

    const [message, setMessage] = useState([]);
    const [users, setUsers] = useState([]);   // allthe users in sidebar
    const [selectedUser, setselectedUser] = useState(null); // selected user of side bar
    const [unseenMessage, setunseenMessage] = useState({});  // 

    const { socket, axios } = useContext(AuthContext);

    //   func. to get all the user in sidebar from database.
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
                setUsers(data.users);
                setselectedUser(data.unseenMessage);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //   func. to get message from selected user in sidebar. 
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessage(data.messages);
                setselectedUser(data.unseenMessage);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //   func. to get message from selected user in sidebar. 
    const sendMessages = async (messagedata) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._Id}`, messagedata);
            if (data.success) {
                setMessage((pervMessage) => [...pervMessage, data.newMessage]);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //   func. to get message for selected user in real time.
    const subscribeMessage = async (messagedata) => {
        try {
            if (!socket) return;

            socket.on("newMessage", (newMessage) => {
                if (selectedUsers && newMessage.senderId === selectedUsers._Id) {
                    newMessage.isRead = true;
                    setMessage((pervMessage) => [...pervMessage, newMessage]);
                    axios.put(`/api/messages/mark/${newMessage._Id}`);
                } else {
                    setunseenMessage((pervunseenMessage) => ({
                        ...pervunseenMessage, [newMessage._Id]: pervunseenMessage[newMessage._Id] ? pervunseenMessage[newMessage._Id] + 1 : 1
                    }))
                }
            })
        } catch (error) {
            toast.error(error.message)
        }
    }
    //   func. to get message for selected user in real time.
    const unsubscribeMessage = async (messagedata) => {
        try {
            if (socket) socket.off("newMessage");
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        subscribeMessage();
        return () => unsubscribeMessage();
    }, [socket, selectedUser])

    const value = {
       message, users, selectedUser, unseenMessage, getUsers, getMessages, sendMessages, subscribeMessage, unsubscribeMessage
    }
    return (
        <Chatcontext.Provider value="{value}">
            {children}
        </Chatcontext.Provider>
    )
}
