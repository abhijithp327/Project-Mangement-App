import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";

// routes imports
import userRoute from './routes/userRoutes.js';
import projectRoute from './routes/projectRoutes.js';



dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
    // credentials: true,
    origin: true,
};


// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// routes 
app.use('/api/v1/users', userRoute);
app.use('/api/v1/projects', projectRoute);

app.get('/', (req, res) => {
    res.json("Project Management App Server is Online!")
});

// database connections
mongoose.set("strictQuery", false)

const connectDb = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL);

    } catch (error) {
        console.log(error);
        console.log("Database Connection Failed");
    }
};

app.listen(port, () => {
    connectDb();
    console.log(`Server Is Running On Port ${port}`);
});


