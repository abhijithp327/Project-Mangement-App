import Project from "../models/projectSchema.js";



export const createProject = async (req, res) => {

    try {

        const userId = req.user.id;

        const { pro_name, pro_title, pro_description } = req.body;

        const newProjectData = new Project({

            user_id: userId,
            pro_name,
            pro_title,
            pro_description

        });

        const newProject = await newProjectData.save();

        res.status(200).json({
            status: 200,
            success: true,
            message: "Project Created Successfully",
            result: newProject
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to create project",
            error: error
        });
    }

};



export const updateProject = async (req, res) => {

    try {

        const projectId = req.params.projectId;

        const updateData = req.body;

        const updatedProject = await Project.findByIdAndUpdate(projectId, updateData, { new: true });

        if (!updatedProject) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "Project Updated Successfully",
            result: updatedProject
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to update project",
            error: error
        });
    }

};



export const getSingleProject = async (req, res) => {

    try {

        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);

        res.status(200).json({
            status: 200,
            success: true,
            message: "Fetch Project successfully",
            result: project
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch project",
            error: error
        });
    }

};




export const getAllProjects = async (req, res) => {

    try {

        const projects = await Project.find();

        res.status(200).json({
            status: 200,
            success: true,
            message: "Fetched Projects Successfully",
            result: projects
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch projects ",
            error: error
        });
    }
};


export const getUserProjects = async (req, res) => {

    try {

        const user_id = req.user?.id;

        const projects = await Project.find({ user_id });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Fetched Projects Successfully",
            result: projects
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch projects ",
            error: error
        });
    }
};



export const deleteProject = async (req, res) => {

    try {

        const projectId = req.params.projectId;

        const deletedProject = await Project.findByIdAndDelete(projectId);

        res.status(200).json({
            status: 200,
            success: true,
            message: "Project Deleted Successfully",
            result: deletedProject
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to delete project",
            error: error
        });
    }

};