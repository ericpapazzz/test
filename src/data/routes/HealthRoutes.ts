import { Router, Request, Response } from "express";

const router = Router();

// api connectivity check endpoint
router.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        message: "API is running successfully",
        timestamp: new Date().toISOString(),
    });
});

export default router;
