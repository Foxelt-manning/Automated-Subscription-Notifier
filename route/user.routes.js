import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

//GET /users => get all users
//GET /users/:id => specific users

userRouter.get('/',getUsers);

userRouter.get('/:id',getUser);

userRouter.post('/',(req,res)=> res.send({title: 'CREATE new User'}));

userRouter.put('/:id',(req,res)=> res.send({title: 'update user by id'}));

userRouter.delete('/:id',(req,res)=> res.send({title: 'delete specific user by id '}));

export default userRouter;