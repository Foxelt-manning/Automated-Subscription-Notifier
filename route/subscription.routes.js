import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res)=>res.send({title:'Get all subscriptions'}));

subscriptionRouter.get('/:id', (req,res)=>res.send({title:'Get subscriptions by id'}));

subscriptionRouter.post('/', (req,res)=>res.send({title:'Create subscription'}));

subscriptionRouter.put('/:id', (req,res)=>res.send({title:'UPDATE subscription by id'}));

subscriptionRouter.delete('/:id', (req,res)=>res.send({title:'DELETE  subscriptions by id'}));

subscriptionRouter.get('/user/:id', (req,res)=>res.send({title:'Get all subscriptions a user has'}));

subscriptionRouter.put('/:id/cancel', (req,res)=>res.send({title:'Cancel  subscription by id'}));

subscriptionRouter.get('/upcoming-renewals', (req,res)=>res.send({title:'Get upcoming renewals'}));

export default subscriptionRouter; 