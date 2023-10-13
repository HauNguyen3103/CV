import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const AuthContext = createContext();


 const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // DEFAULT AXIOS
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {                   // REMEMBER TOKEN TO LOCAL STORAGE
        const data = localStorage.getItem('auth');
        if(data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.checkUser,
                token:parseData.token                
            })
        }
        //eslint-disable-next-line 
    },[]);

    return (
        <AuthContext.Provider value={[ auth,setAuth ]}>
            {children}
        </AuthContext.Provider>
    );
};


 const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider};
