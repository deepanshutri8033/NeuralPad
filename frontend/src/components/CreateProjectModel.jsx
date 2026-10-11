import React, {
    useState
} from "react";

import {
    X
} from "lucide-react";

import {
    createProject
} from "../features/project";


function CreateProjectModel({
    setShowCreateModal,
    onProjectCreated
}) {

    const [
        name,
        setName
    ] = useState("");

    const [
        description,
        setDescription
    ] = useState("");

    const [
        loading,
        setLoading
    ] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        try {

            setLoading(true);

            const data =
                await createProject(
                    name,
                    description
                );

            if (data?.project) {

                onProjectCreated(
                    data.project
                );

                setShowCreateModal(
                    false
                );

            }

        } catch (error) {

            console.log(
                "Create project error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#101014] p-4 shadow-2xl sm:p-6">

                <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">

                    <div className="min-w-0">

                        <h2 className="text-base font-semibold text-white sm:text-lg">
                            Create Project
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Create a new project
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setShowCreateModal(false)
                        }
                        className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
                    >
                        <X size={18} />
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="mb-2 block text-xs font-medium text-slate-400">
                            Project Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="My Project"
                            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-white/[0.2]"
                        />

                    </div>


                    <div className="mb-5 sm:mb-6">

                        <label className="mb-2 block text-xs font-medium text-slate-400">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Project description..."
                            rows={4}
                            className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-white/[0.2]"
                        />

                    </div>


                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                setShowCreateModal(false)
                            }
                            className="w-full rounded-lg px-4 py-2.5 text-sm text-slate-400 hover:bg-white/[0.05] hover:text-white sm:w-auto"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                !name.trim()
                            }
                            className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Project"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


export default CreateProjectModel;