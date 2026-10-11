
import React, { useState } from "react";
import { motion } from "motion/react";
import {
    ChevronRight,
    ChevronDown,
    Folder as FolderIcon,
    FilePlus,
    FolderPlus,
    FileCode
} from "lucide-react";

function Folder({
    node,
    projectId,
    reloadTree,
    onFileSelect,
    createFolder,
    createFile
}) {
    const [open, setOpen] = useState(true);
    const [creatingFolderIn, setCreatingFolderIn] = useState(false);
    const [creatingFileIn, setCreatingFileIn] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [fileName, setFileName] = useState("");

    const handleCreateFolder = async (e) => {
        e.preventDefault();

        if (!folderName.trim()) return;

        await createFolder({
            projectId,
            name: folderName.trim(),
            parentId: node?._id
        });

        setFolderName("");
        setCreatingFolderIn(false);
        await reloadTree();
    };

    const handleCreateFile = async (e) => {
        e.preventDefault();

        if (!fileName.trim()) return;

        await createFile({
            projectId,
            name: fileName.trim(),
            parentId: node?._id
        });

        setFileName("");
        setCreatingFileIn(false);
        await reloadTree();
    };

    return (
        <div className="min-w-0">
            <div className="group flex min-w-0 items-center gap-1 rounded-md px-2 py-1 hover:bg-white/[0.06]">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                >
                    {open ? (
                        <ChevronDown size={14} className="shrink-0 text-zinc-500" />
                    ) : (
                        <ChevronRight size={14} className="shrink-0 text-zinc-500" />
                    )}

                    <FolderIcon size={15} className="shrink-0 text-sky-400" />

                    <span className="truncate text-xs text-zinc-300">
                        {node?.name || "Untitled Folder"}
                    </span>
                </button>

                <div className="flex shrink-0 items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                    <button
                        type="button"
                        aria-label="Create file"
                        title="New file"
                        onClick={() => {
                            setOpen(true);
                            setCreatingFileIn(true);
                            setCreatingFolderIn(false);
                        }}
                        className="rounded p-1 text-zinc-500 hover:bg-white/10 hover:text-white"
                    >
                        <FilePlus size={14} />
                    </button>

                    <button
                        type="button"
                        aria-label="Create folder"
                        title="New folder"
                        onClick={() => {
                            setOpen(true);
                            setCreatingFolderIn(true);
                            setCreatingFileIn(false);
                        }}
                        className="rounded p-1 text-zinc-500 hover:bg-white/10 hover:text-white"
                    >
                        <FolderPlus size={14} />
                    </button>
                </div>
            </div>

            {open && (
                <div className="ml-3 min-w-0 border-l border-white/[0.08] pl-2">
                    {creatingFolderIn && (
                        <form onSubmit={handleCreateFolder} className="py-1">
                            <input
                                autoFocus
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                        setCreatingFolderIn(false);
                                        setFolderName("");
                                    }
                                }}
                                placeholder="Folder name"
                                className="w-full min-w-0 rounded border border-white/10 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white outline-none focus:border-sky-500"
                            />
                        </form>
                    )}

                    {creatingFileIn && (
                        <form onSubmit={handleCreateFile} className="py-1">
                            <input
                                autoFocus
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                        setCreatingFileIn(false);
                                        setFileName("");
                                    }
                                }}
                                placeholder="File name (e.g. index.js)"
                                className="w-full min-w-0 rounded border border-white/10 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white outline-none focus:border-sky-500"
                            />
                        </form>
                    )}

                    {(node?.children || []).map((child) =>
                        child.type === "folder" ? (
                            <Folder
                                key={child._id}
                                node={child}
                                projectId={projectId}
                                reloadTree={reloadTree}
                                onFileSelect={onFileSelect}
                                createFolder={createFolder}
                                createFile={createFile}
                            />
                        ) : (
                            <button
                                key={child._id}
                                type="button"
                                onClick={() => onFileSelect?.(child)}
                                className="flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/[0.06]"
                            >
                                <FileCode size={14} className="shrink-0 text-sky-300" />
                                <span className="truncate text-xs text-zinc-400">
                                    {child.name}
                                </span>
                            </button>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default Folder;