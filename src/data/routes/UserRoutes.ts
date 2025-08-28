import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

// create a new user
router.post("/createUser", UserController.create);

// get all users
router.get("/users", UserController.findAll);

// det user by ID
router.get("/userById/:id", UserController.findById);

// update user by ID
router.put("/updateUser/:id", UserController.update);

// delete user by ID
router.delete("/deleteUser/:id", UserController.delete);

export default router;