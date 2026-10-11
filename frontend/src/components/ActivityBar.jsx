
import React from "react";
import { Files, Bot, Terminal, Settings } from "lucide-react";

function ActivityBar({ activePanel, setActivePanel }) {
    const items = [
        { id: "explorer", icon: Files, label: "Explorer" },
        { id: "ai", icon: Bot, label: "AI Assistant" },
        { id: "terminal", icon: Terminal, label: "Terminal" }
    ];

    return (
        <aside className="flex w-12 shrink-0 flex-col items-center border-r border-white/[0.08] bg-[#111113] py-3">
            <div className="flex w-full flex-col items-center gap-2">
                {items.map(({ id, icon: Icon, label }) => (
                    <button
                        key={id}
                        type="button"
                        title={label}
                        aria-label={label}
                        onClick={() => setActivePanel(
                            activePanel === id ? null : id
                        )}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                            activePanel === id
                                ? "bg-white/[0.09] text-sky-400"
                                : "text-zinc-500 hover:bg-white/[0.05] hover:text-white"
                        }`}
                    >
                        <Icon size={20} />
                    </button>
                ))}
            </div>

            <div className="mt-auto">
                <button
                    type="button"
                    title="Settings"
                    aria-label="Settings"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
                >
                    <Settings size={19} />
                </button>
            </div>
        </aside>
    );
}

export default ActivityBar;