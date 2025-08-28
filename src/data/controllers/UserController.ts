import { Request, Response } from "express";
import {User} from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

class UserController {
    async create(req:Request, res:Response){

        try{
            const newUser = new User();

            newUser.user_name = req.body.user_name;

            await new UserRepository().save(newUser);

            res.status(200).json({
                status:"OK",
                message: "Successfully created User.",
                data: newUser
            });
        } catch(error){
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            })
        }
    }

    async update(req:Request, res:Response){

        try{
            let id = parseInt(req.params["id"]);
            const updatedUser = new User();

            updatedUser.user_id = id
            updatedUser.user_name = req.body.user_name;

            await new UserRepository().update(updatedUser);

            res.status(200).json({
                status:"OK",
                message: "Successfully updated User.",
                data: updatedUser
            });
        } catch(error){
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            })
        }
    }

    async delete(req:Request, res:Response){

        try{
            let id = parseInt(req.params["id"]);
            await new UserRepository().delete(id)

            res.status(200).json({
                status:"OK",
                message: "Successfully deleted User.",
                data: { deletedId: id }
            });
        } catch(error){
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            })
        }
    }

    async findById(req: Request, res: Response) {
        try {
          let id = parseInt(req.params["id"]);
          const user = await new UserRepository().retrieveById(id);
    
          res.status(200).json({
            status: "OK",
            message: "Successfully fetched user by id!",
            data: user,
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error!",
            message: "Internal Server Error!",
          });
        }
      }

      async findAll(req: Request, res: Response) {
        try {
          const users = await new UserRepository().retrieveAll();
    
          res.status(200).json({
            status: "OK",
            message: "Successfully fetched all users!",
            data: users,
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error!",
            message: "Internal Server Error!",
          });
        }
      }
}

export default new UserController()