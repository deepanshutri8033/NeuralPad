
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import { getTree } from "../features/file";

function Explorer({ projectId, selectedFile, onSelectFile }) {
    const [tree, setTree] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        if (!projectId) return;

        let cancelled = false;

        const loadTree = async () => {
            setLoading(true);
            setError("");

            const data = await getTree(projectId);

            if (cancelled) return;

            if (Array.isArray(data)) {
                setTree(data);
            } else if (Array.isArray(data?.tree)) {
                setTree(data.tree);
            } else {
                setTree([]);
                setError("Unable to load files.");
            }

            setLoading(false);
        };

        loadTree();

        return () => {
            cancelled = true;
        };
    }, [projectId]);

    const toggleFolder = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const renderNodes = (nodes, depth = 0) =>
        nodes.map((node) => {
            const isFolder = node.type === "folder";
            const isOpen = Boolean(expanded[node._id]);
            const isSelected = selectedFile?._id === node._id;

            return (
                <div key={node._id}>
                    <button
                        type="button"
                        onClick={() => {
                            if (isFolder) {
                                toggleFolder(node._id);
                            } else {
                                onSelectFile(node);
                            }
                        }}
                        style={{ paddingLeft: `${12 + depth * 14}px` }}
                        className={`flex w-full min-w-0 items-center gap-2 py-2 pr-3 text-left text-xs transition ${
                            isSelected
                                ? "bg-sky-500/15 text-sky-300"
                                : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                        }`}
                    >
                        {isFolder ? (
                            <>
                                {isOpen
                                    ? <ChevronDown size={14} />
                                    : <ChevronRight size={14} />}
                                <Folder size={15} className="shrink-0 text-sky-400" />
                            </>
                        ) : (
                            <>
                                <span className="w-[14px] shrink-0" />
                                <File size={15} className="shrink-0 text-zinc-400" />
                            </>
                        )}

                        <span className="truncate">{node.name}</span>
                    </button>

                    {isFolder && isOpen && node.children?.length > 0 && (
                        <div>
                            {renderNodes(node.children, depth + 1)}
                        </div>
                    )}
                </div>
            );
        });

    return (
        <aside className="flex h-full w-full min-w-0 flex-col bg-[#111113]">
            <div className="flex h-10 shrink-0 items-center justify-between border-b border-white/[0.06] px-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Explorer
                </span>
            </div>

            <div className="min-h-0 flex-1 overflow-auto py-2">
                {loading ? (
                    <p className="px-3 py-4 text-xs text-zinc-500">
                        Loading files...
                    </p>
                ) : error ? (
                    <p className="px-3 py-4 text-xs text-red-400">{error}</p>
                ) : tree.length > 0 ? (
                    renderNodes(tree)
                ) : (
                    <p className="px-3 py-4 text-xs text-zinc-500">
                        No files yet
                    </p>
                )}
            </div>
        </aside>
    );
}

export default Explorer;