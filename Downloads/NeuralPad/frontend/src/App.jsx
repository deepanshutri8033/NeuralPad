import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import { me } from "./features/me";
import { useEffect } from "react";
import { login } from "./features/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            const data = await me();
            dispatch(setUserData(data.user));
        };

        fetch();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;