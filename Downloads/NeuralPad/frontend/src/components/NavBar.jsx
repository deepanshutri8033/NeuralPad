import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FiMoon } from "react-icons/fi";
import { BsSun } from "react-icons/bs";

function NavBar() {
    const [isDark, setIsDark] = useState(false);
    const { userData } = useSelector((state) => state.user);
    const [menuOpen,setMenuOpen]= useState(false);

    const name = userData?.name || "Guest";
    const initials = name.charAt(0).toUpperCase();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const theme = window.localStorage.getItem("theme");
        const dark = theme ? theme == "dark" : true;

        document.documentElement.classList.toggle("dark", dark);
        setIsDark(dark);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;

        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        window.localStorage.setItem("theme", next ? "dark" : "light");
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-16 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border-b border-slate-700 dark:border-white/[0.07] flex items-center px-6">
            <div className="flex items-center justify-between w-full">
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    NeuralPad
                </span>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors duration-300"
                    >
                        {isDark ? <FiMoon size={20} /> : <BsSun size={20} />}
                    </button>

                    <div className="relative ml-1">
                        <button className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors duration-300" onClick={()=>menuOpen(p=>!p)}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                <span className="text-[12px]">
                                    {initials}
                                </span>
                                <span>{name}</span>
                                
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;