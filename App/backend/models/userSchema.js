import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    usr_name: {
        type: String,
        required: true
    },

    usr_email: {
        type: String,
        required: true,
        unique: true
    },

    usr_password: {
        type: String,
        required: true
    },

    usr_phone: {
        type: Number,
        required: true
    }

});

export default mongoose.model("Users", UserSchema);