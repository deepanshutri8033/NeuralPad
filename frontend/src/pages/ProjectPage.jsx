
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Code2, Eye, Save } from "lucide-react";

import TopBar from "../components/TopBar";
import ActivityBar from "../components/ActivityBar";
import Explorer from "../components/Explorer";
import Editor from "../components/Editor";
import Preview from "../components/Preview";

import { getProjectById } from "../features/project";
import { getFile, updateFile } from "../features/file";
import { setCurrentProject } from "../redux/projectSlice";

function ProjectPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { currentProject } = useSelector((state) => state.project);

    const [loading, setLoading] = useState(false);
    const [activePanel, setActivePanel] = useState("explorer");
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (currentProject?._id === id) return;

        let cancelled = false;

        const fetchProject = async () => {
            setLoading(true);

            try {
                const data = await getProjectById(id);

                if (cancelled) return;

                if (data?.project) {
                    dispatch(setCurrentProject(data.project));
                } else if (data?._id) {
                    dispatch(setCurrentProject(data));
                }
            } catch (error) {
                console.error("Fetch project error:", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchProject();

        return () => {
            cancelled = true;
        };
    }, [id, currentProject?._id, dispatch]);

    const handleSelectFile = async (file) => {
        setMessage("");

        const data = await getFile(file._id);
        const selected = data?.file || data;

        if (!selected?._id) {
            setMessage("Unable to open this file.");
            return;
        }

        setSelectedFile(selected);
        setContent(selected.content || "");
    };

    const handleSave = async () => {
        if (!selectedFile?._id) return;

        setSaving(true);
        setMessage("");

        try {
            const data = await updateFile(selectedFile._id, {
                name: selectedFile.name,
                content
            });

            if (data) {
                setSelectedFile((prev) => ({ ...prev, content }));
                setMessage("Saved");
            } else {
                setMessage("Save failed");
            }
        } catch (error) {
            console.error("Save file error:", error);
            setMessage("Save failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading && currentProject?._id !== id) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#07070c] text-sm text-zinc-400">
                Loading project...
            </div>
        );
    }

    if (currentProject?._id !== id) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#07070c] px-4 text-center text-sm text-zinc-400">
                Project not found or could not be loaded.
            </div>
        );
    }

    return (
        <div className="flex h-screen min-h-0 w-full flex-col overflow-hidden bg-[#07070c] text-white">
            <TopBar />

            <div className="flex min-h-0 flex-1">
                <ActivityBar
                    activePanel={activePanel}
                    setActivePanel={setActivePanel}
                />

                {activePanel === "explorer" && (
                    <div className="hidden w-52 shrink-0 overflow-hidden border-r border-white/[0.08] sm:block lg:w-60">
                        <Explorer
                            projectId={id}
                            selectedFile={selectedFile}
                            onSelectFile={handleSelectFile}
                        />
                    </div>
                )}

                <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#111113] px-3 py-2">
                        <div className="flex min-w-0 items-center gap-2">
                            <Code2 size={15} className="shrink-0 text-sky-400" />
                            <span className="max-w-[140px] truncate text-xs text-zinc-300 sm:max-w-xs">
                                {selectedFile?.name || "No file selected"}
                            </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            {message && (
                                <span className="text-xs text-zinc-400">
                                    {message}
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={!selectedFile || saving}
                                className="flex items-center gap-1.5 rounded-md bg-sky-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Save size={13} />
                                {saving ? "Saving..." : "Save"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowPreview((prev) => !prev)}
                                className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-zinc-300 transition hover:bg-white/[0.06]"
                            >
                                <Eye size={13} />
                                {showPreview ? "Editor" : "Preview"}
                            </button>
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-auto">
                        {showPreview ? (
                            <Preview content={content} />
                        ) : (
                            <Editor
                                file={selectedFile
                                    ? { ...selectedFile, content }
                                    : null}
                                onChange={setContent}
                            />
                        )}
                    </div>
                </main>
            </div>

            {/* Explorer drawer for small screens */}
            {activePanel === "explorer" && (
                <div className="fixed inset-x-0 bottom-0 top-14 z-20 bg-[#111113] sm:hidden">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b border-white/[0.08] px-3 py-2">
                            <span className="text-xs font-semibold text-zinc-300">
                                Explorer
                            </span>
                            <button
                                type="button"
                                onClick={() => setActivePanel(null)}
                                className="text-xs text-zinc-400"
                            >
                                Close
                            </button>
                        </div>

                        <div className="min-h-0 flex-1">
                            <Explorer
                                projectId={id}
                                selectedFile={selectedFile}
                                onSelectFile={(file) => {
                                    handleSelectFile(file);
                                    setActivePanel(null);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectPage;