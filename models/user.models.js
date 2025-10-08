
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required: [true,'User name is required'],
        trim:true,
        maxlength:50,
        minlength:2,
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        trim:true,
        lowercase:true,
        minlength:7,
        maxlength:255,
       match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        trim:true,
        minlength:6,
        maxlength:1024,
    }
}, { timestamps: true });

const User = mongoose.model('User',userSchema);
export default User;

