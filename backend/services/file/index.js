import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./config/db.js";
import router from "./routes/file.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8003;

const app = express();

app.use(express.json());

app.use("/", router);

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "dashboard.html"));
});

app.get("/", (req, res) => {
    res.json({
        message: "Hello from file Service",
    });
});

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`File Service started at ${port}`);
        });

    } catch (error) {
        console.log("File Service failed to start:", error);
        process.exit(1);
    }
};

startServer();