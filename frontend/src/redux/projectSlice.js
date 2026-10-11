
import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",

    initialState: {
        projects: [],
        currentProject: null
    },

    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },

        setCurrentProject: (state, action) => {
            state.currentProject = action.payload;
        },

        addNewProjects: (state, action) => {
            state.projects.unshift(action.payload);
        },

        starProject: (state, action) => {
            const project = state.projects.find(
                (p) => p._id === action.payload
            );

            if (project) {
                project.starred = !project.starred;
            }
        },

        setDeleteProject: (state, action) => {
            state.projects = state.projects.filter(
                (p) => p._id !== action.payload
            );

            if (state.currentProject?._id === action.payload) {
                state.currentProject = null;
            }
        }
    }
});

export const {
    setProjects,
    setCurrentProject,
    addNewProjects,
    starProject,
    setDeleteProject
} = projectSlice.actions;

export default projectSlice.reducer;