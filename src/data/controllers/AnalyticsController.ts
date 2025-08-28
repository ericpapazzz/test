import { Request, Response } from "express";
import { User } from "../models/User";

class AnalyticsController {
    async getUserAnalytics(req: Request, res: Response) {
        try {
            // get all users
            const users = await User.findAll();
            
            // calculate number of existing users
            const totalUsers = users.length;
            
            // find longest and shortest names
            const longestName = users.reduce((longest, user) => 
                user.user_name.length > longest.length ? user.user_name : longest, ''
            );
            
            const shortestName = users.reduce((shortest, user) => 
                user.user_name.length < shortest.length || shortest === '' ? user.user_name : shortest, ''
            );
            
            const analytics = {
                summary: {
                    totalUsers
                },
                extremes: {
                    longestName,
                    shortestName,
                    longestNameLength: longestName.length,
                    shortestNameLength: shortestName.length
                },
            };
            
            res.status(200).json({
                status: "OK",
                message: "Analytics generated successfully",
                data: analytics
            });
            
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Failed to generate analytics",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
}

export default new AnalyticsController();