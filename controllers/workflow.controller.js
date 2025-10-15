import dayjs from 'dayjs';
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const {serve} =  require('@upstash/workflow/express');
import subscription from '../models/subscriptions.models.js';
import sendReminderEmail from '../utils/send-email.js';


const REMINDERS =[7,5,2,1];

export const sendReminders = serve(async (context) =>{
    const { subscriptionId } = context.requestPayload;
    const Subscription = await fetchSubscription(context,subscriptionId);

    if(!Subscription || Subscription.status !== 'active') return;

    const renewalDate = dayjs(Subscription.RenewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`);
        return;
    }

    for( const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore,'day');
        if (reminderDate.isAfter(dayjs())){
                await sleepUntilReminder(context,`Reminder ${daysBefore} days before`,reminderDate);
        }

if(dayjs().isSame(reminderDate,'day')) {
    await triggerReminder(context,`${daysBefore} days before reminder`,Subscription);
}

        await triggerReminder(context,`${daysBefore} days before reminder`,Subscription);
    }

    

});

const fetchSubscription = async (context,subscriptionId)=>{
    return await context.run('get subscription', async ()=>{
        return subscription.findById(subscriptionId).populate('user','name email');
    })
}

const sleepUntilReminder = async(context,label,date)=>{
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label,date.toDate());
}

const triggerReminder = async(context,label,subscription)=>{
    return await context.run(label,async ()=>{
        console.log(`Triggering ${label} reminder`);

        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription: subscription,
        });
    });
}