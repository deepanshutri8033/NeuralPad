
import React from "react";
import { useSelector } from "react-redux";
import { FolderCode } from "lucide-react";

function TopBar() {
    const { currentProject } = useSelector(
        (state) => state.project
    );

    return (
        <div className="flex h-14 w-full min-w-0 items-center justify-between gap-3 border-b border-white/[0.08] bg-[#111113] px-3 sm:px-5">
            {/* Project Information */}
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-slate-300">
                    <FolderCode size={18} />
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-sm font-medium text-white sm:text-base">
                        {currentProject?.name || "Untitled Project"}
                    </h2>

                    <p className="truncate text-xs text-zinc-500">
                        {currentProject?.description || "No description"}
                    </p>
                </div>
            </div>

            {/* Project Status */}
            <div className="flex shrink-0 items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="hidden text-xs text-zinc-400 sm:inline">
                    Project
                </span>
            </div>
        </div>
    );
}

export default TopBar;