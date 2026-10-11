
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FiMoon,
    FiSun,
    FiChevronDown,
    FiLogOut,
    FiUser,
    FiMenu,
    FiX
} from "react-icons/fi";

import { logout } from "../features/logout";

function NavBar({ setMobileMenuOpen, mobileMenuOpen }) {
    const [isDark, setIsDark] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const name = userData?.name || "Guest";
    const initials = name.charAt(0).toUpperCase();

    // Load saved theme
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        const dark = theme !== "light";

        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const next = !isDark;

        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    // Logout
    const handleLogout = async () => {
        if (loggingOut) return;

        try {
            setLoggingOut(true);

            await logout();

            dispatch({ type: "user/logout" });

            localStorage.removeItem("token");
            localStorage.removeItem("userData");

            setMenuOpen(false);
            window.location.href = "/";
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <nav className="fixed left-0 top-0 z-50 h-16 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl transition-colors duration-300 dark:border-white/[0.06] dark:bg-[#07070c]/90">
            <div className="flex h-full items-center justify-between gap-2 px-3 sm:px-6">
                {/* Left side */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen?.(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-slate-300 dark:hover:bg-white/[0.1] md:hidden"
                    >
                        {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                    </button>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 dark:bg-white">
                        <span className="text-sm font-bold text-white dark:text-slate-900">
                            N
                        </span>
                    </div>

                    <span className="truncate text-base font-semibold tracking-tight text-slate-900 dark:text-white sm:text-lg">
                        NeuralPad
                    </span>
                </div>

                {/* Right side */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-slate-300 dark:hover:bg-white/[0.1] sm:h-10 sm:w-10"
                    >
                        {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
                    </button>

                    {/* User menu */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-expanded={menuOpen}
                            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-1.5 py-1.5 transition hover:bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.05] dark:hover:bg-white/[0.1] sm:gap-2 sm:px-2"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 dark:bg-white">
                                <span className="text-xs font-semibold text-white dark:text-slate-900">
                                    {initials}
                                </span>
                            </div>

                            <span className="hidden max-w-[120px] truncate text-sm font-medium text-slate-900 dark:text-white sm:block">
                                {name}
                            </span>

                            <FiChevronDown
                                size={15}
                                className={`text-slate-500 transition-transform duration-200 dark:text-slate-400 ${
                                    menuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {menuOpen && (
                            <>
                                <button
                                    type="button"
                                    aria-label="Close user menu"
                                    className="fixed inset-0 z-10 cursor-default"
                                    onClick={() => setMenuOpen(false)}
                                />

                                <div className="absolute right-0 z-20 mt-2 w-52 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-white/[0.08] dark:bg-[#111116]">
                                    <div className="border-b border-slate-200 px-3 py-2.5 dark:border-white/[0.08]">
                                        <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                                            {name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            Account
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setMenuOpen(false)}
                                        className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
                                    >
                                        <FiUser size={16} />
                                        Profile
                                    </button>

                                    <button
                                        type="button"
                                        disabled={loggingOut}
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400"
                                    >
                                        <FiLogOut size={16} />
                                        {loggingOut ? "Logging out..." : "Logout"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;