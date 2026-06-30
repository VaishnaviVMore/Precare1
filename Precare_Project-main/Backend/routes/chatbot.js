import express from "express";
import { spawn } from "child_process";
import path from "path";

const router = express.Router();

router.post("/", (req, res) => {

    const question = req.body.question;

    if (!question) {
        return res.status(400).json({
            answer: "Question is required."
        });
    }

    const pythonFile = path.join(
        process.cwd(),
        "rag",
        "query.py"
    );

    const python = spawn("python", [
        pythonFile,
        question
    ]);

    let result = "";
    let error = "";

    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.stderr.on("data", (data) => {
        error += data.toString();
    });

    python.on("close", (code) => {

        if (code !== 0) {
            console.log(error);

            return res.status(500).json({
                answer: "Python Error",
                error
            });
        }

        res.json({
            answer: result.trim()
        });

    });

});

export default router;