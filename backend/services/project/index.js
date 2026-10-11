import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./config/db.js";
import router from "./routes/project.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8002;

const app = express();

app.use(express.json());

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "dashboard.html"));
});

app.use("/", router);

app.get("/health", (req, res) => {
    res.json({
        message: "Hello from Project Service",
    });
});

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`Project Service started at ${port}`);
        });

    } catch (error) {
        console.log("Project Service failed to start:", error);
        process.exit(1);
    }
};

startServer();