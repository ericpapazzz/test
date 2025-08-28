import {Sequelize} from "sequelize-typescript";
import {User} from "../../data/models/User";
import * as dotenv from "dotenv";
dotenv.config()

class Database{
    public sequelize: Sequelize | undefined

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

    constructor(){
        this.connectToPostgre();
    }

    private async connectToPostgre(){
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            dialect: "postgres",
            models:[User]
        });

        await this.sequelize
        .authenticate()
        .then(()=>{
            console.log("PostgreSQL connection established succesfully.");
        })
        .catch((err)=>{
            console.log("PostgreSQL connection failed.", err);
    
        })
    }
}

export default Database;