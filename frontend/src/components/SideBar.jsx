import React from "react";

import {
    motion
} from "motion/react";

import {
    Folder,
    Star,
    Zap,
    X
} from "lucide-react";


function SideBar({
    activeSession,
    setActiveSession,
    mobileMenuOpen,
    setMobileMenuOpen
}) {


    const isActive =
        activeSession === "projects"
            ? "projects"
            : "starred";


    const handleSessionChange = (
        session
    ) => {

        setActiveSession(
            session
        );

        setMobileMenuOpen(
            false
        );

    };


    return (

        <>


            {/* =========================
                DESKTOP SIDEBAR
            ========================= */}

            <div className="hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-5 transition-colors duration-300 dark:border-white/[0.06] dark:bg-[#0b0b10] md:flex">


                {/* NAVIGATION */}

                <div className="flex flex-col gap-1">


                    {/* PROJECTS */}

                    <motion.div
                        whileTap={{
                            scale: 0.97
                        }}
                        onClick={() =>
                            handleSessionChange(
                                "projects"
                            )
                        }
                        className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors duration-150 ${
                            isActive === "projects"
                                ? "bg-slate-100 text-slate-900 dark:bg-white/[0.08] dark:text-white"
                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/[0.04] dark:hover:text-slate-300"
                        }`}
                    >

                        <Folder
                            size={16}
                            strokeWidth={2}
                        />

                        <span>
                            Projects
                        </span>

                    </motion.div>


                    {/* STARRED */}

                    <motion.div
                        whileTap={{
                            scale: 0.97
                        }}
                        onClick={() =>
                            handleSessionChange(
                                "starred"
                            )
                        }
                        className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors duration-150 ${
                            isActive === "starred"
                                ? "bg-slate-100 text-slate-900 dark:bg-white/[0.08] dark:text-white"
                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/[0.04] dark:hover:text-slate-300"
                        }`}
                    >

                        <Star
                            size={16}
                            strokeWidth={2}
                        />

                        <span>
                            Starred
                        </span>

                    </motion.div>

                </div>


                <div className="flex-1" />


                {/* DIVIDER */}

                <div className="mb-4 h-px bg-slate-200 dark:bg-white/[0.06]" />


                {/* UPGRADE CARD */}

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition-colors duration-300 dark:border-white/[0.07] dark:bg-white/[0.03]">


                    <p className="text-[12px] font-medium text-slate-700 dark:text-slate-300">
                        Upgrade Plan
                    </p>


                    <p className="mt-1 text-[11px] leading-snug text-slate-500">
                        Upgrade to Pro for more credits
                    </p>


                    <motion.button
                        whileHover={{
                            scale: 1.02
                        }}
                        whileTap={{
                            scale: 0.97
                        }}
                        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    >

                        <Zap
                            size={13}
                            strokeWidth={2.5}
                        />

                        Upgrade Now

                    </motion.button>

                </div>

            </div>


            {/* =========================
                MOBILE SIDEBAR
            ========================= */}

            {mobileMenuOpen && (

                <>

                    {/* OVERLAY */}

                    <div
                        onClick={() =>
                            setMobileMenuOpen(
                                false
                            )
                        }
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm dark:bg-black/60 md:hidden"
                    />


                    {/* DRAWER */}

                    <div className="fixed left-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-[min(280px,85vw)] flex-col border-r border-slate-200 bg-white px-3 py-5 shadow-2xl transition-colors duration-300 dark:border-white/[0.06] dark:bg-[#0b0b10] md:hidden">


                        {/* MOBILE HEADER */}

                        <div className="mb-5 flex items-center justify-between px-2">


                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                Navigation
                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    setMobileMenuOpen(
                                        false
                                    )
                                }
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/[0.05] dark:hover:text-white"
                            >

                                <X
                                    size={18}
                                />

                            </button>

                        </div>


                        {/* MOBILE NAV */}

                        <div className="flex flex-col gap-1">


                            {/* PROJECTS */}

                            <motion.div
                                whileTap={{
                                    scale: 0.97
                                }}
                                onClick={() =>
                                    handleSessionChange(
                                        "projects"
                                    )
                                }
                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                                    isActive === "projects"
                                        ? "bg-slate-100 text-slate-900 dark:bg-white/[0.08] dark:text-white"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/[0.04] dark:hover:text-slate-300"
                                }`}
                            >

                                <Folder
                                    size={17}
                                />

                                <span>
                                    Projects
                                </span>

                            </motion.div>


                            {/* STARRED */}

                            <motion.div
                                whileTap={{
                                    scale: 0.97
                                }}
                                onClick={() =>
                                    handleSessionChange(
                                        "starred"
                                    )
                                }
                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                                    isActive === "starred"
                                        ? "bg-slate-100 text-slate-900 dark:bg-white/[0.08] dark:text-white"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/[0.04] dark:hover:text-slate-300"
                                }`}
                            >

                                <Star
                                    size={17}
                                />

                                <span>
                                    Starred
                                </span>

                            </motion.div>

                        </div>


                        <div className="flex-1" />


                        {/* DIVIDER */}

                        <div className="mb-2 h-px bg-slate-200 dark:bg-white/[0.06]" />


                        {/* MOBILE UPGRADE */}

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-300 dark:border-white/[0.07] dark:bg-white/[0.03]">


                            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                Upgrade Plan
                            </p>


                            <p className="mt-1 text-[11px] leading-snug text-slate-500">
                                Upgrade to Pro for more credits
                            </p>


                            <motion.button
                                whileTap={{
                                    scale: 0.97
                                }}
                                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2.5 text-[11px] font-semibold text-white dark:bg-white dark:text-slate-900"
                            >

                                <Zap
                                    size={13}
                                    strokeWidth={2.5}
                                />

                                Upgrade Now

                            </motion.button>

                        </div>

                    </div>

                </>

            )}

        </>

    );
}


export default SideBar;