import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helper/axiosInstance"

const initialState = {
    key : "",
    subscription_id : "",
    isPaymentVerified : false,
    allPayments : {},
    finalMonths : {},
    monthelySalesRecords : []
}

 export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key")
        return response.data
    } catch (error) {
        toast.error("failed to load data")
    }
 })

  export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try {
        const response = await axiosInstance.post("/payments/subscribe")
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
 })

 export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try {
        const response = await axiosInstance.post("/payments/verify",{
            razorpay_payment_id : data.razorpay_payment_id,
            razorpay_subscription_id : data.razorpay_subscription_id,
            razorpay_signature : data.razorpay_signature
        })
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
 })

 export const getPaymentRecord = createAsyncThunk("/payments/records", async () => {
    try {
        const response = axiosInstance.get("/payments?count=12",)
        console.log('responseee',response)  
        toast.promise(response,{
            loading : "Payment data is loading",
            success : (data) => {
              return  data?.data?.message
            },
            error : "failed to get payment data"
        })
        const res = await response;
        return res.data;
    } catch (error) {
        toast.error("Operation failed")
    }
 })

 export const cancelCourseSubscription = createAsyncThunk("/payments/cancel", async () => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe")
        toast.promise(response,{
            loading : "Wait your unsubscription is in progress",
            success : (data) => {
                data?.data?.message
            },
            error : "failed to unsubscribe"
        })
        return (await response).data
    } catch (error) {
       toast.error(error?.response?.data?.message) 
    }
 })

const razorpaySlice = createSlice({
    name : 'razorpay',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getRazorPayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action)  => {
            state.subscription_id = action?.payload?.subscription_id
        })
        .addCase(verifyUserPayment.fulfilled,(state,action) => {
            console.log('verifyUserPayment',action)
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action) => {
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action) => {
            console.log('actionpayment',action.payload.monthlySalesRecord)
            state.allPayments = action?.payload?.subscriptionDetails
            state.finalMonths = action?.payload?.finalMonths
            state.monthelySalesRecords = action?.payload?.monthlySalesRecord            ;
        })
    }
})

export default razorpaySlice.reducer