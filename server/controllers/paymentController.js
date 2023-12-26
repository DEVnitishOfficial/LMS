import User from "../models/userModel.js";
import { razorpay } from "../server.js";
import AppErr from "../utils/errorUtils.js";
import crypto from 'crypto'
import Payment from "../models/paymentModel.js";

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
    const user = await User.findById(id);
    if (!user) {
      return next(new AppErr("User not found with provided Id", 400));
    }
    if (user.role === "ADMIN") {
      return next(new AppErr("admin can not purchase subscription", 400));
    }
    const subscription = await razorpay.subscriptions.create({
      plan_id : process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12,
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
    return next(new AppErr(error.message,400))
  }
};

/**
 * @VERIFY_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/verify
 * @ACCESS Private (Logged in user only)
 */
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
  
    // Generating a signature with SHA256 for verification purposes
  // Here the subscriptionId should be the one which we saved in the DB
  // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
  // At the end convert it to Hex value
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
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
     
     res.status(200).json({
      success: true,
      message: 'Subscription canceled successfully',
    });
 } catch (error) {
    return next(new AppErr(error.message,'400'))
 }
};

export const allPayments = async (req, res, next) => {
    const {count} = req.query;
    const subscriptionDetails = await razorpay.subscriptions.all({
        count : count || 10
    })

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  
    const finalMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
  
    const monthlyWisePayments = subscriptionDetails.items.map((payment) => {
      // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
      const monthsInNumbers = new Date(payment.start_at * 1000);
  
      return monthNames[monthsInNumbers.getMonth()];
    });
  
    monthlyWisePayments.map((month) => {
      Object.keys(finalMonths).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonths[month] += 1;
        }
      });
    });
  
    const monthlySalesRecord = [];
  
    Object.keys(finalMonths).forEach((monthName) => {
      monthlySalesRecord.push(finalMonths[monthName]);
    });
    res.status(200).json({
        success : true,
        message : 'all payment details fetched successfully',
        subscriptionDetails,
        finalMonths,
        monthlySalesRecord,
    })
};
