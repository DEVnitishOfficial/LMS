import User from "../models/userModel.js";
import { razorpay } from "../server.js";
import AppErr from "../utils/errorUtils.js";
import crypto from 'crypto'

export const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay api key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppErr(error.message,'400'))
  }
};

/**
 * @ACTIVATE_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/subscribe
 * @ACCESS Private (Logged in user only)
 */
export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log('id',id)
    const user = await User.findById(id);
    console.log('user',user)
    if (!user) {
      return next(new AppErr("User not found with provided Id", 400));
    }
    if (user.role === "ADMIN") {
      return next(new AppErr("admin can not purchase subscription", 400));
    }
  
    const subscription = razorpay.subscriptions.create({
      plan_id : process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1
    });

    if (!subscription) {
      console.error('Error creating subscription:', subscription);
      return next(new AppErr('Error creating subscription. Check planId or subscription details.'));
    }
  
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "subscribed successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    return next(new AppErr(error.message,'400'))
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
      req.body;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppErr("User not found with provided Id", 400));
    }
    const subscriptionId = user.subscription.id;
  
    const generatedSignature = crypto
      .createHmac("Sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id} | ${subscriptionId}`)
      .digest("hex");
  
    if (generatedSignature !== razorpay_signature) {
      return next(new AppErr("payment not verified,Please try again", 500));
    }
    await Payment.create({
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    });
    user.subscription.status = "active";
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message,'400'))
  }
};

export const cancelSubscription = async (req, res, next) => {
 try {
     const { id } = req.user;
     const user = await User.findById(id);
     if (!user) {
       return next(
         new AppErr(
           "You cant cancel subscription, first login and then try again",
           400
         )
       );
     }
     if (user.role === "ADMIN") {
       return next(new AppErr("admin cannot cance any subscription", 500));
     }
     const subscriptionId = user.subscription.id;
     const cancelSubscription = await razorpay.subscriptions.cancel(
       subscriptionId
     );
     user.subscription.status = cancelSubscription.status;
     await user.save();
 } catch (error) {
    return next(new AppErr(error.message,'400'))
 }
};

export const allPayments = async (req, res, next) => {
    const {count} = req.query;
    const subscriptionDetails = await razorpay.subscriptions.all({
        count : count || 10
    })
    res.status(200).json({
        success : true,
        message : 'all payment details fetched successfully',
        subscriptionDetails
    })
};
