
import subscription from "../models/subscriptions.models.js";

export const createSubscription = async (req,res,next)=>{
    try {
        
        const Subscription = await  subscription.create({
            ...req.body,
            user : req.user._id,
        });

        res.status(201).json({success:true, data: Subscription})
    } catch (error) {
        
        next(error)
    }
}

export const getUserSubcription = async (req,res,next)=>{

    try{

        if(req.user.id !== req.params.id){
            const error = new Error("You are not the owner of this account");
            error.status = 401;
            throw error;
        }
        const Subscription = await subscription.find({user:req.params.id});
        res.status(200).json({success:true ,data:Subscription})
    }catch(error){
    next(error)
}
}

export const getSubscriptionById = async(req,res,next)=>{
    try {
         const subscriptionId = await subscription.findById(req.params.id);
        if(!subscriptionId){
            const error = new Error("Subscription not Found");
            error.status =404;
            throw error;
        }

        res.status(200).json({success:true,data:subscriptionId})
    } catch (error) {
        next(error)
        
    }
}

export const getSubscriptions = async(req,res,next)=>{
    try {
        
        const Subcriptions = await subscription.find();

        res.status(200).json({success:true,data:Subcriptions});

    } catch (error) {
        next(error);
    }

}