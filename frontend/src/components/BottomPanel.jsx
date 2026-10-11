
import React, { useState } from "react";

function BottomPanel() {
    const [activeTab, setActiveTab] = useState("Terminal");

    const tabs = ["Problems", "Output", "Terminal"];

    return (
        <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden border-t border-white/10 bg-[#111113] text-white">
            <div className="flex h-10 shrink-0 items-center gap-1 overflow-x-auto border-b border-white/10 px-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`shrink-0 rounded px-3 py-2 text-xs transition ${
                            activeTab === tab
                                ? "border-b-2 border-sky-500 text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="min-h-0 flex-1 overflow-auto p-3">
                {activeTab === "Terminal" && (
                    <p className="font-mono text-xs text-zinc-400">
                        Terminal is ready.
                    </p>
                )}

                {activeTab === "Problems" && (
                    <p className="text-xs text-zinc-400">
                        No problems to display.
                    </p>
                )}

                {activeTab === "Output" && (
                    <p className="text-xs text-zinc-400">
                        Output will appear here.
                    </p>
                )}
            </div>
        </section>
    );
}

export default BottomPanel;