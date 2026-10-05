import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import NavBar from "../components/NavBar";
import { login } from "../features/login";
import { useState } from "react";

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);

    const handleLogin = async () => {
        setLoading(true);

        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();
        const data = await login(token);

        dispatch(setUserData(data.user));

        setLoading(false);
    };

    if (!userData) {
        return (
            <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 transition-colors duration-300 dark:bg-[#07070c]">
                <div className="pointer-events-none absolute -top-32 left-1/2 hidden h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px] dark:block" />

                <div className="relative w-full max-w-sm rounded-2xl border border-slate-200/70 bg-white/80 p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-black/40">
                    <div className="flex flex-col items-center justify-center gap-4 text-slate-900 dark:text-white">
                        <span className="text-2xl font-bold">AI</span>

                        <h2 className="text-xl font-semibold">
                            Welcome to NeuralPad
                        </h2>

                        <p className="text-slate-600 dark:text-slate-300">
                            Sign in to access your Project and continue building
                        </p>

                        <button
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            <FcGoogle />
                            <span>
                                {loading ? "Signing in..." : "Sign in with Google"}
                            </span>
                        </button>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            By continuing, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#07070c]">
            <div className="pointer-events-none absolute -top-32 left-1/2 hidden h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px] dark:block" />

            <div className="relative flex min-h-0 flex-1 flex-col">
                <NavBar />
            </div>
        </div>
    );
}

export default Dashboard;