import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    pro_name: {
        type: String,
        required: true
    },

    pro_title: {
        type: String,
        required: true
    },

    pro_description: {
        type: String,
        required: true,
    }

});

export default mongoose.model("projects", ProjectSchema);