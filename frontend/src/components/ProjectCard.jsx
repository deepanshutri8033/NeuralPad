
import React, { useState } from "react";
import { motion } from "motion/react";
import {
    Folder,
    Star,
    Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProjectCard({
    project,
    onStar,
    onDelete,
    onOpen
}) {
    const [loadingStar, setLoadingStar] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const navigate = useNavigate();

    const handleToggleStar = async (e) => {
        e.stopPropagation();

        if (loadingStar) return;

        try {
            setLoadingStar(true);
            await onStar(project._id);
        } finally {
            setLoadingStar(false);
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();

        if (loadingDelete) return;

        try {
            setLoadingDelete(true);
            await onDelete(project._id);
        } finally {
            setLoadingDelete(false);
        }
    };

    const handleOpen = () => {
        if (onOpen) {
            onOpen(project);
        } else {
            navigate(`/project/${project._id}`);
        }
    };

    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -3 }}
            exit={{
                opacity: 0,
                scale: 0.97
            }}
            transition={{
                duration: 0.18,
                ease: "easeOut"
            }}
            onClick={handleOpen}
            className="group relative min-w-0 cursor-pointer rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-colors duration-200 hover:border-slate-300 hover:shadow-md sm:p-4 dark:border-white/[0.07] dark:bg-white/[0.02] dark:shadow-none dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04]"
        >
            <div className="mb-4 flex items-start justify-between gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 sm:h-10 sm:w-10 dark:bg-white/[0.06] dark:text-slate-300">
                    <Folder size={18} />
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <button
                        type="button"
                        disabled={loadingStar}
                        onClick={handleToggleStar}
                        aria-label={
                            project.starred
                                ? "Unstar project"
                                : "Star project"
                        }
                        className={`rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            project.starred
                                ? "text-yellow-500"
                                : "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-600 dark:hover:bg-white/[0.06] dark:hover:text-slate-300"
                        }`}
                    >
                        <Star
                            size={16}
                            fill={
                                project.starred
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </button>

                    <button
                        type="button"
                        disabled={loadingDelete}
                        onClick={handleDelete}
                        aria-label="Delete project"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <h3 className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {project.name}
            </h3>

            <p className="mt-1 line-clamp-2 min-h-[32px] text-xs leading-relaxed text-slate-500 dark:text-slate-500">
                {project.description || "No description"}
            </p>

            <div className="mt-4 border-t border-slate-100 pt-3 dark:border-white/[0.05]">
                <p className="text-[10px] text-slate-500 dark:text-slate-600">
                    Project
                </p>
            </div>
        </motion.div>
    );
}

export default ProjectCard;