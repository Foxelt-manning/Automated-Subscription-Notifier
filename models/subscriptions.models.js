import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required: [true,'Subscription name is required'],
        trim:true,
        maxlength:100,
        minlength:2,
    },
    price:{
        type:Number,
        required: [true,' Subscription price is required'],
        min:[0,'Price must be greater than 0'],
    },
    currency:{
        type:String,
        required: [true,'Currency is required'],    
        enum:['USD','EUR','GBP','INR','JPY','AUD','CAD','CHF','CNY','SEK','NZD','GHS','NGN','ZAR'],
        default:'GHS'
    },
    frequency:{
        type:String,
        required: [true,'Frequency is required'],
        enum:['monthly','yearly','weekly','daily'],
        default:'monthly'
    },
    category:{
        type:String,
        required: [true,'Category is required'],
        enum:['entertainment','education','productivity','utilities','health','other'],
        default:'other'
    },
    paymentMethod:{
        type:String,
        required: [true,'Payment method is required'],
        trim:true,
        maxlength:50,
        minlength:2,
    },
    startDate:{
        type:Date,
        required: [true,'Start date is required'],
        validate:{
            validator:(value)=>value<=new Date(),
            message:'Start date must be in the past'
        }
    },
    RenewalDate:{
        type:Date,
        required: [true,'End date is required'],
        validate:{
            validator:function(value)
            {return value>this.startDate;},
            message:'Renewal date must be in the future'
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    },
    status:{
        type:String,
        enum:['active','canceled','paused','expired'],
        default:'active'
    }
});

// Pre-save middleware to set RenewalDate and update status
subscriptionSchema.pre('save', function(next) {
    if (!this.RenewalDate) {
        const renewal = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.RenewalDate = new Date(this.startDate);
        this.RenewalDate.setDate(this.RenewalDate.getDate() + renewal[this.frequency]);
    }

    // Auto update the status if a renewal date has passed
    if (this.RenewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model('Subscription',subscriptionSchema);
export default Subscription;