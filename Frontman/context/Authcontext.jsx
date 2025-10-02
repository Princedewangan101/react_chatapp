import { createContext, useState } from 'react'

const backendUrl = import.meta.env.BAC_URL;
axios.defaults.baseurl = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);


    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}