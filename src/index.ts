import express,{Application,Request,Response} from "express";
import cors from "cors";
import Database from "./server/config/database";
import UserRoutes from "./data/routes/UserRoutes";
import HealthRoutes from "./data/routes/HealthRoutes";
import AnalyticsRoutes from "./data/routes/AnalyticsRoutes";

class App {
    public app:Application;

    constructor(){
        this.app = express();
        this.plugins()
        this.databaseSync()
        this.routes()
    }

    protected plugins(): void {
        this.app.use(cors({
            origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
            credentials: true
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    protected databaseSync():void{
        const db = new Database();
        db.sequelize?.sync();
    }

    protected routes():void{
        this.app.route("/").get((req:Request,res:Response)=>{
            res.send("Home");
        });
        
        // health check route
        this.app.use("/api", HealthRoutes);
        
        // analytics routes
        this.app.use("/api", AnalyticsRoutes);
        
        // user routes (endpoints)
        this.app.use("/api", UserRoutes);
    }
}

const port: number = process.env.API_PORT ? parseInt(process.env.API_PORT) : 8000;
const app = new App().app;

app.listen(port,()=>{
    console.log("Server started successfully")
})