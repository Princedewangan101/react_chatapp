import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");
            if (data.success) {
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const connectSocket = (userData) => {
        const newSocket = io(backendUrl, {
            auth: { token }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds);
        })

    }
    const login_n_signup = async (state, credentials) => {
        try {
            const { data } = await axios.post(`/api/auth/${state}, credentials`);
            if (data.success) {
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = token;   // ⬅️ changed

                setToken(data.token);
                localStorage.setItem("token", data.token);
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    const logout = async (state, credentials) => {
        try {
            localStorage.setItem("");
            setToken(null);
            setAuthUser(null);
            setOnlineUsers(null);
            axios.defaults.headers.commom["token"] = null;
            toast.success("logout successfully");
            socket.disconnect();
        } catch (error) {
            toast.error(data.message)
        }
    }
    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/api/auth/updateUser", body);
            if (data.success) {
                setAuthUser(data.user);
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.commom['token'] = token;
        }
        checkAuth()
    }, [token])


    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login_n_signup,
        logout,
        updateProfile,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}