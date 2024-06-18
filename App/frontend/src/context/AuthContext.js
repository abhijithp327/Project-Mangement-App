import { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [user, setUser] = useState(null);

    const login = (user) => {
        console.log("user", user);
        setIsLoggedIn(true);
        setUser(user);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
