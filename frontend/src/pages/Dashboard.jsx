
import React, {
    useEffect,
    useState
} from "react";

import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";

import {
    auth,
    googleProvider
} from "../../firebase";

import {
    useDispatch,
    useSelector
} from "react-redux";

import { useNavigate } from "react-router-dom";

import { setUserData } from "../redux/userSlice";
import { login } from "../features/login";

import {
    Plus,
    FolderOpen
} from "lucide-react";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ProjectCard from "../components/ProjectCard";
import CreateProjectModel from "../components/CreateProjectModel";

import {
    getProjects,
    getStarredProjects,
    toggleStar,
    deleteProject
} from "../features/project";

import {
    setProjects,
    addNewProjects,
    setCurrentProject
} from "../redux/projectSlice";


function Loader({ text = "Loading..." }) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-white transition-colors duration-300 dark:bg-[#07070c]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-10 w-10">
                    <div className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-white/[0.08]" />
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-slate-900 dark:border-t-white" />
                </div>

                <p className="text-sm text-slate-500">
                    {text}
                </p>
            </div>
        </div>
    );
}


function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector(
        (state) => state.user?.userData
    );

    const projects = useSelector(
        (state) => state.project?.projects || []
    );

    const [loginLoading, setLoginLoading] = useState(false);
    const [starredProjects, setStarredProjects] = useState([]);
    const [activeSession, setActiveSession] = useState("projects");
    const [loading, setLoading] = useState(false);
    const [projectLoading, setProjectLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    // =========================
    // GOOGLE LOGIN
    // =========================

    const handleLogin = async () => {
        try {
            setLoginLoading(true);

            const result = await signInWithPopup(
                auth,
                googleProvider
            );

            const token = await result.user.getIdToken();
            const data = await login(token);

            if (data) {
                dispatch(setUserData(data));
            }
        } catch (error) {
            console.log("LOGIN ERROR:", error);
        } finally {
            setLoginLoading(false);
        }
    };


    // =========================
    // FETCH PROJECTS
    // =========================

    const fetchProjects = async () => {
        try {
            setProjectLoading(true);

            const data = await getProjects();

            if (Array.isArray(data)) {
                dispatch(setProjects(data));
            } else if (Array.isArray(data?.projects)) {
                dispatch(setProjects(data.projects));
            } else {
                dispatch(setProjects([]));
            }
        } catch (error) {
            console.log("Fetch projects error:", error);
        } finally {
            setProjectLoading(false);
        }
    };


    // =========================
    // FETCH STARRED PROJECTS
    // =========================

    const fetchStarredProjects = async () => {
        try {
            const data = await getStarredProjects();

            if (Array.isArray(data)) {
                setStarredProjects(data);
            } else if (Array.isArray(data?.projects)) {
                setStarredProjects(data.projects);
            } else {
                setStarredProjects([]);
            }
        } catch (error) {
            console.log("Fetch starred projects error:", error);
        }
    };


    // =========================
    // LOAD DATA
    // =========================

    useEffect(() => {
        if (!userData) {
            return;
        }

        const loadProjects = async () => {
            setLoading(true);

            try {
                await Promise.all([
                    fetchProjects(),
                    fetchStarredProjects()
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, [userData]);


    // =========================
    // CREATE PROJECT
    // =========================

    const handleProjectCreated = (project) => {
        dispatch(addNewProjects(project));
    };


    // =========================
    // STAR PROJECT
    // =========================

    const handleStar = async (id) => {
        try {
            const data = await toggleStar(id);

            if (!data?.project) {
                return;
            }

            const updatedProject = data.project;

            const updatedProjects = projects.map((project) =>
                project._id === id
                    ? updatedProject
                    : project
            );

            dispatch(setProjects(updatedProjects));

            if (updatedProject.starred) {
                setStarredProjects((prev) => [
                    updatedProject,
                    ...prev.filter(
                        (project) => project._id !== id
                    )
                ]);
            } else {
                setStarredProjects((prev) =>
                    prev.filter(
                        (project) => project._id !== id
                    )
                );
            }

            // Keep the selected project synchronized.
            const currentProject = useSelectorUnavailable;
        } catch (error) {
            console.log("Star error:", error);
        }
    };


    // =========================
    // DELETE PROJECT
    // =========================

    const handleDelete = async (id) => {
        try {
            const data = await deleteProject(id);

            if (!data) {
                return;
            }

            dispatch(
                setProjects(
                    projects.filter(
                        (project) => project._id !== id
                    )
                )
            );

            setStarredProjects((prev) =>
                prev.filter(
                    (project) => project._id !== id
                )
            );
        } catch (error) {
            console.log("Delete error:", error);
        }
    };


    // =========================
    // OPEN PROJECT
    // =========================

    const handleOpenProject = (project) => {
        dispatch(setCurrentProject(project));
        navigate(`/project/${project._id}`);
    };


    // =========================
    // LOGIN SCREEN
    // =========================

    if (!userData) {
        return (
            <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-4 py-8 transition-colors duration-300 dark:bg-[#07070c]">
                <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-slate-900/[0.04] blur-[120px] dark:bg-white/[0.04] sm:h-[600px] sm:w-[600px]" />

                <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-2xl transition-colors duration-300 dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-8">
                    <div className="flex flex-col items-center gap-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 dark:bg-white">
                            <span className="text-lg font-bold text-white dark:text-slate-900">
                                N
                            </span>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                Welcome to NeuralPad
                            </h2>

                            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                Sign in to access your projects and continue building.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogin}
                            disabled={loginLoading}
                            className="flex w-full items-center justify-center gap-3 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                        >
                            <FcGoogle size={20} />

                            <span>
                                {loginLoading
                                    ? "Signing in..."
                                    : "Sign in with Google"}
                            </span>
                        </button>

                        <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-600">
                            By continuing, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        );
    }


    // =========================
    // LOADING
    // =========================

    if (loading) {
        return <Loader text="Loading NeuralPad..." />;
    }


    // =========================
    // DISPLAYED PROJECTS
    // =========================

    const displayedProjects =
        activeSession === "projects"
            ? projects
            : starredProjects;


    // =========================
    // DASHBOARD
    // =========================

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#07070c] dark:text-white">

            <NavBar
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <div className="flex pt-16">

                <SideBar
                    activeSession={activeSession}
                    setActiveSession={setActiveSession}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />

                <main className="min-h-[calc(100vh-4rem)] min-w-0 flex-1 bg-slate-50 transition-colors duration-300 dark:bg-[#07070c]">

                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

                        {/* HEADER */}

                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="min-w-0">
                                <h1 className="truncate text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                                    {activeSession === "projects"
                                        ? "Recent Projects"
                                        : "Starred Projects"}
                                </h1>

                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                                    {activeSession === "projects"
                                        ? "Manage and open your projects"
                                        : "Your favorite projects"}
                                </p>
                            </div>

                            {activeSession === "projects" && (
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(true)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-slate-200 sm:w-auto"
                                >
                                    <Plus size={16} />
                                    New Project
                                </button>
                            )}
                        </div>


                        {/* PROJECT CONTENT */}

                        {projectLoading ? (
                            <div className="flex min-h-[400px] items-center justify-center">
                                <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 dark:border-white/[0.1] dark:border-t-white" />
                            </div>
                        ) : displayedProjects.length === 0 ? (
                            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 px-5 text-center transition-colors duration-300 dark:border-white/[0.08] sm:min-h-[400px]">

                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.04]">
                                    <FolderOpen
                                        size={22}
                                        className="text-slate-400 dark:text-slate-600"
                                    />
                                </div>

                                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {activeSession === "projects"
                                        ? "No projects yet"
                                        : "No starred projects"}
                                </h3>

                                <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-400 dark:text-slate-600">
                                    {activeSession === "projects"
                                        ? "Create your first project and start building something amazing!"
                                        : "Star a project to see it here"}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {displayedProjects.map((project) => (
                                    <ProjectCard
                                        key={project._id}
                                        project={project}
                                        onStar={handleStar}
                                        onDelete={handleDelete}
                                        onOpen={handleOpenProject}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                </main>
            </div>


            {/* CREATE PROJECT MODAL */}

            {showCreateModal && (
                <CreateProjectModel
                    setShowCreateModal={setShowCreateModal}
                    onProjectCreated={handleProjectCreated}
                />
            )}

        </div>
    );
}

export default Dashboard;