import { Router } from "express";
import authorize from '../middlewares/auth.middleware.js'
import { createSubscription, getSubscriptionById, getSubscriptions, getUserSubcription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', getSubscriptions);

subscriptionRouter.get('/:id',getSubscriptionById);

subscriptionRouter.post('/', authorize,createSubscription);

subscriptionRouter.put('/:id', (req,res)=>res.send({title:'UPDATE subscription by id'}));

subscriptionRouter.delete('/:id', (req,res)=>res.send({title:'DELETE  subscriptions by id'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubcription);

subscriptionRouter.put('/:id/cancel', (req,res)=>res.send({title:'Cancel  subscription by id'}));

subscriptionRouter.get('/upcoming-renewals', (req,res)=>res.send({title:'Get upcoming renewals'}));

export default subscriptionRouter; 